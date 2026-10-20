/* Carrega os quatro arquivos de js/ fora do navegador.

   Os bancos e o corretor são funções puras, então dá para exercitá-los só com
   o node — e é por isso que os testes de dado rodam em menos de um segundo.
   O js/app.js precisa de DOM e fica de fora daqui: quem o exercita são os
   testes de navegador, com o Playwright. */
const fs = require("fs"), vm = require("vm"), path = require("path");

const RAIZ = path.resolve(__dirname, "..");

function carregar(arquivos = ["data.js", "data-conversation.js", "data-translate.js"]) {
  const ctx = {};
  vm.createContext(ctx);
  arquivos.forEach(a => vm.runInContext(fs.readFileSync(path.join(RAIZ, "js", a), "utf8"), ctx, { filename: a }));
  /* exporta para fora do contexto tudo o que os testes usam */
  vm.runInContext(`this.API = {
    TEST_QUESTIONS: typeof TEST_QUESTIONS !== "undefined" ? TEST_QUESTIONS : null,
    PRACTICE_QUESTIONS: typeof PRACTICE_QUESTIONS !== "undefined" ? PRACTICE_QUESTIONS : null,
    CATEGORIES: typeof CATEGORIES !== "undefined" ? CATEGORIES : null,
    CONV_CATEGORIES: typeof CONV_CATEGORIES !== "undefined" ? CONV_CATEGORIES : null,
    CONV_TEST_QUESTIONS: typeof CONV_TEST_QUESTIONS !== "undefined" ? CONV_TEST_QUESTIONS : null,
    CONV_PRACTICE_QUESTIONS: typeof CONV_PRACTICE_QUESTIONS !== "undefined" ? CONV_PRACTICE_QUESTIONS : null,
    getConvPracticeForCategory: typeof getConvPracticeForCategory !== "undefined" ? getConvPracticeForCategory : null,
    TRANS_UNITS: typeof TRANS_UNITS !== "undefined" ? TRANS_UNITS : null,
    TRANS_DECKS: typeof TRANS_DECKS !== "undefined" ? TRANS_DECKS : null,
    TRANS_CARDS: typeof TRANS_CARDS !== "undefined" ? TRANS_CARDS : null,
    TRANS_CONTRACTIONS: typeof TRANS_CONTRACTIONS !== "undefined" ? TRANS_CONTRACTIONS : null,
    TRANS_SYNONYMS: typeof TRANS_SYNONYMS !== "undefined" ? TRANS_SYNONYMS : null,
    TRANS_NUMBERS: typeof TRANS_NUMBERS !== "undefined" ? TRANS_NUMBERS : null,
    transNormalize: typeof transNormalize !== "undefined" ? transNormalize : null,
    transNormalizeVariants: typeof transNormalizeVariants !== "undefined" ? transNormalizeVariants : null,
    transExpectedAnswers: typeof transExpectedAnswers !== "undefined" ? transExpectedAnswers : null,
    gradeTransAnswer: typeof gradeTransAnswer !== "undefined" ? gradeTransAnswer : null,
    transDiffWords: typeof transDiffWords !== "undefined" ? transDiffWords : null,
    getTransCardsForDeck: typeof getTransCardsForDeck !== "undefined" ? getTransCardsForDeck : null,
    getTransDecksForUnit: typeof getTransDecksForUnit !== "undefined" ? getTransDecksForUnit : null,
    countTransCardsForUnit: typeof countTransCardsForUnit !== "undefined" ? countTransCardsForUnit : null,
  };`, ctx);
  return ctx.API;
}

/* Contador de falhas compartilhado: todo teste imprime uma linha por caso e
   sai com código 1 se alguma falhou, para dar para encadear no shell. */
function criarPlacar(titulo) {
  const falhas = [];
  let total = 0;
  return {
    ok(cond, msg) {
      total++;
      if (!cond) { falhas.push(msg); console.log("  FALHOU  " + msg); }
    },
    nota(msg) { console.log("  " + msg); },
    fim() {
      console.log(`\n${titulo}: ${total} casos, ${falhas.length} falha(s)`);
      if (falhas.length) {
        console.log("\nFALHAS:");
        falhas.slice(0, 40).forEach(f => console.log("  - " + f));
        process.exit(1);
      }
      console.log("TUDO PASSOU");
    },
  };
}

module.exports = { carregar, criarPlacar, RAIZ };

/* ---- js/app.js fora do navegador ----
   O app.js termina em initBackdrop() + render() e mexe no DOM, então em node
   ele precisa de um esqueleto. Vale o esforço: convGradeWritten(),
   convRespostaCurta() e convIsRight() são funções puras e dão para testar sem
   subir o Chromium, que é 200 vezes mais lento. O que depende de tela de
   verdade continua nos testes de Playwright. */
function carregarApp() {
  const vazio = () => {
    const el = {
      innerHTML: "", textContent: "", style: {}, childElementCount: 0, dataset: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      appendChild() {}, addEventListener() {}, removeEventListener() {},
      setAttribute() {}, getAttribute() { return null; }, focus() {}, scrollIntoView() {},
      querySelector: () => vazio(), querySelectorAll: () => [],
    };
    return el;
  };
  const guardado = {};
  const ctx = {
    document: {
      getElementById: () => vazio(), querySelector: () => vazio(), querySelectorAll: () => [],
      createElement: () => vazio(), addEventListener() {}, body: vazio(),
    },
    localStorage: {
      getItem: k => (guardado[k] === undefined ? null : guardado[k]),
      setItem: (k, v) => { guardado[k] = String(v); },
      removeItem: k => { delete guardado[k]; },
    },
    console, setTimeout, clearTimeout, Math, Date, JSON,
    scrollTo() {}, requestAnimationFrame(f) { f(0); }, matchMedia: () => ({ matches: false, addEventListener() {} }),
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  ["data.js", "data-conversation.js", "data-translate.js", "app.js"].forEach(a =>
    vm.runInContext(fs.readFileSync(path.join(RAIZ, "js", a), "utf8"), ctx, { filename: a }));
  /* O "app" é o nó que as funções de render escrevem: devolvê-lo é o que
     permite conferir, em node, a PORCENTAGEM que a tela mostra — foi um erro
     de render (não de régua) que fez a prática da conversa devolver 7% com
     tudo certo. */
  vm.runInContext(`this.APP = {
    state, app,
    convIsWrite, convRespostaCurta, convGradeWritten, convIsRight,
    startConvTest, finishConvTest, startConvExercises, renderConvExerciseSummary, renderConvResults,
    transIsHit, pct, shuffle,
    startTransRound, startTransRetry, finishTransRound, renderTransResults, renderTransDecks,
    loadTransDeckStats, saveTransDeckStats, openTransDecks,
    CONV_STORAGE_KEY, TRANS_STORAGE_KEY,
  };`, ctx);
  ctx.APP.localStorage = ctx.localStorage;
  ctx.APP.telaHtml = () => ctx.APP.app.innerHTML;
  return ctx.APP;
}

module.exports.carregarApp = carregarApp;
