/* Módulo "Job Interview": reproduzir a resposta padrão, bloco a bloco.

   O que este teste defende:
   1. A rodada é SÓ das perguntas com resposta padrão escrita.
   2. A nota é por PALAVRA, não um veredito só. Mesmo num bloco de 40
      palavras, "certo ou errado" não diria nada — uma palavra trocada
      derrubaria tudo. Quem conta é o transDiffWords() do módulo de tradução.
   3. As palavras dos blocos somam a resposta inteira: a tela do bloco, a
      soma da pergunta e o histórico têm de falar do mesmo total.
   4. A porcentagem que a TELA mostra é a mesma da régua e a mesma que fica
      gravada. É o bug que o módulo da conversa teve (7% com tudo certo), e ele
      só aparece quando o teste olha a tela, não só a função. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA ENTREVISTA");

const rodada = A.getInterviewRound();
const faltam = A.INTERVIEW_QUESTIONS.filter(q => !A.interviewIsMirror(q));
p.ok(rodada.length >= 1, "existe ao menos uma pergunta com resposta padrão");
p.ok(rodada.every(A.interviewIsMirror), "só entram na rodada perguntas com resposta padrão");
p.ok(faltam.every(q => q.kind === "soon" && !q.partes), "as perguntas sem resposta padrão são 'soon' e não têm blocos");

/* ---- 1. os blocos cobrem a resposta inteira ---- */
const q1 = rodada[0];
p.ok(q1.partes.length >= 4 && q1.partes.length <= 6,
     `a resposta vem em ${q1.partes.length} blocos — o combinado é em torno de cinco`);
p.ok(A.interviewTotalWords(q1) === A.interviewCheckText(q1.modelo, "").total,
     "a soma das palavras dos blocos é a resposta inteira");
p.ok(q1.partes.every(parte => parte.topic && !parte.pt),
     "cada bloco tem tópico em inglês e nenhuma deixa em português");

/* ---- 2. a contagem palavra por palavra, dentro de um bloco ---- */
const bloco = q1.partes[0];
const inteiro = A.interviewCheckText(bloco.en, bloco.en);
p.ok(inteiro.acertos === inteiro.total && inteiro.sobraram === 0,
     `o próprio bloco devia contar ${inteiro.total} de ${inteiro.total} (deu ${inteiro.acertos})`);
const vazio = A.interviewCheckText(bloco.en, "");
p.ok(vazio.acertos === 0 && vazio.total === inteiro.total, "campo vazio conta zero palavras");
const trocada = A.interviewCheckText(bloco.en, bloco.en.replace("technology", "tech"));
p.ok(trocada.acertos === inteiro.total - 1 && trocada.sobraram === 1,
     `trocar uma palavra devia custar exatamente uma (deu ${inteiro.total - trocada.acertos})`);
/* o porquê da régua por palavra: o veredito inteiro não distingue uma palavra
   trocada de uma resposta inventada — as duas dão "diferente" */
p.ok(A.gradeTransAnswer({ en: bloco.en }, bloco.en.replace("technology", "tech")).level === "diferente" &&
     A.gradeTransAnswer({ en: bloco.en }, "Something else entirely.").level === "diferente",
     "o veredito inteiro não serve de nota — é por isso que a conta é por palavra");
/* a contração por extenso custa uma palavra, de propósito, sem desalinhar o resto */
const contraida = A.interviewCheckText(bloco.en, bloco.en.replace("I'm a Data", "I am a Data"));
p.ok(contraida.acertos >= inteiro.total - 2 && contraida.acertos < inteiro.total,
     "a contração por extenso custa uma palavra e não desalinha o resto do diff");

/* ---- 3. a rodada inteira, pelas funções de verdade ---- */
P.startInterview();
p.ok(P.state.view === "interview", "startInterview abre a tela da entrevista");
p.ok(P.state.interviewPartIndex === 0, "a rodada abre no primeiro bloco");

/* campo vazio avisa em vez de revelar a resposta */
P.campo("interview-input").value = "   ";
P.submitInterviewPart();
p.ok(P.state.interviewEmptyWarn === true && !P.state.interviewPartRevealed[q1.id][0],
     "bloco vazio avisa em vez de revelar a resposta padrão");

/* percorre os blocos: o 1º com uma palavra trocada, o 3º pulado, os outros certos */
const qEspelho = P.state.interviewQuestions[0];
let esperadoAcertos = 0;
qEspelho.partes.forEach((parte, i) => {
  const t = A.interviewPartTotal(parte);
  if (i === 0) {
    P.campo("interview-input").value = parte.en.replace("technology", "tech");
    P.submitInterviewPart();
    esperadoAcertos += t - 1;
  } else if (i === 2) {
    P.skipInterviewPart();                       // não lembro: zero, e o total fica
  } else {
    P.campo("interview-input").value = parte.en;
    P.submitInterviewPart();
    esperadoAcertos += t;
  }
  const naTela = P.telaHtml();
  p.ok(naTela.indexOf("Block " + (i + 1) + " of " + qEspelho.partes.length) !== -1,
       `a tela mostra "Block ${i + 1} of ${qEspelho.partes.length}"`);
  if (i < qEspelho.partes.length - 1) P.nextInterviewPart();
});

const s = P.interviewScore(qEspelho);
p.ok(s.acertos === esperadoAcertos && s.total === A.interviewTotalWords(qEspelho),
     `a régua devia dar ${esperadoAcertos} de ${A.interviewTotalWords(qEspelho)} (deu ${s.acertos} de ${s.total})`);
p.ok(P.interviewPartScore(qEspelho, 2).acertos === 0,
     "o bloco pulado conta zero");
p.ok(P.interviewPartScore(qEspelho, 2).total === A.interviewPartTotal(qEspelho.partes[2]),
     "o bloco pulado mantém as palavras dele no denominador");
p.ok(P.telaHtml().indexOf("The whole answer") !== -1,
     "o último bloco mostra a resposta inteira");

/* ---- 4. a nota, nas duas pontas ---- */
const esperado = P.interviewPct(s.acertos, s.total);
/* 209 de 210 não pode virar 100%: só dá 100 quando não falta nada */
p.ok(P.interviewPct(209, 210) === 99 && P.interviewPct(210, 210) === 100,
     "a porcentagem só chega a 100 quando a resposta sai inteira");
P.nextInterviewPart();                           // fecha a rodada
p.ok(P.state.view === "interviewResults", "o último bloco leva à tela de resultado");
p.ok(P.state.interviewResults.overallPct === esperado,
     `a régua devia dar ${esperado}% (deu ${P.state.interviewResults.overallPct}%)`);

const tela = P.telaHtml();
p.ok(tela.indexOf(esperado + "%") !== -1, `a tela de resultado devia mostrar ${esperado}%`);
p.ok(tela.indexOf(`${s.acertos} of ${s.total} words reproduced`) !== -1,
     `a tela devia mostrar "${s.acertos} of ${s.total} words reproduced"`);
p.ok(tela.indexOf("Block by block") !== -1, "o resultado abre o placar por bloco");
qEspelho.partes.forEach(parte =>
  p.ok(tela.indexOf(parte.topic) !== -1, `o placar por bloco cita "${parte.topic}"`));
p.ok(tela.indexOf("to read out loud") !== -1, "o resultado traz a resposta inteira para ler em voz alta");

const guardado = JSON.parse(P.localStorage.getItem(P.INTERVIEW_STORAGE_KEY));
p.ok(guardado && guardado.overall === esperado,
     `o histórico devia gravar ${esperado}% (gravou ${guardado && guardado.overall})`);
p.ok(guardado.acertos === s.acertos && guardado.total === s.total,
     "o histórico guarda a mesma fração da tela");
p.ok(guardado.perguntas[qEspelho.id].blocos.length === qEspelho.partes.length,
     "o histórico guarda a fração de cada bloco");

/* ---- 5. o card da tela inicial ---- */
const card = P.renderInterviewLandingCard();
p.ok(card.indexOf(esperado + "%") !== -1, "o card mostra a porcentagem da última rodada");
p.ok(card.indexOf(`${rodada.length} of ${A.INTERVIEW_QUESTIONS.length}`) !== -1,
     "o card diz quantas perguntas já têm resposta padrão");
p.ok(card.indexOf(`${A.interviewTotalWords(q1)} words`) !== -1,
     "o card diz quantas palavras há para reproduzir");

/* ---- 6. pular a pergunta inteira dá 0% e mantém o total ---- */
P.startInterview();
P.skipInterviewQuestion();
if (P.state.view === "interview") P.finishInterview();
p.ok(P.state.interviewResults.overallPct === 0, "pular a pergunta inteira dá 0%");
p.ok(P.state.interviewResults.total === A.interviewTotalWords(q1),
     "pular não tira palavras do denominador");

/* ---- 7. o texto digitado não se perde nem vira HTML ---- */
P.startInterview();
const rascunho = 'I said "hello" & <b>built</b> a dashboard';
P.saveInterviewDraft(rascunho);
P.campo("interview-input").value = rascunho;
P.requestExitInterview();      // abre o modal, e o render leva o campo embora
P.cancelExitInterview();       // volta para o bloco
p.ok(P.telaHtml().indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && P.telaHtml().indexOf("<b>built</b>") === -1,
     "o rascunho volta no campo depois do modal de saída, e escapado");

P.campo("interview-input").value = rascunho;
P.submitInterviewPart();
const telaBloco = P.telaHtml();
p.ok(telaBloco.indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && telaBloco.indexOf("<b>built</b>") === -1,
     "o texto digitado sai escapado também no diff do bloco");
p.ok(telaBloco.indexOf("&amp;") !== -1, "o & do texto digitado sai escapado");

p.fim();
