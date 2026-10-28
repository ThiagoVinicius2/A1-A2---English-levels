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
     Unidade de um deck só NÃO passa pela tela de escolha: ela abre direto na
     rodada. É o caso da série de dados, em que a unidade inteira é uma lista
     de frases. Esta é a rede dessa mudança: se a tela de escolha voltar a
     aparecer para ela, ou se uma unidade de vários decks passar a pular a
     escolha, o teste acusa. */
  let abriramDireto = 0, passaramPelaEscolha = 0;
  for (let i = 0; i < carregadas.length; i++) {
    const u = carregadas[i];
    const esperados = A.getTransDecksForUnit(u);
    await page.click(`.unit-grid .module-card:not(.empty):nth-of-type(${i + 1}) .module-link`);
    await page.waitForTimeout(120);
    const tela = await page.evaluate(() => ({ view: state.view, unidade: state.transUnit }));
    p.ok(tela.unidade === u, `o ${i + 1}º card abre a ${u} (abriu ${tela.unidade})`);

    if (esperados.length === 1) {
      p.ok(tela.view === "transRound",
           `${u}: um deck só, então abre direto na rodada (abriu "${tela.view}")`);
      const naRodada = await page.evaluate(() => state.transCards.length);
      const daUnidade = A.countTransCardsForUnit(u);
      p.ok(naRodada === daUnidade, `${u}: a rodada traz os ${daUnidade} cartões da unidade (trouxe ${naRodada})`);
      p.ok((await page.locator("#trans-input").count()) === 1, `${u}: o campo de digitação está na tela`);
      abriramDireto++;
      await page.click("button:has-text('Back to units'), button:has-text('Leave the round')").catch(() => {});
      /* a saída da rodada passa pelo modal de confirmação */
      const confirmar = page.locator("button:has-text('Leave')");
      if (await confirmar.count()) await confirmar.first().click();
      await page.waitForTimeout(100);
      if (!(await page.locator(".unit-grid").count())) {
        await page.evaluate(() => openTransUnits());
        await page.waitForTimeout(100);
      }
      await page.waitForSelector(".unit-grid");
      continue;
    }

    p.ok(tela.view === "transDecks",
         `${u}: tem ${esperados.length} decks, então passa pela escolha (abriu "${tela.view}")`);
    await page.waitForSelector(".trans-deck-list");
    const d = await page.evaluate(() => ({
      decks: [...document.querySelectorAll(".trans-deck-option")].map(el => el.getAttribute("onclick")),
      titulo: (document.querySelector(".q-level") || {}).textContent || "",
    }));
    p.ok(d.decks.length === esperados.length,
         `${u}: a tela lista os ${esperados.length} decks da unidade (listou ${d.decks.length})`);
    p.ok(d.decks.every(on => on && on.indexOf(u + "-") !== -1),
         `${u}: nenhum deck de outra unidade vazou`);
    p.ok(new RegExp(A.TRANS_UNITS[u].label).test(d.titulo),
         `${u}: a tela se identifica como "${A.TRANS_UNITS[u].label}" (achei "${d.titulo.trim()}")`);
    passaramPelaEscolha++;
    await page.click("button:has-text('Back to units')");
    await page.waitForSelector(".unit-grid");
  }
  p.ok(abriramDireto > 0, "ao menos uma unidade abre direto na rodada");
  p.ok(passaramPelaEscolha > 0, "ao menos uma unidade continua passando pela escolha de decks");
  p.nota(`${abriramDireto} unidade(s) abrem direto na rodada, ${passaramPelaEscolha} passam pela escolha`);

  p.nota(`${carregadas.length} unidades carregadas conferidas uma por uma: ${carregadas.join(", ")}`);

  p.ok(errosJs.length === 0, `erros de JS: ${errosJs.join(" | ")}`);
  await browser.close();
  p.fim();
})();
