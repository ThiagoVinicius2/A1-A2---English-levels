/* Rodada completa numa unidade, no Chromium: node testes/smoke_unidade.js 13

   É o teste da importação. Passa pelos quatro vereditos (acerto, typo,
   resposta diferente com autoavaliação e "não lembro") no maior deck da
   unidade e confere que a porcentagem da tela de resultado é a que a régua
   manda. Sem argumento, roda na última unidade carregada. */
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const { carregar, criarPlacar, RAIZ } = require("./comum.js");
const A = carregar();

const carregadas = Object.keys(A.TRANS_UNITS).filter(u => A.getTransDecksForUnit(u).length);
const arg = process.argv[2];
const unidade = arg ? "u" + String(arg).replace(/\D/g, "").padStart(2, "0") : carregadas[carregadas.length - 1];
const p = criarPlacar(`SMOKE DA ${(A.TRANS_UNITS[unidade] || {}).label || unidade}`);

(async () => {
  if (carregadas.indexOf(unidade) === -1) { p.ok(false, `a unidade ${unidade} não tem deck carregado`); return p.fim(); }
  const decks = A.getTransDecksForUnit(unidade);
  const alvo = decks.slice().sort((a, b) => A.getTransCardsForDeck(b).length - A.getTransCardsForDeck(a).length)[0];
  const cartoesDoDeck = A.getTransCardsForDeck(alvo);
  const porPt = {};
  cartoesDoDeck.forEach(c => porPt[c.pt.trim()] = c);

  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errosJs = [];
  page.on("pageerror", e => errosJs.push(String(e)));
  page.on("console", m => {
    if (m.type() === "error" && !/net::ERR|certificate|fonts\.googleapis|favicon/i.test(m.text())) errosJs.push(m.text());
  });

  await page.goto("file://" + RAIZ + "/index.html");
  await page.click("button:has-text('Translate sentences')");
  await page.waitForSelector(".unit-grid");
  const posicao = carregadas.indexOf(unidade) + 1;
  await page.click(`.unit-grid .module-card:not(.empty):nth-of-type(${posicao}) .module-link`);
  await page.waitForTimeout(150);
  p.ok(await page.evaluate(u => state.transUnit === u, unidade), `abriu a ${unidade}`);

  /* Unidade de um deck só já entrou na rodada ao clicar no card da unidade;
     a de vários decks para na escolha, e aí o deck é marcado pelo onclick,
     que traz a chave (o rótulo se repete entre unidades). */
  if (decks.length > 1) {
    await page.waitForSelector(".trans-deck-list");
    await page.click(`.trans-deck-option[onclick*="${alvo}"]`);
    await page.click("button:has-text('Start')");
  } else {
    p.ok(await page.evaluate(() => state.view === "transRound"),
         `${unidade}: um deck só, então o card da unidade abre direto na rodada`);
  }
  await page.waitForSelector("#trans-input");
  const quantos = await page.evaluate(() => state.transCards.length);
  p.ok(quantos === cartoesDoDeck.length, `a rodada trouxe os ${cartoesDoDeck.length} cartões do ${alvo} (trouxe ${quantos})`);
  p.ok(quantos >= 4, `o deck ${alvo} tem cartão para os quatro vereditos (tem ${quantos})`);

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
    for (const rotulo of ["Next", "See results", "Finish"]) {
      const b = page.locator(`button:has-text('${rotulo}')`);
      if (await b.count()) { await b.first().click(); await page.waitForTimeout(40); return true; }
    }
    return false;
  }

  for (let i = 0; i < quantos; i++) {
    if (!(await page.evaluate(() => state.view === "transRound"))) break;
    await page.waitForSelector("#trans-input");
    const pt = (await page.locator(".q-prompt").first().innerText()).trim();
    const card = porPt[pt];
    if (!card) { p.ok(false, `o enunciado da tela não casa com nenhum cartão do deck: "${pt}"`); break; }
    if (i === 0) {
      const comTypo = typoQuase(card);
      p.ok(!!comTypo, `${card.id}: não achei uma mexida de uma letra que dê "quase"`);
      await page.fill("#trans-input", comTypo || card.en);
      await page.click("button:has-text('Check')");
      await page.waitForTimeout(80);
    } else if (i === 1) {
      await page.fill("#trans-input", "Something completely different here.");
      await page.click("button:has-text('Check')");
      await page.waitForTimeout(80);
      const auto = page.locator("button:has-text('My answer is also correct')");
      p.ok((await auto.count()) > 0, "a resposta diferente oferece a autoavaliação");
      if (await auto.count()) { await auto.first().click(); await page.waitForTimeout(60); }
    } else if (i === 2) {
      await page.click("button:has-text(\"I don’t remember\")");
      await page.waitForTimeout(80);
    } else {
      await page.fill("#trans-input", card.en);
      await page.click("button:has-text('Check')");
      await page.waitForTimeout(80);
    }
    if (!(await avancar())) break;
  }
  await page.waitForTimeout(250);
  p.ok(await page.evaluate(() => state.view === "transResults"), "chegou na tela de resultado");

  const notas = await page.evaluate(() => Object.keys(state.transGrades).map(k => state.transGrades[k]));
  const conta = n => notas.filter(x => x === n).length;
  p.ok(conta("quase") === 1, `o typo virou "quase"`);
  p.ok(conta("aceitoManual") === 1, `a autoavaliação virou "aceitoManual"`);
  p.ok(conta("naoLembro") === 1, `o "I don’t remember" virou "naoLembro"`);
  p.ok(conta("certo") === quantos - 3, `os outros ${quantos - 3} saíram "certo" — nenhum cartão do deck reprova a própria resposta`);

  const corpo = await page.locator("#app").innerText();
  const mostrado = (corpo.match(/(\d+)%/) || [])[1];
  const esperado = String(Math.round(((quantos - 1) / quantos) * 100));
  p.ok(mostrado === esperado,
       `resultado ${esperado}% — ${quantos - 1} de ${quantos} (typo e autoavaliação contam, "não lembro" não) — achei ${mostrado}%`);
  const gravado = await page.evaluate(k => JSON.parse(localStorage.getItem(k) || "{}"), "enCheckTransResults_r3");
  p.ok(gravado.decks && gravado.decks[alvo] && gravado.decks[alvo].pct === Number(esperado),
       `o histórico do ${alvo} gravou ${esperado}% (gravou ${gravado.decks && gravado.decks[alvo] && gravado.decks[alvo].pct}%)`);

  p.ok(errosJs.length === 0, `erros de JS: ${errosJs.join(" | ")}`);
  p.nota(`${unidade}: rodada de ${quantos} cartões no ${alvo} — ${notas.join(", ")}`);
  await browser.close();
  p.fim();
})();
