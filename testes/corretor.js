/* Autoteste do corretor da resposta digitada.

   Este é o teste que mais vezes achou bug real no projeto. A regra que ele
   defende é uma só: reprovar erro de inglês, nunca diferença de digitação —
   e, do outro lado, nunca passar a aceitar inglês que não existe.

   Quase nada aqui é expectativa escrita à mão: a rede percorre o banco
   inteiro e nomeia o cartão culpado. Expectativa à mão já falhou por estar
   velha, não por haver bug. */
const { carregar, criarPlacar } = require("./comum.js");
const fs = require("fs"), path = require("path");
const A = carregar();
const { TRANS_CARDS: C, gradeTransAnswer: G, transNormalize: N, transExpectedAnswers: E } = A;
const p = criarPlacar("AUTOTESTE DO CORRETOR");
const certo = (card, txt) => G(card, txt).level === "certo";

/* ---- 1. nenhum cartão reprova a própria resposta ---- */
let nAccept = 0;
C.forEach(c => {
  p.ok(certo(c, c.en), `${c.id}: o cartão reprova a própria resposta "${c.en}"`);
  (c.accept || []).forEach(a => {
    nAccept++;
    p.ok(certo(c, a), `${c.id}: accept reprovado — "${a}"`);
  });
});
p.nota(`respostas conferidas: ${C.length} de en, ${nAccept} de accept`);

/* ---- 2. nenhuma resposta vale em dois cartoes ----
   Decorar uma frase nao pode fechar quatro cartoes: era o caso das despedidas
   da Unit 1, em que "Later!" passava no t-25, t-30, t-31 e t-32.

   A regua e a mesma do corretor sem precisar chama-lo 4 milhoes de vezes: o
   gradeTransAnswer da "certo" exatamente quando as VARIANTES dos dois lados
   se cruzam, então basta indexar variante -> cartao e acusar o cruzamento. */
const dono = {};
let nVariantes = 0;
C.forEach(c => E(c).forEach(a => {
  A.transNormalizeVariants(a).forEach(v => {
    nVariantes++;
    if (dono[v] && dono[v].id !== c.id) {
      p.ok(false, `resposta intercambiavel: "${a}" (do ${c.id}) tambem passa no ${dono[v].id} ("${dono[v].en}")`);
    } else if (!dono[v]) dono[v] = c;
  });
}));
p.nota(`variantes indexadas: ${nVariantes}, nenhuma valendo em dois cartoes`);

/* ---- 3. o campo ctx é enunciado, nunca resposta ---- */
let nCtx = 0;
C.forEach(c => {
  if (!c.ctx) return;
  nCtx++;
  p.ok(!certo(c, c.ctx), `${c.id}: digitar o próprio ctx deu certo — a situação não pode ser resposta`);
  p.ok(!E(c).some(a => N(a) === N(c.ctx)), `${c.id}: o ctx entrou em transExpectedAnswers`);
});
p.nota(`campo ctx: ${nCtx} cartões trazem a situação, nenhuma entra na correção`);

/* ---- 4. contrações nos dois sentidos ---- */
const expandir = txt => {
  let s = txt;
  A.TRANS_CONTRACTIONS.forEach(([curta, longa]) => {
    s = s.replace(new RegExp("\\b" + curta.replace(/'/g, "'") + "\\b", "gi"), longa);
  });
  return s;
};
let nContraidas = 0;
C.forEach(c => {
  const alvo = c.en;
  const expandida = expandir(alvo);
  if (expandida !== alvo) { nContraidas++; p.ok(certo(c, expandida), `${c.id}: a forma expandida foi reprovada — "${expandida}"`); }
});
p.nota(`contrações: ${nContraidas} respostas do banco conferidas na forma expandida`);

/* inglês que o corretor PRECISA continuar reprovando */
[
  [{ en: "This is weird." }, "This's weird.", "This's não existe em inglês"],
  [{ en: "Friends is what matters." }, "Friends's what matters.", "Friends's é impronunciável"],
  [{ en: "You are late." }, "You's late.", "you's não existe"],
  [{ en: "It's a good idea." }, "its a good idea", "its não vale por it's"],
  [{ en: "They're late." }, "their late", "their não vale por they're"],
  [{ en: "He ain't no saint!" }, "He am not no saint!", "he am not não é inglês"],
  [{ en: "I ain't no superhero." }, "I is not no superhero.", "I is not não é inglês"],
].forEach(([card, txt, porque]) => {
  p.ok(G(card, txt).level !== "certo", `devia reprovar: "${txt}" (${porque})`);
});

/* ---- 5. apóstrofo sem cobertura ----
   Toda palavra com apóstrofo nos cartões precisa estar resolvida: "'s" e "'d"
   saem pelas variantes, "ain't" também, e o resto tem de estar na
   TRANS_CONTRACTIONS. Foi esta rede que achou o "c'mon" do t-669. */
const cobertas = {};
A.TRANS_CONTRACTIONS.forEach(([curta]) => cobertas[curta.toLowerCase()] = true);
C.forEach(c => {
  E(c).forEach(txt => {
    (txt.toLowerCase().replace(/[‘’]/g, "'").match(/\b[a-z]+'[a-z]+\b/g) || []).forEach(w => {
      if (/'(s|d)$/.test(w)) return;              // ambíguos, resolvidos por transNormalizeVariants
      if (w === "ain't") return;                  // idem, por TRANS_AINT_READINGS
      p.ok(cobertas[w], `${c.id}: "${w}" tem apóstrofo e não está na TRANS_CONTRACTIONS`);
    });
  });
});

/* fala reduzida SEM apóstrofo: a rede acima não a enxerga, então vai uma
   lista própria. Foi ela que achou o "gotcha" do t-233, que reprovava
   "Got you!" desde a Unit 4. */
const REDUZIDAS = ["gonna", "wanna", "gotta", "gotcha", "lemme", "gimme", "imma", "kinda", "sorta", "outta",
                   "coulda", "shoulda", "woulda", "dunno", "gon", "finna", "tryna", "aint"];
C.forEach(c => E(c).forEach(txt => {
  txt.toLowerCase().split(/[^a-z']+/).forEach(w => {
    if (REDUZIDAS.indexOf(w) !== -1) p.ok(cobertas[w], `${c.id}: a redução "${w}" não está na TRANS_CONTRACTIONS`);
  });
}));
p.nota(`reduções sem apóstrofo vigiadas: ${REDUZIDAS.length}`);

/* ---- 6. "ain't" com as cinco leituras, e com guarda ---- */
[
  [{ en: "I ain't got no time for this." }, "I haven't got no time for this."],
  [{ en: "He ain't got the guts." }, "He hasn't got the guts."],
  [{ en: "He ain't no saint." }, "He isn't no saint."],
  [{ en: "We ain't gonna tell you." }, "We aren't going to tell you."],
  [{ en: "You ain't my friend." }, "You're not my friend."],
  [{ en: "Country life ain't for everyone." }, "Country life isn't for everyone."],
  [{ en: "There ain't no place like home." }, "There isn't no place like home."],
].forEach(([card, txt]) => p.ok(certo(card, txt), `ain't nos dois sentidos: "${txt}" devia dar certo`));

/* ---- 7. sinônimos da tabela nos dois sentidos ---- */
let nSin = 0;
C.forEach(c => {
  A.TRANS_SYNONYMS.forEach(([a, b]) => {
    const re = new RegExp("\\b" + a + "\\b", "i");
    const reB = new RegExp("\\b" + b + "\\b", "i");
    if (re.test(c.en)) { nSin++; p.ok(certo(c, c.en.replace(re, b)), `${c.id}: trocar "${a}" por "${b}" foi reprovado`); }
    else if (reB.test(c.en)) { nSin++; p.ok(certo(c, c.en.replace(reB, a)), `${c.id}: trocar "${b}" por "${a}" foi reprovado`); }
  });
});
p.nota(`sinônimos: ${nSin} trocas conferidas sobre as respostas do banco`);
/* casos dirigidos dos pares documentados: a rede acima só percorre o que está
   na tabela, então não acusa a REMOÇÃO de um par */
/* Os três primeiros apontavam para cartões da Unit 1 do curso (t-36, t-21,
   t-16), que saíram do banco quando a unidade foi refeita com a série de
   dados. Foram repontados para cartões que seguem no banco, com as mesmas
   palavras. */
[
  ["t-306", "guess"], ["t-312", "kids"], ["t-411", "children"], ["t-77", "store"], ["t-91", "thanks"],
].forEach(([id, palavra]) => {
  const c = C.filter(x => x.id === id)[0];
  if (!c) return p.ok(false, `caso dirigido: o cartão ${id} não existe mais`);
  p.nota(`caso dirigido ${id} ("${palavra}"): ${certo(c, c.en) ? "ok" : "FALHOU"}`);
});
[
  [{ en: "I think it's fine." }, "I guess it's fine."],
  [{ en: "I have two kids." }, "I have two children."],
  [{ en: "The store is closed." }, "The shop is closed."],
  [{ en: "Thanks a lot!" }, "Thank you a lot!"],
  [{ en: "My favorite color is blue." }, "My favourite colour is blue."],
  [{ en: "We hug everyone!" }, "We hug everybody!"],
  [{ en: "Do me a favor." }, "Do me a favour."],
].forEach(([card, txt]) => p.ok(certo(card, txt), `par de sinônimo: "${txt}" devia dar certo`));

/* ---- 8. número por extenso vale pelo algarismo até 99 ---- */
[["twenty five", "25"], ["thirty one", "31"], ["ninety nine", "99"], ["twelve", "12"], ["seven", "7"]]
  .forEach(([ext, num]) => p.ok(N(ext) === N(num), `número por extenso: "${ext}" devia normalizar igual a "${num}" (deu "${N(ext)}" x "${N(num)}")`));
p.ok(N("7 a.m.") === N("7 AM") && N("7 AM") === N("7am"), "7 a.m. == 7 AM == 7am");

/* ---- 9. tipografia nos dois sentidos ---- */
const paraAscii = s => s.replace(/[–—]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/…/g, "...");
const paraTipo = s => s.replace(/'/g, "’").replace(/\.\.\./g, "…");
let nTipo = 0;
C.forEach(c => {
  const a = paraAscii(c.en), t = paraTipo(c.en);
  if (a !== c.en) nTipo++;
  p.ok(certo(c, a), `${c.id}: a versão só-ASCII foi reprovada — "${a}"`);
  p.ok(certo(c, t), `${c.id}: a versão tipográfica foi reprovada — "${t}"`);
});
p.nota(`tipografia: ${C.length} respostas conferidas nas duas formas (${nTipo} trazem caractere tipográfico)`);

/* ---- 10. rede das unidades futuras: formas que o banco ainda não tem ---- */
[
  [{ en: "He's gone to the store." }, "He has gone to the store."],
  [{ en: "I'd like a coffee." }, "I would like a coffee."],
  [{ en: "I'd been there before." }, "I had been there before."],
  [{ en: "She could've told me." }, "She could have told me."],
  [{ en: "My name's Seaburn." }, "My name is Seaburn."],
  [{ en: "My friend's child is here." }, "My friends child is here."],
  [{ en: "When're we leaving?" }, "When are we leaving?"],
].forEach(([card, txt]) => p.ok(certo(card, txt), `forma sintética: "${txt}" devia dar certo`));

/* ---- 11. contagem por deck e por unidade (linha de base) ----
   O arquivo testes/contagens.json guarda a contagem conferida contra o CSV no
   dia da importação. Uma unidade nova atualiza o arquivo de propósito; um
   cartão que desaparece sem querer falha aqui. */
const base = JSON.parse(fs.readFileSync(path.join(__dirname, "contagens.json"), "utf8"));
p.ok(C.length === base.total, `total de cartões: ${C.length}, a linha de base diz ${base.total}`);
Object.keys(base.decks).forEach(k => {
  const n = A.getTransCardsForDeck(k).length;
  p.ok(n === base.decks[k], `deck ${k}: ${n} cartões, a linha de base diz ${base.decks[k]}`);
});
Object.keys(A.TRANS_DECKS).forEach(k => p.ok(base.decks[k] !== undefined, `deck ${k}: não está na linha de base (atualize testes/contagens.json)`));
Object.keys(base.unidades).forEach(u => {
  const n = A.countTransCardsForUnit(u);
  p.ok(n === base.unidades[u], `unidade ${u}: ${n} cartões, a linha de base diz ${base.unidades[u]}`);
});
const proxima = "u" + String(Object.keys(base.unidades).length + 1).padStart(2, "0");
p.ok(A.getTransDecksForUnit(proxima).length === 0, `${proxima} ainda não deveria ter deck`);

p.fim();
