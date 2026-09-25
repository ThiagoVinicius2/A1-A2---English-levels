/* ============================================================
   Módulo separado: "Do Português para o Inglês"

   Produção, não reconhecimento: a frase aparece em português e a
   resposta é digitada em inglês, sem alternativas para escolher.

   Origem dos dados: decks MemHack do curso, exportados em CSV
   (colunas id, deck, ingles, portugues), uma unidade por arquivo.
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

  "u02-comprehension":  { unit: "u02", label: "Comprehension Practice",    tag: "Deck 1" },
  "u02-vocab":          { unit: "u02", label: "Vocab Rocket",              tag: "Deck 2" },
  "u02-immersion":      { unit: "u02", label: "Immersion Time",            tag: "Deck 3" },
  "u02-grammar1":       { unit: "u02", label: "Grammar Hacks 01",          tag: "Deck 4" },
  "u02-grammar2":       { unit: "u02", label: "Grammar Hacks 02",          tag: "Deck 5" },
  "u02-pronunciation":  { unit: "u02", label: "Pronunciation Hacks",       tag: "Deck 6" },

  "u03-comprehension":  { unit: "u03", label: "Comprehension Practice",    tag: "Deck 1" },
  "u03-vocab":          { unit: "u03", label: "Vocab Rocket",              tag: "Deck 2" },
  "u03-immersion":      { unit: "u03", label: "Immersion Time",            tag: "Deck 3" },
  "u03-grammar1":       { unit: "u03", label: "Grammar Hacks 01",          tag: "Deck 4" },
  "u03-grammar2":       { unit: "u03", label: "Grammar Hacks 02",          tag: "Deck 5" },
  "u03-pronunciation":  { unit: "u03", label: "Pronunciation Hacks",       tag: "Deck 6" },

  "u04-comprehension":  { unit: "u04", label: "Comprehension Practice",      tag: "Deck 1" },
  "u04-vocab":          { unit: "u04", label: "Vocab Rocket",                tag: "Deck 2" },
  "u04-immersion":      { unit: "u04", label: "Immersion Time",              tag: "Deck 3" },
  "u04-grammar1":       { unit: "u04", label: "Grammar Hacks 01",            tag: "Deck 4" },
  "u04-grammar2":       { unit: "u04", label: "Grammar Hacks (part II)",     tag: "Deck 5" },
  "u04-pronunciation":  { unit: "u04", label: "Pronunciation Hacks",         tag: "Deck 6" },
  "u04-study":          { unit: "u04", label: "Study Tips",                  tag: "Deck 7" },
};

/* ================= OS 75 CARTÕES ================= */
const TRANS_CARDS = [
  /* ==================== UNIT 1 ==================== */

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
    note:"Also: Peace out!" },
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

  /* ==================== UNIT 2 ==================== */

  /* ---- Deck 1: Comprehension Practice (9 cartões) ---- */
  { id:"t-76",
    deck:"u02-comprehension",
    pt:"e eu acho que vou vencer o The Circle.",
    en:"and I think I'm gonna win The Circle.",
    accept:["And I think I'm going to win The Circle.", "I think I'm gonna win The Circle."] },
  { id:"t-77",
    deck:"u02-comprehension",
    pt:"eu tenho um segredo guardado pros jogadores.",
    en:"I do have a secret in store for the players.",
    accept:["I have a secret in store for the players."] },
  { id:"t-78",
    deck:"u02-comprehension",
    pt:"Eu sou um cara. Hahahaha!",
    en:"I'm a dude. Hahahaha!",
    accept:["I'm a dude. Haha!", "I'm a dude."] },
  { id:"t-79",
    deck:"u02-comprehension",
    pt:"Olá, meu nome é Seaburn, sou de Boston, Massachusetts.",
    en:"Hi, my name is Seaburn, I'm from Boston, Massachusetts.",
    accept:["Hello, my name is Seaburn, I'm from Boston, Massachusetts."] },
  { id:"t-80",
    deck:"u02-comprehension",
    pt:"Eu sou assistente social na Victor Serviços Humanos.",
    en:"I am a caseworker for Victor Human Services.",
    accept:["I am a social worker for Victor Human Services."] },
  { id:"t-81",
    deck:"u02-comprehension",
    pt:"Eu trabalho com pessoas com deficiência física,",
    en:"I work with people with physical disabilities," },
  { id:"t-82",
    deck:"u02-comprehension",
    pt:"mas no The Circle eu vou interpretar a personagem Rebecca",
    en:"but in The Circle I'll be playing the character Rebecca,",
    accept:["But in The Circle I'm going to play the character Rebecca."] },
  { id:"t-83",
    deck:"u02-comprehension",
    pt:"Eu sou um designer de realidade virtual.",
    en:"I am a virtual reality designer." },
  { id:"t-84",
    deck:"u02-comprehension",
    pt:"Minha presença nas mídias sociais é mínima.",
    en:"My presence on social media, it's very minimal.",
    accept:["My presence on social media is very minimal.", "My social media presence is very minimal."] },

  /* ---- Deck 2: Vocab Rocket (6 cartões) ---- */
  { id:"t-85",
    deck:"u02-vocab",
    pt:"Eu geralmente acordo às 7 da manhã e me alongo antes de sair da cama.",
    en:"I usually wake up at 7 a.m and stretch before I get out of bed.",
    accept:["I usually wake up at 7 am and stretch before I get out of bed."] },
  { id:"t-86",
    deck:"u02-vocab",
    pt:"Eu geralmente escovo os dentes antes de comer pela manhã.",
    en:"I usually brush my teeth before I eat in the morning." },
  { id:"t-87",
    deck:"u02-vocab",
    pt:"Eu frequentemente pulo o café-da-manhã e como salada no almoço.",
    en:"I often skip breakfast and have salad for lunch.",
    accept:["I often skip breakfast and have a salad for lunch."] },
  { id:"t-88",
    deck:"u02-vocab",
    pt:"Lave as mãos antes de comer.",
    en:"Wash your hands before you eat.",
    accept:["Wash your hands before eating."] },
  { id:"t-89",
    deck:"u02-vocab",
    pt:"Eu estudo inglês todo dia.",
    en:"I study English every day." },
  { id:"t-90",
    deck:"u02-vocab",
    pt:"Eu nunca vou para festas nas sextas.",
    en:"I never go to parties on Fridays.",
    accept:["I never go to parties on Friday."] },

  /* ---- Deck 3: Immersion Time (10 cartões) ---- */
  { id:"t-91",
    deck:"u02-immersion",
    pt:"Obrigada/Obrigado, cara!",
    en:"Thanks, man!",
    accept:["Thank you, man!", "Thanks man!"] },
  { id:"t-92",
    deck:"u02-immersion",
    pt:"Obrigada/Obrigado mesmo!",
    en:"Thanks a bunch!",
    accept:["Thanks a ton!", "Thanks a million!"],
    note:"Also: Thanks a ton! · Thanks a million!" },
  { id:"t-93",
    deck:"u02-immersion",
    pt:"Muito obrigada/obrigado.",
    en:"Thank you very much.",
    accept:["Thank you so much.", "Many thanks."],
    note:"Also: Thank you so much." },
  { id:"t-94",
    deck:"u02-immersion",
    pt:"Você não deveria.",
    en:"You shouldn't have.",
    note:"In Brazilian Portuguese also: “Não precisava!”" },
  { id:"t-95",
    deck:"u02-immersion",
    pt:"Te devo uma.",
    en:"I owe you one." },
  { id:"t-96",
    deck:"u02-immersion",
    pt:"Eu realmente aprecio isso.",
    en:"I really appreciate it.",
    accept:["I appreciate it."],
    note:"“Really” is optional: I appreciate it." },
  { id:"t-97",
    deck:"u02-immersion",
    pt:"Sou muito grata/grato pelo que você fez.",
    en:"I am so thankful for what you did.",
    accept:["I'm so thankful for what you did.", "I am very thankful for what you did."] },
  { id:"t-98",
    deck:"u02-immersion",
    pt:"Muito obrigada/obrigado.",
    en:"Many thanks.",
    accept:["Thank you very much.", "Thank you so much."] },
  { id:"t-99",
    deck:"u02-immersion",
    pt:"Não consigo te agradecer o suficiente.",
    en:"I can't thank you enough.",
    accept:["I cannot thank you enough."],
    note:"Can be extended: I can't thank you enough for everything." },
  { id:"t-100",
    deck:"u02-immersion",
    pt:"Dizer “muito obrigada/obrigado” não é suficiente.",
    en:"To say thank you is not enough.",
    accept:["Saying thank you is not enough."] },

  /* ---- Deck 4: Grammar Hacks 01 (11 cartões) ---- */
  { id:"t-101",
    deck:"u02-grammar1",
    pt:"Ele parece cansado.",
    en:"He looks tired.",
    accept:["He seems tired."] },
  { id:"t-102",
    deck:"u02-grammar1",
    pt:"Minha/meu chefe precisa desse trabalho pronto hoje.",
    en:"My boss needs this work done today.",
    accept:["My boss needs this job done today."] },
  { id:"t-103",
    deck:"u02-grammar1",
    pt:"Ele gasta bastante tempo no celular.",
    en:"He spends a lot of time on his phone." },
  { id:"t-104",
    deck:"u02-grammar1",
    pt:"Ela nunca responde minhas mensagens.",
    en:"She never answers my messages.",
    accept:["She never replies to my messages."] },
  { id:"t-105",
    deck:"u02-grammar1",
    pt:"Ela sempre ajuda as amigas/os amigos.",
    en:"She always helps her friends." },
  { id:"t-106",
    deck:"u02-grammar1",
    pt:"Quando chove muito, a internet fica ruim.",
    en:"When it rains a lot, the internet gets awful.",
    accept:["When it rains a lot, the internet gets bad.", "When it rains a lot, the internet becomes awful."] },
  { id:"t-107",
    deck:"u02-grammar1",
    pt:"Custa muito dinheiro ter um iPhone.",
    en:"It costs a lot to have an iPhone.",
    accept:["It costs a lot of money to have an iPhone."] },
  { id:"t-108",
    deck:"u02-grammar1",
    pt:"Ele não fala japonês.",
    en:"He doesn't speak Japanese." },
  { id:"t-109",
    deck:"u02-grammar1",
    pt:"Ela não gosta de ler no tablet.",
    en:"She doesn't like to read on her tablet.",
    accept:["She doesn't like reading on her tablet."] },
  { id:"t-110",
    deck:"u02-grammar1",
    pt:"Ela não quer um emprego remoto.",
    en:"She doesn't want a home based job.",
    accept:["She doesn't want a remote job."] },
  { id:"t-111",
    deck:"u02-grammar1",
    pt:"Não importa o que ele diga, eu não gosto dele.",
    en:"It doesn't matter what he says, I don't like him." },

  /* ---- Deck 5: Grammar Hacks 02 (12 cartões) ---- */
  { id:"t-112",
    deck:"u02-grammar2",
    pt:"Ele gosta do emprego dele?",
    en:"Does he like his job?" },
  { id:"t-113",
    deck:"u02-grammar2",
    pt:"Ela corre todo dia?",
    en:"Does she run every day?" },
  { id:"t-114",
    deck:"u02-grammar2",
    pt:"Ele mora aqui perto?",
    en:"Does he live nearby?" },
  { id:"t-115",
    deck:"u02-grammar2",
    pt:"Isso realmente importa?",
    en:"Does it really matter?" },
  { id:"t-116",
    deck:"u02-grammar2",
    pt:"Por que ela trabalha tanto?",
    en:"Why does she work so much?" },
  { id:"t-117",
    deck:"u02-grammar2",
    pt:"Qual smartphone ela quer comprar?",
    en:"Which smartphone does she want to buy?" },
  { id:"t-118",
    deck:"u02-grammar2",
    pt:"Onde ela estuda?",
    en:"Where does she go to school?",
    accept:["Where does she study?"] },
  { id:"t-119",
    deck:"u02-grammar2",
    pt:"O que o seu pai acha disso?",
    en:"What does your dad think about this?",
    accept:["What does your father think about this?"] },
  { id:"t-120",
    deck:"u02-grammar2",
    pt:"Pra onde ela quer se mudar?",
    en:"Where does she want to move to?",
    accept:["Where does she want to move?"] },
  { id:"t-121",
    deck:"u02-grammar2",
    pt:"Quando o filme começa?",
    en:"When does the movie start?" },
  { id:"t-122",
    deck:"u02-grammar2",
    pt:"O que isso significa?",
    en:"What does it mean?" },
  { id:"t-123",
    deck:"u02-grammar2",
    pt:"Quanto tempo demora pra aprender um idioma?",
    en:"How long does it take to learn a language?" },

  /* ---- Deck 6: Pronunciation Hacks (9 cartões) ---- */
  { id:"t-124",
    deck:"u02-pronunciation",
    pt:"Minha família sempre comemora com uma garrafa de vinho.",
    en:"My family always celebrates with a bottle of wine." },
  { id:"t-125",
    deck:"u02-pronunciation",
    pt:"Mãe, você pode me dar uma fatia de torta?",
    en:"Mom, can you give me a slice of pie?",
    accept:["Mum, can you give me a slice of pie?"] },
  { id:"t-126",
    deck:"u02-pronunciation",
    pt:"O seu pai é policial?",
    en:"Is your dad a police officer?",
    accept:["Is your father a police officer?", "Is your dad a policeman?"] },
  { id:"t-127",
    deck:"u02-pronunciation",
    pt:"Imagine nosso irmãozinho como o presidente da empresa!",
    en:"Imagine our little brother as the president of the company!" },
  { id:"t-128",
    deck:"u02-pronunciation",
    pt:"Você não divide o banheiro com a sua irmã?",
    en:"Don't you share the bathroom with your sister?" },
  { id:"t-129",
    deck:"u02-pronunciation",
    pt:"Minha sogra me deu um álbum de música clássica.",
    en:"My mother-in-law gave me a classical music album." },
  { id:"t-130",
    deck:"u02-pronunciation",
    pt:"O tio dela é canadense.",
    en:"Her uncle is Canadian." },
  { id:"t-131",
    deck:"u02-pronunciation",
    pt:"Você não pode sair por aí desse jeito.",
    en:"You can't go out and about like that." },
  { id:"t-132",
    deck:"u02-pronunciation",
    pt:"O que você sugere, tia Sally?",
    en:"What do you suggest, aunt Sally?",
    accept:["What do you suggest, Aunt Sally?"] },

  /* ==================== UNIT 3 ==================== */

  /* ---- Deck 1: Comprehension Practice (13 cartões) ---- */
  { id:"t-133",
    deck:"u03-comprehension",
    pt:"Chloe! Chloe, Chloe, eu tenho uma situação ruim. A Katie trouxe um cachorro novo do canil!",
    en:"Chloe! Chloe, Chloe, I got a bad situation. Katie brought home a new dog from the pound!",
    accept:["Chloe! Chloe, Chloe, I have a bad situation. Katie brought home a new dog from the pound!"] },
  { id:"t-134",
    deck:"u03-comprehension",
    pt:"Ela disse que ele é meu irmão. Eu não quero um irmão! E eu não... Eu nem tenho mais cama!",
    en:"She said he's my brother. I don't want a brother! And I don't... I don't even have a bed now!" },
  { id:"t-135",
    deck:"u03-comprehension",
    pt:"Eu estou dormindo no chão, feito um cachorro. Por que a Katie faria isso comigo?",
    en:"I'm sleeping on the floor, like a dog. Why would Katie do this to me?" },
  { id:"t-136",
    deck:"u03-comprehension",
    pt:"Porque ela gosta de cachorros, Max. E pessoas que gostam de cachorros fazem coisas estranhas e inexplicáveis, tipo...",
    en:"Because she's a dog person, Max. And dog people do weird, inexplicable things, like..." },
  { id:"t-137",
    deck:"u03-comprehension",
    pt:"Elas pegam cachorros em vez de gatos.",
    en:"They get dogs instead of cats." },
  { id:"t-138",
    deck:"u03-comprehension",
    pt:"Tá, por favor, não começa, Chloe. Não tá ajudando.",
    en:"Okay, please, don't start now, Chloe. That is not helping.",
    accept:["OK, please, don't start now, Chloe. That is not helping.", "Okay, please, don't start now, Chloe. That's not helping."] },
  { id:"t-139",
    deck:"u03-comprehension",
    pt:"Max, qual é! Eu sou sua amiga. Tá? E, como sua amiga, eu tenho que ser sincera com você.",
    en:"Max, come on! I'm your friend. Okay? And as your friend, I gotta be honest with you.",
    accept:["Max, come on! I'm your friend. Okay? And as your friend, I have to be honest with you."] },
  { id:"t-140",
    deck:"u03-comprehension",
    pt:"Eu não ligo pra você ou pros seus problemas. Mas se você não fizer algo sobre esse cara, e logo,",
    en:"I don't care about you or your problems. But if you don't do something about this guy, and soon," },
  { id:"t-141",
    deck:"u03-comprehension",
    pt:"sua vidinha perfeita com a sua humana idiota vai acabar... Pra sempre.",
    en:"your perfect little life with your dumb, bleh human is gonna be over... Forever." },
  { id:"t-142",
    deck:"u03-comprehension",
    pt:"Pra sempre?",
    en:"Forever?" },
  { id:"t-143",
    deck:"u03-comprehension",
    pt:"Pra sempre. É, foi o que eu acabei de... Por que esse rato ainda tá na minha pata?",
    en:"Forever. Yeah, that's what I just... Why is this mouse on my paw still?",
    accept:["Forever. Yeah, that's what I just... Why is this mouse still on my paw?"] },
  { id:"t-144",
    deck:"u03-comprehension",
    pt:"Olha! Se você realmente quer reconquistar o seu território, você vai ter que começar a agir como o cachorro alfa.",
    en:"Look! If you really wanna get your turf back, you're gonna have to start acting like the alpha dog." },
  { id:"t-145",
    deck:"u03-comprehension",
    pt:"Certo! Cachorro alfa. Eu consigo fazer isso.",
    en:"Right! Alpha dog. I can do that.",
    accept:["Right! Alpha dog. I can do it."] },

  /* ---- Deck 2: Vocab Rocket (10 cartões) ---- */
  { id:"t-146",
    deck:"u03-vocab",
    pt:"Ele anda de bicicleta com seu cachorro.",
    en:"He rides a bike with his dog.",
    accept:["He rides a bicycle with his dog."] },
  { id:"t-147",
    deck:"u03-vocab",
    pt:"Ele tem um cachorro e leva ele pra passear todos os dias.",
    en:"He has a dog and he takes him for a walk every day.",
    accept:["He has a dog and he walks him every day."] },
  { id:"t-148",
    deck:"u03-vocab",
    pt:"Eu quero comprar um lançador de bola pra brincar de pegar com meu cachorro.",
    en:"I want to buy a ball thrower to play fetch with my dog." },
  { id:"t-149",
    deck:"u03-vocab",
    pt:"Eu carrego minhas compras na cesta da minha bicicleta.",
    en:"I carry my groceries in my bike basket.",
    accept:["I carry my groceries in my bicycle basket."] },
  { id:"t-150",
    deck:"u03-vocab",
    pt:"Quando minha cachorra precisa ir ao veterinário, eu levo ela na cesta da bicicleta.",
    en:"When my dog needs to go to the vet, I take her in my bike basket.",
    accept:["When my dog needs to go to the vet, I take her in my bicycle basket.", "When my dog needs to go to the veterinarian, I take her in my bike basket."] },
  { id:"t-151",
    deck:"u03-vocab",
    pt:"Nossa gata/Nosso gato cochila em uma cesta pequena.",
    en:"Our cat naps in a small basket." },
  { id:"t-152",
    deck:"u03-vocab",
    pt:"Eu gosto de tirar uma soneca depois do almoço.",
    en:"I like to take a nap after lunch.",
    accept:["I like taking a nap after lunch."] },
  { id:"t-153",
    deck:"u03-vocab",
    pt:"Meu gato pula no meu colo e eu faço carinho nele.",
    en:"My cat jumps on my lap and I pet him.",
    accept:["My cat jumps onto my lap and I pet him."] },
  { id:"t-154",
    deck:"u03-vocab",
    pt:"Eu preciso dar um banho no meu cachorro",
    en:"I need to give my dog a bath.",
    accept:["I need to bathe my dog."] },
  { id:"t-155",
    deck:"u03-vocab",
    pt:"Uma vez por semana eu ensino um novo truque para o meu cachorro.",
    en:"Once a week I teach my dog a new trick.",
    accept:["Once a week I teach a new trick to my dog."] },

  /* ---- Deck 3: Immersion Time (6 cartões) ---- */
  { id:"t-156",
    deck:"u03-immersion",
    pt:"Sem problema!",
    en:"No problem.",
    accept:["No prob.", "No worries."],
    note:"Also: No prob." },
  { id:"t-157",
    deck:"u03-immersion",
    pt:"Claro!",
    en:"Sure!",
    accept:["Sure thing.", "Of course!"],
    note:"Also: Sure thing. · In Brazilian Portuguese also: “Imagina!”" },
  { id:"t-158",
    deck:"u03-immersion",
    pt:"A qualquer momento.",
    en:"Anytime.",
    accept:["Any time."],
    note:"In Brazilian Portuguese also: “Quando precisar.”" },
  { id:"t-159",
    deck:"u03-immersion",
    pt:"Não, eu que agradeço.",
    en:"No, thank you." },
  { id:"t-160",
    deck:"u03-immersion",
    pt:"Não precisa agradecer.",
    en:"Don't mention it." },
  { id:"t-161",
    deck:"u03-immersion",
    pt:"O prazer é meu.",
    en:"My pleasure.",
    accept:["The pleasure is mine."] },

  /* ---- Deck 4: Grammar Hacks 01 (14 cartões) ---- */
  { id:"t-162",
    deck:"u03-grammar1",
    pt:"Eu sou do Brasil.",
    en:"I am from Brazil." },
  { id:"t-163",
    deck:"u03-grammar1",
    pt:"Eu não estou com fome.",
    en:"I'm not hungry." },
  { id:"t-164",
    deck:"u03-grammar1",
    pt:"Tô curiosa/curioso? Sim, tô.",
    en:"Am I curious? Yes, I am.",
    note:"Short answers never contract: “Yes, I am”, never “Yes, I'm”." },
  { id:"t-165",
    deck:"u03-grammar1",
    pt:"Você é um ator excelente!",
    en:"You're an excellent actor!" },
  { id:"t-166",
    deck:"u03-grammar1",
    pt:"Você não está de bom humor, vamos conversar mais tarde.",
    en:"You aren't in a good mood, let's talk later.",
    accept:["You're not in a good mood, let's talk later."] },
  { id:"t-167",
    deck:"u03-grammar1",
    pt:"Você tá bem?",
    en:"Are you okay?",
    accept:["Are you OK?", "Are you alright?"] },
  { id:"t-168",
    deck:"u03-grammar1",
    pt:"Elas/eles são grandes fãs de reality shows.",
    en:"They're big reality show fans." },
  { id:"t-169",
    deck:"u03-grammar1",
    pt:"Nós não gostamos de KUWTK.",
    en:"We're not into KUWTK.",
    accept:["We aren't into KUWTK."] },
  { id:"t-170",
    deck:"u03-grammar1",
    pt:"Ela é uma figuraça!",
    en:"She's such a character!" },
  { id:"t-171",
    deck:"u03-grammar1",
    pt:"Ele não é quem ele diz ser.",
    en:"He is not who he says he is.",
    accept:["He isn't who he says he is.", "He's not who he says he is."] },
  { id:"t-172",
    deck:"u03-grammar1",
    pt:"Quantos anos ela tem?",
    en:"How old is she?" },
  { id:"t-173",
    deck:"u03-grammar1",
    pt:"Isso tá estranho.",
    en:"This is weird." },
  { id:"t-174",
    deck:"u03-grammar1",
    pt:"É hora de ir.",
    en:"It's time to go." },
  { id:"t-175",
    deck:"u03-grammar1",
    pt:"Não está tão frio lá fora.",
    en:"It isn't that cold outside.",
    accept:["It's not that cold outside."] },

  /* ---- Deck 5: Grammar Hacks 02 (12 cartões) ---- */
  { id:"t-176",
    deck:"u03-grammar2",
    pt:"Eu tô assistindo La Casa de Papel.",
    en:"I'm watching Money Heist." },
  { id:"t-177",
    deck:"u03-grammar2",
    pt:"Você tá pedindo demais!",
    en:"You're asking too much!" },
  { id:"t-178",
    deck:"u03-grammar2",
    pt:"O Tiago Leifert está apresentando o programa.",
    en:"Tiago Leifert is hosting the show." },
  { id:"t-179",
    deck:"u03-grammar2",
    pt:"Ela tá ligando pra pizzaria.",
    en:"She's calling the pizza place.",
    accept:["She's calling the pizzeria."] },
  { id:"t-180",
    deck:"u03-grammar2",
    pt:"Tá começando a chover.",
    en:"It's starting to rain." },
  { id:"t-181",
    deck:"u03-grammar2",
    pt:"Nós estamos sendo vigiados todo o tempo.",
    en:"We're being watched 24/7.",
    accept:["We're being watched all the time."] },
  { id:"t-182",
    deck:"u03-grammar2",
    pt:"Elas/eles estão transmitindo via Twitch.",
    en:"They're streaming on Twitch." },
  { id:"t-183",
    deck:"u03-grammar2",
    pt:"Os diretores estão ficando sem ideias.",
    en:"The directors are running out of ideas." },
  { id:"t-184",
    deck:"u03-grammar2",
    pt:"Não tô me sentindo bem.",
    en:"I'm not feeling very well.",
    accept:["I'm not feeling well."] },
  { id:"t-185",
    deck:"u03-grammar2",
    pt:"Ah não, ela não está indo na direção correta!",
    en:"Oh no, she isn't going in the right direction!",
    accept:["Oh no, she's not going in the right direction!"] },
  { id:"t-186",
    deck:"u03-grammar2",
    pt:"Você tá escutando?",
    en:"Are you listening?" },
  { id:"t-187",
    deck:"u03-grammar2",
    pt:"Elas/eles estão indo embora?",
    en:"Are they leaving?" },

  /* ---- Deck 6: Pronunciation Hacks (10 cartões) ---- */
  { id:"t-188",
    deck:"u03-pronunciation",
    pt:"Você é uma pessoa saudável?",
    en:"Are you a healthy person?" },
  { id:"t-189",
    deck:"u03-pronunciation",
    pt:"Tem coisas que a gente não consegue explicar.",
    en:"There are things we can't explain.",
    accept:["There are things that we can't explain."] },
  { id:"t-190",
    deck:"u03-pronunciation",
    pt:"A gente pode fazer isso juntos?",
    en:"Can we do this together?" },
  { id:"t-191",
    deck:"u03-pronunciation",
    pt:"Talvez, elas/eles joguem essas coisas fora.",
    en:"They might throw those things away.",
    accept:["They may throw those things away."] },
  { id:"t-192",
    deck:"u03-pronunciation",
    pt:"Obrigada/Obrigado, mas não estou com sede.",
    en:"Thanks, but I'm not thirsty." },
  { id:"t-193",
    deck:"u03-pronunciation",
    pt:"Um banho te cairia bem!",
    en:"You could use a bath!" },
  { id:"t-194",
    deck:"u03-pronunciation",
    pt:"Apenas respire.",
    en:"Just breathe." },
  { id:"t-195",
    deck:"u03-pronunciation",
    pt:"Eu sou o mais novo de três irmãos.",
    en:"I am the youngest of three brothers.",
    accept:["I'm the youngest of three brothers."] },
  { id:"t-196",
    deck:"u03-pronunciation",
    pt:"Você está indo para o Norte ou para o Sul?",
    en:"Are you going north or south?" },
  { id:"t-197",
    deck:"u03-pronunciation",
    pt:"Via de regra, a massa da pizza deve ser fina, não grossa.",
    en:"As a rule of thumb, pizza dough should be thin, not thick." },

  /* ==================== UNIT 4 ==================== */

  /* ---- Deck 1: Comprehension Practice (16 cartões) ---- */
  { id:"t-198",
    deck:"u04-comprehension",
    pt:"Uau! Que cachorro fofo! Eu amo goldens.",
    en:"Wow! What a cute dog! I love Goldens.",
    accept:["Wow! What a cute dog! I love Golden Retrievers."] },
  { id:"t-199",
    deck:"u04-comprehension",
    pt:"Obrigada, meu bem. Você tem uma pro Cashmere?",
    en:"Thank you, my love. Do you have one for Cashmere?" },
  { id:"t-200",
    deck:"u04-comprehension",
    pt:"É claro!",
    en:"Of course!" },
  { id:"t-201",
    deck:"u04-comprehension",
    pt:"Você sabe que ele fica com inveja.",
    en:"You know he gets jealous." },
  { id:"t-202",
    deck:"u04-comprehension",
    pt:"Nome?",
    en:"Name?" },
  { id:"t-203",
    deck:"u04-comprehension",
    pt:"Bonjour. Eu sou Emily em Paris e fui convidada pelo Instagram.",
    en:"Bonjour. I'm Emily in Paris and I was invited on Instagram." },
  { id:"t-204",
    deck:"u04-comprehension",
    pt:"Todo mundo foi.",
    en:"Everyone was." },
  { id:"t-205",
    deck:"u04-comprehension",
    pt:"Você pode me dar uma grande como a do Cashmere?",
    en:"Can I get a big one like Cashmere?",
    accept:["Can I have a big one like Cashmere?"] },
  { id:"t-206",
    deck:"u04-comprehension",
    pt:"Deixa eu checar. Não tem seguidores suficientes, então não.",
    en:"Let me check. Not enough followers, so no." },
  { id:"t-207",
    deck:"u04-comprehension",
    pt:"Por favor, integre o produto ao seu conteúdo nas redes sociais.",
    en:"Please integrate the product in your social media content.",
    accept:["Please integrate the product into your social media content."] },
  { id:"t-208",
    deck:"u04-comprehension",
    pt:"Esperamos um mínimo de cinco posts. Com seu alcance minúsculo, melhor que sejam dez.",
    en:"We expect a minimum of five posts. With your tiny reach, make it ten." },
  { id:"t-209",
    deck:"u04-comprehension",
    pt:"Deixa comigo. Eu vou dar a vocês quantidade e qualidade.",
    en:"Oh, I'm on it. I'll give you quantity and quality.",
    accept:["I'm on it. I'll give you quantity and quality."] },
  { id:"t-210",
    deck:"u04-comprehension",
    pt:"Você pode me mostrar a direção até Olivia Thompson?",
    en:"Can you point me in the direction of Olivia Thompson?" },
  { id:"t-211",
    deck:"u04-comprehension",
    pt:"Ela está prestes a discursar.",
    en:"She's about to speak." },
  { id:"t-212",
    deck:"u04-comprehension",
    pt:"Obrigado.",
    en:"Thank you." },
  { id:"t-213",
    deck:"u04-comprehension",
    pt:"Próxima!",
    en:"Next!" },

  /* ---- Deck 2: Vocab Rocket (10 cartões) ---- */
  { id:"t-214",
    deck:"u04-vocab",
    pt:"Ela sempre se veste bem.",
    en:"She always dresses well." },
  { id:"t-215",
    deck:"u04-vocab",
    pt:"Eu uso jeans todos os dias.",
    en:"I wear jeans every day." },
  { id:"t-216",
    deck:"u04-vocab",
    pt:"Uma regata é uma opção confortável para praticar esportes.",
    en:"A tank top is a comfortable option for sports.",
    accept:["A tank top is a comfortable option to play sports."] },
  { id:"t-217",
    deck:"u04-vocab",
    pt:"Minha filha/Meu filho ainda precisa de ajuda para se vestir.",
    en:"My kid still needs help to get dressed.",
    accept:["My child still needs help to get dressed.", "My kid still needs help getting dressed."] },
  { id:"t-218",
    deck:"u04-vocab",
    pt:"Meu vestido é casual/simples demais para um casamento, mas formal demais para trabalhar.",
    en:"My dress is too casual for a wedding, but too formal for work." },
  { id:"t-219",
    deck:"u04-vocab",
    pt:"Eu tenho esse evento chique esta noite para o qual eu preciso usar roupas formais.",
    en:"I have this fancy event in the evening that I need to wear formal clothes to." },
  { id:"t-220",
    deck:"u04-vocab",
    pt:"Eu adorei a escolha de roupas dela! Ela está usando uma saia e um blazer.",
    en:"I love her choice of clothes! She is wearing a skirt and a blazer." },
  { id:"t-221",
    deck:"u04-vocab",
    pt:"Eu uso a calça de moletom da minha irmã o tempo todo.",
    en:"I wear my sister's sweatpants all the time." },
  { id:"t-222",
    deck:"u04-vocab",
    pt:"Está frio lá fora! Lembre-se de colocar um casaco.",
    en:"It's cold outside! Remember to put on a coat." },
  { id:"t-223",
    deck:"u04-vocab",
    pt:"Um suéter com um sobretudo por cima fica muito estiloso.",
    en:"A sweater with an overcoat on top is so stylish.",
    accept:["A sweater with a coat on top is so stylish."] },

  /* ---- Deck 3: Immersion Time (21 cartões) ---- */
  { id:"t-224",
    deck:"u04-immersion",
    pt:"Você poderia falar um pouco mais devagar, por favor?",
    en:"Could you please speak a bit slower?",
    accept:["Could you speak a bit slower, please?", "Could you please speak more slowly?"] },
  { id:"t-225",
    deck:"u04-immersion",
    pt:"Você poderia repetir isso, por favor?",
    en:"Could you please repeat that?",
    accept:["Could you repeat that, please?"] },
  { id:"t-226",
    deck:"u04-immersion",
    pt:"Você poderia soletrar isso, por favor?",
    en:"Could you please spell that?",
    accept:["Could you spell that, please?"] },
  { id:"t-227",
    deck:"u04-immersion",
    pt:"Me desculpe, eu não entendi isso.",
    en:"I'm sorry, I didn't get that.",
    accept:["Sorry, I didn't get that."] },
  { id:"t-228",
    deck:"u04-immersion",
    pt:"Me desculpe, eu não entendo.",
    en:"I'm sorry, I don't understand.",
    accept:["Sorry, I don't understand."] },
  { id:"t-229",
    deck:"u04-immersion",
    pt:"Como é?",
    en:"What's that?",
    accept:["Sorry, what?", "What was that?"] },
  { id:"t-230",
    deck:"u04-immersion",
    pt:"Eu não sei essa palavra.",
    en:"I don't know that word." },
  { id:"t-231",
    deck:"u04-immersion",
    pt:"O que isso significa?",
    en:"What does it mean?" },
  { id:"t-232",
    deck:"u04-immersion",
    pt:"Eu esqueci.",
    en:"I forget.",
    accept:["I forgot."] },
  { id:"t-233",
    deck:"u04-immersion",
    pt:"Entendi!",
    en:"Gotcha!",
    accept:["Got it!", "Gotcha."] },
  { id:"t-234",
    deck:"u04-immersion",
    pt:"Isso faz sentido.",
    en:"That makes sense." },
  { id:"t-235",
    deck:"u04-immersion",
    pt:"Deixa eu ver se entendi.",
    en:"Let me see if I understand.",
    accept:["Let me see if I understood."] },
  { id:"t-236",
    deck:"u04-immersion",
    pt:"Como se diz...?",
    en:"How do you say...?" },
  { id:"t-237",
    deck:"u04-immersion",
    pt:"Como se pronuncia...?",
    en:"How do you pronounce...?" },
  { id:"t-238",
    deck:"u04-immersion",
    pt:"Qual o oposto de...?",
    en:"What's the opposite of...?" },
  { id:"t-239",
    deck:"u04-immersion",
    pt:"Como posso dizer...",
    en:"How can I put it..." },
  { id:"t-240",
    deck:"u04-immersion",
    pt:"Está certo?",
    en:"Is that right?" },
  { id:"t-241",
    deck:"u04-immersion",
    pt:"Eu não consigo te ouvir.",
    en:"I can't hear you." },
  { id:"t-242",
    deck:"u04-immersion",
    pt:"Eu não consigo te ver.",
    en:"I can't see you." },
  { id:"t-243",
    deck:"u04-immersion",
    pt:"Eu acho que você está travado.",
    en:"I think you're frozen." },
  { id:"t-244",
    deck:"u04-immersion",
    pt:"Você poderia digitar isso para mim, por favor?",
    en:"Could you please type that to me?",
    accept:["Could you please type that for me?", "Could you type that for me, please?"] },

  /* ---- Deck 4: Grammar Hacks 01 (13 cartões) ---- */
  { id:"t-245",
    deck:"u04-grammar1",
    pt:"Vou passar o dia com a minha irmã amanhã.",
    en:"I'm spending the day with my sister tomorrow." },
  { id:"t-246",
    deck:"u04-grammar1",
    pt:"Desculpa, não tô livre hoje à noite, eu vou encontrar uma amiga/um amigo.",
    en:"Sorry, I'm not free tonight, I'm meeting a friend." },
  { id:"t-247",
    deck:"u04-grammar1",
    pt:"Elas/eles vão viajar pra Miami no próximo domingo.",
    en:"They're flying to Miami next Sunday." },
  { id:"t-248",
    deck:"u04-grammar1",
    pt:"Nós não vamos visitar o museu no sábado.",
    en:"We're not visiting the museum on Saturday.",
    accept:["We aren't visiting the museum on Saturday."] },
  { id:"t-249",
    deck:"u04-grammar1",
    pt:"Nós vamos sair cedo amanhã de manhã.",
    en:"We're leaving early tomorrow morning." },
  { id:"t-250",
    deck:"u04-grammar1",
    pt:"Ele vai filmar a cena à noite.",
    en:"He's filming the scene in the evening." },
  { id:"t-251",
    deck:"u04-grammar1",
    pt:"Eles virão à festa hoje à noite.",
    en:"They're coming to the party tonight." },
  { id:"t-252",
    deck:"u04-grammar1",
    pt:"O que você vai fazer no fim de semana?",
    en:"What are you doing this weekend?" },
  { id:"t-253",
    deck:"u04-grammar1",
    pt:"Onde ela vai ficar nas férias?",
    en:"Where is she staying for the holidays?" },
  { id:"t-254",
    deck:"u04-grammar1",
    pt:"Quando seu irmão vem pra casa?",
    en:"When is your brother coming home?" },
  { id:"t-255",
    deck:"u04-grammar1",
    pt:"A que horas o Pedro chega amanhã?",
    en:"What time is Pedro arriving tomorrow?" },
  { id:"t-256",
    deck:"u04-grammar1",
    pt:"A Sarah vai casar mês que vem.",
    en:"Sarah is getting married next month." },
  { id:"t-257",
    deck:"u04-grammar1",
    pt:"A Rebecca não vai jogar tênis com a gente amanhã, ela machucou a perna.",
    en:"Rebecca isn't playing tennis with us tomorrow, she's hurt her leg.",
    accept:["Rebecca is not playing tennis with us tomorrow, she has hurt her leg."] },

  /* ---- Deck 5: Grammar Hacks (part II) (12 cartões) ---- */
  { id:"t-258",
    deck:"u04-grammar2",
    pt:"Comer comida processada é ruim pra você.",
    en:"Eating processed food is bad for you." },
  { id:"t-259",
    deck:"u04-grammar2",
    pt:"Eu gosto de falar com você.",
    en:"I enjoy talking to you.",
    accept:["I enjoy talking with you."] },
  { id:"t-260",
    deck:"u04-grammar2",
    pt:"Você gosta de tirar fotos?",
    en:"Do you like to take pictures?",
    accept:["Do you like taking pictures?"] },
  { id:"t-261",
    deck:"u04-grammar2",
    pt:"Ela não gosta de trabalhar nos fins de semana.",
    en:"She dislikes working on weekends.",
    accept:["She doesn't like working on weekends."] },
  { id:"t-262",
    deck:"u04-grammar2",
    pt:"Ele quer ser elogiado por fazer o mínimo.",
    en:"He wants to be praised for doing the bare minimum." },
  { id:"t-263",
    deck:"u04-grammar2",
    pt:"Um dos meus deveres no meu trabalho é escrever posts no Instagram.",
    en:"One of my duties in my job is writing Instagram posts.",
    accept:["One of my duties at my job is writing Instagram posts."] },
  { id:"t-264",
    deck:"u04-grammar2",
    pt:"Para de olhar pro celular enquanto eu tô falando!",
    en:"Stop looking at your phone while I'm talking!" },
  { id:"t-265",
    deck:"u04-grammar2",
    pt:"A gente tem que parar pra comer.",
    en:"We have to stop to eat." },
  { id:"t-266",
    deck:"u04-grammar2",
    pt:"Estou aprendendo a fazer vídeos.",
    en:"I'm learning to make videos.",
    accept:["I'm learning how to make videos."] },
  { id:"t-267",
    deck:"u04-grammar2",
    pt:"Tô começando a achar que você não sabe o que tá fazendo.",
    en:"I'm starting to think you don't know what you're doing." },
  { id:"t-268",
    deck:"u04-grammar2",
    pt:"Não quero parecer desrespeitosa/desrespeitoso, mas eu discordo.",
    en:"I don't mean to disrespect you, but I disagree." },
  { id:"t-269",
    deck:"u04-grammar2",
    pt:"Ele não concorda em repensar o propósito da nossa marca.",
    en:"He doesn't agree to rethink the purpose of our brand." },

  /* ---- Deck 6: Pronunciation Hacks (10 cartões) ---- */
  { id:"t-270",
    deck:"u04-pronunciation",
    pt:"Eu moro no Brasil.",
    en:"I live in Brazil." },
  { id:"t-271",
    deck:"u04-pronunciation",
    pt:"O meu nome é Gavin.",
    en:"My name is Gavin." },
  { id:"t-272",
    deck:"u04-pronunciation",
    pt:"É isso que eu quero!",
    en:"That's what I want!" },
  { id:"t-273",
    deck:"u04-pronunciation",
    pt:"Mas eu sei o que eu preciso.",
    en:"But I know what I need." },
  { id:"t-274",
    deck:"u04-pronunciation",
    pt:"E eu amo o que eu tenho.",
    en:"And I love what I own." },
  { id:"t-275",
    deck:"u04-pronunciation",
    pt:"Eu vou ligar para ela para contar o que eu quero.",
    en:"I'm calling her to tell her what I want." },
  { id:"t-276",
    deck:"u04-pronunciation",
    pt:"Ligue para ele para contar que eu o amo.",
    en:"Call him and tell him I love him." },
  { id:"t-277",
    deck:"u04-pronunciation",
    pt:"Sobre o que você está falando?",
    en:"What are you talking about?" },
  { id:"t-278",
    deck:"u04-pronunciation",
    pt:"Qual é o seu preferido?",
    en:"Which one is your favorite?",
    accept:["Which one is your favourite?"] },
  { id:"t-279",
    deck:"u04-pronunciation",
    pt:"Como vai?",
    en:"How's it going?" },

  /* ---- Deck 7: Study Tips (6 cartões) ---- */
  { id:"t-280",
    deck:"u04-study",
    pt:"Seja seletiva/seletivo com o conteúdo que você assiste online.",
    en:"Be selective with the content you watch online." },
  { id:"t-281",
    deck:"u04-study",
    pt:"Nosso intervalo de tempo de concentração está ficando cada vez menor.",
    en:"Our concentration timespan is getting shorter and shorter.",
    accept:["Our concentration span is getting shorter and shorter."] },
  { id:"t-282",
    deck:"u04-study",
    pt:"Use o tempo que você tem para se concentrar.",
    en:"Use the time you have to focus." },
  { id:"t-283",
    deck:"u04-study",
    pt:"Não tente fazer mil coisas ao mesmo tempo.",
    en:"Don't try to do a thousand things at once." },
  { id:"t-284",
    deck:"u04-study",
    pt:"Você não precisa ser produtiva/produtivo o tempo todo.",
    en:"You don't need to be productive all the time." },
  { id:"t-285",
    deck:"u04-study",
    pt:"Tire um tempo para descansar, fora das redes sociais.",
    en:"Take some time to rest, out of social media.",
    accept:["Take some time to rest, away from social media."] },
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
  /* "he's", "it's", "i'd" e companhia saíram daqui de propósito: o apóstrofo
     deles tem mais de uma leitura e quem resolve é transNormalizeVariants(). */
  ["don't", "do not"], ["doesn't", "does not"], ["didn't", "did not"],
  ["isn't", "is not"], ["aren't", "are not"], ["wasn't", "was not"], ["weren't", "were not"],
  ["can't", "can not"], ["cannot", "can not"], ["won't", "will not"],
  ["i'll", "i will"], ["we'll", "we will"], ["you'll", "you will"], ["they'll", "they will"],
  ["i've", "i have"], ["we've", "we have"], ["you've", "you have"], ["they've", "they have"],
  /* "let's" fica: é "let us", nunca "let is" — não cabe na regra genérica. */
  ["let's", "let us"],
  ["shouldn't", "should not"], ["couldn't", "could not"], ["wouldn't", "would not"],
  ["haven't", "have not"], ["hasn't", "has not"], ["hadn't", "had not"],
  ["mustn't", "must not"], ["needn't", "need not"], ["oughtn't", "ought not"],
  ["shan't", "shall not"], ["he'll", "he will"], ["she'll", "she will"],
  ["it'll", "it will"], ["that'll", "that will"], ["who'll", "who will"],
  ["there'll", "there will"], ["this'll", "this will"],
  ["could've", "could have"], ["should've", "should have"], ["would've", "would have"],
  ["might've", "might have"], ["must've", "must have"], ["who've", "who have"],
  ["there've", "there have"], ["there're", "there are"],
  /* fala coloquial: o cartão 76 traz "gonna" e quem escrever "going to" acerta */
  ["gonna", "going to"], ["wanna", "want to"], ["gotta", "got to"],
];

/* "Number Two" e "Number 2" são a mesma resposta. */
const TRANS_NUMBERS = {
  one: "1", two: "2", three: "3", four: "4", five: "5", six: "6",
  seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12",
};

/* Primeira etapa: acentos, caixa, hífen e as contrações da lista acima.
   Para aqui ainda COM apóstrofo, porque o "'s" solto precisa ser decidido
   depois (ver transNormalizeVariants). */
function transNormalizeBase(str) {
  let s = String(str == null ? "" : str);
  s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");   // tira acentos
  s = s.toLowerCase();
  s = s.replace(/[‘’´`]/g, "'");             // apóstrofos tipográficos
  s = s.replace(/[-–—/]/g, " ");                  // binge-watch == binge watch
  TRANS_CONTRACTIONS.forEach(pair => {
    s = s.replace(new RegExp("\\b" + pair[0] + "\\b", "g"), pair[1]);
  });
  s = s.replace(/[^a-z0-9\s']/g, " ");                      // resto da pontuação
  return s.replace(/\s+/g, " ").trim();
}

/* Segunda etapa: tira o apóstrofo que sobrou, resolve números e horário. */
function transFinishNormalize(str) {
  let s = String(str).replace(/'/g, "");   // posse, o'clock etc.
  s = s.replace(/\b[a-z]+\b/g, w => TRANS_NUMBERS[w] || w);
  /* a pontuação já caiu, então "a.m." virou "a m": junta de volta e garante o
     espaço depois do número, para 7 a.m. == 7 AM == 7am. */
  s = s.replace(/\ba m\b/g, "am").replace(/\bp m\b/g, "pm");
  s = s.replace(/(\d)(am|pm)\b/g, "$1 $2");
  return s.replace(/\s+/g, " ").trim();
}

/* Reduz a frase à sua forma comparável. */
function transNormalize(str) {
  return transFinishNormalize(transNormalizeBase(str));
}

/* "'s" e "'d" têm mais de uma leitura e não dá para saber qual sem analisar a
   frase: "my name's Seaburn" é is, "my friend's child" é posse, "he's gone" é
   has, "I'd like" é would e "I'd been" é had. Todas as leituras são geradas
   dos DOIS lados da comparação e basta uma bater.

   Onde esse "'s" NÃO vale por "is", e por isso fica de fora:
   - depois de this/these/those — "This's" não existe em inglês;
   - depois de sibilante (s, x, z, sh, ch) — "Friends's", "boss's" não se
     contraem assim, é impronunciável.
   Sem essas guardas o corretor passaria a aceitar inglês errado. */
const TRANS_NO_IS_S = ["this", "these", "those", "i", "you", "we", "they"];

/* Palavras cujo "'s" NUNCA é posse, porque a posse delas é outra palavra
   (its, his, their). Sem isto, "its" passaria por "it's" — erro clássico que
   o corretor tem de continuar reprovando. */
const TRANS_S_NEVER_POSSESSIVE = [
  "he", "she", "it", "that", "what", "when", "where", "who", "why", "how",
  "there", "here", "everybody", "everyone", "somebody", "someone", "nobody",
];

/* Todas as leituras possíveis de <palavra>'<sufixo>.
   - "'d" é sempre would ou had ("I'd like" / "I'd been");
   - "'s" pode ser posse/plural, "is" ou "has", conforme a palavra. */
function transReadings(word, suffix) {
  if (suffix === "d") return [" would", " had"];
  const viraVerbo = TRANS_NO_IS_S.indexOf(word) === -1 && !/(s|x|z|sh|ch)$/.test(word);
  const leituras = [];
  if (TRANS_S_NEVER_POSSESSIVE.indexOf(word) === -1) leituras.push("s");
  if (viraVerbo) leituras.push(" is", " has");
  return leituras.length ? leituras : ["s"];
}

function transNormalizeVariants(str) {
  const base = transNormalizeBase(str);
  const pontos = [];
  const re = /\b([a-z]+)'(s|d)\b/g;
  let m;
  /* teto de 3 apóstrofos ambíguos por frase: 3^3 = 27 variantes, de sobra para
     qualquer frase do banco e sem risco de explodir. */
  while ((m = re.exec(base)) !== null && pontos.length < 3) {
    pontos.push({ index: m.index, word: m[1], len: m[0].length, leituras: transReadings(m[1], m[2]) });
  }
  if (!pontos.length) return [transFinishNormalize(base)];

  let combos = [[]];
  pontos.forEach(ponto => {
    const proximo = [];
    combos.forEach(c => ponto.leituras.forEach(l => proximo.push(c.concat([l]))));
    combos = proximo;
  });

  const saidas = combos.map(escolhas => {
    let out = "", cursor = 0;
    pontos.forEach((ponto, i) => {
      out += base.slice(cursor, ponto.index) + ponto.word + escolhas[i];
      cursor = ponto.index + ponto.len;
    });
    return transFinishNormalize(out + base.slice(cursor));
  });
  return saidas.filter((v, i) => saidas.indexOf(v) === i);
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
  const variantes = transNormalizeVariants(typed);
  const alvo = variantes[0];
  const esperadas = transExpectedAnswers(card);
  if (!alvo) return { level: "vazio", best: card.en, distance: Infinity };

  for (let i = 0; i < esperadas.length; i++) {
    const daResposta = transNormalizeVariants(esperadas[i]);
    if (daResposta.some(v => variantes.indexOf(v) !== -1)) {
      return { level: "certo", best: esperadas[i], distance: 0 };
    }
  }

  let best = card.en;
  let menor = Infinity;
  esperadas.forEach(esp => {
    transNormalizeVariants(esp).forEach(v => {
      const d = transLevenshtein(v, alvo);
      if (d < menor) { menor = d; best = esp; }
    });
  });

  /* "quase" só quando o número de palavras bate: assim palavra faltando
     ou sobrando continua sendo erro, e não é tratada como deslize de teclado. */
  const proxima = transNormalizeVariants(best)
    .reduce((a, v) => (transLevenshtein(v, alvo) < transLevenshtein(a, alvo) ? v : a));
  const mesmasPalavras = proxima.split(" ").length === alvo.split(" ").length;
  const limite = Math.max(1, Math.min(3, Math.round(proxima.length * 0.1)));
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
