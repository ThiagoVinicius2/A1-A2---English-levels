/* Validação dos quatro bancos: forma, não comportamento.

   É o teste mais barato da bateria e o que pega o erro mais comum de uma
   rodada nova — categoria sem prática, explicação a menos, id repetido,
   deck inexistente. Rode antes de qualquer outro. */
const { carregar, criarPlacar } = require("./comum.js");
const A = carregar();
const p = criarPlacar("VALIDAÇÃO DOS BANCOS");

/* ============ 1. Teste A1-A2 (js/data.js) ============ */
const idsTeste = {};
[["TEST_QUESTIONS", A.TEST_QUESTIONS], ["PRACTICE_QUESTIONS", A.PRACTICE_QUESTIONS]].forEach(([nome, banco]) => {
  p.ok(Array.isArray(banco) && banco.length > 0, `${nome} existe e não está vazio`);
  (banco || []).forEach(q => {
    p.ok(!!A.CATEGORIES[q.category], `${nome} ${q.id}: categoria "${q.category}" não existe em CATEGORIES`);
    p.ok(q.options && q.options.length === 4, `${nome} ${q.id}: 4 opções (tem ${q.options && q.options.length})`);
    p.ok(q.explanations && q.explanations.length === 4, `${nome} ${q.id}: 4 explicações (tem ${q.explanations && q.explanations.length})`);
    p.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, `${nome} ${q.id}: correct fora do intervalo (${q.correct})`);
    const k = nome + "/" + q.id;
    p.ok(!idsTeste[k], `${nome} ${q.id}: id repetido`);
    idsTeste[k] = true;
  });
});
Object.keys(A.CATEGORIES).forEach(cat => {
  p.ok(A.TEST_QUESTIONS.some(q => q.category === cat), `categoria ${cat}: tem questão no teste`);
  p.ok(A.PRACTICE_QUESTIONS.some(q => q.category === cat), `categoria ${cat}: tem questão na prática`);
});

/* ============ 2. Erros da Conversa Real (js/data-conversation.js) ============ */
const porCat = {};
Object.keys(A.CONV_CATEGORIES).forEach(k => {
  const c = A.CONV_CATEGORIES[k];
  p.ok(!!c.label && !!c.tag, `CONV_CATEGORIES ${k}: precisa de label e tag`);
  porCat[k] = { teste: 0, pratica: 0, formas: {} };
});
const vistos = {};
[["CONV_TEST_QUESTIONS", A.CONV_TEST_QUESTIONS, "teste"],
 ["CONV_PRACTICE_QUESTIONS", A.CONV_PRACTICE_QUESTIONS, "pratica"]].forEach(([nome, banco, qual]) => {
  banco.forEach(q => {
    p.ok(!!A.CONV_CATEGORIES[q.category], `${nome} ${q.id}: categoria "${q.category}" não existe`);
    p.ok(!vistos[q.id], `${nome} ${q.id}: id repetido no módulo da conversa`);
    vistos[q.id] = true;
    if (porCat[q.category]) { porCat[q.category][qual]++; porCat[q.category].formas[q.kind] = true; }
    p.ok(q.kind === "choice" || q.kind === "write", `${nome} ${q.id}: kind precisa ser choice ou write (é "${q.kind}")`);
    if (q.kind === "choice") {
      p.ok(q.options && q.options.length === 4, `${nome} ${q.id}: 4 opções`);
      p.ok(q.explanations && q.explanations.length === 4, `${nome} ${q.id}: 4 explicações`);
      p.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, `${nome} ${q.id}: correct fora do intervalo`);
      if (q.explanations && q.explanations.length === 4) {
        q.explanations.forEach((e, i) => {
          const esperado = i === q.correct ? /^Correto!/ : /^Errado\./;
          p.ok(esperado.test(e), `${nome} ${q.id}: explicação ${i} devia começar com ${i === q.correct ? "Correto!" : "Errado."}`);
        });
      }
    } else {
      p.ok(!!q.task, `${nome} ${q.id}: questão digitada precisa de task`);
      p.ok(!!q.answer, `${nome} ${q.id}: questão digitada precisa de answer`);
      p.ok(!!q.explain, `${nome} ${q.id}: questão digitada precisa de explain`);
      p.ok(q.accept === undefined || Array.isArray(q.accept), `${nome} ${q.id}: accept precisa ser lista`);
    }
  });
});
Object.keys(porCat).forEach(k => {
  p.ok(porCat[k].teste > 0, `categoria ${k}: tem questão no CONV_TEST_QUESTIONS`);
  p.ok(porCat[k].pratica > 0, `categoria ${k}: tem questão no CONV_PRACTICE_QUESTIONS`);
});

/* O getConvPracticeForCategory() mora no fim do js/data-conversation.js e já
   se perdeu uma vez numa rodada nova: o banco validava, os testes passavam, e
   a prática dirigida quebrava no navegador com "is not defined". */
p.ok(typeof A.getConvPracticeForCategory === "function",
     "getConvPracticeForCategory() existe no fim do js/data-conversation.js");
if (typeof A.getConvPracticeForCategory === "function") {
  let somaHelper = 0;
  Object.keys(porCat).forEach(k => {
    const n = A.getConvPracticeForCategory(k).length;
    p.ok(n === porCat[k].pratica, `getConvPracticeForCategory("${k}"): ${n}, o banco tem ${porCat[k].pratica}`);
    somaHelper += n;
  });
  p.ok(somaHelper === A.CONV_PRACTICE_QUESTIONS.length,
       `o helper devolve ${somaHelper} exercícios, o banco tem ${A.CONV_PRACTICE_QUESTIONS.length}`);
}

/* Índice da resposta certa equilibrado nas de escolher: se a última posição
   quase nunca é a certa, dá para chutar por eliminação. */
const dist = { 0: 0, 1: 0, 2: 0, 3: 0 };
A.CONV_TEST_QUESTIONS.filter(q => q.kind === "choice").forEach(q => dist[q.correct]++);
const nEscolher = A.CONV_TEST_QUESTIONS.filter(q => q.kind === "choice").length;
p.nota(`conversa: ${A.CONV_TEST_QUESTIONS.length} no teste, ${A.CONV_PRACTICE_QUESTIONS.length} na prática, ` +
        `${nEscolher} de escolher, distribuição do correct ${JSON.stringify(dist)}`);

/* ============ 3. Do Português para o Inglês (js/data-translate.js) ============ */
const idsCartao = {};
A.TRANS_CARDS.forEach(c => {
  p.ok(!idsCartao[c.id], `cartão ${c.id}: id repetido`);
  idsCartao[c.id] = true;
  p.ok(!!A.TRANS_DECKS[c.deck], `cartão ${c.id}: deck "${c.deck}" não existe em TRANS_DECKS`);
  p.ok(typeof c.pt === "string" && c.pt.trim().length > 0, `cartão ${c.id}: pt vazio`);
  p.ok(typeof c.en === "string" && c.en.trim().length > 0, `cartão ${c.id}: en vazio`);
  if (c.accept !== undefined) {
    p.ok(Array.isArray(c.accept) && c.accept.every(a => typeof a === "string" && a.trim()),
         `cartão ${c.id}: accept precisa ser lista de strings não vazias`);
  }
  if (c.note !== undefined) p.ok(typeof c.note === "string" && c.note.trim(), `cartão ${c.id}: note vazia`);
  if (c.ctx !== undefined) {
    p.ok(typeof c.ctx === "string" && c.ctx.trim().length > 0 && c.ctx.length <= 90,
         `cartão ${c.id}: ctx precisa ser string curta e não vazia (tem ${c.ctx && c.ctx.length})`);
  }
});
Object.keys(A.TRANS_DECKS).forEach(k => {
  const d = A.TRANS_DECKS[k];
  p.ok(!!d.label && !!d.tag && !!d.unit, `deck ${k}: precisa de unit, label e tag`);
  p.ok(!!A.TRANS_UNITS[d.unit], `deck ${k}: unidade "${d.unit}" não existe em TRANS_UNITS`);
  p.ok(k.indexOf(d.unit + "-") === 0, `deck ${k}: a chave precisa começar com "${d.unit}-"`);
  p.ok(A.getTransCardsForDeck(k).length > 0, `deck ${k}: está sem cartão`);
});
p.ok(Object.keys(A.TRANS_UNITS).length === 15, `TRANS_UNITS tem 15 unidades (tem ${Object.keys(A.TRANS_UNITS).length})`);
p.nota(`tradução: ${A.TRANS_CARDS.length} cartões em ${Object.keys(A.TRANS_DECKS).length} decks, ` +
        `${Object.keys(A.TRANS_UNITS).filter(u => A.getTransDecksForUnit(u).length).length} unidades carregadas`);

/* ============ 4. Entrevista (js/data-interview.js) ============ */
/* A forma segue o kind:
   - mirror: a resposta padrão vive em partes[], e a tela compara cada parte
     com o que a pessoa escreve. Sem partes não há rodada;
   - soon:   ainda sem resposta padrão. Fica fora da rodada, e `pontos` é o
     roteiro do que essa resposta precisa cobrir. */
const idsEntrevista = {};
p.ok(Array.isArray(A.INTERVIEW_QUESTIONS) && A.INTERVIEW_QUESTIONS.length > 0,
     "INTERVIEW_QUESTIONS existe e não está vazio");
(A.INTERVIEW_QUESTIONS || []).forEach(q => {
  p.ok(!idsEntrevista[q.id], `entrevista ${q.id}: id repetido`);
  idsEntrevista[q.id] = true;
  p.ok(q.kind === "mirror" || q.kind === "soon", `entrevista ${q.id}: kind precisa ser mirror ou soon (é "${q.kind}")`);
  p.ok(typeof q.question === "string" && q.question.trim(), `entrevista ${q.id}: question vazia`);
  p.ok(typeof q.tag === "string" && q.tag.trim(), `entrevista ${q.id}: tag vazia`);
  p.ok(typeof q.porque === "string" && q.porque.trim().length > 40, `entrevista ${q.id}: porque curto demais`);
  p.ok(typeof q.modelo === "string" && q.modelo.trim(), `entrevista ${q.id}: modelo vazio`);
  p.ok(A.getInterviewQuestionById(q.id) === q, `entrevista ${q.id}: getInterviewQuestionById não devolve a pergunta`);

  if (A.interviewIsMirror(q)) {
    /* A resposta vem em blocos temáticos, e o modelo é a emenda deles. */
    p.ok(Array.isArray(q.partes) && q.partes.length >= 2,
         `entrevista ${q.id}: mirror precisa de partes[] (os blocos da resposta)`);
    (q.partes || []).forEach((parte, i) => {
      p.ok(typeof parte.topic === "string" && parte.topic.trim(),
           `entrevista ${q.id} bloco ${i + 1}: topic vazio (é o que a tela mostra no lugar da deixa)`);
      p.ok(typeof parte.en === "string" && parte.en.trim(), `entrevista ${q.id} bloco ${i + 1}: en vazio`);
      p.ok(parte.pt === undefined, `entrevista ${q.id} bloco ${i + 1}: bloco não leva pt — a tela não dá deixa em português`);
      /* a mesma rede do módulo de tradução: nenhum bloco pode nascer
         reprovando a própria resposta */
      const propria = A.interviewCheckText(parte.en, parte.en);
      p.ok(propria.acertos === propria.total && propria.sobraram === 0,
           `entrevista ${q.id} bloco ${i + 1}: a própria resposta não contou 100%`);
      p.ok(A.gradeTransAnswer({ en: parte.en }, parte.en).level === "certo",
           `entrevista ${q.id} bloco ${i + 1}: a própria resposta foi reprovada pelo corretor`);
      const n = A.interviewWordCount(parte.en);
      p.ok(n >= 15 && n <= 70,
           `entrevista ${q.id} bloco ${i + 1}: ${n} palavras — fora da faixa que cabe numa tela (15 a 70)`);
    });
    /* O modelo mostrado no fim TEM de ser a emenda dos blocos: editar um bloco
       e esquecer o modelo faria a tela ensinar uma resposta e cobrar outra. */
    const junta = t => String(t).replace(/\s+/g, " ").trim();
    p.ok(junta(q.partes.map(x => x.en).join(" ")) === junta(q.modelo),
         `entrevista ${q.id}: o modelo não é a emenda dos blocos — editou um e esqueceu o outro?`);
    /* e a soma das palavras dos blocos é o denominador que a tela anuncia */
    p.ok(A.interviewTotalWords(q) === A.interviewCheckText(q.modelo, "").total,
         `entrevista ${q.id}: a soma dos blocos (${A.interviewTotalWords(q)}) não bate com a resposta inteira`);
    p.ok(q.pontos === undefined, `entrevista ${q.id}: mirror não usa pontos`);
  } else {
    /* Pergunta ainda sem resposta padrão: fica fora da rodada, e o que ela
       guarda é o material para escrever a resposta. */
    p.ok(Array.isArray(q.pontos) && q.pontos.length >= 3 && q.pontos.every(x => typeof x === "string" && x.trim()),
         `entrevista ${q.id}: pontos precisa ter 3+ strings não vazias (é o roteiro para escrever a resposta)`);
    p.ok(q.partes === undefined, `entrevista ${q.id}: soon não tem partes — se tem, o kind devia ser mirror`);
  }
});
const espelho = (A.INTERVIEW_QUESTIONS || []).filter(A.interviewIsMirror);
p.ok(A.getInterviewRound().length === espelho.length,
     "a rodada é exatamente o conjunto das perguntas com resposta padrão");
p.ok(A.getInterviewRound().every(A.interviewIsMirror),
     "nenhuma pergunta sem resposta padrão pode entrar na rodada");
p.ok(espelho.length >= 1, "ao menos uma pergunta tem resposta padrão, senão não há rodada");
p.nota(`entrevista: ${(A.INTERVIEW_QUESTIONS || []).length} perguntas — ${espelho.length} na rodada ` +
       `(${espelho.reduce((t, q) => t + A.interviewWordCount(q.modelo), 0)} palavras em ` +
       `${espelho.reduce((t, q) => t + q.partes.length, 0)} blocos), ` +
       `${(A.INTERVIEW_QUESTIONS || []).length - espelho.length} esperando a resposta padrão`);

p.fim();
