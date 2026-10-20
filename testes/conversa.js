/* Módulo "Erros da Conversa Real": a trava da resposta curta e a régua da
   porcentagem, que precisa ser a MESMA no teste e na prática dirigida.

   O bug do 11% nasceu aqui: o resumo da prática comparava
   `convExerciseAnswers[q.id] === q.correct`, que estava certo quando o módulo
   era só múltipla escolha. Numa questão digitada a resposta guardada é o TEXTO
   e `q.correct` nem existe, então toda digitada contava como errada. Contar
   quantos exercícios foram respondidos NÃO pega isso — só conferir a
   porcentagem pega. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA CONVERSA");

/* ---- 1. resposta curta é exata: a tolerância de typo não pode engolir o
     erro que a questão testa ("follow" por "follows", "in" por "on") ---- */
const digitadas = A.CONV_TEST_QUESTIONS.concat(A.CONV_PRACTICE_QUESTIONS).filter(q => q.kind === "write");
const curtas = digitadas.filter(q => P.convRespostaCurta(q));
p.ok(curtas.length > 0, "existe questão digitada de resposta curta no banco");
p.nota(`questões digitadas: ${digitadas.length} (curtas e exatas: ${curtas.length} | frase inteira: ${digitadas.length - curtas.length})`);

/* para toda resposta curta, mexer numa letra tem de reprovar */
let nMexidas = 0;
curtas.forEach(q => {
  const base = String(q.answer).trim();
  const mexidas = [];
  if (/s$/i.test(base)) mexidas.push(base.replace(/s$/i, ""));      // follows -> follow
  else mexidas.push(base + "s");                                     // follow  -> follows
  if (base.length > 3) mexidas.push(base.slice(0, -1) + (base.slice(-1) === "e" ? "a" : "e"));
  mexidas.forEach(m => {
    if (A.transNormalize(m) === A.transNormalize(base)) return;       // virou a mesma coisa, não serve de caso
    if ((q.accept || []).some(a => A.transNormalize(a) === A.transNormalize(m))) return;  // é aceita de propósito
    nMexidas++;
    p.ok(P.convGradeWritten(q, m).level !== "certo" && P.convGradeWritten(q, m).level !== "quase",
         `${q.id}: "${m}" passou por "${base}" — a trava da resposta curta não pegou`);
  });
});
p.nota(`erros de uma letra conferidos em resposta curta: ${nMexidas}`);

/* e os casos documentados, que são a razão da trava existir */
[["follow", "follows"], ["follows", "follow"], ["in", "on"], ["on", "in"], ["at", "in"]].forEach(([a, b]) => {
  const q = { id: "x", kind: "write", answer: a };
  p.ok(P.convGradeWritten(q, b).level === "diferente", `resposta curta: "${b}" não pode passar por "${a}"`);
});
/* em frase inteira a tolerância continua valendo — é onde ela serve */
const frase = { id: "y", kind: "write", answer: "I am good at playing the guitar." };
p.ok(P.convGradeWritten(frase, "I am good at playing the guitarr.").level === "quase",
     "em frase inteira, um typo continua sendo 'quase'");

/* ---- 2. toda resposta do banco é corrigida como certa pelo próprio corretor ---- */
digitadas.forEach(q => {
  p.ok(P.convGradeWritten(q, q.answer).level === "certo", `${q.id}: a própria answer foi reprovada ("${q.answer}")`);
  (q.accept || []).forEach(a =>
    p.ok(P.convGradeWritten(q, a).level === "certo", `${q.id}: accept reprovado ("${a}")`));
});

/* ---- 3. a MESMA fração nas duas telas ----
   Um ciclo de certo / certo / typo / autoavaliação / erro, aplicado às duas
   telas, tem de dar a mesma porcentagem — e as linhas por padrão têm de
   somar o total. */
function responder(questoes, grava) {
  /* devolve quantos deveriam contar como acerto */
  let esperados = 0;
  questoes.forEach((q, i) => {
    const ciclo = i % 5;
    if (!P.convIsWrite(q)) {                       // múltipla escolha: acerta
      grava(q, q.correct, undefined); esperados++; return;
    }
    const resp = String(q.answer);
    if (ciclo === 0 || ciclo === 1) { grava(q, resp, "certo"); esperados++; }
    else if (ciclo === 2) {                        // typo: só conta em frase inteira
      const typo = P.convRespostaCurta(q) ? resp : resp.replace(/\s/, "  ") + "e";
      const nota = P.convGradeWritten(q, typo).level;
      grava(q, typo, nota);
      if (nota === "certo" || nota === "quase") esperados++;
    }
    else if (ciclo === 3) { grava(q, "something else entirely", "aceitoManual"); esperados++; }
    else { grava(q, "something else entirely", "diferente"); }
  });
  return esperados;
}

/* teste */
P.startConvTest();
const qsTeste = P.state.convTestQuestions;
const espTeste = responder(qsTeste, (q, resp, nota) => {
  P.state.convTestAnswers[q.id] = resp;
  P.state.convTestRevealed[q.id] = true;
  if (nota) P.state.convTestGrades[q.id] = nota;
});
P.finishConvTest();
const r = P.state.convResults;
p.ok(r.totalCorrect === espTeste, `teste: ${r.totalCorrect} acertos, esperava ${espTeste}`);
p.ok(r.overallPct === Math.round((espTeste / qsTeste.length) * 100),
     `teste: a régua diz ${Math.round((espTeste / qsTeste.length) * 100)}% e o resultado guardou ${r.overallPct}%`);
/* e a tela do resultado mostra a mesma porcentagem que o estado guardou */
const htmlTeste = P.telaHtml();
p.ok((htmlTeste.match(/(\d+)%/) || [])[1] === String(r.overallPct),
     `teste: a tela mostra ${(htmlTeste.match(/(\d+)%/) || [])[1]}% e o estado guardou ${r.overallPct}%`);
p.nota(`teste: ${r.totalCorrect}/${qsTeste.length} = ${r.overallPct}%`);

/* prática dirigida, com as mesmas questões e o mesmo ciclo */
P.startConvExercises(Object.keys(A.CONV_CATEGORIES));
const qsPratica = P.state.convExerciseQuestions;
const espPratica = responder(qsPratica, (q, resp, nota) => {
  P.state.convExerciseAnswers[q.id] = resp;
  P.state.convExerciseRevealed[q.id] = true;
  if (nota) P.state.convExerciseGrades[q.id] = nota;
});
P.renderConvExerciseSummary();
const html = P.telaHtml();
const mostrado = (html.match(/(\d+)%/) || [])[1];
const esperadoPct = String(Math.round((espPratica / qsPratica.length) * 100));
p.ok(mostrado === esperadoPct,
     `prática: a tela mostra ${mostrado}% e a régua diz ${esperadoPct}% (${espPratica}/${qsPratica.length})`);
p.nota(`prática: ${espPratica}/${qsPratica.length} = ${esperadoPct}% (a tela mostra ${mostrado}%)`);

/* as linhas por padrão têm de somar o total de exercícios */
const somaLinhas = (html.match(/(\d+)\s*\/\s*(\d+)/g) || [])
  .map(s => Number(s.split("/")[1].trim()))
  .filter(n => n <= qsPratica.length);
p.ok(somaLinhas.length > 0, "o resumo da prática lista as linhas por padrão");
const total = somaLinhas.reduce((a, b) => a + b, 0);
p.ok(total === qsPratica.length,
     `as linhas por padrão somam ${total}, e a prática tem ${qsPratica.length} exercícios`);

/* a régua é uma só: questão digitada com "certo" conta nas duas telas */
const digitada = qsPratica.filter(q => P.convIsWrite(q))[0];
p.ok(P.convIsRight(digitada, digitada.answer, "certo"), "questão digitada com nota certo conta como acerto");
p.ok(P.convIsRight(digitada, "qualquer coisa", "quase"), "questão digitada com typo conta como acerto");
p.ok(P.convIsRight(digitada, "qualquer coisa", "aceitoManual"), "autoavaliação conta como acerto");
p.ok(!P.convIsRight(digitada, "qualquer coisa", "diferente"), "resposta diferente NÃO conta");
p.ok(!P.convIsRight(digitada, undefined, undefined), "questão sem resposta NÃO conta");

p.fim();
