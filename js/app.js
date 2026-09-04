/* ===================== Estado da aplicação ===================== */
const STORAGE_KEY = "enCheckLastResults";
const WEAK_THRESHOLD = 75; // % mínimo para considerar a categoria "dominada"

const state = {
  view: "landing",       // landing | test | results | exercise | exerciseSummary
  testQuestions: [],
  testIndex: 0,
  testAnswers: {},        // { questionId: selectedOptionIndex }
  results: null,          // computed after test
  exerciseQuestions: [],
  exerciseIndex: 0,
  exerciseAnswers: {},    // { questionId: selectedOptionIndex }
  exerciseRevealed: {},   // { questionId: true } once answered
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
  if (overall >= 85) return "Nível A2 consolidado — pronto(a) para avançar ao B1";
  if (overall >= 65) return "Nível A2";
  if (overall >= 40) return "Nível A1";
  return "Iniciante (pré-A1) — vamos reforçar o básico";
}

function saveResults(results) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: new Date().toISOString(),
      ...results,
    }));
  } catch (e) { /* localStorage indisponível — segue sem persistir */ }
}

function loadResults() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

/* ===================== Navegação ===================== */
function goLanding() {
  state.view = "landing";
  render();
}

function startTest() {
  state.testQuestions = shuffle(TEST_QUESTIONS);
  state.testIndex = 0;
  state.testAnswers = {};
  state.results = null;
  state.view = "test";
  render();
}

function selectTestOption(qId, optIndex) {
  state.testAnswers[qId] = optIndex;
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
  state.testQuestions.forEach(q => {
    const sel = state.testAnswers[q.id];
    byCategory[q.category].total++;
    if (sel === q.correct) {
      byCategory[q.category].correct++;
      totalCorrect++;
    }
  });

  const categoryPct = {};
  const weakCategories = [];
  Object.keys(byCategory).forEach(key => {
    const c = byCategory[key];
    const p = pct(c.correct, c.total);
    categoryPct[key] = p;
    if (p < WEAK_THRESHOLD) weakCategories.push(key);
  });

  const overallPct = pct(totalCorrect, state.testQuestions.length);

  state.results = {
    overallPct,
    cefr: cefrLabel(overallPct),
    categoryPct,
    weakCategories,
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

/* ===================== Render principal ===================== */
function render() {
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  if (state.view === "landing") return renderLanding();
  if (state.view === "test") return renderTest();
  if (state.view === "results") return renderResults();
  if (state.view === "exercise") return renderExercise();
  if (state.view === "exerciseSummary") return renderExerciseSummary();
}

/* ---------- Landing ---------- */
function renderLanding() {
  const last = loadResults();
  const lastBlock = last ? `
    <div class="last-result">
      <strong>Último resultado:</strong> ${last.overallPct}% de acertos — ${escapeHtml(last.cefr)}
      <br>${last.weakCategories.length
        ? `Pontos a reforçar: ${last.weakCategories.map(k => CATEGORIES[k].label).join(", ")}`
        : "Nenhum ponto fraco identificado da última vez. 🎉"}
    </div>
  ` : "";

  const practiceShortcut = last && last.weakCategories.length ? `
    <button class="btn secondary block" onclick="startExercises(${JSON.stringify(last.weakCategories).replace(/"/g, "&quot;")})">
      Praticar meus pontos fracos (do último teste)
    </button>
  ` : "";

  app.innerHTML = `
    <div class="card">
      <div class="hero-badges">
        <span class="badge">Nível A1</span>
        <span class="badge">Nível A2</span>
      </div>
      <h1>Teste de nivelamento de Inglês</h1>
      <p>Responda ${TEST_QUESTIONS.length} questões de gramática e vocabulário básico. Ao final, você recebe seu
      desempenho por categoria e uma lista de exercícios de reforço feita sob medida para os pontos em que você
      errou mais — cada exercício explica por que a resposta certa é certa e por que as outras opções estão erradas.</p>

      <div class="info-box">
        O teste cobre:
        <ul>
          ${Object.values(CATEGORIES).map(c => `<li>${escapeHtml(c.label)} (${c.level})</li>`).join("")}
        </ul>
      </div>

      ${lastBlock}

      <div class="actions" style="flex-direction:column;">
        <button class="btn block" onclick="startTest()">Iniciar teste</button>
        ${practiceShortcut}
      </div>
    </div>
  `;
}

/* ---------- Test ---------- */
function renderTest() {
  const q = state.testQuestions[state.testIndex];
  const total = state.testQuestions.length;
  const current = state.testIndex + 1;
  const selected = state.testAnswers[q.id];
  const isLast = state.testIndex === total - 1;

  app.innerHTML = `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-label">
          <span>Questão ${current} de ${total}</span>
          <span>${Math.round((state.testIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.testIndex / total) * 100}%"></div></div>
      </div>

      <span class="q-level">${CATEGORIES[q.category].level} &middot; ${escapeHtml(CATEGORIES[q.category].label)}</span>
      <div class="q-prompt">${escapeHtml(q.prompt)}</div>

      <div class="options">
        ${q.options.map((opt, i) => `
          <button class="option ${selected === i ? "selected" : ""}" onclick="selectTestOption('${q.id}', ${i})">
            ${escapeHtml(opt)}
          </button>
        `).join("")}
      </div>

      <div class="actions">
        ${state.testIndex > 0 ? `<button class="btn secondary" onclick="prevTestQuestion()">Voltar</button>` : ""}
        <button class="btn" ${selected === undefined ? "disabled" : ""} onclick="nextTestQuestion()">
          ${isLast ? "Ver resultado" : "Próxima"}
        </button>
      </div>
    </div>
  `;
}

/* ---------- Results ---------- */
function renderResults() {
  const r = state.results;
  const weakNames = r.weakCategories.map(k => CATEGORIES[k].label);

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${r.overallPct}%</div>
        <div class="score-level">${escapeHtml(r.cefr)}</div>
        <p style="margin-top:8px;">${r.totalCorrect} de ${r.totalQuestions} questões corretas</p>
      </div>

      <h2>Desempenho por categoria</h2>
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

      <div class="section-title">Pontos a reforçar</div>
      ${weakNames.length
        ? `<div class="weak-list">${weakNames.map(n => `<span class="weak-chip">${escapeHtml(n)}</span>`).join("")}</div>`
        : `<div class="all-good">Muito bem! Você não teve pontos fracos abaixo de ${WEAK_THRESHOLD}% neste teste.</div>`
      }

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        ${weakNames.length
          ? `<button class="btn block" onclick='startExercises(${JSON.stringify(r.weakCategories)})'>Praticar meus pontos fracos</button>`
          : `<button class="btn block" onclick='startExercises(${JSON.stringify(Object.keys(CATEGORIES))})'>Praticar todas as categorias (revisão geral)</button>`
        }
        <button class="btn secondary block" onclick="startTest()">Refazer o teste</button>
        <button class="btn secondary block" onclick="goLanding()">Voltar ao início</button>
      </div>
    </div>
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
          <span>Exercício ${current} de ${total}</span>
          <span>${Math.round((state.exerciseIndex / total) * 100)}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(state.exerciseIndex / total) * 100}%"></div></div>
      </div>

      <div class="ex-header">
        <span class="ex-cat-label">${escapeHtml(CATEGORIES[q.category].label)}</span>
        <span class="q-level" style="margin:0;">${CATEGORIES[q.category].level}</span>
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
          ${selected === q.correct ? "✅ Você acertou!" : "❌ Não foi dessa vez — veja as explicações abaixo."}
        </div>
        <div class="explain-list">
          ${q.options.map((opt, i) => `
            <div class="explain-item ${i === q.correct ? "is-correct" : ""}">
              <strong>${escapeHtml(opt)}:</strong> ${escapeHtml(q.explanations[i])}
            </div>
          `).join("")}
        </div>
        <div class="actions">
          <button class="btn block" onclick="nextExercise()">${isLast ? "Ver resumo" : "Próximo exercício"}</button>
        </div>
      ` : `
        <p style="margin-top:16px; font-size:0.85rem;">Escolha uma opção para ver a explicação.</p>
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

  app.innerHTML = `
    <div class="card">
      <div class="score-hero">
        <div class="score-number">${pct(correct, total)}%</div>
        <div class="score-level">Resultado da prática</div>
        <p style="margin-top:8px;">${correct} de ${total} exercícios corretos</p>
      </div>

      <h2>Por categoria</h2>
      ${Object.keys(byCategory).map(key => `
        <div class="summary-row">
          <span>${escapeHtml(CATEGORIES[key].label)}</span>
          <strong>${byCategory[key].correct}/${byCategory[key].total}</strong>
        </div>
      `).join("")}

      <div class="actions" style="flex-direction:column; margin-top:24px;">
        <button class="btn block" onclick='startExercises(${JSON.stringify(Object.keys(byCategory))})'>Praticar essas categorias de novo</button>
        <button class="btn secondary block" onclick="startTest()">Refazer o teste completo</button>
        <button class="btn secondary block" onclick="goLanding()">Voltar ao início</button>
      </div>
    </div>
  `;
}

/* ===================== Início ===================== */
render();
