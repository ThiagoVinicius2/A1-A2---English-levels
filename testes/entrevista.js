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
      só aparece quando o teste olha a tela, não só a função.
   5. Cada pergunta é uma UNIDADE: tem os seus próprios blocos, e nem a escolha
      nem a rodada nem o "próximo bloco" podem atravessar de uma resposta para
      outra. É a mesma separação das unidades do módulo de tradução, e sem ela
      o bloco 1 de uma resposta apareceria no meio de outra. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA ENTREVISTA");

const perguntas = A.getInterviewRound();
const q1 = perguntas[0];
const todosBlocos = A.getInterviewBlocks();
const blocos = A.getInterviewBlocks(q1.id);   // o teste trabalha dentro da 1ª resposta
const faltam = A.INTERVIEW_QUESTIONS.filter(q => !A.interviewIsMirror(q));
p.ok(blocos.length >= 4, `a resposta rende ${blocos.length} blocos praticáveis`);
p.ok(todosBlocos.every(b => b.key.indexOf(b.q.id + "-b") === 0),
     "a chave do bloco é prefixada pela pergunta (o bloco 1 de outra resposta não é este)");
p.ok(faltam.every(q => !q.partes), "pergunta sem resposta padrão não rende bloco nenhum");
/* por pergunta, e não no total: cada resposta tem o seu próprio denominador */
perguntas.forEach(q => {
  const seus = A.getInterviewBlocks(q.id);
  p.ok(seus.length > 0 && seus.every(b => b.q.id === q.id),
       `${q.id}: getInterviewBlocks(id) devolve só os blocos dessa pergunta`);
  p.ok(seus.reduce((t, b) => t + b.total, 0) === A.interviewTotalWords(q),
       `${q.id}: as palavras dos blocos somam a resposta inteira`);
});

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
/* O veredito inteiro do corretor não distingue uma palavra trocada de uma
   resposta inventada: as duas dão "diferente", e é por isso que a nota deste
   módulo é por palavra. A frase é sintética de propósito — rodar isto sobre o
   bloco do dono dava "quase" quando o bloco era curto, porque a tolerância de
   digitação engole uma palavra numa frase de doze. */
const sintetica = { en: "I build and maintain the data pipelines of the company." };
p.ok(A.gradeTransAnswer(sintetica, "I build and monitor the data pipelines of the company.").level === "diferente" &&
     A.gradeTransAnswer(sintetica, "Something else entirely.").level === "diferente",
     "o veredito inteiro não serve de nota — é por isso que a conta é por palavra");

/* ---- 2. a tela de escolha ---- */
P.openInterviewBlocks(q1.id);
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
/* A `funcao` orienta ANTES de escrever e não cita palavra da resposta; a
   `dica` cita de propósito, então só pode aparecer DEPOIS de conferir. Se
   trocarem a ordem, a tela entrega a resposta. */
const trecho = t => String(t).split(/[\u201c\u201d&<>]/)[0].trim().slice(0, 40);
const telaAntes = P.telaHtml();
if (b1.parte.funcao) {
  p.ok(telaAntes.indexOf(trecho(b1.parte.funcao)) !== -1,
       "antes de escrever, a tela mostra a função do bloco");
}
if (b1.parte.dica) {
  p.ok(telaAntes.indexOf(trecho(b1.parte.dica)) === -1,
       "a dica NÃO pode aparecer antes de escrever — ela cita palavras da resposta");
}

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
if (b1.parte.dica) {
  p.ok(telaBloco.indexOf(trecho(b1.parte.dica)) !== -1,
       "depois de conferir, a tela mostra a dica de como dizer o bloco");
}

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
P.openInterviewBlocks(q1.id);
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
p.ok(card.indexOf(`${todosBlocos.length} blocks`) !== -1,
     "o card diz em quantos blocos as respostas foram divididas");
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

/* ---- 8. a pergunta é a UNIDADE do módulo ---- */
/* Esta seção fica no fim de propósito: ela pratica blocos de outra resposta, e
   isso grava histórico — as seções acima contam quantas chaves existem. */
P.openInterviewQuestions();
p.ok(P.state.view === "interviewQuestions", "o módulo abre na escolha da pergunta, não na dos blocos");
const telaPerguntas = P.telaHtml();
p.ok((telaPerguntas.match(/Open question/g) || []).length === perguntas.length,
     `a grade abre as ${perguntas.length} perguntas que já têm resposta padrão`);
p.ok((telaPerguntas.match(/No standard answer yet/g) || []).length === faltam.length,
     `as ${faltam.length} perguntas sem resposta padrão aparecem como o que falta escrever`);
perguntas.forEach(q => p.ok(telaPerguntas.indexOf(`${A.interviewTotalWords(q)} words to reproduce`) !== -1,
     `${q.id}: a grade diz o tamanho da resposta`));

const q2 = perguntas[1];
if (q2) {
  const blocos2 = A.getInterviewBlocks(q2.id);
  P.openInterviewBlocks(q2.id);
  p.ok(P.state.view === "interviewBlocks", "abrir uma pergunta leva à escolha dos blocos dela");
  const tela2 = P.telaHtml();
  blocos2.forEach(b => p.ok(tela2.indexOf(b.parte.topic) !== -1,
       `a escolha de ${q2.id} lista "${b.parte.topic}"`));
  blocos.forEach(b => p.ok(tela2.indexOf(b.parte.topic) === -1,
       `a escolha de ${q2.id} NÃO lista o bloco "${b.parte.topic}", que é de outra resposta`));

  /* marcar todos marca os desta pergunta, não os nove */
  P.selectAllInterviewBlocks(true);
  p.ok(P.state.interviewBlockSelection.length === blocos2.length,
       "marcar todos marca os blocos da pergunta aberta, não os de todas");
  P.selectAllInterviewBlocks(false);

  /* e uma rodada com chave das duas respostas fica na resposta da primeira */
  P.startInterviewRound([blocos2[0].key, blocos[0].key]);
  p.ok(P.state.interviewRound.length === 1 && P.state.interviewRound[0].key === blocos2[0].key,
       "a rodada não mistura blocos de duas respostas");
  P.campo("interview-input").value = blocos2[0].parte.en;
  P.submitInterviewBlock();
  P.nextInterviewBlock();
  p.ok(P.state.view === "interviewResults", "a rodada da segunda resposta chega ao resultado");
  const telaR = P.telaHtml();
  p.ok(telaR.indexOf(`Next block — ${blocos2[1].parte.topic}`) !== -1,
       "o próximo bloco oferecido é da MESMA resposta");
  blocos.forEach(b => p.ok(telaR.indexOf(`Next block — ${b.parte.topic}`) === -1,
       "o resultado nunca manda para o bloco de outra resposta"));

  /* o histórico separa as duas: a nota da primeira resposta continua lá */
  const statsFim = P.loadInterviewStats();
  p.ok(statsFim[blocos2[0].key] && statsFim[blocos2[0].key].pct === 100,
       "o bloco da segunda resposta gravou a sua nota");
  p.ok(statsFim[blocos[0].key] !== undefined,
       "praticar a segunda resposta NÃO apagou o histórico da primeira");
  p.ok(P.interviewQuestionProgress(q2.id).praticados === 1,
       "o progresso da pergunta conta só os blocos dela já praticados");
}

p.fim();
