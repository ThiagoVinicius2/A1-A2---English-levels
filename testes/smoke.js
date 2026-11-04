/* Smoke dos quatro módulos no Chromium, por file://.
   É o único teste que exercita o que só existe no navegador: o campo de
   digitação (foco e cursor), os onclick do HTML, o fundo decorativo fora do
   #app e, sobretudo, ERRO DE JS — foi assim que se descobriu que uma rodada
   nova do módulo da conversa havia perdido o getConvPracticeForCategory().

   O erro de certificado do Google Fonts é do proxy do ambiente e é ignorado. */
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const { carregar, criarPlacar, RAIZ } = require("./comum.js");
const A = carregar();
const p = criarPlacar("SMOKE DOS QUATRO MÓDULOS");

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errosJs = [];
  page.on("pageerror", e => errosJs.push(String(e)));
  page.on("console", m => {
    if (m.type() === "error" && !/net::ERR|certificate|fonts\.googleapis|favicon/i.test(m.text())) errosJs.push(m.text());
  });
  await page.goto("file://" + RAIZ + "/index.html");

  /* Na última questão o botão deixa de ser "Next" e passa a ser "See results" —
     um laço que só procura "Next" para na penúltima tela e nunca chega ao
     resultado (e aí o "%" do progresso ainda casa, o que esconde a falha). */
  /* O typo precisa ser um que o corretor realmente dê como "quase": dobrar a
     primeira letra às vezes cai num cartão curto e o veredito muda, e aí o
     teste falhava por causa do próprio teste. Então a mexida é escolhida
     consultando o corretor, que é a mesma função que a tela usa. */
  function typoQuase(card) {
    const letras = card.en.split("");
    for (let i = 0; i < letras.length; i++) {
      if (!/[a-z]/i.test(letras[i])) continue;
      const cand = card.en.slice(0, i) + letras[i] + card.en.slice(i);
      if (A.gradeTransAnswer(card, cand).level === "quase") return cand;
    }
    return null;
  }

  async function avancar() {
    for (const rotulo of ["Next", "See results", "See the results", "Finish"]) {
      const b = page.locator(`button:has-text('${rotulo}')`);
      if (await b.count()) { await b.first().click(); await page.waitForTimeout(40); return true; }
    }
    return false;
  }

  /* ---- a tela inicial tem os três cards e o fundo decorativo ---- */
  p.ok((await page.locator(".module-card").count()) === 4, "a tela inicial mostra os quatro módulos");
  p.ok((await page.locator(".backdrop").count()) === 1, "o fundo decorativo está no ar");
  p.ok((await page.locator("#bg-stars > div").count()) > 0, "initBackdrop() preencheu as estrelas");

  /* ================= Módulo 01: teste A1-A2 ================= */
  await page.click("button:has-text('Take the test')");
  await page.waitForSelector(".q-prompt");
  let n = 0;
  for (;;) {
    if (!(await page.evaluate(() => state.view === "test"))) break;
    const opcoes = page.locator(".option");
    if (!(await opcoes.count())) break;
    await opcoes.first().click();
    n++;
    if (!(await avancar())) break;
  }
  p.ok(n === A.TEST_QUESTIONS.length, `o teste respondeu as ${A.TEST_QUESTIONS.length} questões (respondeu ${n})`);
  await page.waitForTimeout(200);
  p.ok(await page.evaluate(() => state.view === "results"), "o teste chegou na tela de resultado");
  /* prática dirigida do módulo 01 */
  const atalho = page.locator("button:has-text('Practise')");
  if (await atalho.count()) {
    await atalho.first().click();
    await page.waitForTimeout(150);
    p.ok((await page.locator(".option").count()) > 0, "a prática dirigida do teste abriu com exercício");
  }

  /* ================= Módulo 02: erros da conversa ================= */
  await page.goto("file://" + RAIZ + "/index.html");
  await page.click(".module-card:nth-of-type(2) .module-link");
  await page.waitForSelector(".q-prompt");
  let respondidas = 0;
  for (;;) {
    /* a questão corrente sai do próprio state: responder por posição caía em
       questão aleatória, porque startConvTest() embaralha o banco */
    const q = await page.evaluate(() => {
      if (state.view !== "convTest") return null;     // já saiu para o resultado
      const atual = state.convTestQuestions[state.convTestIndex];
      return atual ? { id: atual.id, kind: atual.kind, answer: atual.answer, correct: atual.correct } : null;
    });
    if (!q) break;
    /* a PRIMEIRA sai errada de propósito: com 100% a tela de resultado não
       oferece a prática dirigida, e é justamente ela que já quebrou */
    const errarEssa = respondidas === 0;
    if (q.kind === "write") {
      await page.fill("#conv-input", errarEssa ? "something else entirely" : q.answer);
      await page.click("button:has-text('Check')");
    } else {
      const i = errarEssa ? (q.correct + 1) % 4 : q.correct;
      await page.locator(".option").nth(i).click();
    }
    respondidas++;
    await page.waitForTimeout(30);
    if (!(await avancar())) break;
  }
  p.ok(respondidas === A.CONV_TEST_QUESTIONS.length,
       `a revisão da conversa respondeu as ${A.CONV_TEST_QUESTIONS.length} questões (respondeu ${respondidas})`);
  await page.waitForTimeout(200);
  const resConv = await page.locator("#app").innerText();
  p.ok(await page.evaluate(() => state.view === "convResults"), "a conversa chegou na tela de resultado");
  p.nota("conversa: " + (resConv.match(/(\d+)%/) || [])[1] + "% na tela de resultado");
  /* prática dirigida: é a tela que já quebrou por falta do helper */
  const botaoPratica = page.locator("button:has-text('Practise patterns')");
  p.ok((await botaoPratica.count()) > 0, "a tela de resultado oferece a prática dirigida");
  if (await botaoPratica.count()) {
    await botaoPratica.first().click();
    await page.waitForTimeout(200);
    const tela = await page.locator("#app").innerText();
    p.ok(/Exercise|exercise|\d+ of \d+/.test(tela) || (await page.locator("#conv-input").count()) > 0,
         "a prática dirigida da conversa abriu (getConvPracticeForCategory existe)");
  }

  /* ================= Módulo 03: do português para o inglês ================= */
  await page.goto("file://" + RAIZ + "/index.html");
  await page.click("button:has-text('Translate sentences')");
  await page.waitForSelector(".unit-grid");
  const cards = await page.locator(".unit-grid .module-card").count();
  p.ok(cards === 15, `a grade mostra as 15 unidades (achei ${cards})`);
  const comLink = await page.locator(".unit-grid .module-card .module-link").count();
  const carregadas = Object.keys(A.TRANS_UNITS).filter(u => A.getTransDecksForUnit(u).length).length;
  p.ok(comLink === carregadas, `só as ${carregadas} unidades carregadas têm link (achei ${comLink})`);
  p.ok((await page.locator(".unit-grid .module-card.empty").count()) === 15 - carregadas,
       `as outras ${15 - carregadas} aparecem como "No decks yet"`);

  /* a unidade abre na tela de escolha de decks; o deck é escolhido pelo
     rótulo, e o alvo precisa de ao menos 5 cartões para caber acerto, typo,
     autoavaliação e "não lembro" na mesma rodada */
  const todas = Object.keys(A.TRANS_UNITS).filter(u => A.getTransDecksForUnit(u).length);
  const unidadeAlvo = todas[0];
  await page.click(`.unit-grid .module-card:not(.empty):nth-of-type(1) .module-link`);
  await page.waitForSelector(".trans-deck-list");
  const nomes = await page.locator(".trans-deck-name").allTextContents();
  p.ok(nomes.length > 0, "a tela de decks lista os decks da unidade");
  /* o deck precisa de pelo menos 5 cartões para caber acerto, typo,
     autoavaliação e "não lembro" na mesma rodada */
  const deckAlvo = Object.keys(A.TRANS_DECKS)
    .filter(k => A.TRANS_DECKS[k].unit === unidadeAlvo && A.getTransCardsForDeck(k).length >= 5)[0];
  const rotuloAlvo = A.TRANS_DECKS[deckAlvo].label;
  const iAlvo = nomes.findIndex(x => x.indexOf(rotuloAlvo) !== -1);
  p.ok(iAlvo >= 0, `o deck ${rotuloAlvo} está na lista da ${unidadeAlvo}`);
  await page.locator(".trans-deck-option").nth(iAlvo).click();
  /* O seletor precisa da classe: ":has-text" casa por SUBSTRING, e um rótulo
     de deck pode conter a palavra ("Stop and start, and what to show", na
     Unit 4). Sem a classe, o clique caía no deck em vez do botão, e o teste
     falhava com timeout no campo de digitação — por culpa do teste. */
  await page.click("button.btn.block:has-text('Start')");
  await page.waitForSelector("#trans-input");
  const quantos = await page.evaluate(() => state.transCards.length);

  /* um acerto, um typo, uma resposta diferente (com autoavaliação) e um "não lembro" */
  const porPt = {};
  A.TRANS_CARDS.forEach(c => porPt[c.pt.trim()] = c);
  /* Os quatro vereditos por POSIÇÃO, não por bandeira: a tela de "So close"
     também oferece o "My answer is also correct", então decidir pelo que está
     escrito fazia um passo comer o outro e o "não lembro" nunca rodava. */
  for (let i = 0; i < quantos; i++) {
    if (!(await page.evaluate(() => state.view === "transRound"))) break;
    await page.waitForSelector("#trans-input");
    const pt = (await page.locator(".q-prompt").first().innerText()).trim();
    const card = porPt[pt];
    if (!card) { p.ok(false, `o enunciado da tela não casa com nenhum cartão: "${pt}"`); break; }
    if (i === 0) {                       // typo de uma letra: tem de virar "quase"
      const comTypo = typoQuase(card);
      p.ok(!!comTypo, `${card.id}: não achei uma mexida de uma letra que dê "quase"`);
      await page.fill("#trans-input", comTypo || card.en);
      await page.click("button:has-text('Check')");
      await page.waitForTimeout(80);
    } else if (i === 1) {                // resposta diferente + autoavaliação
      await page.fill("#trans-input", "Something completely different here.");
      await page.click("button:has-text('Check')");
      await page.waitForTimeout(80);
      const auto = page.locator("button:has-text('My answer is also correct')");
      p.ok((await auto.count()) > 0, "a resposta diferente oferece a autoavaliação");
      if (await auto.count()) { await auto.first().click(); await page.waitForTimeout(60); }
    } else if (i === 2) {                // não lembro
      await page.click("button:has-text(\"I don’t remember\")");
      await page.waitForTimeout(80);
    } else {                             // resposta exata
      await page.fill("#trans-input", card.en);
      await page.click("button:has-text('Check')");
      await page.waitForTimeout(80);
    }
    if (!(await avancar())) break;
  }
  await page.waitForTimeout(250);
  p.ok(await page.evaluate(() => state.view === "transResults"), "a rodada de tradução chegou na tela de resultado");

  /* os vereditos saem do state, não do texto da tela */
  const notas = await page.evaluate(() => Object.keys(state.transGrades).map(k => state.transGrades[k]));
  const conta = n => notas.filter(x => x === n).length;
  p.ok(conta("quase") === 1, `o typo virou "quase" (notas: ${notas.join(", ")})`);
  p.ok(conta("aceitoManual") === 1, `a autoavaliação virou "aceitoManual" (notas: ${notas.join(", ")})`);
  p.ok(conta("naoLembro") === 1, `o "I don’t remember" virou "naoLembro" (notas: ${notas.join(", ")})`);
  p.ok(conta("certo") === quantos - 3, `os outros ${quantos - 3} cartões saíram "certo" (notas: ${notas.join(", ")})`);
  p.nota(`rodada de ${quantos} cartões: ${notas.join(", ")}`);
  const resTrans = await page.locator("#app").innerText();
  const mostrado = (resTrans.match(/(\d+)%/) || [])[1];
  const esperado = String(Math.round(((quantos - 1) / quantos) * 100));
  p.ok(mostrado === esperado,
       `resultado ${esperado}% — ${quantos - 1} de ${quantos} (typo e autoavaliação contam, "não lembro" não) — achei ${mostrado}%`);
  /* o histórico por deck foi gravado */
  const gravado = await page.evaluate(k => localStorage.getItem(k), "enCheckTransResults_r3");
  p.ok(!!gravado && /decks/.test(gravado), "o histórico por deck foi gravado no localStorage");
  /* e a tela de decks mostra a porcentagem */
  await page.click("button:has-text('Back')");
  await page.waitForTimeout(150);
  const telaDecks = await page.locator("#app").innerText();
  p.ok(/%/.test(telaDecks) || (await page.locator(".trans-deck-score").count()) > 0,
       "a tela de decks mostra a porcentagem por deck");


  /* ================= Módulo 04: entrevista ================= */
  /* O campo aqui é um <textarea> — o terceiro campo de digitação do projeto — e
     a resposta é um parágrafo inteiro. O que este trecho defende é justamente o
     que só quebra no navegador: o texto digitado sobreviver a um render() (o
     modal de saída reescreve o #app), e o checklist, que é a nota do módulo,
     responder ao clique. */
  await page.goto("file://" + RAIZ + "/index.html");
  await page.click("button:has-text('Practice the interview')");
  await page.waitForSelector("#interview-input");
  const perguntasTela = await page.evaluate(() => state.interviewQuestions.length);
  p.ok(perguntasTela === A.INTERVIEW_QUESTIONS.length,
       `a entrevista abriu com as ${A.INTERVIEW_QUESTIONS.length} perguntas (abriu ${perguntasTela})`);

  /* o rascunho não pode ir embora quando o modal de saída reescreve o #app */
  const rascunho = "I have been working with data for six years.";
  await page.fill("#interview-input", rascunho);
  await page.click(".exit-actions button:has-text('Back to start')");
  await page.waitForSelector(".modal-box");
  await page.click("button:has-text('Keep going')");
  await page.waitForSelector("#interview-input");
  p.ok((await page.inputValue("#interview-input")) === rascunho,
       "o texto digitado sobreviveu ao modal de saída (render() não pode levar o campo embora)");

  /* campo vazio avisa em vez de revelar a resposta modelo */
  await page.fill("#interview-input", "   ");
  await page.click("button:has-text('Check my answer')");
  await page.waitForTimeout(80);
  p.ok((await page.locator(".trans-warn").count()) > 0 && (await page.locator(".check-list").count()) === 0,
       "resposta vazia avisa e não revela o checklist nem o modelo");

  let marcadosSmoke = 0;
  let totalSmoke = 0;
  for (let i = 0; i < perguntasTela; i++) {
    if (!(await page.evaluate(() => state.view === "interview"))) break;
    await page.waitForSelector("#interview-input");
    const q = await page.evaluate(() => {
      const atual = state.interviewQuestions[state.interviewIndex];
      return { id: atual.id, pontos: atual.pontos.length, modelo: atual.modelo };
    });
    totalSmoke += q.pontos;
    if (i === 1) {                     // a segunda é pulada: vale zero
      await page.click("button:has-text('Skip this one')");
      await page.waitForTimeout(60);
    } else {
      /* responder com a resposta modelo: é o caminho que também confere a
         detecção de blocos e a contagem de palavras na tela */
      await page.fill("#interview-input", q.modelo);
      await page.click("button:has-text('Check my answer')");
      await page.waitForSelector(".check-list");
      p.ok((await page.locator(".phrase-chip.on").count()) > 0,
           `${q.id}: a resposta modelo devia acender ao menos um bloco de inglês`);
      p.ok((await page.locator(".explain-box.good").count()) > 0,
           `${q.id}: a resposta modelo devia cair dentro da faixa de palavras`);
      /* marca os dois primeiros pontos do checklist, e desmarca e remarca o
         primeiro — o clique precisa alternar, não só ligar */
      const linhas = page.locator(".check-row");
      p.ok((await linhas.count()) === q.pontos, `${q.id}: o checklist mostra os ${q.pontos} pontos`);
      await linhas.nth(0).click();
      await page.waitForTimeout(40);
      await linhas.nth(0).click();
      await page.waitForTimeout(40);
      p.ok((await page.locator(".check-row.on").count()) === 0, `${q.id}: clicar duas vezes desmarca o ponto`);
      await linhas.nth(0).click();
      await page.waitForTimeout(40);
      await linhas.nth(1).click();
      await page.waitForTimeout(40);
      marcadosSmoke += 2;
    }
    if (!(await avancar())) break;
  }
  await page.waitForTimeout(250);
  p.ok(await page.evaluate(() => state.view === "interviewResults"), "a entrevista chegou na tela de resultado");
  const esperadoEntrevista = Math.round((marcadosSmoke / totalSmoke) * 100);
  const telaEntrevista = await page.locator("#app").innerText();
  p.ok(telaEntrevista.indexOf(esperadoEntrevista + "%") !== -1,
       `a entrevista devia mostrar ${esperadoEntrevista}% (${marcadosSmoke} de ${totalSmoke} pontos)`);
  p.ok(telaEntrevista.indexOf(`${marcadosSmoke} of ${totalSmoke} checklist points`) !== -1,
       "a tela mostra os pontos marcados sobre o total");
  const gravadoEntrevista = await page.evaluate(k => localStorage.getItem(k), "enCheckInterviewResults_r1");
  p.ok(!!gravadoEntrevista && JSON.parse(gravadoEntrevista).overall === esperadoEntrevista,
       "o resultado da entrevista foi gravado com a mesma porcentagem da tela");
  p.nota(`entrevista: ${marcadosSmoke} de ${totalSmoke} pontos = ${esperadoEntrevista}%`);

  p.ok(errosJs.length === 0, `erros de JS: ${errosJs.join(" | ")}`);
  if (!errosJs.length) p.nota("nenhum erro de JS nos quatro módulos");
  await browser.close();
  p.fim();
})();
