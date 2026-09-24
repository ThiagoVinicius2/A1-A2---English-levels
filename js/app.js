/* ===================== Estado da aplicação ===================== */
const STORAGE_KEY = "enCheckLastResults";
const CONV_STORAGE_KEY = "enCheckConvResults_r6";   // r6: banco refeito na 6ª rodada (vocabulário que travou na aula)
const TRANS_STORAGE_KEY = "enCheckTransResults_r3"; // r3: chaves de deck prefixadas pela unidade (u01-...)
const TRANS_STORAGE_KEY_R2 = "enCheckTransResults_r2";  // só para migrar o histórico antigo uma vez
const WEAK_THRESHOLD = 75;   // usado só para colorir a barra de desempenho (verde/amarelo/vermelho)
const MASTERY_PCT = 100;     // qualquer categoria abaixo disso sempre entra na revisão/prática

const state = {
  view: "landing",       // landing | test | results | exercise | exerciseSummary
                         // convTest | convResults | convExercise | convExerciseSummary
                         // transDecks | transRound | transResults
  testQuestions: [],
  testIndex: 0,
  testAnswers: {},        // { questionId: selectedOptionIndex }
  testRevealed: {},       // { questionId: true } assim que a questão é respondida (feedback imediato)
  results: null,          // computed after test
  exerciseQuestions: [],
  exerciseIndex: 0,
  exerciseAnswers: {},    // { questionId: selectedOptionIndex }
  exerciseRevealed: {},   // { questionId: true } once answered
  landingDetailsOpen: false,
  testExitConfirmOpen: false,

  // --- Módulo "Erros da Conversa Real" (independente do teste A1-A2 acima) ---
  convTestQuestions: [],
  convTestIndex: 0,
  convTestAnswers: {},
  convTestRevealed: {},
  convResults: null,
  convExerciseQuestions: [],
  convExerciseIndex: 0,
  convExerciseAnswers: {},
  convExerciseRevealed: {},
  convLandingDetailsOpen: false,
  convTestExitConfirmOpen: false,

  // --- Módulo "Do Português para o Inglês" (resposta digitada, não múltipla escolha) ---
  transDeckSelection: [],   // decks marcados na tela de escolha
  transCards: [],           // cartões sorteados para a rodada
  transIndex: 0,
  transAnswers: {},         // { cardId: texto digitado }
  transGrades: {},          // { cardId: "certo" | "quase" | "diferente" | "aceitoManual" | "naoLembro" }
  transFirstGrades: {},     // idem, mas só o 1º veredito: a autoavaliação NUNCA mexe aqui
  transRevealed: {},        // { cardId: true } assim que a resposta é conferida
  transResults: null,
  transLandingDetailsOpen: false,
  transExitConfirmOpen: false,
  transEmptyWarn: false,    // avisa que o campo está vazio, sem revelar a resposta
  transIsRetry: false,      // rodada só com as frases erradas: não mexe no histórico do deck
  transUnit: null,          // unidade aberta na tela de decks
};

const app = document.getElementById("app");

/* ===================== Utilitários ===================== */
function shuffle(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pct(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

function barClass(p) {
  if (p >= WEAK_THRESHOLD) return "ok";
  if (p >= 50) return "warn";
  return "bad";
}

function cefrLabel(overall) {
  // Critério exigente: este teste é propositalmente mais rigoroso que a média,
  // já que o objetivo é confirmar que o inglês está pronto para o mercado de trabalho.
  if (overall >= 97) return "Solid A2 — ready to move to B1 in a professional setting";
  if (overall >= 85) return "A2, with a few things to firm up before a real interview";
  if (overall >= 55) return "A1";
  return "Beginner (pre-A1) — let us shore up the basics";
}

function saveResults(results, key = STORAGE_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify({
      date: new Date().toISOString(),
      ...results,
    }));
  } catch (e) { /* localStorage indisponível — segue sem persistir */ }
}

function loadResults(key = STORAGE_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function findTestQuestionById(id) {
  return TEST_QUESTIONS.find(q => q.id === id);
}

/* Rótulo da alternativa dentro da explicação. Quando a alternativa é uma frase
   inteira (já terminada em ponto), o dois-pontos é dispensado para não ficar ".:" */
function explainLabel(opt, tag = "") {
  const text = escapeHtml(opt) + tag;
  return /[.!?]$/.test(text) ? text : text + ":";
}

function findConvTestQuestionById(id) {
  return CONV_TEST_QUESTIONS.find(q => q.id === id);
}

/* Mantém só as categorias que ainda existem no banco atual: um resultado salvo em
   rodada anterior pode citar padrões que já foram removidos. */
function knownCategories(keys, dict) {
  return (keys || []).filter(k => dict[k]);
}

function convResultLabel(overall) {
  // Mesmos limiares do teste A1-A2, mas descrevendo domínio dos padrões da conversa real,
  // não um nível CEFR.
  if (overall >= 97) return `The ${Object.keys(CONV_CATEGORIES).length} patterns from your real conversation are under control`;
  if (overall >= 85) return "Good grasp, but a few patterns still slip through now and then";
  if (overall >= 55) return "You recognise some of the patterns, but still miss them often";
  return "The patterns from your conversation still show up a lot — worth drilling here";
}

function renderConfirmModal({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  return `
    <div class="modal-overlay" onclick="if(event.target===this){${onCancel}}">
      <div class="modal-box">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
        <div class="actions">
          <button class="btn secondary" onclick="${onCancel}">${escapeHtml(cancelLabel)}</button>
          <button class="btn" onclick="${onConfirm}">${escapeHtml(confirmLabel)}</button>
        </div>
      </div>
    </div>
  `;
}

/* ===================== Navegação ===================== */
function goLanding() {
  state.view = "landing";
  render();
}

function requestExitTest() {
  state.testExitConfirmOpen = true;
  render();
}

function cancelExitTest() {
  state.testExitConfirmOpen = false;
  render();
}

function confirmExitTest() {
  state.testExitConfirmOpen = false;
  goLanding();
}

function toggleLandingDetails() {
  state.landingDetailsOpen = !state.landingDetailsOpen;
  render();
}

function startTest() {
  state.testQuestions = shuffle(TEST_QUESTIONS);
  state.testIndex = 0;
  state.testAnswers = {};
  state.testRevealed = {};
  state.results = null;
  state.view = "test";
  render();
}

function selectTestOption(qId, optIndex) {
  if (state.testRevealed[qId]) return; // resposta já confirmada: não permite trocar depois do feedback
  state.testAnswers[qId] = optIndex;
  state.testRevealed[qId] = true;
  render();
}

function nextTestQuestion() {
  if (state.testIndex < state.testQuestions.length - 1) {
    state.testIndex++;
    render();
  } else {
    finishTest();
  }
}

function prevTestQuestion() {
  if (state.testIndex > 0) {
    state.testIndex--;
    render();
  }
}

function finishTest() {
  const byCategory = {};
  Object.keys(CATEGORIES).forEach(key => { byCategory[key] = { correct: 0, total: 0 }; });

  let totalCorrect = 0;
  const mistakes = [];
  state.testQuestions.forEach(q => {
    const sel = state.testAnswers[q.id];
    byCategory[q.category].total++;
    if (sel === q.correct) {
      byCategory[q.category].correct++;
      totalCorrect++;
    } else {
      mistakes.push({ question: q, selected: sel });
    }
  });

  const categoryPct = {};
  const improvableCategories = []; // qualquer categoria com nota < 100%, mesmo que seja só 1 erro
  Object.keys(byCategory).forEach(key => {
    const c = byCategory[key];
    const p = pct(c.correct, c.total);
    categoryPct[key] = p;
    if (p < MASTERY_PCT) improvableCategories.push(key);
  });

  const overallPct = pct(totalCorrect, state.testQuestions.length);

  state.results = {
    overallPct,
    cefr: cefrLabel(overallPct),
    categoryPct,
    improvableCategories,
    mistakes: mistakes.map(m => ({ questionId: m.question.id, selected: m.selected })),
    totalCorrect,
    totalQuestions: state.testQuestions.length,
  };
  saveResults(state.results);
  state.view = "results";
  render();
}

function startExercises(categoryKeys) {
  const cats = categoryKeys && categoryKeys.length ? categoryKeys : Object.keys(CATEGORIES);
  let pool = [];
  cats.forEach(key => { pool = pool.concat(getPracticeForCategory(key)); });
  state.exerciseQuestions = pool;
  state.exerciseIndex = 0;
  state.exerciseAnswers = {};
  state.exerciseRevealed = {};
  state.view = "exercise";
  render();
}

function selectExerciseOption(qId, optIndex) {
  if (state.exerciseRevealed[qId]) return; // já respondida
  state.exerciseAnswers[qId] = optIndex;
  state.exerciseRevealed[qId] = true;
  render();
}

function nextExercise() {
  if (state.exerciseIndex < state.exerciseQuestions.length - 1) {
    state.exerciseIndex++;
    render();
  } else {
    state.view = "exerciseSummary";
    render();
  }
}

/* ===================== Navegação: módulo "Erros da Conversa Real" ===================== */
function toggleConvLandingDetails() {
  state.convLandingDetailsOpen = !state.convLandingDetailsOpen;
  render();
}

function requestExitConvTest() {
  state.convTestExitConfirmOpen = true;
  render();
}

function cancelExitConvTest() {
  state.convTestExitConfirmOpen = false;
  render();
}

function confirmExitConvTest() {
  state.convTestExitConfirmOpen = false;
  goLanding();
}

function startConvTest() {
  state.convTestQuestions = shuffle(CONV_TEST_QUESTIONS);
  state.convTestIndex = 0;
  state.convTestAnswers = {};
  state.convTestRevealed = {};
  state.convResults = null;
  state.view = "convTest";
  render();
}

function selectConvTestOption(qId, optIndex) {
  if (state.convTestRevealed[qId]) return; // resposta já confirmada: não permite trocar depois do feedback
  state.convTestAnswers[qId] = optIndex;
  state.convTestRevealed[qId] = true;
  render();
}

function nextConvTestQuestion() {
  if (state.convTestIndex < state.convTestQuestions.length - 1) {
    state.convTestIndex++;
    render();
  } else {
    finishConvTest();
  }
}

function prevConvTestQuestion() {
  if (state.convTestIndex > 0) {
    state.convTestIndex--;
    render();
  }
}

function finishConvTest() {
  const byCategory = {};
  Object.keys(CONV_CATEGORIES).forEach(key => { byCategory[key] = { correct: 0, total: 0 }; });

  let totalCorrect = 0;
  const mistakes = [];
  state.convTestQuestions.forEach(q => {
    const sel = state.convTestAnswers[q.id];
    byCategory[q.category].total++;
    if (sel === q.correct) {
      byCategory[q.category].correct++;
      totalCorrect++;
    } else {
      mistakes.push({ question: q, selected: sel });
    }
  });

  const categoryPct = {};
  const improvableCategories = [];
  Object.keys(byCategory).forEach(key => {
    const c = byCategory[key];
    const p = pct(c.correct, c.total);
    categoryPct[key] = p;
    if (p < MASTERY_PCT) improvableCategories.push(key);
  });

  const overallPct = pct(totalCorrect, state.convTestQuestions.length);

  state.convResults = {
    overallPct,
    label: convResultLabel(overallPct),
    categoryPct,
    improvableCategories,
    mistakes: mistakes.map(m => ({ questionId: m.question.id, selected: m.selected })),
    totalCorrect,
    totalQuestions: state.convTestQuestions.length,
  };
  saveResults(state.convResults, CONV_STORAGE_KEY);
  state.view = "convResults";
  render();
}

function startConvExercises(categoryKeys) {
  const cats = categoryKeys && categoryKeys.length ? categoryKeys : Object.keys(CONV_CATEGORIES);
  let pool = [];
  cats.forEach(key => { pool = pool.concat(getConvPracticeForCategory(key)); });
  state.convExerciseQuestions = pool;
  state.convExerciseIndex = 0;
  state.convExerciseAnswers = {};
  state.convExerciseRevealed = {};
  state.view = "convExercise";
  render();
}

function selectConvExerciseOption(qId, optIndex) {
  if (state.convExerciseRevealed[qId]) return; // já respondida
  state.convExerciseAnswers[qId] = optIndex;
  state.convExerciseRevealed[qId] = true;
  render();
}

function nextConvExercise() {
  if (state.convExerciseIndex < state.convExerciseQuestions.length - 1) {
    state.convExerciseIndex++;
    render();
  } else {
    state.view = "convExerciseSummary";
    render();
  }
}

/* ===================== Render principal ===================== */
function render() {
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  /* A tela inicial usa uma faixa mais larga para os três cards caberem sem rolagem;
     as telas de questão ficam nos 960px, que é a largura boa de leitura. */
  app.className = state.view === "landing" ? "app app-landing" : "app";
  if (state.view === "landing") return renderLanding();
  if (state.view === "test") return renderTest();
  if (state.view === "results") return renderResults();
  if (state.view === "exercise") return renderExercise();
  if (state.view === "exerciseSummary") return renderExerciseSummary();
  if (state.view === "convTest") return renderConvTest();
  if (state.view === "convResults") return renderConvResults();
  if (state.view === "convExercise") return renderConvExercise();
  if (state.view === "convExerciseSummary") return renderConvExerciseSummary();
  if (state.view === "transUnits") return renderTransUnits();
  if (state.view === "transDecks") return renderTransDecks();
  if (state.view === "transRound") return renderTransRound();
  if (state.view === "transResults") return renderTransResults();
}

/* ---------- Landing ---------- */
function renderLanding() {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-eyebrow">English for data &amp; business</div>
      <h1 class="hero-title">Talk about data with the same precision you analyze it.</h1>
      <p class="hero-sub">Find your level, fix the mistakes from your conversations and practice
      translation with the vocabulary of metrics, reports and meetings.</p>
      <button class="btn" onclick="startTest()">Take the level test</button>
    </section>

    <section class="modules">
      ${renderLandingCard()}
      ${renderConvLandingCard()}
      ${renderTransLandingCard()}
    </section>
  `;
}

/* Um card de módulo no formato do design: número, etiqueta, título, uma linha
   de descrição e os links no rodapé do card. `links` já vem montado. */
function renderModuleCard({ num, kind, title, text, accent2, details, links }) {
  return `
    <article class="module-card${accent2 ? " accent2" : ""}">
      <div class="module-top">
        <span>${num}</span>
        <span class="module-kind">${escapeHtml(kind)}</span>
      </div>
      <h3>${escapeHtml(title)}</h3>
      <p>${text}</p>
      ${details || ""}
      <div class="module-actions">${links}</div>
    </article>
  `;
}

function renderLandingCard() {
  const last = loadResults();
  const lastImprovable = last ? knownCategories(last.improvableCategories, CATEGORIES) : [];
  const detailsOpen = state.landingDetailsOpen;

  const details = detailsOpen ? `
    <div class="info-box">
      ${TEST_QUESTIONS.length} questions on grammar and vocabulary, all set in the day-to-day of
      someone who works with data: reports, spreadsheets, dashboards, meetings and interviews in
      English. <strong>Every answer is graded on the spot</strong>, with the reason each option is
      right or wrong. At the end you get your score per category, a review of every question you
      missed, and extra drills for <strong>any category below 100%</strong>.
      <div class="cat-columns">
        <div class="cat-column">
          <div class="cat-column-title">Level A1</div>
          <ul>${Object.values(CATEGORIES).filter(c => c.level === "A1").map(c => `<li>${escapeHtml(c.label)}</li>`).join("")}</ul>
        </div>
        <div class="cat-column">
          <div class="cat-column-title accent2">Level A2</div>
          <ul>${Object.values(CATEGORIES).filter(c => c.level === "A2").map(c => `<li>${escapeHtml(c.label)}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
  ` : "";

  const links = `
    <button class="module-link" onclick="startTest()">Take the test &rarr;</button>
    ${lastImprovable.length ? `
      <button class="module-link quiet" onclick="startExercises(${JSON.stringify(lastImprovable).replace(/"/g, "&quot;")})">
        Practise the ${lastImprovable.length} ${lastImprovable.length === 1 ? "category" : "categories"} below 100% &rarr;
      </button>` : ""}
    <button class="module-link quiet" onclick="toggleLandingDetails()">${detailsOpen ? "Hide details" : "What is in the test"}</button>
    ${last ? `<span class="module-score">Last run · ${last.overallPct}% · ${escapeHtml(last.cefr)}</span>` : ""}
  `;

  return renderModuleCard({
    num: "01",
    kind: "Assessment",
    title: "Level test",
    text: `Answer ${TEST_QUESTIONS.length} questions and find out your current level.`,
    details,
    links,
  });
}

/* ---------- Landing: módulo "Erros da Conversa Real" ---------- */
function renderConvLandingCard() {
  const last = loadResults(CONV_STORAGE_KEY);
  const lastImprovable = last ? knownCategories(last.improvableCategories, CONV_CATEGORIES) : [];
  const detailsOpen = state.convLandingDetailsOpen;

  const details = detailsOpen ? `
    <div class="info-box">
      Each question is a sentence from your own conversation class with the key word removed,
      grouped by theme:
      <ul class="conv-pattern-list">
        ${Object.values(CONV_CATEGORIES).map(c => `<li><strong>${escapeHtml(c.tag)}:</strong> ${escapeHtml(c.label)}</li>`).join("")}
      </ul>
    </div>
  ` : "";

  const links = `
    <button class="module-link" onclick="startConvTest()">Review mistakes &rarr;</button>
    ${lastImprovable.length ? `
      <button class="module-link quiet" onclick="startConvExercises(${JSON.stringify(lastImprovable).replace(/"/g, "&quot;")})">
        Practise the ${lastImprovable.length} ${lastImprovable.length === 1 ? "pattern" : "patterns"} below 100% &rarr;
      </button>` : ""}
    <button class="module-link quiet" onclick="toggleConvLandingDetails()">${detailsOpen ? "Hide details" : "What is in this round"}</button>
    ${last ? `<span class="module-score">Last run · ${last.overallPct}%</span>` : ""}
  `;

  return renderModuleCard({
    num: "02",
    kind: "Class feedback",
    title: "Conversation mistakes",
    text: `Exercises built from the words you could not recall in your last class —
    ${Object.keys(CONV_CATEGORIES).length} themes, ${CONV_TEST_QUESTIONS.length} questions.`,
    accent2: true,
    details,
    links,
  });
}

/* ---------- Test ---------- */
/* Feedback imediato de uma questão já respondida: diz se acertou ou errou e explica
   por que a resposta certa é certa e por que cada uma das outras está errada.
   Usado no teste (primeira avaliação) e reaproveita o mesmo formato da revisão final. */
function renderAnswerFeedback(q, selected) {
  const isCorrect = selected === q.correct;
  return `
    <div class="explain-box ${isCorrect ? "good" : "bad"}">
      ${isCorrect
        ? "✅ Correct! Below, why this is the right answer and why the others are not."
        : "❌ Not this time — below, why the right answer is right and where your pick slipped."}
    </div>
    <div class="explain-list">
      ${q.options.map((opt, i) => {
        let cls = "explain-item";
        let tag = "";
        if (i === q.correct) {
          cls += " is-correct";
          tag = i === selected ? " (correct answer — your answer)" : " (correct answer)";
        } else if (i === selected) {
          cls += " is-wrong-pick";
          tag = " (your answer)";
        }
        return `<div class="${cls}"><strong>${explainLabel(opt, tag)}</strong> ${escapeHtml(q.explanations[i])}</div>`;
      }).join("")}
    </div>
  `;
}

function renderTest() {
  const q = state.testQuestions[state.testIndex];
  const total = state.testQuestions.length;
  const current = state.testIndex + 1;
  const selected = state.testAnswers[q.id];
  const revealed = !!state.testRevealed[q.id];
  const isLast = state.testIndex === total - 1;

  app.innerHTML = `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-label">
          <span>Question ${current} of ${total}</span>
          <span>${Math.round((state.testIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.testIndex / total) * 100}%"></div></div>
      </div>

      <span class="q-level${CATEGORIES[q.category].level === "A2" ? " accent2" : ""}">${CATEGORIES[q.category].level} &middot; ${escapeHtml(CATEGORIES[q.category].label)}</span>
      <div class="q-prompt">${escapeHtml(q.prompt)}</div>

      <div class="options">
        ${q.options.map((opt, i) => {
          let cls = "option";
          if (revealed) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " incorrect";
          } else if (selected === i) {
            cls += " selected";
          }
          return `
            <button class="${cls}" ${revealed ? "disabled" : ""} onclick="selectTestOption('${q.id}', ${i})">
              ${escapeHtml(opt)}
            </button>
          `;
        }).join("")}
      </div>

      ${revealed
        ? renderAnswerFeedback(q, selected)
        : `<p style="margin-top:16px; font-size:0.85rem;">Pick an option to see right away whether you got it and why each choice is what it is.</p>`}

      <div class="actions">
        ${state.testIndex > 0 ? `<button class="btn secondary" onclick="prevTestQuestion()">Back</button>` : ""}
        <button class="btn" ${revealed ? "" : "disabled"} onclick="nextTestQuestion()">
          ${isLast ? "See results" : "Next"}
        </button>
      </div>
      <div class="exit-actions">
        <button class="btn secondary block" onclick="requestExitTest()">Back to start</button>
      </div>
    </div>
    ${state.testExitConfirmOpen ? renderConfirmModal({
      title: "Leave the test?",
      message: "You have not finished this test. If you leave now, every answer so far is lost.",
      confirmLabel: "Leave and lose answers",
      cancelLabel: "Keep going",
      onConfirm: "confirmExitTest()",
      onCancel: "cancelExitTest()",
    }) : ""}
  `;
}

/* ---------- Results ---------- */
function renderResults() {
  const r = state.results;
  const improvableNames = r.improvableCategories.map(k => CATEGORIES[k].label);

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${r.overallPct}%</div>
        <div class="score-level">${escapeHtml(r.cefr)}</div>
        <p style="margin-top:8px;">${r.totalCorrect} of ${r.totalQuestions} questions correct</p>
      </div>

      <h2>Performance by category</h2>
      ${Object.keys(CATEGORIES).map(key => {
        const p = r.categoryPct[key];
        return `
          <div class="cat-row">
            <div class="cat-name">${escapeHtml(CATEGORIES[key].label)}</div>
            <div class="cat-bar-wrap"><div class="cat-bar-fill ${barClass(p)}" style="width:${p}%"></div></div>
            <div class="cat-pct">${p}%</div>
          </div>
        `;
      }).join("")}

      <div class="section-title">Categories not yet at 100%</div>
      ${improvableNames.length
        ? `<div class="weak-list">${improvableNames.map(n => `<span class="weak-chip">${escapeHtml(n)}</span>`).join("")}</div>
           <p style="margin-top:10px; font-size:0.85rem;">The bar is strict on purpose: any category below 100% goes on the practice list,
           even if you missed a single question.</p>`
        : `<div class="all-good">Excellent! You scored 100% in every category on this test.</div>`
      }

      ${renderMistakesReview(r.mistakes)}

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        ${improvableNames.length
          ? `<button class="btn block" onclick='startExercises(${JSON.stringify(r.improvableCategories)})'>Practise categories below 100%</button>`
          : `<button class="btn block" onclick='startExercises(${JSON.stringify(Object.keys(CATEGORIES))})'>Practise every category (general review)</button>`
        }
        <button class="btn secondary block" onclick="startTest()">Retake the test</button>
        <button class="btn secondary block" onclick="goLanding()">Back to start</button>
      </div>
    </div>
  `;
}

/* Sempre exibe a revisão detalhada de cada questão que o usuário errou no teste,
   independentemente da % de acerto da categoria. */
function renderMistakesReview(mistakes) {
  if (!mistakes || !mistakes.length) {
    return `
      <div class="section-title">Review of wrong answers</div>
      <div class="all-good">You did not miss a single question on this test. Nothing to review!</div>
    `;
  }

  const blocks = mistakes.map(m => {
    const q = findTestQuestionById(m.questionId);
    if (!q) return "";
    return `
      <div class="card" style="box-shadow:none; border-color:var(--border); margin-bottom:14px; padding:18px;">
        <span class="q-level${CATEGORIES[q.category].level === "A2" ? " accent2" : ""}">${CATEGORIES[q.category].level} &middot; ${escapeHtml(CATEGORIES[q.category].label)}</span>
        <div class="q-prompt" style="font-size:1.05rem;">${escapeHtml(q.prompt)}</div>
        <div class="explain-list">
          ${q.options.map((opt, i) => {
            let cls = "explain-item";
            let tag = "";
            if (i === q.correct) { cls += " is-correct"; tag = " (correct answer)"; }
            else if (i === m.selected) { cls += " is-wrong-pick"; tag = " (your answer)"; }
            return `<div class="${cls}"><strong>${explainLabel(opt, tag)}</strong> ${escapeHtml(q.explanations[i])}</div>`;
          }).join("")}
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="section-title">Review of wrong answers (${mistakes.length})</div>
    <p style="font-size:0.85rem; margin-top:-4px;">Every wrong answer is reviewed here, with the full explanation of each option.</p>
    ${blocks}
  `;
}

/* ---------- Exercise session ---------- */
function renderExercise() {
  const q = state.exerciseQuestions[state.exerciseIndex];
  const total = state.exerciseQuestions.length;
  const current = state.exerciseIndex + 1;
  const selected = state.exerciseAnswers[q.id];
  const revealed = !!state.exerciseRevealed[q.id];
  const isLast = state.exerciseIndex === total - 1;

  app.innerHTML = `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-label">
          <span>Exercise ${current} of ${total}</span>
          <span>${Math.round((state.exerciseIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.exerciseIndex / total) * 100}%"></div></div>
      </div>

      <div class="ex-header">
        <span class="ex-cat-label${CATEGORIES[q.category].level === "A2" ? " accent2" : ""}">${escapeHtml(CATEGORIES[q.category].label)}</span>
        <span class="q-level${CATEGORIES[q.category].level === "A2" ? " accent2" : ""}" style="margin:0;">${CATEGORIES[q.category].level}</span>
      </div>

      <div class="q-prompt">${escapeHtml(q.prompt)}</div>

      <div class="options">
        ${q.options.map((opt, i) => {
          let cls = "option";
          if (revealed) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " incorrect";
          } else if (selected === i) {
            cls += " selected";
          }
          return `
            <button class="${cls}" ${revealed ? "disabled" : ""} onclick="selectExerciseOption('${q.id}', ${i})">
              ${escapeHtml(opt)}
            </button>
          `;
        }).join("")}
      </div>

      ${revealed ? `
        <div class="explain-box ${selected === q.correct ? "good" : "bad"}">
          ${selected === q.correct ? "✅ Correct!" : "❌ Not this time — see the explanations below."}
        </div>
        <div class="explain-list">
          ${q.options.map((opt, i) => `
            <div class="explain-item ${i === q.correct ? "is-correct" : ""}">
              <strong>${explainLabel(opt)}</strong> ${escapeHtml(q.explanations[i])}
            </div>
          `).join("")}
        </div>
        <div class="actions">
          <button class="btn block" onclick="nextExercise()">${isLast ? "See summary" : "Next exercise"}</button>
        </div>
      ` : `
        <p style="margin-top:16px; font-size:0.85rem;">Pick an option to see the explanation.</p>
      `}
    </div>
  `;
}

function renderExerciseSummary() {
  const total = state.exerciseQuestions.length;
  let correct = 0;
  const byCategory = {};
  state.exerciseQuestions.forEach(q => {
    byCategory[q.category] = byCategory[q.category] || { correct: 0, total: 0 };
    byCategory[q.category].total++;
    if (state.exerciseAnswers[q.id] === q.correct) {
      byCategory[q.category].correct++;
      correct++;
    }
  });

  const improvableCategories = Object.keys(byCategory)
    .filter(key => pct(byCategory[key].correct, byCategory[key].total) < MASTERY_PCT);

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${pct(correct, total)}%</div>
        <div class="score-level">Practice result</div>
        <p style="margin-top:8px;">${correct} of ${total} exercises correct</p>
      </div>

      <h2>By category</h2>
      ${Object.keys(byCategory).map(key => `
        <div class="summary-row">
          <span>${escapeHtml(CATEGORIES[key].label)}</span>
          <strong>${byCategory[key].correct}/${byCategory[key].total}</strong>
        </div>
      `).join("")}

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        ${improvableCategories.length
          ? `<button class="btn block" onclick='startExercises(${JSON.stringify(improvableCategories)})'>Praticar categoria${improvableCategories.length > 1 ? "s" : ""} abaixo de 100%</button>`
          : `<button class="btn block" onclick='startExercises(${JSON.stringify(Object.keys(byCategory))})'>Practise every category (general review)</button>`
        }
        <button class="btn secondary block" onclick="startTest()">Refazer o teste completo</button>
        <button class="btn secondary block" onclick="goLanding()">Back to start</button>
      </div>
    </div>
  `;
}

/* ---------- Conv Test: módulo "Erros da Conversa Real" ---------- */
function renderConvTest() {
  const q = state.convTestQuestions[state.convTestIndex];
  const total = state.convTestQuestions.length;
  const current = state.convTestIndex + 1;
  const selected = state.convTestAnswers[q.id];
  const revealed = !!state.convTestRevealed[q.id];
  const isLast = state.convTestIndex === total - 1;

  app.innerHTML = `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-label">
          <span>Question ${current} of ${total}</span>
          <span>${Math.round((state.convTestIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.convTestIndex / total) * 100}%"></div></div>
      </div>

      <span class="q-level accent2">${escapeHtml(CONV_CATEGORIES[q.category].tag)} &middot; ${escapeHtml(CONV_CATEGORIES[q.category].label)}</span>
      <div class="q-prompt">${escapeHtml(q.prompt)}</div>

      <div class="options">
        ${q.options.map((opt, i) => {
          let cls = "option";
          if (revealed) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " incorrect";
          } else if (selected === i) {
            cls += " selected";
          }
          return `
            <button class="${cls}" ${revealed ? "disabled" : ""} onclick="selectConvTestOption('${q.id}', ${i})">
              ${escapeHtml(opt)}
            </button>
          `;
        }).join("")}
      </div>

      ${revealed
        ? renderAnswerFeedback(q, selected)
        : `<p style="margin-top:16px; font-size:0.85rem;">Pick an option to see right away whether you got it and why each choice is what it is.</p>`}

      <div class="actions">
        ${state.convTestIndex > 0 ? `<button class="btn secondary" onclick="prevConvTestQuestion()">Back</button>` : ""}
        <button class="btn" ${revealed ? "" : "disabled"} onclick="nextConvTestQuestion()">
          ${isLast ? "See results" : "Next"}
        </button>
      </div>
      <div class="exit-actions">
        <button class="btn secondary block" onclick="requestExitConvTest()">Back to start</button>
      </div>
    </div>
    ${state.convTestExitConfirmOpen ? renderConfirmModal({
      title: "Leave the practice?",
      message: "You have not finished this practice. If you leave now, every answer so far is lost.",
      confirmLabel: "Leave and lose answers",
      cancelLabel: "Keep practising",
      onConfirm: "confirmExitConvTest()",
      onCancel: "cancelExitConvTest()",
    }) : ""}
  `;
}

/* ---------- Conv Results ---------- */
function renderConvResults() {
  const r = state.convResults;
  const improvableNames = r.improvableCategories.map(k => CONV_CATEGORIES[k].label);

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${r.overallPct}%</div>
        <div class="score-level">${escapeHtml(r.label)}</div>
        <p style="margin-top:8px;">${r.totalCorrect} of ${r.totalQuestions} questions correct</p>
      </div>

      <h2>Performance by pattern</h2>
      ${Object.keys(CONV_CATEGORIES).map(key => {
        const p = r.categoryPct[key];
        return `
          <div class="cat-row">
            <div class="cat-name">${escapeHtml(CONV_CATEGORIES[key].label)}</div>
            <div class="cat-bar-wrap"><div class="cat-bar-fill ${barClass(p)}" style="width:${p}%"></div></div>
            <div class="cat-pct">${p}%</div>
          </div>
        `;
      }).join("")}

      <div class="section-title">Patterns not yet at 100%</div>
      ${improvableNames.length
        ? `<div class="weak-list">${improvableNames.map(n => `<span class="weak-chip">${escapeHtml(n)}</span>`).join("")}</div>
           <p style="margin-top:10px; font-size:0.85rem;">Any pattern below 100% goes on the practice list, even if you missed a single question.</p>`
        : `<div class="all-good">Excellent! You scored 100% in every pattern in this practice.</div>`
      }

      ${renderConvMistakesReview(r.mistakes)}

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        ${improvableNames.length
          ? `<button class="btn block" onclick='startConvExercises(${JSON.stringify(r.improvableCategories)})'>Practise patterns below 100%</button>`
          : `<button class="btn block" onclick='startConvExercises(${JSON.stringify(Object.keys(CONV_CATEGORIES))})'>Practise every pattern (general review)</button>`
        }
        <button class="btn secondary block" onclick="startConvTest()">Redo the practice</button>
        <button class="btn secondary block" onclick="goLanding()">Back to start</button>
      </div>
    </div>
  `;
}

/* Sempre exibe a revisão detalhada de cada questão que o usuário errou na prática,
   independentemente da % de acerto do padrão. */
function renderConvMistakesReview(mistakes) {
  if (!mistakes || !mistakes.length) {
    return `
      <div class="section-title">Review of wrong answers</div>
      <div class="all-good">You did not miss a single question in this practice. Nothing to review!</div>
    `;
  }

  const blocks = mistakes.map(m => {
    const q = findConvTestQuestionById(m.questionId);
    if (!q) return "";
    return `
      <div class="card" style="box-shadow:none; border-color:var(--border); margin-bottom:14px; padding:18px;">
        <span class="q-level accent2">${escapeHtml(CONV_CATEGORIES[q.category].tag)} &middot; ${escapeHtml(CONV_CATEGORIES[q.category].label)}</span>
        <div class="q-prompt" style="font-size:1.05rem;">${escapeHtml(q.prompt)}</div>
        <div class="explain-list">
          ${q.options.map((opt, i) => {
            let cls = "explain-item";
            let tag = "";
            if (i === q.correct) { cls += " is-correct"; tag = " (correct answer)"; }
            else if (i === m.selected) { cls += " is-wrong-pick"; tag = " (your answer)"; }
            return `<div class="${cls}"><strong>${explainLabel(opt, tag)}</strong> ${escapeHtml(q.explanations[i])}</div>`;
          }).join("")}
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="section-title">Review of wrong answers (${mistakes.length})</div>
    <p style="font-size:0.85rem; margin-top:-4px;">Every wrong answer is reviewed here, with the full explanation of each option.</p>
    ${blocks}
  `;
}

/* ---------- Conv Exercise session ---------- */
function renderConvExercise() {
  const q = state.convExerciseQuestions[state.convExerciseIndex];
  const total = state.convExerciseQuestions.length;
  const current = state.convExerciseIndex + 1;
  const selected = state.convExerciseAnswers[q.id];
  const revealed = !!state.convExerciseRevealed[q.id];
  const isLast = state.convExerciseIndex === total - 1;

  app.innerHTML = `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-label">
          <span>Exercise ${current} of ${total}</span>
          <span>${Math.round((state.convExerciseIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.convExerciseIndex / total) * 100}%"></div></div>
      </div>

      <div class="ex-header">
        <span class="ex-cat-label accent2">${escapeHtml(CONV_CATEGORIES[q.category].label)}</span>
        <span class="q-level accent2" style="margin:0;">${escapeHtml(CONV_CATEGORIES[q.category].tag)}</span>
      </div>

      <div class="q-prompt">${escapeHtml(q.prompt)}</div>

      <div class="options">
        ${q.options.map((opt, i) => {
          let cls = "option";
          if (revealed) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " incorrect";
          } else if (selected === i) {
            cls += " selected";
          }
          return `
            <button class="${cls}" ${revealed ? "disabled" : ""} onclick="selectConvExerciseOption('${q.id}', ${i})">
              ${escapeHtml(opt)}
            </button>
          `;
        }).join("")}
      </div>

      ${revealed ? `
        <div class="explain-box ${selected === q.correct ? "good" : "bad"}">
          ${selected === q.correct ? "✅ Correct!" : "❌ Not this time — see the explanations below."}
        </div>
        <div class="explain-list">
          ${q.options.map((opt, i) => `
            <div class="explain-item ${i === q.correct ? "is-correct" : ""}">
              <strong>${explainLabel(opt)}</strong> ${escapeHtml(q.explanations[i])}
            </div>
          `).join("")}
        </div>
        <div class="actions">
          <button class="btn block" onclick="nextConvExercise()">${isLast ? "See summary" : "Next exercise"}</button>
        </div>
      ` : `
        <p style="margin-top:16px; font-size:0.85rem;">Pick an option to see the explanation.</p>
      `}
    </div>
  `;
}

function renderConvExerciseSummary() {
  const total = state.convExerciseQuestions.length;
  let correct = 0;
  const byCategory = {};
  state.convExerciseQuestions.forEach(q => {
    byCategory[q.category] = byCategory[q.category] || { correct: 0, total: 0 };
    byCategory[q.category].total++;
    if (state.convExerciseAnswers[q.id] === q.correct) {
      byCategory[q.category].correct++;
      correct++;
    }
  });

  const improvableCategories = Object.keys(byCategory)
    .filter(key => pct(byCategory[key].correct, byCategory[key].total) < MASTERY_PCT);

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${pct(correct, total)}%</div>
        <div class="score-level">Practice result</div>
        <p style="margin-top:8px;">${correct} of ${total} exercises correct</p>
      </div>

      <h2>By pattern</h2>
      ${Object.keys(byCategory).map(key => `
        <div class="summary-row">
          <span>${escapeHtml(CONV_CATEGORIES[key].label)}</span>
          <strong>${byCategory[key].correct}/${byCategory[key].total}</strong>
        </div>
      `).join("")}

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        ${improvableCategories.length
          ? `<button class="btn block" onclick='startConvExercises(${JSON.stringify(improvableCategories)})'>Practise ${improvableCategories.length > 1 ? "patterns" : "pattern"} below 100%</button>`
          : `<button class="btn block" onclick='startConvExercises(${JSON.stringify(Object.keys(byCategory))})'>Practise every pattern (general review)</button>`
        }
        <button class="btn secondary block" onclick="startConvTest()">Redo the full practice</button>
        <button class="btn secondary block" onclick="goLanding()">Back to start</button>
      </div>
    </div>
  `;
}

/* ===================== Início ===================== */
/* ===================== Módulo "Do Português para o Inglês" =====================
   Único módulo com resposta digitada. Duas regras valem em toda esta seção:

   1. Nenhum render() enquanto a pessoa digita — render() reescreve o innerHTML
      inteiro e levaria junto o campo, o foco e o cursor. O texto só é lido no
      momento de conferir, direto do DOM, antes de mexer no estado.
   2. Nada de texto digitado (nem das frases dos cartões) dentro de atributo HTML:
      o escapeHtml daqui não escapa aspas, e há frases em português com aspas.
      Tudo vai para nó de texto. */

const TRANS_OK_GRADES = ["certo", "quase", "aceitoManual"];

function transIsHit(grade) {
  return TRANS_OK_GRADES.indexOf(grade) !== -1;
}

/* Acerto "de primeira": o que valeu na primeira resposta, antes de qualquer
   autoavaliação. "quase" entra porque o inglês produzido estava certo — só a
   digitação escorregou. É esta a régua da porcentagem por deck. */
function transIsFirstHit(grade) {
  return grade === "certo" || grade === "quase";
}

/* Histórico por deck: { deckKey: { pct, correct, total, date } }.
   Fica aninhado em `decks` porque saveResults() injeta um `date` no topo. */
function loadTransDeckStats() {
  const guardado = loadResults(TRANS_STORAGE_KEY);
  if (guardado && guardado.decks) return guardado.decks;

  /* Migração única: antes das unidades as chaves eram "comprehension",
     "vocab1"… Todas eram da unidade 1, então ganham o prefixo e o histórico
     não se perde. Roda uma vez: a primeira gravação já usa a chave nova. */
  const antigo = loadResults(TRANS_STORAGE_KEY_R2);
  if (antigo && antigo.decks) {
    const migrado = {};
    Object.keys(antigo.decks).forEach(k => {
      const nova = k.indexOf("-") === -1 ? "u01-" + k : k;
      if (TRANS_DECKS[nova]) migrado[nova] = antigo.decks[k];
    });
    return migrado;
  }
  return {};
}

function saveTransDeckStats(stats) {
  saveResults({ decks: stats }, TRANS_STORAGE_KEY);
}

function transResultLabel(overall) {
  if (overall >= 97) return "You write these sentences in English without hesitating";
  if (overall >= 85) return "Almost everything lands — only small details left";
  if (overall >= 55) return "You understand the sentences, but still freeze when writing them";
  return "Writing from scratch is still hard — which is exactly what this module trains";
}

function transCurrentCard() {
  return state.transCards[state.transIndex];
}

/* ---------- Navegação ---------- */
function toggleTransLandingDetails() {
  state.transLandingDetailsOpen = !state.transLandingDetailsOpen;
  render();
}

function openTransUnits() {
  state.view = "transUnits";
  render();
}

/* Abre a lista de decks de uma unidade. Sem argumento, reabre a última. */
function openTransDecks(unitKey, preSelecionados) {
  const unidade = TRANS_UNITS[unitKey] ? unitKey : state.transUnit;
  if (!unidade || !getTransDecksForUnit(unidade).length) return openTransUnits();
  state.transUnit = unidade;
  state.transDeckSelection = knownCategories(preSelecionados, TRANS_DECKS)
    .filter(k => TRANS_DECKS[k].unit === unidade);
  state.view = "transDecks";
  render();
}

/* Média de acerto "de primeira" dos decks da unidade que já foram praticados.
   Retorna null quando a unidade ainda não foi tocada. */
function transUnitProgress(unitKey) {
  const decks = getTransDecksForUnit(unitKey);
  if (!decks.length) return null;
  const stats = loadTransDeckStats();
  let correct = 0, total = 0, praticados = 0;
  decks.forEach(k => {
    const d = stats[k];
    if (!d) return;
    praticados++;
    correct += d.correct;
    total += d.total;
  });
  return total ? { pct: pct(correct, total), praticados, decks: decks.length } : null;
}

function toggleTransDeck(key) {
  const i = state.transDeckSelection.indexOf(key);
  if (i === -1) state.transDeckSelection.push(key);
  else state.transDeckSelection.splice(i, 1);
  render();
}

function selectAllTransDecks(marcar) {
  state.transDeckSelection = marcar ? getTransDecksForUnit(state.transUnit) : [];
  render();
}

function startTransRound(deckKeys) {
  const decks = knownCategories(deckKeys, TRANS_DECKS);
  const escolhidos = decks.length ? decks : getTransDecksForUnit(state.transUnit);
  let pool = [];
  escolhidos.forEach(key => { pool = pool.concat(getTransCardsForDeck(key)); });
  state.transDeckSelection = escolhidos;
  state.transCards = shuffle(pool);
  state.transIndex = 0;
  state.transAnswers = {};
  state.transGrades = {};
  state.transFirstGrades = {};
  state.transRevealed = {};
  state.transResults = null;
  state.transEmptyWarn = false;
  state.transIsRetry = false;
  state.view = "transRound";
  render();
}

/* Rodada de correção: só os cartões que ficaram errados na rodada que acabou.
   Não toca no histórico por deck — a porcentagem "de primeira" mede o deck
   inteiro, e refazer só os erros acertando tudo gravaria um 100% falso. */
function startTransRetry() {
  const r = state.transResults;
  if (!r || !r.mistakes.length) return;
  const cartoes = r.mistakes
    .map(m => TRANS_CARDS.find(c => c.id === m.cardId))
    .filter(Boolean);
  if (!cartoes.length) return;

  state.transCards = shuffle(cartoes);
  state.transIndex = 0;
  state.transAnswers = {};
  state.transGrades = {};
  state.transFirstGrades = {};
  state.transRevealed = {};
  state.transResults = null;
  state.transEmptyWarn = false;
  state.transIsRetry = true;
  state.view = "transRound";
  render();
}

/* Lê o campo ANTES de qualquer mudança de estado: o render() seguinte o destrói. */
function submitTransAnswer() {
  const card = transCurrentCard();
  if (!card || state.transRevealed[card.id]) return;
  const campo = document.getElementById("trans-input");
  const digitado = campo ? campo.value : "";
  const nota = gradeTransAnswer(card, digitado);
  if (nota.level === "vazio") {
    state.transEmptyWarn = true;
    render();
    return;
  }
  state.transEmptyWarn = false;
  state.transAnswers[card.id] = digitado;
  state.transGrades[card.id] = nota.level;
  state.transFirstGrades[card.id] = nota.level;   // congelado: é o "de primeira"
  state.transRevealed[card.id] = true;
  render();
}

/* Tradução válida que o comparador não conhecia: quem decide é quem respondeu. */
function markTransAnswerCorrect() {
  const card = transCurrentCard();
  if (!card || !state.transRevealed[card.id]) return;
  /* De propósito só mexe em transGrades: transFirstGrades guarda o primeiro
     veredito e é o que alimenta a porcentagem "de primeira" de cada deck. */
  state.transGrades[card.id] = "aceitoManual";
  render();
}

function skipTransCard() {
  const card = transCurrentCard();
  if (!card || state.transRevealed[card.id]) return;
  state.transEmptyWarn = false;
  state.transAnswers[card.id] = "";
  state.transGrades[card.id] = "naoLembro";
  state.transFirstGrades[card.id] = "naoLembro";
  state.transRevealed[card.id] = true;
  render();
}

function nextTransCard() {
  state.transEmptyWarn = false;
  if (state.transIndex < state.transCards.length - 1) {
    state.transIndex++;
    render();
  } else {
    finishTransRound();
  }
}

function prevTransCard() {
  state.transEmptyWarn = false;
  if (state.transIndex > 0) {
    state.transIndex--;
    render();
  }
}

function requestExitTransRound() {
  state.transExitConfirmOpen = true;
  render();
}

function cancelExitTransRound() {
  state.transExitConfirmOpen = false;
  render();
}

function confirmExitTransRound() {
  state.transExitConfirmOpen = false;
  goLanding();
}

function finishTransRound() {
  const byDeck = {};
  let totalCorrect = 0;
  const mistakes = [];

  state.transCards.forEach(card => {
    byDeck[card.deck] = byDeck[card.deck] || { correct: 0, total: 0 };
    byDeck[card.deck].total++;
    if (transIsHit(state.transGrades[card.id])) {
      byDeck[card.deck].correct++;
      totalCorrect++;
    } else {
      mistakes.push({
        cardId: card.id,
        typed: state.transAnswers[card.id] || "",
        grade: state.transGrades[card.id],
      });
    }
  });

  const categoryPct = {};
  const improvableCategories = [];
  Object.keys(byDeck).forEach(key => {
    const p = pct(byDeck[key].correct, byDeck[key].total);
    categoryPct[key] = p;
    if (p < MASTERY_PCT) improvableCategories.push(key);
  });

  const overallPct = pct(totalCorrect, state.transCards.length);
  state.transResults = {
    overallPct,
    label: transResultLabel(overallPct),
    categoryPct,
    improvableCategories,
    mistakes,
    totalCorrect,
    totalQuestions: state.transCards.length,
    isRetry: state.transIsRetry,
  };
  /* Histórico por deck, com a régua estrita (transFirstGrades): mescla no que
     já estava gravado, então deck fora desta rodada mantém a nota da última vez
     em que foi praticado.

     Rodada de correção fica de fora: ela traz só os cartões errados, então
     gravaria uma porcentagem que não representa o deck. */
  if (!state.transIsRetry) {
    const stats = loadTransDeckStats();
    const agora = new Date().toISOString();
    const dePrimeira = {};
    state.transCards.forEach(card => {
      dePrimeira[card.deck] = dePrimeira[card.deck] || { correct: 0, total: 0 };
      dePrimeira[card.deck].total++;
      if (transIsFirstHit(state.transFirstGrades[card.id])) dePrimeira[card.deck].correct++;
    });
    Object.keys(dePrimeira).forEach(key => {
      const d = dePrimeira[key];
      stats[key] = { pct: pct(d.correct, d.total), correct: d.correct, total: d.total, date: agora };
    });
    saveTransDeckStats(stats);
  }

  state.view = "transResults";
  render();
}

/* ---------- Landing: card do módulo ---------- */
function renderTransLandingCard() {
  /* Sem resultado geral aqui de propósito: com muitos decks uma média só não diz
     onde o estudo está fraco. O feedback vive na tela de decks, por deck. */
  const detailsOpen = state.transLandingDetailsOpen;

  const details = detailsOpen ? `
    <div class="info-box">
      Pick one or more decks and answer by typing. The checker ignores accents, case, punctuation
      and contractions (<strong>"When are we leaving?"</strong> counts for
      <strong>"When're we leaving?"</strong>), tells a typo apart from an English mistake and shows
      word by word what was missing. If your translation is right in another way, you mark it as
      correct. On the deck screen each deck shows how much you got right
      <strong>on the first try</strong> last time. The decks:
      <ul class="conv-pattern-list">
        ${Object.keys(TRANS_DECKS).map(k => `<li><strong>${escapeHtml(TRANS_DECKS[k].tag)}:</strong> ${escapeHtml(TRANS_DECKS[k].label)} — ${getTransCardsForDeck(k).length} cards</li>`).join("")}
      </ul>
    </div>
  ` : "";

  const links = `
    <button class="module-link" onclick="openTransUnits()">Translate sentences &rarr;</button>
    <button class="module-link quiet" onclick="toggleTransLandingDetails()">${detailsOpen ? "Hide details" : "How the checking works"}</button>
  `;

  return renderModuleCard({
    num: "03",
    kind: "Flashcards",
    title: "Sentence translation",
    text: `${TRANS_CARDS.length} Portuguese sentences from your flashcard deck to write in English,
    across ${Object.keys(TRANS_DECKS).length} decks.`,
    details,
    links,
  });
}

/* ---------- Tela das unidades ---------- */
function renderTransUnits() {
  const chaves = Object.keys(TRANS_UNITS);
  const comDeck = chaves.filter(k => getTransDecksForUnit(k).length);

  app.innerHTML = `
    <div class="card">
      <h2>Which unit are you practising?</h2>
      <p class="lead">Each unit holds the decks of one unit of your course.
      ${comDeck.length} of ${chaves.length} units ${comDeck.length === 1 ? "is" : "are"} loaded so far.</p>

      <div class="unit-grid">
        ${chaves.map(key => {
          const u = TRANS_UNITS[key];
          const decks = getTransDecksForUnit(key);
          const cartoes = countTransCardsForUnit(key);
          const prog = transUnitProgress(key);

          if (!decks.length) {
            return `
              <article class="module-card empty" aria-disabled="true">
                <div class="module-top"><span>${u.num}</span><span class="module-kind">Empty</span></div>
                <h3>${escapeHtml(u.label)}</h3>
                <p>No decks yet.</p>
              </article>
            `;
          }
          return `
            <article class="module-card">
              <div class="module-top">
                <span>${u.num}</span>
                <span class="module-kind">${decks.length} ${decks.length === 1 ? "deck" : "decks"}</span>
              </div>
              <h3>${escapeHtml(u.label)}</h3>
              <p>${cartoes} ${cartoes === 1 ? "sentence" : "sentences"} to translate.</p>
              <div class="module-actions">
                <button class="module-link" onclick="openTransDecks('${key}')">Open unit &rarr;</button>
                ${prog
                  ? `<span class="module-score">First try · ${prog.pct}% · ${prog.praticados}/${prog.decks} decks practised</span>`
                  : `<span class="module-score">Not started yet</span>`}
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <div class="exit-actions">
        <button class="btn secondary block" onclick="goLanding()">Back to start</button>
      </div>
    </div>
  `;
}

/* ---------- Tela de escolha dos decks ---------- */
function renderTransDecks() {
  const selecionados = state.transDeckSelection;
  const stats = loadTransDeckStats();
  const unidade = TRANS_UNITS[state.transUnit];
  const decksDaUnidade = getTransDecksForUnit(state.transUnit);
  const totalSelecionado = selecionados.reduce((n, k) => n + getTransCardsForDeck(k).length, 0);

  app.innerHTML = `
    <div class="card">
      <span class="q-level">${escapeHtml(unidade ? unidade.label : "")}</span>
      <h2>Which decks do you want to practise?</h2>
      <p class="lead">Each card shows a Portuguese sentence for you to write in English.
      Pick as many decks as you like — the cards come shuffled.</p>
      <p class="trans-deck-legend">The percentage on the right is how much you got right <strong>on the first try</strong>
      the last time you practised that deck — not counting cards you marked correct afterwards.</p>

      <div class="trans-deck-list">
        ${decksDaUnidade.map(key => {
          const marcado = selecionados.indexOf(key) !== -1;
          const stat = stats[key];
          const nota = stat
            ? `<span class="trans-deck-score ${barClass(stat.pct)}" title="First-try hits last time: ${stat.correct} of ${stat.total}">${stat.pct}%</span>`
            : `<span class="trans-deck-score none" title="You have not practised this deck yet">&mdash;</span>`;
          return `
            <button class="trans-deck-option${marcado ? " selected" : ""}"
              aria-pressed="${marcado}" onclick="toggleTransDeck('${key}')">
              <span class="trans-deck-check">${marcado ? "✓" : ""}</span>
              <span class="trans-deck-name">
                <strong>${escapeHtml(TRANS_DECKS[key].label)}</strong>
                <span class="trans-deck-meta">${escapeHtml(TRANS_DECKS[key].tag)} &middot; ${getTransCardsForDeck(key).length} cards</span>
              </span>
              ${nota}
            </button>
          `;
        }).join("")}
      </div>

      <div class="actions">
        <button class="btn secondary" onclick="selectAllTransDecks(true)">Select all</button>
        ${selecionados.length ? `<button class="btn secondary" onclick="selectAllTransDecks(false)">Clear</button>` : ""}
      </div>

      <div class="actions" style="flex-direction:column; margin-top:18px;">
        <button class="btn block" ${totalSelecionado ? "" : "disabled"}
          onclick="startTransRound(${JSON.stringify(selecionados).replace(/"/g, "&quot;")})">
          ${totalSelecionado ? `Start — ${totalSelecionado} ${totalSelecionado === 1 ? "card" : "cards"}` : "Select at least one deck"}
        </button>
      </div>

      <div class="exit-actions">
        <button class="btn secondary block" onclick="openTransUnits()">Back to units</button>
      </div>
    </div>
  `;
}

/* Diff palavra a palavra: verde o que faltou na sua resposta, vermelho o que sobrou. */
function renderTransDiff(expected, typed) {
  const d = transDiffWords(expected, typed);
  const linha = (tokens, cls) => tokens.map(w =>
    w.state === "same" ? escapeHtml(w.text) : `<span class="${cls}">${escapeHtml(w.text)}</span>`
  ).join(" ");
  return `
    <div class="trans-answer-row">
      <span class="trans-answer-tag">You wrote</span>
      <span class="trans-answer-text">${typed.trim() ? linha(d.typed, "diff-extra") : "<em>(blank)</em>"}</span>
    </div>
    <div class="trans-answer-row">
      <span class="trans-answer-tag">Card answer</span>
      <span class="trans-answer-text">${linha(d.expected, "diff-miss")}</span>
    </div>
  `;
}

/* ---------- A tela do cartão ---------- */
function renderTransRound() {
  const card = transCurrentCard();
  const total = state.transCards.length;
  const current = state.transIndex + 1;
  const revealed = !!state.transRevealed[card.id];
  const grade = state.transGrades[card.id];
  const typed = state.transAnswers[card.id] || "";
  const isLast = state.transIndex === total - 1;

  let feedback = "";
  if (revealed) {
    const esperada = grade === "naoLembro"
      ? card.en
      : gradeTransAnswer(card, typed).best;

    const caixa = {
      certo:        { cls: "good", texto: "✅ Correct!" },
      quase:        { cls: "warn", texto: "🟡 So close — the translation is right, only the typing slipped." },
      aceitoManual: { cls: "good", texto: "✅ Marked correct by you." },
      diferente:    { cls: "bad",  texto: "❌ Does not match the card — compare below." },
      naoLembro:    { cls: "bad",  texto: "👀 Answer revealed. This card counts as a miss." },
    }[grade] || { cls: "bad", texto: "" };

    feedback = `
      <div class="explain-box ${caixa.cls}">${caixa.texto}</div>
      ${grade === "certo" || grade === "aceitoManual" ? `
        <div class="trans-answer-row">
          <span class="trans-answer-tag">Card answer</span>
          <span class="trans-answer-text">${escapeHtml(card.en)}</span>
        </div>
      ` : renderTransDiff(esperada, typed)}
      ${card.note ? `<p class="trans-note">${escapeHtml(card.note)}</p>` : ""}
      ${grade === "diferente" ? `
        <button class="btn secondary block" style="margin-top:14px;" onclick="markTransAnswerCorrect()">
          My answer is also correct
        </button>
      ` : ""}
    `;
  }

  app.innerHTML = `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-label">
          <span>${state.transIsRetry ? "Fix-ups &middot; card" : "Card"} ${current} of ${total}</span>
          <span>${Math.round((state.transIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.transIndex / total) * 100}%"></div></div>
      </div>

      <span class="q-level">Write it in English</span>
      <div class="q-prompt">${escapeHtml(card.pt)}</div>

      ${revealed ? "" : `
        <input type="text" id="trans-input" class="trans-input"
          autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          placeholder="Type the sentence in English and press Enter"
          onkeydown="if(event.key==='Enter'){event.preventDefault();submitTransAnswer();}">
        ${state.transEmptyWarn ? `<p class="trans-warn">Type something before checking — or use “I don\u2019t remember”.</p>` : ""}
        <div class="actions">
          <button class="btn" onclick="submitTransAnswer()">Check</button>
          <button class="btn secondary" onclick="skipTransCard()">I don’t remember</button>
        </div>
      `}

      ${feedback}

      ${revealed ? `
        <div class="actions">
          ${state.transIndex > 0 ? `<button class="btn secondary" onclick="prevTransCard()">Back</button>` : ""}
          <button class="btn" id="trans-next" onclick="nextTransCard()">${isLast ? "See results" : "Next card"}</button>
        </div>
      ` : ""}

      <div class="exit-actions">
        <button class="btn secondary block" onclick="requestExitTransRound()">Back to start</button>
      </div>
    </div>
    ${state.transExitConfirmOpen ? renderConfirmModal({
      title: "Leave the round?",
      message: "You have not finished this round. If you leave now, the answers so far are lost.",
      confirmLabel: "Leave and lose answers",
      cancelLabel: "Keep going",
      onConfirm: "confirmExitTransRound()",
      onCancel: "cancelExitTransRound()",
    }) : ""}
  `;

  /* Foco: no campo quando há o que digitar, senão no botão de avançar — assim
     o fluxo inteiro é digita → Enter → Enter, sem tirar a mão do teclado.
     innerHTML é síncrono, então os elementos já existem aqui. */
  if (!state.transExitConfirmOpen) {
    const campo = document.getElementById("trans-input");
    if (campo) campo.focus();
    else {
      const proximo = document.getElementById("trans-next");
      if (proximo) proximo.focus();
    }
  }
}

/* ---------- Resultado da rodada ---------- */
function renderTransResults() {
  const r = state.transResults;
  const decks = Object.keys(r.categoryPct);
  const statsAtual = loadTransDeckStats();
  const improvableNames = r.improvableCategories.map(k => TRANS_DECKS[k].label);

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${r.overallPct}%</div>
        <div class="score-level">${escapeHtml(r.label)}</div>
        <p style="margin-top:8px;">${r.totalCorrect} of ${r.totalQuestions} cards correct</p>
      </div>

      <h2>Performance by deck</h2>
      ${decks.map(key => `
        <div class="cat-row">
          <div class="cat-name">${escapeHtml(TRANS_DECKS[key].label)}</div>
          <div class="cat-bar-wrap"><div class="cat-bar-fill ${barClass(r.categoryPct[key])}" style="width:${r.categoryPct[key]}%"></div></div>
          <div class="cat-pct">${r.categoryPct[key]}%</div>
        </div>
      `).join("")}

      <div class="section-title">Decks not yet at 100%</div>
      ${improvableNames.length
        ? `<div class="weak-list">${improvableNames.map(n => `<span class="weak-chip">${escapeHtml(n)}</span>`).join("")}</div>`
        : `<div class="all-good">Excellent! You wrote every card in this round correctly.</div>`
      }

      ${r.isRetry ? `
        <div class="info-box">
          <strong>This was a fix-up round</strong> — only the sentences you had missed. Your deck
          score measures how much you get right <strong>on the first try across the whole deck</strong>,
          so it does not change here and stays at:
          <ul class="conv-pattern-list">
            ${decks.map(k => {
              const st = statsAtual[k];
              return `<li>${escapeHtml(TRANS_DECKS[k].label)}: <strong>${st ? st.pct + "%" : "not scored yet"}</strong></li>`;
            }).join("")}
          </ul>
          Practise the whole deck to update it.
        </div>
      ` : ""}

      ${renderTransMistakesReview(r.mistakes)}

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        ${r.mistakes.length
          ? `<button class="btn block" onclick="startTransRetry()">Redo only the ${r.mistakes.length === 1 ? "sentence I missed" : `${r.mistakes.length} sentences I missed`}</button>`
          : ""
        }
        <button class="btn${r.isRetry ? "" : " secondary"} block" onclick='startTransRound(${JSON.stringify(decks)})'>Redo ${r.isRetry ? "the whole deck (updates the score)" : "this round"}</button>
        <button class="btn secondary block" onclick="openTransDecks()">Choose other decks</button>
        <button class="btn secondary block" onclick="openTransUnits()">Choose another unit</button>
        <button class="btn secondary block" onclick="goLanding()">Back to start</button>
      </div>
    </div>
  `;
}

function renderTransMistakesReview(mistakes) {
  if (!mistakes.length) return "";
  return `
    <div class="section-title">Review of the cards you missed</div>
    <div class="card" style="box-shadow:none; border-color:var(--border);">
      ${mistakes.map(m => {
        const card = TRANS_CARDS.find(c => c.id === m.cardId);
        if (!card) return "";
        const esperada = m.grade === "naoLembro" ? card.en : gradeTransAnswer(card, m.typed).best;
        return `
          <div class="trans-review-item">
            <div class="trans-review-pt">${escapeHtml(card.pt)}</div>
            ${m.grade === "naoLembro"
              ? `<div class="trans-answer-row">
                   <span class="trans-answer-tag">You did not recall</span>
                   <span class="trans-answer-text">${escapeHtml(card.en)}</span>
                 </div>`
              : renderTransDiff(esperada, m.typed)}
            ${card.note ? `<p class="trans-note">${escapeHtml(card.note)}</p>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

/* Preenche as partes geradas do fundo decorativo (estrelas e heatmap). Roda uma
   vez no boot: o fundo vive fora de #app, então render() nunca o reescreve. */
function initBackdrop() {
  const estrelas = document.getElementById("bg-stars");
  if (estrelas && !estrelas.childElementCount) {
    const cores = ["rgba(230,238,244,.9)", "rgba(230,238,244,.7)", "var(--acc)", "var(--acc2)"];
    let html = "";
    for (let i = 0; i < 70; i++) {
      const d = (Math.random() * 1.6 + 1).toFixed(1);
      const cor = cores[i % 7 === 0 ? 2 : (i % 11 === 0 ? 3 : i % 2)];
      html += `<div style="position:absolute;left:${(Math.random() * 100).toFixed(2)}%;`
            + `top:${(Math.random() * 100).toFixed(2)}%;width:${d}px;height:${d}px;`
            + `border-radius:50%;background:${cor};`
            + `animation:tw ${(Math.random() * 3.6 + 2.4).toFixed(1)}s ease-in-out infinite;`
            + `animation-delay:${(Math.random() * 6).toFixed(1)}s;"></div>`;
    }
    estrelas.innerHTML = html;
  }

  const heat = document.getElementById("bg-heat");
  if (heat && !heat.childElementCount) {
    let html = "";
    for (let i = 0; i < 40; i++) {
      const a = Math.pow(Math.random(), 1.6) * 0.5 + 0.04;
      html += `<div style="border-radius:3px;background:rgba(79,209,229,${a.toFixed(3)});"></div>`;
    }
    heat.innerHTML = html;
  }
}

initBackdrop();
render();
