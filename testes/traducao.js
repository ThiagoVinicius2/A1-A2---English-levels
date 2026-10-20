/* Módulo "Do Português para o Inglês": a régua da porcentagem por deck.

   São duas armadilhas conhecidas, e as duas já aconteceram:
   1. A autoavaliação ("My answer is also correct") TEM de contar. Ela não é
      segunda tentativa: é a pessoa corrigindo o corretor sobre a primeira
      resposta. Foi o caso do t-382, que aceitava três combinações de
      "Of course! Thanks!" e reprovava justamente a quarta.
   2. A rodada de correção NÃO pode gravar o histórico do deck: ela refaz só
      os cartões errados, e acertar todos gravaria um 100% que não representa
      o deck. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DE TRADUÇÃO");

/* ---- 1. a régua: certo, quase e aceitoManual contam; diferente e naoLembro não ---- */
[["certo", true], ["quase", true], ["aceitoManual", true], ["diferente", false], ["naoLembro", false], [undefined, false]]
  .forEach(([nota, esperado]) =>
    p.ok(P.transIsHit(nota) === esperado, `transIsHit("${nota}") devia ser ${esperado}`));

/* o transFirstGrades foi REMOVIDO de propósito: ele existia só para excluir o
   aceitoManual da porcentagem, e quem garante o "de primeira" é o
   transRevealed, que recusa cartão já revelado. */
p.ok(P.state.transFirstGrades === undefined,
     "transFirstGrades não pode voltar ao state: quem segura o 'de primeira' é o transRevealed");

/* ---- 2. uma rodada com certo / typo / autoavaliação / não lembro = 75% ----
   75% nas DUAS pontas: na tela de resultado e no histórico do deck. Se der
   50%, o aceitoManual voltou a ser excluído; se der 100%, o "não lembro"
   passou a contar. */
const deckEscolhido = Object.keys(A.TRANS_DECKS).filter(k => A.getTransCardsForDeck(k).length >= 4)[0];
P.startTransRound([deckEscolhido]);
const cartoes = P.state.transCards.slice(0, 4);
p.ok(P.state.transCards.length >= 4, `o deck ${deckEscolhido} tem ao menos 4 cartões para a rodada`);
P.state.transCards = cartoes;
const notas = ["certo", "quase", "aceitoManual", "naoLembro"];
cartoes.forEach((c, i) => {
  P.state.transGrades[c.id] = notas[i];
  P.state.transRevealed[c.id] = true;
  P.state.transAnswers[c.id] = notas[i] === "naoLembro" ? "" : c.en;
});
P.finishTransRound();
p.ok(P.state.transResults.overallPct === 75,
     `a tela de resultado devia mostrar 75% (mostrou ${P.state.transResults.overallPct}%)`);
p.ok(P.state.transResults.totalCorrect === 3,
     `3 de 4 acertos (deu ${P.state.transResults.totalCorrect})`);
const html = P.telaHtml();
p.ok(/75%/.test(html), "a tela de resultado escreve 75%");
const stats = P.loadTransDeckStats();
p.ok(stats[deckEscolhido] && stats[deckEscolhido].pct === 75,
     `o histórico do deck devia gravar 75% (gravou ${stats[deckEscolhido] && stats[deckEscolhido].pct})`);
p.nota(`rodada de 4 cartões no ${deckEscolhido}: tela ${P.state.transResults.overallPct}%, histórico ${stats[deckEscolhido].pct}%`);

/* ---- 3. mescla entre rodadas: deck fora da rodada mantém a nota ---- */
const outroDeck = Object.keys(A.TRANS_DECKS).filter(k => k !== deckEscolhido && A.getTransCardsForDeck(k).length >= 2)[0];
P.startTransRound([outroDeck]);
P.state.transCards.forEach(c => { P.state.transGrades[c.id] = "certo"; P.state.transRevealed[c.id] = true; });
P.finishTransRound();
const stats2 = P.loadTransDeckStats();
p.ok(stats2[deckEscolhido] && stats2[deckEscolhido].pct === 75,
     `o deck fora da 2ª rodada manteve os 75% (está em ${stats2[deckEscolhido] && stats2[deckEscolhido].pct})`);
p.ok(stats2[outroDeck] && stats2[outroDeck].pct === 100, `o deck novo entrou com 100%`);

/* ---- 4. rodada de correção não grava por cima ----
   Errando 4 de 9 e depois acertando os 4 na correção, o deck precisa continuar
   em 56%. Se virar 100%, a correção voltou a gravar. */
const deckGrande = Object.keys(A.TRANS_DECKS).filter(k => A.getTransCardsForDeck(k).length >= 9)[0];
P.startTransRound([deckGrande]);
const nove = P.state.transCards.slice(0, 9);
P.state.transCards = nove;
nove.forEach((c, i) => {
  P.state.transGrades[c.id] = i < 4 ? "diferente" : "certo";
  P.state.transRevealed[c.id] = true;
  P.state.transAnswers[c.id] = i < 4 ? "something else" : c.en;
});
P.finishTransRound();
const antes = P.loadTransDeckStats()[deckGrande].pct;
p.ok(antes === 56, `5 de 9 devia gravar 56% (gravou ${antes}%)`);
P.startTransRetry();
p.ok(P.state.transIsRetry === true, "a rodada de correção marca state.transIsRetry");
p.ok(P.state.transCards.length === 4, `a correção traz só os 4 errados (trouxe ${P.state.transCards.length})`);
P.state.transCards.forEach(c => { P.state.transGrades[c.id] = "certo"; P.state.transRevealed[c.id] = true; });
P.finishTransRound();
const depois = P.loadTransDeckStats()[deckGrande].pct;
p.ok(depois === 56, `depois da correção 100%, o histórico do deck tem de continuar em 56% (está em ${depois}%)`);
p.nota(`correção: ${deckGrande} ficou em ${depois}% depois de acertar os 4 errados — a correção não grava por cima`);
/* e a tela da correção precisa DIZER isso, senão parece que a gravação quebrou */
const htmlRetry = P.telaHtml();
p.ok(/fix-up|only the sentences you had missed|deck score/i.test(htmlRetry),
     "a tela da correção explica que o resultado não entra no histórico do deck");
p.ok(/Redo the whole deck/i.test(htmlRetry), "a correção deixa 'Redo the whole deck' como ação principal");

/* ---- 5. histórico por deck: formato e migração ---- */
const bruto = JSON.parse(P.localStorage.getItem(P.TRANS_STORAGE_KEY));
p.ok(!!bruto.decks && !!bruto.date, "o histórico é { date, decks: { deckKey: {...} } }");
Object.keys(bruto.decks).forEach(k => {
  const d = bruto.decks[k];
  p.ok(typeof d.pct === "number" && typeof d.correct === "number" && typeof d.total === "number" && !!d.date,
       `o deck ${k} gravou pct, correct, total e date`);
  p.ok(!!A.TRANS_DECKS[k], `o deck gravado ${k} existe em TRANS_DECKS (chave com prefixo de unidade)`);
});

/* a migração do formato antigo (_r2, chaves sem prefixo de unidade) */
const P2 = carregarApp();
P2.localStorage.setItem("enCheckTransResults_r2", JSON.stringify({
  date: "2026-01-01T00:00:00.000Z",
  decks: { vocab2: { pct: 50, correct: 1, total: 2, date: "2026-01-01T00:00:00.000Z" } },
}));
const migrado = P2.loadTransDeckStats();
const chavesMigradas = Object.keys(migrado);
p.ok(chavesMigradas.length > 0, "a migração do _r2 trouxe algum deck");
p.ok(chavesMigradas.every(k => /^u\d\d-/.test(k)),
     `toda chave migrada ganhou o prefixo de unidade (achei ${chavesMigradas.join(", ")})`);
p.ok(!migrado.vocab2, "a chave antiga sem prefixo não sobrou");
p.nota(`migração do _r2: ${chavesMigradas.join(", ")}`);

p.fim();
