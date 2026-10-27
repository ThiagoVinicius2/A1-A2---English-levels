/* Passo 2 da importação: node testes/importar.js caminho/do/csv

   Roda ANTES de importar, sobre o CSV cru, e responde quatro perguntas:
   repetição literal, repetição que só o corretor vê, enunciado repetido e
   enunciado parecido demais (Jaccard) — mais um aviso de forma, para o que é
   pedaço de fala ou palavra solta.

   O Jaccard é o que a comparação literal não pega: na Unit 6, "Estou dentro!",
   "Estou dentro com isso!" e "Tô dentro!" eram três cartões com três respostas
   diferentes e nenhum teste literal acusava. Na Unit 14, ele apontou os três
   "Isso é nojento!" (Eca / Ui / Blé), que ficaram com a interjeição como única
   diferença — e por isso cada um só aceita a sua.

   Isto imprime um relatório; não falha nem passa. A decisão é de quem importa,
   e os critérios estão no CLAUDE.md. */
const fs = require("fs");
const { carregar } = require("./comum.js");
const A = carregar();

const arquivo = process.argv[2];
if (!arquivo) { console.log("uso: node testes/importar.js caminho/do/csv"); process.exit(2); }

/* CSV do MemHack: UTF-8 com BOM e campo entre aspas, com aspas dobradas dentro.
   Ler com encoding errado faz a primeira coluna virar "﻿id" e a coluna id
   desaparecer sem dar erro. */
function lerCsv(caminho) {
  const txt = fs.readFileSync(caminho, "utf8").replace(/^﻿/, "");
  const linhas = [];
  let campo = "", atual = [], dentro = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (dentro) {
      if (c === '"') {
        if (txt[i + 1] === '"') { campo += '"'; i++; }
        else dentro = false;
      } else campo += c;
    } else if (c === '"') dentro = true;
    else if (c === ",") { atual.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && txt[i + 1] === "\n") i++;
      atual.push(campo); campo = "";
      if (atual.length > 1 || atual[0] !== "") linhas.push(atual);
      atual = [];
    } else campo += c;
  }
  if (campo || atual.length) { atual.push(campo); linhas.push(atual); }
  const cab = linhas.shift();
  return linhas.map(l => { const o = {}; cab.forEach((k, i) => o[k] = l[i]); return o; });
}

const linhas = lerCsv(arquivo);
const N = A.transNormalize, E = A.transExpectedAnswers;

/* O CSV traz o número da unidade no nome do deck ("#14 | Vocab Rocket"). Se
   essa unidade já está no banco (reimportação, ou conferência depois de
   importar), os cartões dela ficam FORA da comparação — senão cada cartão
   casaria consigo mesmo e o relatório viraria ruído. */
const numero = ((linhas[0].deck || "").match(/#(\d+)/) || [])[1];
const unidade = numero ? "u" + numero.padStart(2, "0") : null;
const jaImportada = unidade && A.getTransDecksForUnit(unidade).length > 0;
const C = A.TRANS_CARDS.filter(c => !jaImportada || c.deck.indexOf(unidade + "-") !== 0);
if (jaImportada) {
  console.log(`[a ${unidade} já está no banco: os ${A.countTransCardsForUnit(unidade)} cartões dela ficam fora da comparação]`);
}

/* ---- 1. contagem ---- */
console.log(`== contagem: ${linhas.length} cartões, ids ${linhas[0].id} a ${linhas[linhas.length - 1].id}`);
const porDeck = {};
linhas.forEach(l => porDeck[l.deck] = (porDeck[l.deck] || 0) + 1);
Object.keys(porDeck).forEach(d => console.log(`   ${String(porDeck[d]).padStart(3)}  ${d}`));

const normPt = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
                     .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const tok = s => { const t = {}; normPt(s).split(" ").filter(w => w.length > 2).forEach(w => t[w] = 1); return Object.keys(t); };
const jac = (a, b) => {
  const A1 = tok(a), B1 = tok(b);
  const inter = A1.filter(w => B1.indexOf(w) !== -1).length;
  return inter / (A1.length + B1.length - inter || 1);
};

/* ---- 2. resposta que já existe no banco ---- */
console.log("\n== resposta em inglês que já vale num cartão do banco");
let n = 0;
const indice = {};
C.forEach(c => E(c).forEach(a => A.transNormalizeVariants(a).forEach(v => indice[v] = indice[v] || c)));
linhas.forEach(l => {
  const dono = A.transNormalizeVariants(l.ingles).map(v => indice[v]).filter(Boolean)[0];
  if (dono) { console.log(`   ${l.id} cai no ${dono.id} ("${dono.en}")  <- "${l.ingles}"`); n++; }
});
if (!n) console.log("   nenhuma");

/* ---- 3. enunciado em português repetido ---- */
console.log("\n== enunciado em português repetido");
n = 0;
const vistos = {};
linhas.forEach(l => {
  const k = normPt(l.portugues);
  if (vistos[k]) { console.log(`   ${vistos[k]} | ${l.id}  "${l.portugues}"`); n++; } else vistos[k] = l.id;
});
C.forEach(c => linhas.forEach(l => {
  if (normPt(l.portugues) === normPt(c.pt)) { console.log(`   ${l.id} repete o ${c.id}  "${c.pt}"`); n++; }
}));
if (!n) console.log("   nenhuma");

/* ---- 4. enunciados parecidos demais ---- */
console.log("\n== enunciados parecidos demais (Jaccard >= 0,5)");
n = 0;
for (let i = 0; i < linhas.length; i++) for (let j = i + 1; j < linhas.length; j++) {
  const s = jac(linhas[i].portugues, linhas[j].portugues);
  if (s >= 0.5) {
    console.log(`   ${s.toFixed(2)}  ${linhas[i].id} | ${linhas[j].id}`);
    console.log(`         "${linhas[i].portugues}"`);
    console.log(`         "${linhas[j].portugues}"`);
    n++;
  }
}
linhas.forEach(l => C.forEach(c => {
  const s = jac(l.portugues, c.pt);
  if (s >= 0.5) {
    console.log(`   ${s.toFixed(2)}  ${l.id} | ${c.id} (banco)`);
    console.log(`         novo : "${l.portugues}"`);
    console.log(`         banco: "${c.pt}"`);
    n++;
  }
}));
if (!n) console.log("   nenhuma");

/* ---- 5. forma da frase ---- */
console.log("\n== forma: pedaço de fala, palavra solta, célula com duas respostas");
n = 0;
linhas.forEach(l => {
  const pt = l.portugues.trim(), en = l.ingles.trim(), av = [];
  if (/[,;]$/.test(pt)) av.push("pt termina em vírgula");
  if (/[,;]$/.test(en)) av.push("en termina em vírgula");
  if (/^[a-záéíóúâêôãõç]/.test(pt)) av.push("pt começa em minúscula");
  if (/^[a-z]/.test(en)) av.push("en começa em minúscula");
  if (pt.split(/\s+/).length <= 2) av.push("pt tem até 2 palavras");
  if (N(pt) === N(en)) av.push("pt igual ao en: não há o que traduzir");
  if (/\s\/\s/.test(en)) av.push("duas respostas na célula");
  if (/\s\/\s/.test(pt)) av.push("duas glosas no enunciado");
  if (/\.\.\.$/.test(pt)) av.push("pt termina em reticências");
  if (/[(）)]/.test(en)) av.push("parênteses na resposta");
  if (/^"|"$/.test(en)) av.push("resposta entre aspas (tirar ao importar)");
  if (av.length) { console.log(`   ${l.id}: ${av.join(" | ")}\n         pt: ${pt}\n         en: ${en}`); n++; }
});
if (!n) console.log("   nenhuma");
console.log("\nFim do relatório. A decisão de podar é de quem importa — os critérios estão no CLAUDE.md.");
