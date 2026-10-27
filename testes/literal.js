/* A sonda da tradução literal: node testes/literal.js [u14]

   Passo 4 do procedimento de importação. Para cada cartão da unidade, a
   tradução mais óbvia do português passa pelo gradeTransAnswer: se der
   `diferente`, o cartão reprova quem acertou, e o conserto é `accept` (quando
   as duas frases servem na mesma hora) ou `ctx` (quando o enunciado não tem
   como escolher).

   As literais ficam em testes/literais/uNN.json, uma por cartão, e por isso
   isto não é só um teste de importação: é rede permanente. Mexer num cartão
   mais tarde e quebrar a tradução óbvia dele falha aqui.

   Sem argumento, roda todas as unidades que tiverem arquivo. Unidades
   anteriores à 13 não têm: a sonda era feita em script de sessão, e esses
   arquivos se perderam com o contêiner. Vão sendo preenchidas conforme cada
   unidade for revisitada. */
const fs = require("fs"), path = require("path");
const { carregar, criarPlacar } = require("./comum.js");
const A = carregar();

const dir = path.join(__dirname, "literais");
const arquivos = fs.readdirSync(dir).filter(f => /^u\d\d\.json$/.test(f)).sort();
const arg = process.argv[2];
const alvos = arg ? [("u" + String(arg).replace(/\D/g, "").padStart(2, "0")) + ".json"] : arquivos;
const p = criarPlacar("SONDA DA TRADUÇÃO LITERAL");

const porId = {};
A.TRANS_CARDS.forEach(c => porId[c.id] = c);

alvos.forEach(f => {
  const caminho = path.join(dir, f);
  if (!fs.existsSync(caminho)) { p.ok(false, `não achei ${caminho}`); return; }
  const unidade = f.replace(".json", "");
  const literais = JSON.parse(fs.readFileSync(caminho, "utf8"));
  const daUnidade = A.TRANS_CARDS.filter(c => c.deck.indexOf(unidade + "-") === 0).map(c => c.id);

  /* toda carta da unidade precisa de literal, e toda literal precisa de carta:
     cartão novo sem literal passaria batido, e literal órfã é cartão podado */
  daUnidade.forEach(id => p.ok(literais[id] !== undefined, `${id}: sem tradução literal em testes/literais/${f}`));
  Object.keys(literais).forEach(id => p.ok(!!porId[id], `${id}: tem literal em ${f} mas não existe no banco`));

  let reprovadas = 0;
  Object.keys(literais).forEach(id => {
    const c = porId[id];
    if (!c) return;
    const nota = A.gradeTransAnswer(c, literais[id]).level;
    if (nota !== "certo") reprovadas++;
    p.ok(nota === "certo",
         `${id} [${nota}]${c.ctx ? " (tem ctx)" : ""}\n      literal: ${literais[id]}\n      cartão : ${c.en}`);
  });
  p.nota(`${unidade}: ${Object.keys(literais).length} literais conferidas, ${reprovadas} reprovada(s)`);
});

p.fim();
