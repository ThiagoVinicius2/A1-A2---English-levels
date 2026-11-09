/* Módulo "Job Interview": reproduzir a resposta padrão.

   O que este teste defende:
   1. A rodada é SÓ das perguntas com resposta padrão escrita. Pergunta sem
      espelho não pode aparecer como exercício — não há o que comparar.
   2. Quem corrige é o corretor do módulo de tradução: "I am" vale por "I'm"
      de graça, resposta diferente é reprovada e typo conta como acerto.
   3. A porcentagem que a TELA mostra é a mesma da régua e a mesma que fica
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
p.ok(faltam.every(q => q.kind === "soon" && !q.partes),
     "as perguntas sem resposta padrão são 'soon' e não têm partes");

/* ---- 1. a correção da parte é a do módulo de tradução ---- */
const q1 = rodada[0];
const parte1 = q1.partes[0];
p.ok(A.interviewGradePart(parte1, parte1.en).level === "certo", "a própria parte é corrigida como certo");
p.ok(A.interviewGradePart(parte1, parte1.en.replace("I'm", "I am")).level === "certo",
     "a forma longa da contração vale igual (é o transNormalize fazendo o trabalho)");
p.ok(A.interviewGradePart(parte1, "Something completely different.").level === "diferente",
     "resposta diferente precisa ser reprovada — aqui existe gabarito");
p.ok(A.interviewGradePart(parte1, "").level === "vazio", "campo vazio não é veredito");
p.ok(A.interviewGradePart(parte1, q1.partes[1].en).level !== "certo",
     "a parte vizinha não pode ser aceita no lugar desta");
/* toda parte de toda pergunta da rodada: a própria resposta tem de passar */
rodada.forEach(q => q.partes.forEach((parte, i) =>
  p.ok(A.interviewGradePart(parte, parte.en).level === "certo",
       `${q.id} parte ${i + 1}: a própria resposta foi reprovada`)));

/* ---- 2. a rodada inteira, pelas funções de verdade ---- */
P.startInterview();
p.ok(P.state.view === "interview", "startInterview abre a tela da entrevista");
p.ok(P.state.interviewQuestions.length === rodada.length,
     `a rodada traz as ${rodada.length} perguntas prontas (trouxe ${P.state.interviewQuestions.length})`);

/* campo vazio avisa em vez de revelar a resposta */
P.campo("interview-input").value = "   ";
P.submitInterviewPart();
p.ok(P.state.interviewEmptyWarn === true && !P.state.interviewPartRevealed[q1.id][0],
     "parte vazia avisa em vez de revelar a resposta padrão");

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

const s = P.interviewScore(qEspelho);
p.ok(s.acertos === certas + 1 && s.total === qEspelho.partes.length,
     `a pergunta devia valer ${certas + 1} de ${qEspelho.partes.length} (o typo conta, o "não lembro" não) — deu ${s.acertos} de ${s.total}`);
p.ok(P.telaHtml().indexOf("The whole answer") !== -1,
     "a última parte mostra a resposta padrão inteira");

/* ---- 3. a nota, nas duas pontas ---- */
const esperado = P.pct(s.acertos, s.total);
P.nextInterviewPart();                               // última parte da última pergunta: fecha
p.ok(P.state.view === "interviewResults", "a última parte leva à tela de resultado");
p.ok(P.state.interviewResults.overallPct === esperado,
     `a régua devia dar ${esperado}% (deu ${P.state.interviewResults.overallPct}%)`);

const tela = P.telaHtml();
p.ok(tela.indexOf(esperado + "%") !== -1, `a tela de resultado devia mostrar ${esperado}%`);
p.ok(tela.indexOf(`${s.acertos} of ${s.total} parts reproduced`) !== -1,
     `a tela devia mostrar "${s.acertos} of ${s.total} parts reproduced"`);
p.ok(tela.indexOf("still without your standard") !== -1,
     "a tela de resultado lembra quantas perguntas ainda não têm resposta padrão");
/* as partes erradas vão para a revisão, que é o que vale reler */
p.ok(tela.indexOf("Parts to go over again") !== -1, "a revisão lista as partes que escaparam");

const guardado = JSON.parse(P.localStorage.getItem(P.INTERVIEW_STORAGE_KEY));
p.ok(guardado && guardado.overall === esperado,
     `o histórico devia gravar ${esperado}% (gravou ${guardado && guardado.overall})`);
p.ok(guardado.acertos === s.acertos && guardado.total === s.total,
     "o histórico guarda a mesma fração da tela");

/* ---- 4. o card da tela inicial ---- */
const card = P.renderInterviewLandingCard();
p.ok(card.indexOf(esperado + "%") !== -1, "o card mostra a porcentagem da última rodada");
p.ok(card.indexOf(`${rodada.length} of ${A.INTERVIEW_QUESTIONS.length}`) !== -1,
     "o card diz quantas perguntas já têm resposta padrão");

/* ---- 5. pular tudo dá 0% ---- */
P.startInterview();
P.skipInterviewQuestion();
if (P.state.view === "interview") P.finishInterview();
p.ok(P.state.interviewResults.overallPct === 0, "pular a pergunta inteira dá 0%");
p.ok(P.state.interviewResults.total === qEspelho.partes.length,
     "pular não tira as partes do denominador");

/* ---- 6. o texto digitado não se perde nem vira HTML ---- */
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
