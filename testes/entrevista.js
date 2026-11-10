/* Módulo "Job Interview": cada bloco temático é praticado como um deck.

   O que este teste defende:
   1. A rodada é SÓ dos blocos escolhidos, e só de perguntas que já têm
      resposta padrão escrita.
   2. A nota é por PALAVRA, não um veredito só. Mesmo num bloco de 40
      palavras, "certo ou errado" não diria nada — uma palavra trocada
      derrubaria tudo. Quem conta é o transDiffWords() do módulo de tradução.
   3. O histórico é POR BLOCO e **mescla**: praticar um bloco não pode apagar
      a nota dos outros. É a mesma regra do histórico por deck da tradução, e
      é o que sustenta o "leve um a 100% antes de ir para o próximo".
   4. A porcentagem que a TELA mostra é a mesma da régua e a mesma que fica
      gravada. É o bug que o módulo da conversa teve (7% com tudo certo), e ele
      só aparece quando o teste olha a tela, não só a função. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA ENTREVISTA");

const blocos = A.getInterviewBlocks();
const faltam = A.INTERVIEW_QUESTIONS.filter(q => !A.interviewIsMirror(q));
p.ok(blocos.length >= 4, `a resposta rende ${blocos.length} blocos praticáveis`);
p.ok(blocos.every(b => b.key.indexOf(b.q.id + "-b") === 0),
     "a chave do bloco é prefixada pela pergunta (o bloco 1 de outra resposta não é este)");
p.ok(faltam.every(q => !q.partes), "pergunta sem resposta padrão não rende bloco nenhum");
p.ok(blocos.reduce((t, b) => t + b.total, 0) === A.interviewTotalWords(blocos[0].q),
     "as palavras dos blocos somam a resposta inteira");

/* ---- 1. a contagem palavra por palavra, dentro de um bloco ---- */
const b1 = blocos[0];
/* Troca UMA palavra por outra que não existe na resposta. A mexida nasce do
   próprio bloco, de propósito: apontar para uma palavra específica do texto
   ("technology" já esteve lá e saiu numa edição do dono) é teste que quebra a
   cada ajuste de conteúdo — o mesmo erro dos casos dirigidos que apontavam
   para cartões do banco de tradução. */
const trocaUmaPalavra = texto => texto.split(/\s+/).map((w, i) => (i === 2 ? "zzz" : w)).join(" ");
const inteiro = A.interviewCheckText(b1.parte.en, b1.parte.en);
p.ok(inteiro.acertos === inteiro.total && inteiro.sobraram === 0,
     `o próprio bloco devia contar ${inteiro.total} de ${inteiro.total} (deu ${inteiro.acertos})`);
p.ok(A.interviewCheckText(b1.parte.en, "").acertos === 0, "campo vazio conta zero palavras");
const trocada = A.interviewCheckText(b1.parte.en, trocaUmaPalavra(b1.parte.en));
p.ok(trocada.acertos === inteiro.total - 1 && trocada.sobraram === 1,
     `trocar uma palavra devia custar exatamente uma (deu ${inteiro.total - trocada.acertos})`);
p.ok(A.gradeTransAnswer({ en: b1.parte.en }, trocaUmaPalavra(b1.parte.en)).level === "diferente" &&
     A.gradeTransAnswer({ en: b1.parte.en }, "Something else entirely.").level === "diferente",
     "o veredito inteiro não serve de nota — é por isso que a conta é por palavra");

/* ---- 2. a tela de escolha ---- */
P.openInterviewBlocks();
p.ok(P.state.view === "interviewBlocks", "o módulo abre na escolha dos blocos, não na rodada");
p.ok(P.state.interviewBlockSelection.length === 0, "nada vem marcado por padrão");
const telaEscolha = P.telaHtml();
blocos.forEach(b => p.ok(telaEscolha.indexOf(b.parte.topic) !== -1, `a escolha lista "${b.parte.topic}"`));
p.ok(telaEscolha.indexOf("Select at least one block") !== -1,
     "sem bloco marcado, o botão de começar fica travado");
P.toggleInterviewBlock(b1.key);
p.ok(P.state.interviewBlockSelection.length === 1, "clicar marca o bloco");
P.toggleInterviewBlock(b1.key);
p.ok(P.state.interviewBlockSelection.length === 0, "clicar de novo desmarca");

/* ---- 3. praticar UM bloco ---- */
P.startInterviewRound([b1.key]);
p.ok(P.state.view === "interview" && P.state.interviewRound.length === 1,
     "a rodada traz só o bloco escolhido");
P.campo("interview-input").value = "   ";
P.submitInterviewBlock();
p.ok(P.state.interviewEmptyWarn === true && !P.state.interviewRevealed[b1.key],
     "bloco vazio avisa em vez de revelar a resposta");

P.campo("interview-input").value = trocaUmaPalavra(b1.parte.en);
P.submitInterviewBlock();
const s1 = P.interviewBlockScore(P.state.interviewRound[0]);
p.ok(s1.acertos === b1.total - 1, `o bloco devia contar ${b1.total - 1} de ${b1.total} (deu ${s1.acertos})`);
const telaBloco = P.telaHtml();
p.ok(telaBloco.indexOf(`${s1.acertos} of ${s1.total} words came out`) !== -1,
     "a tela do bloco mostra a mesma conta da régua");
p.ok(telaBloco.indexOf("diff-miss") !== -1 && telaBloco.indexOf("diff-extra") !== -1,
     "a tela marca o que faltou e risca o que sobrou");

P.nextInterviewBlock();
p.ok(P.state.view === "interviewResults", "o último bloco da rodada leva ao resultado");
const esperado1 = P.interviewPct(s1.acertos, s1.total);
p.ok(P.state.interviewResults.overallPct === esperado1,
     `a régua devia dar ${esperado1}% (deu ${P.state.interviewResults.overallPct}%)`);
p.ok(P.telaHtml().indexOf(esperado1 + "%") !== -1, `a tela de resultado devia mostrar ${esperado1}%`);
p.ok(P.interviewPct(209, 210) === 99 && P.interviewPct(210, 210) === 100,
     "a porcentagem só chega a 100 quando o bloco sai inteiro");
/* o resultado de um bloco só oferece o próximo */
p.ok(P.telaHtml().indexOf("Next block") !== -1,
     "o resultado de um bloco oferece o próximo bloco a praticar");

/* ---- 4. o histórico é por bloco e MESCLA ---- */
let stats = P.loadInterviewStats();
p.ok(stats[b1.key] && stats[b1.key].pct === esperado1,
     `o histórico gravou ${esperado1}% no bloco praticado`);
p.ok(Object.keys(stats).length === 1, "só o bloco praticado entrou no histórico");

const b2 = blocos[1];
P.startInterviewRound([b2.key]);
P.campo("interview-input").value = b2.parte.en;          // este sai inteiro
P.submitInterviewBlock();
P.nextInterviewBlock();
stats = P.loadInterviewStats();
p.ok(stats[b2.key] && stats[b2.key].pct === 100, "o segundo bloco gravou 100%");
p.ok(stats[b1.key] && stats[b1.key].pct === esperado1,
     "praticar o segundo bloco NÃO apagou a nota do primeiro (o histórico mescla)");
p.ok(P.state.interviewResults.label.indexOf("ready") !== -1,
     "100% num bloco diz que ele está pronto");

/* a tela de escolha passa a mostrar as duas notas */
P.openInterviewBlocks();
const telaDepois = P.telaHtml();
p.ok(telaDepois.indexOf(esperado1 + "%") !== -1 && telaDepois.indexOf("100%") !== -1,
     "a escolha mostra a nota de cada bloco praticado");
p.ok((telaDepois.match(/trans-deck-score none/g) || []).length === blocos.length - 2,
     "os blocos nunca praticados aparecem sem nota");

/* ---- 5. praticar vários blocos encadeados ---- */
P.startInterviewRound([b1.key, b2.key]);
p.ok(P.state.interviewRound.length === 2, "dá para encadear mais de um bloco na mesma rodada");
p.ok(P.telaHtml().indexOf("Block 1 of 2 in this round") !== -1,
     "com mais de um bloco, a tela mostra o progresso da rodada");
P.campo("interview-input").value = b1.parte.en;
P.submitInterviewBlock();
P.nextInterviewBlock();
P.skipInterviewBlock();                                   // o segundo fica zerado
P.nextInterviewBlock();
const r = P.state.interviewResults;
p.ok(r.acertos === b1.total && r.total === b1.total + b2.total,
     `a rodada de dois blocos devia dar ${b1.total} de ${b1.total + b2.total} (deu ${r.acertos} de ${r.total})`);
p.ok(P.telaHtml().indexOf("Block by block") !== -1, "com dois blocos, o resultado abre o placar por bloco");
stats = P.loadInterviewStats();
p.ok(stats[b1.key].pct === 100 && stats[b2.key].pct === 0,
     "a rodada nova sobrescreve a nota dos blocos que ela praticou");

/* ---- 6. o card da tela inicial ---- */
const card = P.renderInterviewLandingCard();
p.ok(card.indexOf(`${blocos.length} blocks`) !== -1, "o card diz em quantos blocos a resposta foi dividida");
p.ok(card.indexOf("coming out word for word") !== -1,
     "o card mostra quantos blocos já saem inteiros");

/* ---- 7. o texto digitado não se perde nem vira HTML ---- */
P.startInterviewRound([b1.key]);
const rascunho = 'I said "hello" & <b>built</b> a dashboard';
P.saveInterviewDraft(rascunho);
P.campo("interview-input").value = rascunho;
P.requestExitInterview();      // abre o modal, e o render leva o campo embora
P.cancelExitInterview();       // volta para o bloco
p.ok(P.telaHtml().indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && P.telaHtml().indexOf("<b>built</b>") === -1,
     "o rascunho volta no campo depois do modal de saída, e escapado");

P.campo("interview-input").value = rascunho;
P.submitInterviewBlock();
const telaEscapada = P.telaHtml();
p.ok(telaEscapada.indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && telaEscapada.indexOf("<b>built</b>") === -1,
     "o texto digitado sai escapado também no diff");
p.ok(telaEscapada.indexOf("&amp;") !== -1, "o & do texto digitado sai escapado");

p.fim();
