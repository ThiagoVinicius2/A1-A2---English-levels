/* ============================================================
   Módulo separado: "Do Português para o Inglês"

   Produção, não reconhecimento: a frase aparece em português e a
   resposta é digitada em inglês, sem alternativas para escolher.

   Origem dos dados: deck MemHack #01 do curso, exportado em CSV
   (colunas id, deck, ingles, portugues) com 75 cartões em 7 decks.
   O CSV estava em UTF-8 COM BOM — ao reimportar, ler com
   encoding="utf-8-sig", senão o cabeçalho da primeira coluna vem
   como "\ufeffid" e a coluna "id" some sem dar erro.

   Campos de cada cartão:
   - pt / en: a frase como veio do CSV
   - accept:  traduções alternativas igualmente corretas. Existe
              porque tradução livre quase sempre tem mais de uma
              resposta certa — sobretudo nas despedidas do deck
              Immersion Time, onde "Tchau!", "Até!" e "Até mais!"
              são quase sinônimos em português.
   - note:    observação mostrada junto da resposta (usado no
              cartão "Peace!", que no CSV trazia duas respostas
              na mesma célula: "Peace! / Peace out!").

   Atenção: "Vocês são os melhores!" aparece em DOIS cartões (t-74 e
   t-75), com respostas diferentes no CSV. Cada um aceita a forma do
   outro, senão uma resposta certa seria reprovada.
   ============================================================ */

/* As 15 unidades do curso. O CSV já traz o número da unidade no nome do deck
   ("#01 | Comprehension Practice"), então a importação de uma unidade nova só
   precisa mapear esse prefixo para a chave daqui. Unidade sem deck aparece na
   interface como "ainda sem baralhos". */
const TRANS_UNITS = {
  u01: { label: "Unit 1", num: "01" },
  u02: { label: "Unit 2", num: "02" },
  u03: { label: "Unit 3", num: "03" },
  u04: { label: "Unit 4", num: "04" },
  u05: { label: "Unit 5", num: "05" },
  u06: { label: "Unit 6", num: "06" },
  u07: { label: "Unit 7", num: "07" },
  u08: { label: "Unit 8", num: "08" },
  u09: { label: "Unit 9", num: "09" },
  u10: { label: "Unit 10", num: "10" },
  u11: { label: "Unit 11", num: "11" },
  u12: { label: "Unit 12", num: "12" },
  u13: { label: "Unit 13", num: "13" },
  u14: { label: "Unit 14", num: "14" },
  u15: { label: "Unit 15", num: "15" },
};

/* A chave de cada deck é prefixada pela unidade (u01-...): os nomes de baralho
   se repetem a cada unidade do curso, e sem o prefixo as chaves colidiriam —
   inclusive no histórico por deck gravado no localStorage. */
const TRANS_DECKS = {
  "u01-comprehension":  { unit: "u01", label: "Comprehension Practice",    tag: "Deck 1" },
  "u01-vocab1":         { unit: "u01", label: "Vocab Rocket (Part I)",     tag: "Deck 2" },
  "u01-vocab2":         { unit: "u01", label: "Vocab Rocket (Part II)",    tag: "Deck 3" },
  "u01-immersion":      { unit: "u01", label: "Immersion Time",            tag: "Deck 4" },
  "u01-grammar1":       { unit: "u01", label: "Grammar Hacks 01",          tag: "Deck 5" },
  "u01-grammar2":       { unit: "u01", label: "Grammar Hacks 02",          tag: "Deck 6" },
  "u01-pronunciation":  { unit: "u01", label: "Pronunciation Hacks",       tag: "Deck 7" },
};

/* ================= OS 75 CARTÕES ================= */
const TRANS_CARDS = [
  /* ---- Deck 1: Comprehension Practice (11 cartões) ---- */
  { id:"t-01",
    deck:"u01-comprehension",
    pt:"Então, você reconhece algum desses homens?",
    en:"So, do you recognize any of these men?",
    accept:["Do you recognize any of these men?", "So, do you recognise any of these men?", "Do you recognise any of these men?"] },
  { id:"t-02",
    deck:"u01-comprehension",
    pt:"Você lembra o que ele estava cantando?",
    en:"Do you remember what he was singing?" },
  { id:"t-03",
    deck:"u01-comprehension",
    pt:"Eu acho que era aquela música \"I Want It That Way\".",
    en:"I think it was that song, \"I Want It That Way\"." },
  { id:"t-04",
    deck:"u01-comprehension",
    pt:"Número Dois, continue.",
    en:"Number Two, keep it going.",
    accept:["Number Two, keep going."] },
  { id:"t-05",
    deck:"u01-comprehension",
    pt:"Número Três.",
    en:"Number Three." },
  { id:"t-06",
    deck:"u01-comprehension",
    pt:"Número Quatro.",
    en:"Number Four." },
  { id:"t-07",
    deck:"u01-comprehension",
    pt:"Agora, Número Cinco...",
    en:"Now Number Five...",
    accept:["Now, Number Five."] },
  { id:"t-08",
    deck:"u01-comprehension",
    pt:"Whoo!",
    en:"Whoo!",
    accept:["Woo!"] },
  { id:"t-09",
    deck:"u01-comprehension",
    pt:"Ah, arrepiei! Me arrepiei literalmente.",
    en:"Ah, chills! Literal chills.",
    accept:["Chills! Literal chills.", "Ah, chills! I literally got chills."] },
  { id:"t-10",
    deck:"u01-comprehension",
    pt:"Foi o Número Cinco. O Número Cinco matou meu irmão.",
    en:"It was Number Five. Number Five killed my brother." },
  { id:"t-11",
    deck:"u01-comprehension",
    pt:"Ai, meu Deus, eu tinha esquecido dessa parte.",
    en:"Oh, my God, I forgot about that part.",
    accept:["Oh my God, I forgot about that part.", "Oh, my God, I had forgotten about that part.", "Oh my God, I had forgotten about that part."] },

  /* ---- Deck 2: Vocab Rocket (Part I) (9 cartões) ---- */
  { id:"t-12",
    deck:"u01-vocab1",
    pt:"Olá, eu sou a Julie e eu sou advogada.",
    en:"Hello, I'm Julie and I'm a lawyer.",
    accept:["Hi, I'm Julie and I'm a lawyer."] },
  { id:"t-13",
    deck:"u01-vocab1",
    pt:"Essa é minha amiga, a chef. / Esse é meu amigo, o chef.",
    en:"This is my friend, the chef." },
  { id:"t-14",
    deck:"u01-vocab1",
    pt:"Eu preciso ir ao médico.",
    en:"I need to go to the doctor.",
    accept:["I need to go to the doctor's."] },
  { id:"t-15",
    deck:"u01-vocab1",
    pt:"A minha irmã estuda Arquitetura.",
    en:"My sister studies architecture." },
  { id:"t-16",
    deck:"u01-vocab1",
    pt:"Eu moro com a minha mãe e o meu pai.",
    en:"I live with my mom and dad.",
    accept:["I live with my mother and father.", "I live with my mom and my dad."] },
  { id:"t-17",
    deck:"u01-vocab1",
    pt:"Eu tenho cinco irmãos. Dois irmãos e três irmãs.",
    en:"I have five siblings. Two brothers and three sisters." },
  { id:"t-18",
    deck:"u01-vocab1",
    pt:"Eu tenho três filhos. Dois filhos e uma filha.",
    en:"I have three kids. Two sons and one daughter.",
    accept:["I have three children. Two sons and one daughter."] },
  { id:"t-19",
    deck:"u01-vocab1",
    pt:"Eu gosto de estudar idiomas.",
    en:"I like to study languages.",
    accept:["I like studying languages."] },
  { id:"t-20",
    deck:"u01-vocab1",
    pt:"Eu estou gostando desta aula!",
    en:"I am enjoying this class!" },

  /* ---- Deck 3: Vocab Rocket (Part II) (4 cartões) ---- */
  { id:"t-21",
    deck:"u01-vocab2",
    pt:"Eu moro em um apartamento.",
    en:"I live in an apartment." },
  { id:"t-22",
    deck:"u01-vocab2",
    pt:"As paredes, as escadas e o piso são brancos.",
    en:"The walls, the stairs, and the floor are white." },
  { id:"t-23",
    deck:"u01-vocab2",
    pt:"Eu preciso trocar a lâmpada do meu abajur de cabeceira.",
    en:"I need to change the lightbulb of my bedside lamp.",
    accept:["I need to change the light bulb of my bedside lamp.", "I need to change the lightbulb in my bedside lamp.", "I need to change the light bulb in my bedside lamp."] },
  { id:"t-24",
    deck:"u01-vocab2",
    pt:"Eu preciso organizar as gavetas da minha cômoda.",
    en:"I need to organize my dresser drawers.",
    accept:["I need to organise my dresser drawers."] },

  /* ---- Deck 4: Immersion Time (10 cartões) ---- */
  { id:"t-25",
    deck:"u01-immersion",
    pt:"Tchau!",
    en:"Bye!",
    accept:["Goodbye!", "Bye bye!", "See ya!", "Later!"] },
  { id:"t-26",
    deck:"u01-immersion",
    pt:"Se cuida!",
    en:"Take care!",
    accept:["Take care of yourself!"] },
  { id:"t-27",
    deck:"u01-immersion",
    pt:"Tenha um bom dia!",
    en:"Have a good one!",
    accept:["Have a good day!", "Have a nice day!", "Have a great day!"] },
  { id:"t-28",
    deck:"u01-immersion",
    pt:"A gente se vê depois!",
    en:"See you later!",
    accept:["See you!", "See ya later!", "Catch you later!", "Catch ya later!"] },
  { id:"t-29",
    deck:"u01-immersion",
    pt:"\"A gente se vê depois, jacaré!\" (brincadeira infantil)",
    en:"See you later, alligator!",
    accept:["See you later alligator!", "See ya later, alligator!"] },
  { id:"t-30",
    deck:"u01-immersion",
    pt:"Até!",
    en:"See ya!",
    accept:["See you!", "Bye!", "Later!", "See you later!"] },
  { id:"t-31",
    deck:"u01-immersion",
    pt:"Até mais!",
    en:"Later!",
    accept:["See you later!", "See ya!", "Bye!", "Catch you later!"] },
  { id:"t-32",
    deck:"u01-immersion",
    pt:"Até mais tarde!",
    en:"Catch ya later!",
    accept:["Catch you later!", "See you later!", "See ya later!", "Later!"] },
  { id:"t-33",
    deck:"u01-immersion",
    pt:"Paz!",
    en:"Peace!",
    accept:["Peace out!"],
    note:"Também vale: Peace out!" },
  { id:"t-34",
    deck:"u01-immersion",
    pt:"\"Mantenha tudo em ordem!\"",
    en:"Keep it real!",
    accept:["Keep it real."] },

  /* ---- Deck 5: Grammar Hacks 01 (12 cartões) ---- */
  { id:"t-35",
    deck:"u01-grammar1",
    pt:"Você(s) gosta(m) de adaptações de livros?",
    en:"Do you like book adaptations?",
    accept:["Do you guys like book adaptations?"] },
  { id:"t-36",
    deck:"u01-grammar1",
    pt:"Você(s) quer(em) ir ao cinema?",
    en:"Do you want to go to the movies?",
    accept:["Do you guys want to go to the movies?", "Do you want to go to the movie theater?"] },
  { id:"t-37",
    deck:"u01-grammar1",
    pt:"Você(s) usa(m) legendas em inglês?",
    en:"Do you use English subtitles?",
    accept:["Do you guys use English subtitles?"] },
  { id:"t-38",
    deck:"u01-grammar1",
    pt:"Você(s) acha(m) que Friends é cafona?",
    en:"Do you think Friends is cringey?",
    accept:["Do you guys think Friends is cringey?", "Do you think Friends is cringy?"] },
  { id:"t-39",
    deck:"u01-grammar1",
    pt:"Você lembra dele?",
    en:"Do you remember him?" },
  { id:"t-40",
    deck:"u01-grammar1",
    pt:"Você reconhece algum desses homens?",
    en:"Do you recognize any of these men?",
    accept:["Do you recognise any of these men?"] },
  { id:"t-41",
    deck:"u01-grammar1",
    pt:"Vocês praticam yoga?",
    en:"Do you guys do yoga?",
    accept:["Do you do yoga?", "Do you guys practice yoga?"] },
  { id:"t-42",
    deck:"u01-grammar1",
    pt:"Nós temos uma conta na Netflix?",
    en:"Do we have a Netflix account?" },
  { id:"t-43",
    deck:"u01-grammar1",
    pt:"Nós realmente precisamos maratonar essa série?",
    en:"Do we really need to binge-watch this show?",
    accept:["Do we really need to binge-watch this series?"] },
  { id:"t-44",
    deck:"u01-grammar1",
    pt:"A gente tem tempo pra mais um episódio?",
    en:"Do we have time to watch another episode?",
    accept:["Do we have time for another episode?"] },
  { id:"t-45",
    deck:"u01-grammar1",
    pt:"Elas/eles jogam videogames?",
    en:"Do they play video games?",
    accept:["Do they play videogames?"] },
  { id:"t-46",
    deck:"u01-grammar1",
    pt:"Elas/eles preferem filmes ou séries?",
    en:"Do they prefer movies or TV series?",
    accept:["Do they prefer movies or series?", "Do they prefer films or TV series?"] },

  /* ---- Deck 6: Grammar Hacks 02 (12 cartões) ---- */
  { id:"t-47",
    deck:"u01-grammar2",
    pt:"O que você quer assistir?",
    en:"What do you want to watch?" },
  { id:"t-48",
    deck:"u01-grammar2",
    pt:"Que horas você chega em casa?",
    en:"What time do you get home?",
    accept:["What time do you arrive home?", "What time do you come home?"] },
  { id:"t-49",
    deck:"u01-grammar2",
    pt:"Qual filme do Harry Potter você acha que é o melhor?",
    en:"Which Harry Potter movie do you think is the best?",
    accept:["Which Harry Potter movie do you think is best?"] },
  { id:"t-50",
    deck:"u01-grammar2",
    pt:"Qual plataforma de streaming você usa?",
    en:"Which streaming platform do you use?" },
  { id:"t-51",
    deck:"u01-grammar2",
    pt:"Onde elas/eles guardam os livros?",
    en:"Where do they keep the books?" },
  { id:"t-52",
    deck:"u01-grammar2",
    pt:"Quando podemos dar play?",
    en:"When do we press play?",
    accept:["When can we press play?"] },
  { id:"t-53",
    deck:"u01-grammar2",
    pt:"De quem você gosta mais nesse filme?",
    en:"Who do you like the most in this movie?",
    accept:["Who do you like most in this movie?"] },
  { id:"t-54",
    deck:"u01-grammar2",
    pt:"Pra quem você conta seus segredos?",
    en:"Who do you tell your secrets to?",
    accept:["Whom do you tell your secrets to?", "To whom do you tell your secrets?"] },
  { id:"t-55",
    deck:"u01-grammar2",
    pt:"Como você gosta do seu café?",
    en:"How do you like your coffee?" },
  { id:"t-56",
    deck:"u01-grammar2",
    pt:"Pra onde nós vamos agora?",
    en:"Where do we go now?" },
  { id:"t-57",
    deck:"u01-grammar2",
    pt:"Por que elas/eles querem ir pro cinema hoje?",
    en:"Why do they want to go to the movies today?" },
  { id:"t-58",
    deck:"u01-grammar2",
    pt:"Por que elas/eles gostam tanto desse filme?",
    en:"Why do they like this movie so much?" },

  /* ---- Deck 7: Pronunciation Hacks (17 cartões) ---- */
  { id:"t-59",
    deck:"u01-pronunciation",
    pt:"Eu acho que estou apaixonada/apaixonado.",
    en:"I think I'm in love." },
  { id:"t-60",
    deck:"u01-pronunciation",
    pt:"Você é mais esperta/esperto do que eu.",
    en:"You're smarter than I am.",
    accept:["You're smarter than me.", "You are smarter than me."] },
  { id:"t-61",
    deck:"u01-pronunciation",
    pt:"Eu tenho certeza que estamos perdidas/perdidos.",
    en:"I'm sure we're lost." },
  { id:"t-62",
    deck:"u01-pronunciation",
    pt:"Elas/Eles estão felizes que você está aqui.",
    en:"They're glad you're here." },
  { id:"t-63",
    deck:"u01-pronunciation",
    pt:"Ele está chateado, porque ela está indo embora.",
    en:"He's upset because she's leaving." },
  { id:"t-64",
    deck:"u01-pronunciation",
    pt:"É por isso que é difícil às vezes.",
    en:"That's why it's hard sometimes." },
  { id:"t-65",
    deck:"u01-pronunciation",
    pt:"O que está errado?",
    en:"What's wrong?" },
  { id:"t-66",
    deck:"u01-pronunciation",
    pt:"Quando é o seu aniversário?",
    en:"When's your birthday?" },
  { id:"t-67",
    deck:"u01-pronunciation",
    pt:"Quem está aí?",
    en:"Who's there?" },
  { id:"t-68",
    deck:"u01-pronunciation",
    pt:"Por que ele está fazendo isso?",
    en:"Why's he doing that?" },
  { id:"t-69",
    deck:"u01-pronunciation",
    pt:"Onde é o banheiro?",
    en:"Where's the restroom?",
    accept:["Where's the bathroom?", "Where is the bathroom?", "Where's the toilet?"] },
  { id:"t-70",
    deck:"u01-pronunciation",
    pt:"Tem alguém na porta.",
    en:"There's someone at the door." },
  { id:"t-71",
    deck:"u01-pronunciation",
    pt:"Quando nós vamos embora?",
    en:"When're we leaving?" },
  { id:"t-72",
    deck:"u01-pronunciation",
    pt:"Com quem você está falando?",
    en:"Who're you talking to?",
    accept:["To whom are you talking?"] },
  { id:"t-73",
    deck:"u01-pronunciation",
    pt:"Por que elas/eles estão tão quietas/quietos?",
    en:"Why're they so quiet?" },
  { id:"t-74",
    deck:"u01-pronunciation",
    pt:"Vocês são os melhores!",
    en:"You guys're the best!",
    accept:["Y'all're the best!", "You are the best!", "You guys are the best!"] },
  { id:"t-75",
    deck:"u01-pronunciation",
    pt:"Vocês são os melhores!",
    en:"Y'all're the best!",
    accept:["You guys're the best!", "You are the best!", "You all are the best!"] },
];

/* ================= CORREÇÃO DA RESPOSTA DIGITADA =================
   Funções puras sobre os cartões (o estado e a renderização ficam em
   js/app.js). A ideia é reprovar erro de inglês, nunca diferença de
   digitação: acento, caixa, pontuação, hífen e contração não contam. */

/* Contrações expandidas para a forma longa, nos DOIS lados da comparação.
   É o que faz "When are we leaving?" valer por "When're we leaving?" —
   e são 20 os cartões do deck Pronunciation Hacks que dependem disso.
   A ordem importa: as mais longas primeiro (y'all're antes de y'all). */
const TRANS_CONTRACTIONS = [
  ["y'all're", "you all are"], ["y'all", "you all"],
  ["guys're", "guys are"],
  ["when're", "when are"], ["who're", "who are"], ["why're", "why are"],
  ["where're", "where are"], ["how're", "how are"], ["what're", "what are"],
  ["i'm", "i am"], ["you're", "you are"], ["we're", "we are"], ["they're", "they are"],
  ["he's", "he is"], ["she's", "she is"], ["it's", "it is"], ["that's", "that is"],
  ["what's", "what is"], ["when's", "when is"], ["who's", "who is"], ["why's", "why is"],
  ["where's", "where is"], ["how's", "how is"], ["there's", "there is"], ["here's", "here is"],
  ["don't", "do not"], ["doesn't", "does not"], ["didn't", "did not"],
  ["isn't", "is not"], ["aren't", "are not"], ["wasn't", "was not"], ["weren't", "were not"],
  ["can't", "can not"], ["cannot", "can not"], ["won't", "will not"],
  ["i'll", "i will"], ["we'll", "we will"], ["you'll", "you will"], ["they'll", "they will"],
  ["i've", "i have"], ["we've", "we have"], ["you've", "you have"], ["they've", "they have"],
  ["i'd", "i would"], ["let's", "let us"],
];

/* "Number Two" e "Number 2" são a mesma resposta. */
const TRANS_NUMBERS = {
  one: "1", two: "2", three: "3", four: "4", five: "5", six: "6",
  seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12",
};

/* Reduz a frase à sua forma comparável. */
function transNormalize(str) {
  let s = String(str == null ? "" : str);
  s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");   // tira acentos
  s = s.toLowerCase();
  s = s.replace(/[‘’´`]/g, "'");             // apóstrofos tipográficos
  s = s.replace(/[-–—/]/g, " ");                  // binge-watch == binge watch
  TRANS_CONTRACTIONS.forEach(pair => {
    s = s.replace(new RegExp("\\b" + pair[0] + "\\b", "g"), pair[1]);
  });
  s = s.replace(/[^a-z0-9\s']/g, " ");                      // resto da pontuação
  s = s.replace(/'/g, "");                                  // possessivo, o'clock etc.
  s = s.replace(/\b[a-z]+\b/g, w => TRANS_NUMBERS[w] || w);
  return s.replace(/\s+/g, " ").trim();
}

/* Distância de Levenshtein, usada só para separar erro de digitação
   de resposta diferente. */
function transLevenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = [];
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + custo);
    }
    prev = cur;
  }
  return prev[b.length];
}

/* Todas as respostas aceitas de um cartão (a do cartão + as alternativas). */
function transExpectedAnswers(card) {
  return [card.en].concat(card.accept || []);
}

/* Corrige a resposta digitada.
   - "certo":     bate com a resposta do cartão ou com uma alternativa
   - "quase":     mesmo número de palavras e pouquíssimos caracteres de
                  diferença — erro de digitação, não de inglês
   - "diferente": qualquer outra coisa
   Retorna também `best`: a resposta esperada mais próxima do que foi
   digitado, que é a que o diff mostra. */
function gradeTransAnswer(card, typed) {
  const alvo = transNormalize(typed);
  const esperadas = transExpectedAnswers(card);
  if (!alvo) return { level: "vazio", best: card.en, distance: Infinity };

  for (let i = 0; i < esperadas.length; i++) {
    if (transNormalize(esperadas[i]) === alvo) {
      return { level: "certo", best: esperadas[i], distance: 0 };
    }
  }

  let best = card.en;
  let menor = Infinity;
  esperadas.forEach(esp => {
    const d = transLevenshtein(transNormalize(esp), alvo);
    if (d < menor) { menor = d; best = esp; }
  });

  /* "quase" só quando o número de palavras bate: assim palavra faltando
     ou sobrando continua sendo erro, e não é tratada como deslize de teclado. */
  const mesmasPalavras = transNormalize(best).split(" ").length === alvo.split(" ").length;
  const limite = Math.max(1, Math.min(3, Math.round(transNormalize(best).length * 0.1)));
  if (mesmasPalavras && menor <= limite) return { level: "quase", best: best, distance: menor };
  return { level: "diferente", best: best, distance: menor };
}

/* Diff palavra a palavra (LCS) entre a resposta esperada e a digitada.
   É o que transforma um "errado" em aula: mostra qual palavra faltou e
   qual sobrou, em vez de só dizer que está errado. */
function transDiffWords(expected, typed) {
  const alvo = String(expected).split(/\s+/).filter(Boolean);
  const dado = String(typed).split(/\s+/).filter(Boolean);
  const na = alvo.map(transNormalize);
  const nd = dado.map(transNormalize);

  const tabela = [];
  for (let i = 0; i <= na.length; i++) tabela.push(new Array(nd.length + 1).fill(0));
  for (let i = na.length - 1; i >= 0; i--) {
    for (let j = nd.length - 1; j >= 0; j--) {
      tabela[i][j] = na[i] === nd[j]
        ? tabela[i + 1][j + 1] + 1
        : Math.max(tabela[i + 1][j], tabela[i][j + 1]);
    }
  }

  const esperado = [];
  const digitado = [];
  let i = 0, j = 0;
  while (i < na.length && j < nd.length) {
    if (na[i] === nd[j]) {
      esperado.push({ text: alvo[i], state: "same" });
      digitado.push({ text: dado[j], state: "same" });
      i++; j++;
    } else if (tabela[i + 1][j] >= tabela[i][j + 1]) {
      esperado.push({ text: alvo[i], state: "missing" });
      i++;
    } else {
      digitado.push({ text: dado[j], state: "extra" });
      j++;
    }
  }
  while (i < na.length) { esperado.push({ text: alvo[i], state: "missing" }); i++; }
  while (j < nd.length) { digitado.push({ text: dado[j], state: "extra" }); j++; }
  return { expected: esperado, typed: digitado };
}

/* Cartões de um deck, na ordem do CSV. */
function getTransCardsForDeck(deckKey) {
  return TRANS_CARDS.filter(c => c.deck === deckKey);
}

/* Chaves dos decks de uma unidade, na ordem em que foram declarados. */
function getTransDecksForUnit(unitKey) {
  return Object.keys(TRANS_DECKS).filter(k => TRANS_DECKS[k].unit === unitKey);
}

/* Quantos cartões a unidade tem no total (0 se ainda não tem baralho). */
function countTransCardsForUnit(unitKey) {
  return getTransDecksForUnit(unitKey).reduce((n, k) => n + getTransCardsForDeck(k).length, 0);
}
