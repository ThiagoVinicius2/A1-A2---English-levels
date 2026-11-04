/* Módulo "Job Interview": a régua é o checklist, e ela precisa valer igual nas
   duas pontas — a tela de resultado e o que fica gravado.

   É o mesmo bug que o módulo da conversa teve: lá o resumo da prática comparava
   a resposta digitada com q.correct e devolvia 7% com tudo certo. Aqui a régua
   é interviewScore(), e quem a usa é o finishInterview(); este teste dirige o
   módulo pelas funções de verdade (campo, submit, checklist, next) e confere a
   porcentagem que a TELA mostra, não só a que a régua calcula. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA ENTREVISTA");

/* ---- 1. contagem de palavras ---- */
[["", 0], ["   ", 0], ["one", 1], ["  two   words ", 2], ["a\nb\tc", 3]]
  .forEach(([texto, n]) =>
    p.ok(A.interviewWordCount(texto) === n, `interviewWordCount(${JSON.stringify(texto)}) devia ser ${n}`));

/* ---- 2. detecção de bloco: quem normaliza é o corretor da tradução ----
   Reusar o transNormalize() é o que faz a contração valer de graça. Se alguém
   trocar por uma comparação de string crua, estes casos falham. */
const q1 = A.INTERVIEW_QUESTIONS[0];
const achou = (q, texto, frase) => A.interviewPhrasesFound(q, texto).filter(b => b.frase === frase)[0].achou;

p.ok(achou(q1, "I've been working with data for six years.", "I've been working with data for"),
     "o bloco precisa ser achado na forma contraída");
p.ok(achou(q1, "I have been working with data for six years.", "I've been working with data for"),
     "o bloco contraído precisa ser achado na forma longa (é o transNormalize fazendo o trabalho)");
p.ok(achou(q1, "right now i'm an analyst", "Right now I'm"),
     "a detecção precisa ignorar caixa e pontuação");
p.ok(!achou(q1, "I work with dashboards.", "My main tools are"),
     "bloco ausente não pode ser marcado como achado");
/* Palavra inteira, não substring: senão "I built" casaria dentro de "rebuilt"
   e o módulo diria que a pessoa usou um bloco que ela não usou. */
const q3 = A.INTERVIEW_QUESTIONS[2];
p.ok(!achou(q3, "Then I rebuilt the model in dbt.", "What I did was"),
     "a detecção não pode casar pedaço de palavra");
p.ok(A.INTERVIEW_QUESTIONS.every(q => A.interviewPhrasesFound(q, q.modelo).some(b => b.achou)),
     "a resposta modelo de cada pergunta precisa conter ao menos um dos seus próprios blocos");

/* ---- 3. a rodada inteira, pelas funções de verdade ---- */
function responder(texto, quantosPontos) {
  const q = P.state.interviewQuestions[P.state.interviewIndex];
  P.campo("interview-input").value = texto;
  P.submitInterviewAnswer();
  for (let i = 0; i < quantosPontos; i++) P.toggleInterviewPoint(i);
  return q;
}

P.startInterview();
p.ok(P.state.view === "interview", "startInterview abre a tela da entrevista");
p.ok(P.state.interviewQuestions.length === A.INTERVIEW_QUESTIONS.length,
     "a rodada traz todas as perguntas");
p.ok(P.state.interviewQuestions[0].id === A.INTERVIEW_QUESTIONS[0].id,
     "ordem fixa: a entrevista abre em 'Tell me about yourself'");

/* campo vazio não revela nada — avisa e espera */
P.campo("interview-input").value = "   ";
P.submitInterviewAnswer();
p.ok(P.state.interviewEmptyWarn === true && !P.state.interviewRevealed[P.state.interviewQuestions[0].id],
     "campo vazio avisa em vez de revelar a resposta modelo");

const marcados = [5, 2, 0, 1, 1, 1];   // a 3ª é pulada
const perguntas = P.state.interviewQuestions;
responder("I've been working with data for six years as an analyst.", marcados[0]);
p.ok(P.interviewScore(perguntas[0]).marcados === 5, "os 5 pontos marcados na 1ª pergunta contam 5");
P.toggleInterviewPoint(0);
p.ok(P.interviewScore(perguntas[0]).marcados === 4, "clicar de novo no mesmo ponto desmarca");
P.toggleInterviewPoint(0);

P.nextInterviewQuestion();
responder("What I'm looking for now is more engineering work.", marcados[1]);

P.nextInterviewQuestion();
P.skipInterviewQuestion();     // pular vale zero, mas os pontos continuam no total
p.ok(P.state.interviewRevealed[perguntas[2].id] && P.interviewScore(perguntas[2]).marcados === 0,
     "pergunta pulada fica revelada e vale zero ponto");

P.nextInterviewQuestion();
responder("I've used it for four years, almost every day.", marcados[3]);
P.nextInterviewQuestion();
responder("I'm looking for something in the range of X to Y.", marcados[4]);
P.nextInterviewQuestion();
responder("Yes, a couple. How is the data team organized today?", marcados[5]);

const totalPontos = perguntas.reduce((t, q) => t + q.pontos.length, 0);
const totalMarcados = marcados.reduce((a, b) => a + b, 0);
const esperado = P.pct(totalMarcados, totalPontos);

P.nextInterviewQuestion();     // último: fecha a rodada
p.ok(P.state.view === "interviewResults", "a última pergunta leva à tela de resultado");
p.ok(P.state.interviewResults.marcados === totalMarcados && P.state.interviewResults.total === totalPontos,
     `o resultado devia somar ${totalMarcados} de ${totalPontos} (deu ${P.state.interviewResults.marcados} de ${P.state.interviewResults.total})`);
p.ok(P.state.interviewResults.overallPct === esperado,
     `a régua devia dar ${esperado}% (deu ${P.state.interviewResults.overallPct}%)`);

/* A TELA, não só a régua: é a diferença que escondeu o bug dos 7% na conversa. */
const tela = P.telaHtml();
p.ok(tela.indexOf(esperado + "%") !== -1, `a tela de resultado devia mostrar ${esperado}%`);
p.ok(tela.indexOf(`${totalMarcados} of ${totalPontos} checklist points`) !== -1,
     `a tela devia mostrar "${totalMarcados} of ${totalPontos} checklist points"`);
p.ok(tela.indexOf("5/5") !== -1 && tela.indexOf("2/4") !== -1,
     "a tela devia mostrar a fração por pergunta (5/5 na 1ª, 2/4 na 2ª)");
p.ok(P.state.interviewResults.respondidas === 5,
     `5 perguntas respondidas e uma pulada (deu ${P.state.interviewResults.respondidas})`);

/* o que fica gravado tem de bater com o que a tela mostrou */
const guardado = JSON.parse(P.localStorage.getItem(P.INTERVIEW_STORAGE_KEY));
p.ok(guardado && guardado.overall === esperado,
     `o histórico devia gravar ${esperado}% (gravou ${guardado && guardado.overall})`);
p.ok(guardado.perguntas[perguntas[0].id].pct === 100 && guardado.perguntas[perguntas[2].id].pct === 0,
     "o histórico grava 100% na pergunta com tudo marcado e 0% na pulada");
p.ok(P.renderInterviewLandingCard().indexOf(esperado + "%") !== -1,
     "o card da página inicial mostra a porcentagem da última rodada");

/* ---- 3b. o contador de palavras anda enquanto se digita ----
   Ele é atualizado direto no nó, sem render(): se alguém trocar por render(),
   o campo e o cursor somem a cada tecla. */
P.startInterview();
P.saveInterviewDraft("one two three");
p.ok(P.campo("interview-count").textContent.indexOf("3 words") === 0,
     `o contador devia mostrar "3 words" (mostrou "${P.campo("interview-count").textContent}")`);
P.saveInterviewDraft("one");
p.ok(P.campo("interview-count").textContent.indexOf("1 word ") === 0,
     "uma palavra só vira singular no contador");

/* ---- 4. pular tudo não melhora a nota ---- */
P.startInterview();
P.state.interviewQuestions.forEach((q, i) => {
  P.skipInterviewQuestion();
  if (i < P.state.interviewQuestions.length - 1) P.nextInterviewQuestion();
});
P.finishInterview();
p.ok(P.state.interviewResults.overallPct === 0, "pular todas as perguntas dá 0%");

/* ---- 5. o texto digitado não pode ser perdido nem virar HTML ----
   São as duas regras dos campos do projeto, e aqui o campo é um parágrafo
   inteiro: perder o rascunho num render() seria grave. */
P.startInterview();
const rascunho = 'I said "hello" & <b>built</b> a dashboard';
P.saveInterviewDraft(rascunho);
P.campo("interview-input").value = rascunho;
P.requestExitInterview();      // abre o modal, e o render leva o campo embora
P.cancelExitInterview();       // volta para a pergunta
p.ok(P.telaHtml().indexOf("I said &quot;hello&quot;") !== -1 ||
     P.telaHtml().indexOf('I said "hello"') !== -1,
     "o rascunho precisa voltar no campo depois de abrir e fechar o modal de saída");
p.ok(P.telaHtml().indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && P.telaHtml().indexOf("<b>built</b>") === -1,
     "o texto digitado precisa ser escapado no campo (nunca virar HTML)");

P.campo("interview-input").value = rascunho;
P.submitInterviewAnswer();
const telaResposta = P.telaHtml();
p.ok(telaResposta.indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && telaResposta.indexOf("<b>built</b>") === -1,
     "o texto digitado precisa ser escapado também na resposta mostrada");
p.ok(telaResposta.indexOf("&amp;") !== -1, "o & do texto digitado precisa sair escapado");

p.fim();
