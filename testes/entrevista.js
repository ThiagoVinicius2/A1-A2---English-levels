/* Módulo "Job Interview": duas formas de pergunta e uma régua só por pergunta.

   O que este teste defende:
   1. Na pergunta-espelho, quem corrige é o corretor do módulo de tradução —
      "I am" tem de valer por "I'm" de graça, e a parte certa tem de contar.
   2. A nota do módulo é a MÉDIA das porcentagens das perguntas, não a soma das
      unidades: a pergunta-espelho tem 13 partes e as abertas têm 4 pontos, e
      somar unidade com unidade faria a primeira valer três vezes as outras.
   3. A porcentagem que a TELA mostra é a mesma da régua e a mesma que fica
      gravada. É o bug que o módulo da conversa teve (7% com tudo certo), e ele
      só aparece quando o teste olha a tela, não só a função. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA ENTREVISTA");

const espelho = A.INTERVIEW_QUESTIONS.filter(A.interviewIsMirror);
const abertas = A.INTERVIEW_QUESTIONS.filter(q => !A.interviewIsMirror(q));
p.ok(espelho.length >= 1, "existe ao menos uma pergunta com resposta padrão");
p.ok(abertas.length >= 1, "existe ao menos uma pergunta aberta");

/* ---- 1. contagem de palavras ---- */
[["", 0], ["   ", 0], ["one", 1], ["  two   words ", 2], ["a\nb\tc", 3]]
  .forEach(([texto, n]) =>
    p.ok(A.interviewWordCount(texto) === n, `interviewWordCount(${JSON.stringify(texto)}) devia ser ${n}`));

/* ---- 2. a correção da parte é a do módulo de tradução ---- */
const q1 = espelho[0];
const parte1 = q1.partes[0];
p.ok(A.interviewGradePart(parte1, parte1.en).level === "certo", "a própria parte é corrigida como certo");
p.ok(A.interviewGradePart(parte1, parte1.en.replace("I'm", "I am")).level === "certo",
     "a forma longa da contração vale igual (é o transNormalize fazendo o trabalho)");
p.ok(A.interviewGradePart(parte1, "Something completely different.").level === "diferente",
     "resposta diferente precisa ser reprovada — aqui existe gabarito");
p.ok(A.interviewGradePart(parte1, "").level === "vazio", "campo vazio não é veredito");
/* o espelho é espelho: a parte seguinte não pode passar no lugar desta */
p.ok(A.interviewGradePart(parte1, q1.partes[1].en).level !== "certo",
     "a parte vizinha não pode ser aceita no lugar desta");

/* ---- 3. detecção de bloco nas perguntas abertas ---- */
const qa = abertas[0];
const achou = (q, texto, frase) => A.interviewPhrasesFound(q, texto).filter(b => b.frase === frase)[0].achou;
p.ok(achou(qa, qa.frases[0] + " something", qa.frases[0]), "o bloco é achado no texto digitado");
p.ok(!achou(qa, "nothing like that here", qa.frases[0]), "bloco ausente não pode ser marcado como achado");
p.ok(abertas.every(q => A.interviewPhrasesFound(q, q.modelo).some(b => b.achou)),
     "a resposta modelo de cada pergunta aberta contém ao menos um dos seus blocos");

/* ---- 4. a rodada inteira, pelas funções de verdade ---- */
P.startInterview();
p.ok(P.state.view === "interview", "startInterview abre a tela da entrevista");
p.ok(P.interviewIsMirror(P.interviewCurrentQuestion()), "a entrevista abre na pergunta-espelho");

/* campo vazio avisa em vez de revelar a resposta */
P.campo("interview-input").value = "   ";
P.submitInterviewPart();
p.ok(P.state.interviewEmptyWarn === true && !P.state.interviewPartRevealed[q1.id][0],
     "parte vazia avisa em vez de revelar a resposta padrão");

/* 10 das 13 partes certas (uma delas escrita na forma longa), 1 typo, 2 "não lembro" */
const qEspelho = P.state.interviewQuestions[0];
const typo = t => t.slice(0, 3) + t[3] + t.slice(3);   // uma letra dobrada
let certas = 0;
qEspelho.partes.forEach((parte, i) => {
  if (i === 10) {                                   // typo: conta como acerto
    P.campo("interview-input").value = typo(parte.en);
    P.submitInterviewPart();
  } else if (i === 11 || i === 12) {                // não lembro: não conta
    P.skipInterviewPart();
  } else {
    P.campo("interview-input").value = i === 0 ? parte.en.replace("I'm", "I am") : parte.en;
    P.submitInterviewPart();
    certas++;
  }
  if (i < qEspelho.partes.length - 1) P.nextInterviewPart();
});
const notas = P.state.interviewPartGrades[qEspelho.id];
p.ok(notas.filter(n => n === "certo").length === certas,
     `as ${certas} partes escritas certas viraram "certo" (deu ${notas.filter(n => n === "certo").length})`);
p.ok(notas[10] === "quase", `a parte com typo devia virar "quase" (deu "${notas[10]}")`);
p.ok(notas[11] === "naoLembro" && notas[12] === "naoLembro", "as duas puladas viraram naoLembro");

const sEspelho = P.interviewScore(qEspelho);
p.ok(sEspelho.acertos === certas + 1 && sEspelho.total === qEspelho.partes.length,
     `a pergunta-espelho devia valer ${certas + 1} de ${qEspelho.partes.length} (o typo conta, o "não lembro" não) — deu ${sEspelho.acertos} de ${sEspelho.total}`);

/* a última parte mostra a resposta inteira, que é o fecho da pergunta */
p.ok(P.telaHtml().indexOf("The whole answer") !== -1,
     "a última parte mostra a resposta padrão inteira");

/* ---- 5. as perguntas abertas, com checklist ---- */
P.nextInterviewPart();                               // sai da pergunta-espelho
const marcados = [2, 0, 1, 1, 1];                    // a segunda aberta é pulada
P.state.interviewQuestions.slice(1).forEach((q, k) => {
  p.ok(!P.interviewIsMirror(q), `${q.id}: é pergunta aberta`);
  if (marcados[k] === 0) {
    P.skipInterviewQuestion();
  } else {
    P.campo("interview-input").value = q.modelo;
    P.submitInterviewAnswer();
    for (let i = 0; i < marcados[k]; i++) P.toggleInterviewPoint(i);
  }
  if (k < 4) P.nextInterviewQuestion();
});
P.toggleInterviewPoint(0);
P.toggleInterviewPoint(0);                           // marca e desmarca: tem de alternar
p.ok(P.interviewScore(P.state.interviewQuestions[5]).acertos === marcados[4],
     "clicar duas vezes no mesmo ponto desmarca");

/* ---- 6. a nota: média das perguntas, nas duas pontas ---- */
const esperado = Math.round(
  P.state.interviewQuestions.reduce((t, q) => {
    const s = P.interviewScore(q);
    return t + P.pct(s.acertos, s.total);
  }, 0) / P.state.interviewQuestions.length);

P.nextInterviewQuestion();                           // última pergunta: fecha a rodada
p.ok(P.state.view === "interviewResults", "a última pergunta leva à tela de resultado");
p.ok(P.state.interviewResults.overallPct === esperado,
     `a régua devia dar ${esperado}% (deu ${P.state.interviewResults.overallPct}%)`);

const tela = P.telaHtml();
p.ok(tela.indexOf(esperado + "%") !== -1, `a tela de resultado devia mostrar ${esperado}%`);
p.ok(tela.indexOf(`${sEspelho.acertos}/${sEspelho.total}`) !== -1,
     `a tela devia mostrar a fração da pergunta-espelho (${sEspelho.acertos}/${sEspelho.total})`);
p.ok(tela.indexOf("Average across the") !== -1,
     "a tela diz que a nota é a média das perguntas, senão a soma parece errada");

const guardado = JSON.parse(P.localStorage.getItem(P.INTERVIEW_STORAGE_KEY));
p.ok(guardado && guardado.overall === esperado,
     `o histórico devia gravar ${esperado}% (gravou ${guardado && guardado.overall})`);
p.ok(guardado.perguntas[qEspelho.id].acertos === sEspelho.acertos &&
     guardado.perguntas[qEspelho.id].kind === "mirror",
     "o histórico guarda a fração da pergunta-espelho e o kind dela");

/* a média é mesmo média: a pergunta-espelho (13 partes) não pode pesar mais
   que uma aberta (4 pontos) */
const soma = P.state.interviewQuestions.reduce((t, q) => {
  const s = P.interviewScore(q); return { a: t.a + s.acertos, b: t.b + s.total };
}, { a: 0, b: 0 });
p.ok(P.pct(soma.a, soma.b) !== esperado || soma.b === 0,
     "a nota não pode ser a soma das unidades (seria a pergunta-espelho pesando três vezes)");

/* ---- 7. pular tudo dá 0% ---- */
P.startInterview();
const qs = P.state.interviewQuestions;
qs.forEach((q, i) => {
  P.skipInterviewQuestion();                         // na espelho, marca todas as partes
  if (P.state.view === "interview" && P.state.interviewIndex === i && i < qs.length - 1) P.nextInterviewQuestion();
});
if (P.state.view === "interview") P.finishInterview();
p.ok(P.state.interviewResults.overallPct === 0, "pular todas as perguntas dá 0%");

/* ---- 8. o texto digitado não se perde nem vira HTML ---- */
P.startInterview();
const rascunho = 'I said "hello" & <b>built</b> a dashboard';
P.saveInterviewDraft(rascunho);
P.campo("interview-input").value = rascunho;
P.requestExitInterview();      // abre o modal, e o render leva o campo embora
P.cancelExitInterview();       // volta para a pergunta
p.ok(P.telaHtml().indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && P.telaHtml().indexOf("<b>built</b>") === -1,
     "o rascunho volta no campo depois do modal de saída, e escapado");

P.campo("interview-input").value = rascunho;
P.submitInterviewPart();
const telaParte = P.telaHtml();
p.ok(telaParte.indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && telaParte.indexOf("<b>built</b>") === -1,
     "o texto digitado sai escapado também no diff da parte");
p.ok(telaParte.indexOf("&amp;") !== -1, "o & do texto digitado sai escapado");

p.fim();
