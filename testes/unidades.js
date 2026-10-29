/* As 15 unidades do módulo de tradução, no Chromium.

   Percorre TODAS as unidades carregadas e confere a tela de decks de cada
   uma. As expectativas são derivadas do banco, não escritas à mão: já
   aconteceu de um teste falhar porque a expectativa estava velha, e não por
   haver bug. */
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const { carregar, criarPlacar, RAIZ } = require("./comum.js");
const A = carregar();
const p = criarPlacar("UNIDADES");

const carregadas = Object.keys(A.TRANS_UNITS).filter(u => A.getTransDecksForUnit(u).length);
const vazias = Object.keys(A.TRANS_UNITS).filter(u => !A.getTransDecksForUnit(u).length);

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errosJs = [];
  page.on("pageerror", e => errosJs.push(String(e)));

  /* ---- o histórico no formato antigo é ignorado, sem quebrar nada ----
     A migração do _r2 mapeava tudo para os decks da Unit 1 do curso, que
     deixaram de existir com a série de dados. O dado velho fica órfão. */
  await page.goto("file://" + RAIZ + "/index.html");
  await page.evaluate(() => localStorage.setItem("enCheckTransResults_r2", JSON.stringify({
    date: "2026-01-01T00:00:00.000Z",
    decks: { vocab2: { pct: 50, correct: 1, total: 2, date: "2026-01-01T00:00:00.000Z" } },
  })));
  await page.reload();
  const velho = await page.evaluate(() => loadTransDeckStats());
  p.ok(Object.keys(velho).length === 0, `o histórico no formato _r2 é ignorado (veio ${JSON.stringify(velho)})`);
  p.ok(errosJs.length === 0, `nenhum erro de JS ao ler o histórico velho: ${errosJs.join(" | ")}`);

  await page.click("button:has-text('Translate sentences')");
  await page.waitForSelector(".unit-grid");
  p.ok((await page.locator(".unit-grid .module-card").count()) === 15,
       `a grade mostra as 15 unidades (achei ${await page.locator(".unit-grid .module-card").count()})`);
  p.ok((await page.locator(".unit-grid .module-card .module-link").count()) === carregadas.length,
       `só as ${carregadas.length} unidades carregadas têm link`);
  p.ok((await page.locator(".unit-grid .module-card.empty").count()) === vazias.length,
       `as ${vazias.length} unidades sem baralho aparecem como "No decks yet"`);
  const rotulos = await page.locator(".unit-grid .module-card h3").allTextContents();
  p.ok(/Unit 1\b/.test(rotulos[0]) && /Unit 15/.test(rotulos[rotulos.length - 1]),
       `rotuladas de Unit 1 a Unit 15 (achei "${rotulos[0].trim()}" … "${rotulos[rotulos.length - 1].trim()}")`);
  /* a unidade vazia não é clicável */
  if (vazias.length) {
    const temLink = await page.locator(".unit-grid .module-card.empty .module-link").count();
    p.ok(temLink === 0, "unidade vazia não tem link");
  }

  /* ---- cada unidade carregada, uma por uma ----
     Toda unidade passa pela tela de escolha de decks. Houve um período em que
     unidade de um deck só abria direto na rodada (a série de dados nasceu
     assim), e este teste cobria as duas formas; com cinco decks por unidade
     não há mais unidade de deck único, e o passeio voltou a ser um só. */
  for (let i = 0; i < carregadas.length; i++) {
    const u = carregadas[i];
    const esperados = A.getTransDecksForUnit(u);
    await page.click(`.unit-grid .module-card:not(.empty):nth-of-type(${i + 1}) .module-link`);
    await page.waitForSelector(".trans-deck-list");
    const d = await page.evaluate(() => ({
      unidade: state.transUnit,
      view: state.view,
      decks: [...document.querySelectorAll(".trans-deck-option")].map(el => el.getAttribute("onclick")),
      titulo: (document.querySelector(".q-level") || {}).textContent || "",
    }));
    p.ok(d.unidade === u, `o ${i + 1}º card abre a ${u} (abriu ${d.unidade})`);
    p.ok(d.view === "transDecks", `${u}: passa pela tela de escolha (abriu "${d.view}")`);
    p.ok(d.decks.length === esperados.length,
         `${u}: a tela lista os ${esperados.length} decks da unidade (listou ${d.decks.length})`);
    p.ok(d.decks.every(on => on && on.indexOf(u + "-") !== -1),
         `${u}: nenhum deck de outra unidade vazou`);
    p.ok(new RegExp(A.TRANS_UNITS[u].label).test(d.titulo),
         `${u}: a tela se identifica como "${A.TRANS_UNITS[u].label}" (achei "${d.titulo.trim()}")`);
    await page.click("button:has-text('Back to units')");
    await page.waitForSelector(".unit-grid");
  }
  p.nota(`${carregadas.length} unidades carregadas conferidas uma por uma: ${carregadas.join(", ")}`);

  /* a série de dados tem cinco decks de dez por unidade — o corte que o dono
     pediu depois de ver as 50 frases juntas */
  ["u01", "u02"].forEach(u => {
    const ds = A.getTransDecksForUnit(u);
    p.ok(ds.length === 5, `${u}: cinco decks (tem ${ds.length})`);
    ds.forEach(k => p.ok(A.getTransCardsForDeck(k).length === 10,
      `${u}: o deck ${k} tem dez cartas (tem ${A.getTransCardsForDeck(k).length})`));
  });

  p.ok(errosJs.length === 0, `erros de JS: ${errosJs.join(" | ")}`);
  await browser.close();
  p.fim();
})();
