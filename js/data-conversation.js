/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado no feedback da 2ª rodada de prática (mesmo tema: rotina
   em família). Os erros da 1ª rodada (ortografia básica, "every"
   + singular, possessivo de família, "for/to" + verbo) já foram
   corrigidos, então este módulo foi atualizado com os 10 novos
   padrões de erro identificados nesta rodada.
   ============================================================ */

const CONV_CATEGORIES = {
  howcausal:     { label: "'How' não é 'como' causal",              tag: "Padrão 1" },
  wesus:         { label: "'We' vs. 'Us' (pronome sujeito)",         tag: "Padrão 2" },
  canverb:       { label: "Verbo obrigatório depois de 'can'",       tag: "Padrão 3" },
  onlyunique:    { label: "'Only' vs. 'Unique'",                     tag: "Padrão 4" },
  spelling:      { label: "Ortografia e maiúsculas",                 tag: "Padrão 5" },
  negfreq:       { label: "Negação de frequência (don't + always)",  tag: "Padrão 6" },
  muchmany:      { label: "'Much' vs. 'Many' (reforço)",             tag: "Padrão 7" },
  prepplace:     { label: "Preposições de lugar e tempo",            tag: "Padrão 8" },
  differentfrom: { label: "'Different from' (não 'to')",             tag: "Padrão 9" },
  gathering:     { label: "'Meeting' não é reunião de família",      tag: "Padrão 10" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: 'How' não é 'como' causal ----
  { id:"c-hw-t1", category:"howcausal", prompt:"___ we have a busy routine, we don't see each other every day.", options:["How","Since","What","Where"], correct:1,
    explanations:[
      "Errado. 'how' significa 'de que maneira'; não expressa causa/motivo.",
      "Correto! 'since' expressa causa: já que temos uma rotina cheia.",
      "Errado. 'what' não expressa causa aqui.",
      "Errado. 'where' indica lugar, não causa."
    ]},
  { id:"c-hw-t2", category:"howcausal", prompt:"___ my husband works far away, we only see him on weekends.", options:["How","Because","What","When"], correct:1,
    explanations:[
      "Errado. 'how' não expressa causa.",
      "Correto! 'because' expressa o motivo da frase.",
      "Errado. 'what' não expressa causa aqui.",
      "Errado. 'when' indica tempo, não o motivo."
    ]},
  { id:"c-hw-t3", category:"howcausal", prompt:"___ it was raining, we stayed home for the family lunch.", options:["How","As","What","Which"], correct:1,
    explanations:[
      "Errado. 'how' não expressa causa.",
      "Correto! 'as' também pode expressar causa/motivo, como 'já que'.",
      "Errado. 'what' não expressa causa aqui.",
      "Errado. 'which' introduz uma escolha, não uma causa."
    ]},
  { id:"c-hw-t4", category:"howcausal", prompt:"___ we don't have much free time, we try to have dinner together every night.", options:["How","Because","What","How much"], correct:1,
    explanations:[
      "Errado. 'how' não expressa causa.",
      "Correto! 'because' expressa o motivo da frase.",
      "Errado. 'what' não expressa causa.",
      "Errado. 'how much' pergunta sobre quantidade, não expressa causa."
    ]},

  // ---- Padrão 2: 'We' vs. 'Us' ----
  { id:"c-wu-t1", category:"wesus", prompt:"___ have a busy routine during the week.", options:["Us","We","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'us' é pronome objeto (recebe a ação); aqui a frase precisa do sujeito.",
      "Correto! 'we' é o pronome sujeito: we have a busy routine.",
      "Errado. 'our' é possessivo (nosso), não substitui o sujeito.",
      "Errado. 'ours' é possessivo absoluto (ex: this house is ours), não é sujeito da frase."
    ]},
  { id:"c-wu-t2", category:"wesus", prompt:"___ celebrate Christmas at my parents' house every year.", options:["Us","We","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'us' é pronome objeto; aqui a frase precisa do sujeito.",
      "Correto! 'we' é o pronome sujeito: we celebrate.",
      "Errado. 'our' é possessivo, não substitui o sujeito.",
      "Errado. 'ours' é possessivo absoluto, não é sujeito da frase."
    ]},
  { id:"c-wu-t3", category:"wesus", prompt:"She always calls ___ before dinner.", options:["We","Us","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'we' é pronome sujeito; aqui a frase precisa do objeto (quem recebe a ação).",
      "Correto! 'us' é o pronome objeto: calls us.",
      "Errado. 'our' é possessivo, não substitui o objeto da frase.",
      "Errado. 'ours' é possessivo absoluto, não é objeto direto."
    ]},
  { id:"c-wu-t4", category:"wesus", prompt:"___ don't have much free time on weekdays.", options:["Us","We","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'us' é pronome objeto; aqui a frase precisa do sujeito.",
      "Correto! 'we' é o pronome sujeito: we don't have.",
      "Errado. 'our' é possessivo, não substitui o sujeito.",
      "Errado. 'ours' é possessivo absoluto, não é sujeito da frase."
    ]},

  // ---- Padrão 3: Verbo obrigatório depois de 'can' ----
  { id:"c-cv-t1", category:"canverb", prompt:"Which sentence is correct?", options:["The only free moment that we can together.","The only free moment that we can be together.","The only free moment we can together is Sunday.","The only free moment we together can."], correct:1,
    explanations:[
      "Errado. Depois de 'can' precisa vir um verbo; 'together' é advérbio, não verbo.",
      "Correto! 'can be' — depois de 'can' sempre vem um verbo, aqui 'be'.",
      "Errado. Ainda falta o verbo depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês e ainda falta o verbo."
    ]},
  { id:"c-cv-t2", category:"canverb", prompt:"Which sentence is correct?", options:["We can together after work.","We can be together after work.","We together can after work.","We can together, after work."], correct:1,
    explanations:[
      "Errado. Falta o verbo depois de 'can'; 'together' é advérbio.",
      "Correto! 'can be together' tem o verbo obrigatório depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve a falta de verbo depois de 'can'."
    ]},
  { id:"c-cv-t3", category:"canverb", prompt:"Which sentence is correct?", options:["My family can happy on holidays.","My family can be happy on holidays.","My family happy can on holidays.","My family can happy, on holidays."], correct:1,
    explanations:[
      "Errado. Depois de 'can' precisa vir um verbo; 'happy' é adjetivo, não verbo.",
      "Correto! 'can be happy' — o verbo 'be' vem depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve a falta de verbo depois de 'can'."
    ]},
  { id:"c-cv-t4", category:"canverb", prompt:"Which sentence is correct?", options:["They can quiet during dinner.","They can be quiet during dinner.","They quiet can during dinner.","They can quiet, during dinner."], correct:1,
    explanations:[
      "Errado. Depois de 'can' precisa vir um verbo; 'quiet' é adjetivo.",
      "Correto! 'can be quiet' — o verbo 'be' vem depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve a falta de verbo depois de 'can'."
    ]},

  // ---- Padrão 4: 'Only' vs. 'Unique' ----
  { id:"c-ou-t1", category:"onlyunique", prompt:"Sunday is the ___ day we have free.", options:["unique","only","the unique","single unique"], correct:1,
    explanations:[
      "Errado. 'unique' significa 'especial, sem igual', não 'apenas um'.",
      "Correto! 'only' expressa 'apenas um': the only day.",
      "Errado. Muda o sentido para 'o dia especial/sem igual', que não é o que a frase quer dizer.",
      "Errado. 'single unique' é redundante e não existe dessa forma em inglês."
    ]},
  { id:"c-ou-t2", category:"onlyunique", prompt:"This is the ___ time I have to rest during the week.", options:["unique","only","an unique","a unique one"], correct:1,
    explanations:[
      "Errado. 'unique' significa 'especial', não 'o único momento que existe'.",
      "Correto! 'only' expressa que é o único momento disponível.",
      "Errado. Muda o sentido para 'um momento especial'.",
      "Errado. Muda o sentido para 'um momento especial', que não é o que a frase quer dizer."
    ]},
  { id:"c-ou-t3", category:"onlyunique", prompt:"My grandmother has a ___ way of telling stories.", options:["only","unique","an only","the only one"], correct:1,
    explanations:[
      "Errado. Aqui o sentido é 'especial, sem igual', não 'apenas uma'; o certo é 'unique'.",
      "Correto! 'unique' descreve algo especial e sem igual: a unique way.",
      "Errado. 'an only' não existe com esse sentido.",
      "Errado. Muda o sentido para 'a única forma que existe', diferente de 'uma forma especial'."
    ]},
  { id:"c-ou-t4", category:"onlyunique", prompt:"This is the ___ day we can all be together.", options:["unique","only","an unique","the unique one"], correct:1,
    explanations:[
      "Errado. 'unique' significa 'especial', não 'apenas um'.",
      "Correto! 'only' expressa que é o único dia disponível.",
      "Errado. Muda o sentido e a gramática está errada.",
      "Errado. Muda o sentido para 'o dia especial', que não é o que a frase quer dizer."
    ]},

  // ---- Padrão 5: Ortografia e maiúsculas ----
  { id:"c-sp-t1", category:"spelling", prompt:"It's hard to ___ a routine with three kids.", options:["mantain","maintain","maintein","maintaine"], correct:1,
    explanations:[
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'maintain'.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-sp-t2", category:"spelling", prompt:"My ___ cooks dinner every night.", options:["wyfe","wife","wief","wifi"], correct:1,
    explanations:[
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'wife'.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. 'wifi' é a rede sem fio, uma palavra completamente diferente."
    ]},
  { id:"c-sp-t3", category:"spelling", prompt:"We always have a big ___ in December.", options:["barbacue","barbecue","barbeqeu","barbicue"], correct:1,
    explanations:[
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'barbecue'.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-sp-t4", category:"spelling", prompt:"Which sentence is correct?", options:["We celebrate together. even though it's a small party.","We celebrate together. Even though it's a small party.","we celebrate together. Even though it's a small party.","We Celebrate together. Even though it's a small party."], correct:1,
    explanations:[
      "Errado. Depois de ponto final, a nova frase deve começar com letra maiúscula: Even though.",
      "Correto! 'Even though' começa com maiúscula por vir depois de um ponto final.",
      "Errado. Toda frase em inglês começa com letra maiúscula, incluindo 'we'.",
      "Errado. Não há motivo para 'Celebrate' estar com maiúscula no meio da frase."
    ]},

  // ---- Padrão 6: Negação de frequência ----
  { id:"c-nf-t1", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always I celebrate every holiday.","I don't always celebrate every holiday.","Always I don't celebrate every holiday.","I not always celebrate every holiday."], correct:1,
    explanations:[
      "Errado. 'Not even always I...' não existe em inglês; essa ordem não é usada para negar frequência.",
      "Correto! Para negar frequência, use sujeito + don't/doesn't + always + verbo: I don't always celebrate.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'don't'; não se usa 'not' direto antes do verbo no presente simples."
    ]},
  { id:"c-nf-t2", category:"negfreq", prompt:"Which sentence is correct?", options:["Not always I visit my grandparents.","I don't always visit my grandparents.","Always I don't visit my grandparents.","I not always visit my grandparents."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não é usada para negar frequência em inglês.",
      "Correto! Sujeito + don't + always + verbo: I don't always visit.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'don't'."
    ]},
  { id:"c-nf-t3", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always we watch movies together.","We don't always watch movies together.","Always we don't watch movies together.","We not always watch movies together."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não existe em inglês para negar frequência.",
      "Correto! Sujeito + don't + always + verbo: we don't always watch.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'don't'."
    ]},
  { id:"c-nf-t4", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always they call us.","They don't always call us.","Always they don't call us.","They not always call us."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não existe em inglês para negar frequência.",
      "Correto! Sujeito + don't + always + verbo: they don't always call.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'don't'."
    ]},

  // ---- Padrão 7: 'Much' vs. 'Many' (reforço) ----
  { id:"c-mm-t1", category:"muchmany", prompt:"We don't have ___ traditions in my family.", options:["much","many","a much","many's"], correct:1,
    explanations:[
      "Errado. 'tradition' é contável (traditions no plural); com contáveis usamos 'many'.",
      "Correto! 'many traditions' — contável no plural pede 'many'.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},
  { id:"c-mm-t2", category:"muchmany", prompt:"There isn't ___ time before the family lunch.", options:["much","many","a much","a many"], correct:0,
    explanations:[
      "Correto! 'time' é incontável, então usamos 'much'.",
      "Errado. 'many' é usado com contáveis no plural; 'time' é incontável.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'a many' não existe em inglês."
    ]},
  { id:"c-mm-t3", category:"muchmany", prompt:"We don't get ___ holidays during the year.", options:["much","many","a much","many's"], correct:1,
    explanations:[
      "Errado. 'holiday' é contável (holidays no plural); com contáveis usamos 'many'.",
      "Correto! 'many holidays' — contável no plural pede 'many'.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},
  { id:"c-mm-t4", category:"muchmany", prompt:"My grandmother doesn't have ___ energy these days.", options:["much","many","a many","much's"], correct:0,
    explanations:[
      "Correto! 'energy' é incontável, então usamos 'much'.",
      "Errado. 'many' é usado com contáveis no plural; 'energy' é incontável.",
      "Errado. 'a many' não existe em inglês.",
      "Errado. 'much's' não existe em inglês."
    ]},

  // ---- Padrão 8: Preposições de lugar e tempo ----
  { id:"c-pp-t1", category:"prepplace", prompt:"I spend Christmas ___ my parents' house.", options:["in","at","on","by"], correct:1,
    explanations:[
      "Errado. 'in' é usado para espaços fechados (in the kitchen), não para um lugar específico como uma casa.",
      "Correto! 'at' indica um ponto específico: at my parents' house.",
      "Errado. 'on' não é usado para indicar lugar aqui.",
      "Errado. 'by' indica proximidade física (by the window), não é a preposição certa aqui."
    ]},
  { id:"c-pp-t2", category:"prepplace", prompt:"We usually cook ___ the kitchen.", options:["at","in","on","by"], correct:1,
    explanations:[
      "Errado. 'at' indica um ponto específico (at home), mas aqui a frase descreve um espaço fechado.",
      "Correto! 'in' é usado para espaços fechados: in the kitchen.",
      "Errado. 'on' não é usado para indicar lugar aqui.",
      "Errado. 'by' indica proximidade física, não é a preposição certa aqui."
    ]},
  { id:"c-pp-t3", category:"prepplace", prompt:"We work ___ home on weekdays.", options:["in","at","on","by"], correct:1,
    explanations:[
      "Errado. 'in' é usado para espaços fechados, não na expressão fixa 'at home'.",
      "Correto! 'at home' é a expressão fixa para 'em casa'.",
      "Errado. 'on' não é usado para indicar lugar aqui.",
      "Errado. 'by' indica proximidade física, não é a preposição certa aqui."
    ]},
  { id:"c-pp-t4", category:"prepplace", prompt:"Which sentence is correct?", options:["We work on week days.","We work on weekdays.","We work on the week days.","We work in weekdays."], correct:1,
    explanations:[
      "Errado. 'week days' se escreve junto, como uma palavra só: weekdays.",
      "Correto! 'weekdays' é uma palavra só.",
      "Errado. Não se usa o artigo 'the' antes de 'weekdays' nesse sentido geral, e falta juntar a palavra.",
      "Errado. A preposição certa é 'on', não 'in': on weekdays."
    ]},

  // ---- Padrão 9: 'Different from' (não 'to') ----
  { id:"c-df-t1", category:"differentfrom", prompt:"A holiday is not so different ___ a normal weekend for us.", options:["to","from","of","than"], correct:1,
    explanations:[
      "Errado. Em inglês, não se diz 'different to'; a forma padrão é 'different from'.",
      "Correto! 'different from' é a forma padrão em inglês.",
      "Errado. 'different of' não existe em inglês.",
      "Errado. 'different than' é usado informalmente nos EUA, mas 'different from' é a forma mais segura e universal."
    ]},
  { id:"c-df-t2", category:"differentfrom", prompt:"Their routine is different ___ ours.", options:["to","from","of","than"], correct:1,
    explanations:[
      "Errado. Não se diz 'different to' em inglês padrão.",
      "Correto! 'different from' é a forma padrão.",
      "Errado. 'different of' não existe em inglês.",
      "Errado. 'different from' é a forma mais segura."
    ]},
  { id:"c-df-t3", category:"differentfrom", prompt:"This year is different ___ last year.", options:["to","from","of","than"], correct:1,
    explanations:[
      "Errado. Não se diz 'different to' em inglês padrão.",
      "Correto! 'different from' é a forma padrão.",
      "Errado. 'different of' não existe em inglês.",
      "Errado. 'different from' é a forma mais segura."
    ]},
  { id:"c-df-t4", category:"differentfrom", prompt:"Cooking together is normal ___ us, not something special.", options:["to","for","from","at"], correct:1,
    explanations:[
      "Errado. 'to us' aqui sugeriria outro sentido; para dizer 'para nós' (opinião), use 'for us'.",
      "Correto! 'for us' expressa 'para nós' nesse sentido: normal for us.",
      "Errado. 'from us' não expressa esse sentido aqui.",
      "Errado. 'at us' não existe com esse sentido."
    ]},

  // ---- Padrão 10: 'Meeting' não é reunião de família ----
  { id:"c-gt-t1", category:"gathering", prompt:"We usually have family ___ during the year.", options:["meetings","gatherings","meeting","gathers"], correct:1,
    explanations:[
      "Errado. 'meetings' é usado para reuniões de trabalho, não de família.",
      "Correto! 'gatherings' é a palavra certa para reuniões de família.",
      "Errado. Além do sentido errado (trabalho), falta o 's' do plural.",
      "Errado. 'gathers' é verbo (ele reúne), não o substantivo que a frase pede."
    ]},
  { id:"c-gt-t2", category:"gathering", prompt:"On Sundays, the whole family has a ___ at my parents' house.", options:["meeting","get-together","meets","meetings"], correct:1,
    explanations:[
      "Errado. 'meeting' é reunião de trabalho, não o encontro de família descrito aqui.",
      "Correto! 'a get-together' é uma forma natural e comum para dizer 'um encontro familiar'.",
      "Errado. 'meets' não é usado como substantivo dessa forma em inglês.",
      "Errado. Além do sentido errado, a frase pede o singular (a meeting)."
    ]},
  { id:"c-gt-t3", category:"gathering", prompt:"We organize a family ___ for birthdays.", options:["meeting","reunion","meetings","reunions"], correct:1,
    explanations:[
      "Errado. 'meeting' é reunião de trabalho.",
      "Correto! 'reunion' é o termo certo para um encontro de família.",
      "Errado. Além do sentido errado, falta o artigo indicando singular.",
      "Errado. A frase pede o singular: a family reunion."
    ]},
  { id:"c-gt-t4", category:"gathering", prompt:"Which word fits: 'We have a work ___ every Monday morning.'", options:["gathering","meeting","reunion","get-together"], correct:1,
    explanations:[
      "Errado. 'gathering' é usado para encontros sociais/familiares, não de trabalho.",
      "Correto! No contexto de trabalho, 'meeting' é a palavra certa.",
      "Errado. 'reunion' também é para família ou amigos, não trabalho.",
      "Errado. 'get-together' é informal, usado para encontros sociais, não reuniões de trabalho."
    ]},
];

/* ================= EXERCÍCIOS DE REFORÇO: CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1 ----
  { id:"c-hw-p1", category:"howcausal", prompt:"___ she has two jobs, she doesn't visit her parents often.", options:["How","Since","What","Where"], correct:1,
    explanations:[
      "Errado. 'how' significa 'de que maneira'; não expressa causa.",
      "Correto! 'since' expressa causa: já que ela tem dois empregos.",
      "Errado. 'what' não expressa causa aqui.",
      "Errado. 'where' indica lugar, não causa."
    ]},
  { id:"c-hw-p2", category:"howcausal", prompt:"___ the kids are on vacation, we're traveling to my parents' house.", options:["How","As","What","When"], correct:1,
    explanations:[
      "Errado. 'how' não expressa causa.",
      "Correto! 'as' expressa causa/motivo, como 'já que'.",
      "Errado. 'what' não expressa causa aqui.",
      "Errado. 'when' indica tempo, não o motivo da frase."
    ]},
  { id:"c-hw-p3", category:"howcausal", prompt:"___ we have a busy routine, we cook on Sundays for the whole week.", options:["How","Since","What","Why"], correct:1,
    explanations:[
      "Errado. 'how' não expressa causa.",
      "Correto! 'since' expressa o motivo da frase.",
      "Errado. 'what' não expressa causa.",
      "Errado. 'why' pergunta o motivo, mas não é usado para afirmar uma causa dessa forma."
    ]},
  { id:"c-hw-p4", category:"howcausal", prompt:"___ my parents live far away, we only visit them on holidays.", options:["How","Because","What","Where"], correct:1,
    explanations:[
      "Errado. 'how' não expressa causa.",
      "Correto! 'because' expressa o motivo da frase.",
      "Errado. 'what' não expressa causa.",
      "Errado. 'where' indica lugar, não causa."
    ]},

  // ---- Padrão 2 ----
  { id:"c-wu-p1", category:"wesus", prompt:"___ watch a series together every night.", options:["Us","We","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'us' é pronome objeto; aqui a frase precisa do sujeito.",
      "Correto! 'we' é o pronome sujeito: we watch.",
      "Errado. 'our' é possessivo, não substitui o sujeito.",
      "Errado. 'ours' é possessivo absoluto, não é sujeito da frase."
    ]},
  { id:"c-wu-p2", category:"wesus", prompt:"He invited ___ to the family dinner.", options:["We","Us","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'we' é pronome sujeito; aqui a frase precisa do objeto.",
      "Correto! 'us' é o pronome objeto: invited us.",
      "Errado. 'our' é possessivo, não substitui o objeto da frase.",
      "Errado. 'ours' é possessivo absoluto, não é objeto direto."
    ]},
  { id:"c-wu-p3", category:"wesus", prompt:"___ have dinner together every Sunday.", options:["Us","We","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'us' é pronome objeto; aqui a frase precisa do sujeito.",
      "Correto! 'we' é o pronome sujeito: we have dinner.",
      "Errado. 'our' é possessivo, não substitui o sujeito.",
      "Errado. 'ours' é possessivo absoluto, não é sujeito da frase."
    ]},
  { id:"c-wu-p4", category:"wesus", prompt:"My parents visit ___ every weekend.", options:["We","Us","Our","Ours"], correct:1,
    explanations:[
      "Errado. 'we' é pronome sujeito; aqui a frase precisa do objeto.",
      "Correto! 'us' é o pronome objeto: visit us.",
      "Errado. 'our' é possessivo, não substitui o objeto da frase.",
      "Errado. 'ours' é possessivo absoluto, não é objeto direto."
    ]},

  // ---- Padrão 3 ----
  { id:"c-cv-p1", category:"canverb", prompt:"Which sentence is correct?", options:["We can relaxed on weekends.","We can relax on weekends.","We relaxed can on weekends.","We can relaxed, on weekends."], correct:1,
    explanations:[
      "Errado. Depois de 'can' vem o verbo no infinitivo sem 'to': can relax, não 'relaxed'.",
      "Correto! 'can relax' — verbo no infinitivo depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve o verbo errado depois de 'can'."
    ]},
  { id:"c-cv-p2", category:"canverb", prompt:"Which sentence is correct?", options:["The kids can quiet in the car.","The kids can be quiet in the car.","The kids quiet can in the car.","The kids can quiet, in the car."], correct:1,
    explanations:[
      "Errado. Depois de 'can' precisa vir um verbo; 'quiet' é adjetivo.",
      "Correto! 'can be quiet' — o verbo 'be' vem depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve a falta de verbo depois de 'can'."
    ]},
  { id:"c-cv-p3", category:"canverb", prompt:"Which sentence is correct?", options:["My parents can together every Sunday.","My parents can be together every Sunday.","My parents together can every Sunday.","My parents can together, every Sunday."], correct:1,
    explanations:[
      "Errado. Depois de 'can' precisa vir um verbo; 'together' é advérbio.",
      "Correto! 'can be together' — o verbo 'be' vem depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve a falta de verbo depois de 'can'."
    ]},
  { id:"c-cv-p4", category:"canverb", prompt:"Which sentence is correct?", options:["We can calm before the trip.","We can be calm before the trip.","We calm can before the trip.","We can calm, before the trip."], correct:1,
    explanations:[
      "Errado. Depois de 'can' precisa vir um verbo; 'calm' é adjetivo.",
      "Correto! 'can be calm' — o verbo 'be' vem depois de 'can'.",
      "Errado. A ordem das palavras não é natural em inglês.",
      "Errado. A vírgula não resolve a falta de verbo depois de 'can'."
    ]},

  // ---- Padrão 4 ----
  { id:"c-ou-p1", category:"onlyunique", prompt:"That's the ___ chance we have to see them this year.", options:["unique","only","an unique","a unique"], correct:1,
    explanations:[
      "Errado. 'unique' significa 'especial, sem igual', não 'apenas uma'.",
      "Correto! 'only' expressa que é a única chance disponível.",
      "Errado. Muda o sentido da frase.",
      "Errado. Muda o sentido da frase."
    ]},
  { id:"c-ou-p2", category:"onlyunique", prompt:"Her cake has a ___ flavor nobody else makes.", options:["only","unique","an only","the only one"], correct:1,
    explanations:[
      "Errado. Aqui o sentido é 'especial, sem igual'; o certo é 'unique'.",
      "Correto! 'unique' descreve um sabor especial e sem igual.",
      "Errado. 'an only' não existe com esse sentido.",
      "Errado. Muda o sentido da frase."
    ]},
  { id:"c-ou-p3", category:"onlyunique", prompt:"Saturday is the ___ day I don't work.", options:["unique","only","an unique","a unique"], correct:1,
    explanations:[
      "Errado. 'unique' significa 'especial', não 'apenas um'.",
      "Correto! 'only' expressa que é o único dia disponível.",
      "Errado. Muda o sentido e a gramática está errada.",
      "Errado. Muda o sentido da frase."
    ]},
  { id:"c-ou-p4", category:"onlyunique", prompt:"He has a ___ talent for cooking.", options:["only","unique","an only","the only one"], correct:1,
    explanations:[
      "Errado. Aqui o sentido é 'especial, sem igual'; o certo é 'unique'.",
      "Correto! 'unique' descreve um talento especial e sem igual.",
      "Errado. 'an only' não existe com esse sentido.",
      "Errado. Muda o sentido da frase."
    ]},

  // ---- Padrão 5 ----
  { id:"c-sp-p1", category:"spelling", prompt:"Christmas is on the ___ of December.", options:["31th","31st","31nd","31rd"], correct:1,
    explanations:[
      "Errado. O sufixo certo para 31 é 'st': 31st.",
      "Correto! 31st é a forma certa (thirty-first).",
      "Errado. 'nd' é usado com números terminados em 2 (2nd), não com 31.",
      "Errado. 'rd' é usado com números terminados em 3 (3rd), não com 31."
    ]},
  { id:"c-sp-p2", category:"spelling", prompt:"We celebrate every 31st of ___.", options:["december","December","Decembre","decembre"], correct:1,
    explanations:[
      "Errado. Meses do ano sempre levam maiúscula em inglês.",
      "Correto! 'December', com maiúscula.",
      "Errado. Grafia errada e sem maiúscula.",
      "Errado. Grafia errada e sem maiúscula."
    ]},
  { id:"c-sp-p3", category:"spelling", prompt:"We always have a family ___ on holidays.", options:["barbacue","barbecue","barbeqeu","barbicue"], correct:1,
    explanations:[
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'barbecue'.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-sp-p4", category:"spelling", prompt:"Which sentence is correct?", options:["We stay home. even though it's a holiday.","we stay home. Even though it's a holiday.","We stay home. Even though it's a holiday.","We Stay home. Even though it's a holiday."], correct:2,
    explanations:[
      "Errado. Depois de ponto final, a nova frase deve começar com maiúscula: Even though.",
      "Errado. Toda frase começa com maiúscula, incluindo 'We'.",
      "Correto! Maiúscula certa no início de cada frase: 'We stay home. Even though...'.",
      "Errado. Não há motivo para 'Stay' estar com maiúscula no meio da frase."
    ]},

  // ---- Padrão 6 ----
  { id:"c-nf-p1", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always I cook dinner.","I don't always cook dinner.","Always I don't cook dinner.","I not always cook dinner."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não existe em inglês para negar frequência.",
      "Correto! Sujeito + don't + always + verbo: I don't always cook.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'don't'."
    ]},
  { id:"c-nf-p2", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always she works on Sundays.","She doesn't always work on Sundays.","Always she doesn't work on Sundays.","She not always works on Sundays."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não existe em inglês para negar frequência.",
      "Correto! Sujeito + doesn't + always + verbo: she doesn't always work.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'doesn't'."
    ]},
  { id:"c-nf-p3", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always we travel in December.","We don't always travel in December.","Always we don't travel in December.","We not always travel in December."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não existe em inglês para negar frequência.",
      "Correto! Sujeito + don't + always + verbo: we don't always travel.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'don't'."
    ]},
  { id:"c-nf-p4", category:"negfreq", prompt:"Which sentence is correct?", options:["Not even always he visits his parents.","He doesn't always visit his parents.","Always he doesn't visit his parents.","He not always visits his parents."], correct:1,
    explanations:[
      "Errado. Essa ordem de palavras não existe em inglês para negar frequência.",
      "Correto! Sujeito + doesn't + always + verbo: he doesn't always visit.",
      "Errado. 'Always' não vem antes do sujeito nessa estrutura negativa.",
      "Errado. A negação precisa do auxiliar 'doesn't'."
    ]},

  // ---- Padrão 7 ----
  { id:"c-mm-p1", category:"muchmany", prompt:"We don't have ___ family gatherings during the year.", options:["much","many","a much","many's"], correct:1,
    explanations:[
      "Errado. 'gathering' é contável (gatherings no plural); com contáveis usamos 'many'.",
      "Correto! 'many gatherings' — contável no plural pede 'many'.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},
  { id:"c-mm-p2", category:"muchmany", prompt:"There isn't ___ space at the table for everyone.", options:["much","many","a much","a many"], correct:0,
    explanations:[
      "Correto! 'space' aqui é incontável, então usamos 'much'.",
      "Errado. 'many' é usado com contáveis no plural.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'a many' não existe em inglês."
    ]},
  { id:"c-mm-p3", category:"muchmany", prompt:"We don't have ___ traditions like other families.", options:["much","many","a much","many's"], correct:1,
    explanations:[
      "Errado. 'tradition' é contável (traditions no plural); com contáveis usamos 'many'.",
      "Correto! 'many traditions' — contável no plural pede 'many'.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},
  { id:"c-mm-p4", category:"muchmany", prompt:"My parents don't have ___ free time on weekdays.", options:["much","many","a many","much's"], correct:0,
    explanations:[
      "Correto! 'time' é incontável, então usamos 'much'.",
      "Errado. 'many' é usado com contáveis no plural; 'time' é incontável.",
      "Errado. 'a many' não existe em inglês.",
      "Errado. 'much's' não existe em inglês."
    ]},

  // ---- Padrão 8 ----
  { id:"c-pp-p1", category:"prepplace", prompt:"We have dinner ___ my grandparents' house every Sunday.", options:["in","at","on","by"], correct:1,
    explanations:[
      "Errado. 'in' é usado para espaços fechados, não para um lugar específico como uma casa.",
      "Correto! 'at' indica um ponto específico: at my grandparents' house.",
      "Errado. 'on' não é usado para indicar lugar aqui.",
      "Errado. 'by' indica proximidade física, não é a preposição certa aqui."
    ]},
  { id:"c-pp-p2", category:"prepplace", prompt:"The kids play ___ the car while we wait.", options:["at","in","on","by"], correct:1,
    explanations:[
      "Errado. 'at' indica um ponto específico, mas aqui a frase descreve um espaço fechado.",
      "Correto! 'in' é usado para espaços fechados: in the car.",
      "Errado. 'on' não é usado para indicar lugar aqui.",
      "Errado. 'by' indica proximidade física, não é a preposição certa aqui."
    ]},
  { id:"c-pp-p3", category:"prepplace", prompt:"We meet ___ church every Sunday morning.", options:["in","at","on","by"], correct:1,
    explanations:[
      "Errado. 'in' é usado para espaços fechados, não para um lugar/instituição específica como 'church'.",
      "Correto! 'at church' indica um ponto específico.",
      "Errado. 'on' não é usado para indicar lugar aqui.",
      "Errado. 'by' indica proximidade física, não é a preposição certa aqui."
    ]},
  { id:"c-pp-p4", category:"prepplace", prompt:"Which sentence is correct?", options:["I work from home on week days.","I work from home on weekdays.","I work from home on the weekdays.","I work from home in weekdays."], correct:1,
    explanations:[
      "Errado. 'week days' se escreve junto: weekdays.",
      "Correto! 'weekdays' é uma palavra só, sem artigo antes.",
      "Errado. Não se usa o artigo 'the' antes de 'weekdays' nesse sentido geral.",
      "Errado. A preposição certa é 'on', não 'in': on weekdays."
    ]},

  // ---- Padrão 9 ----
  { id:"c-df-p1", category:"differentfrom", prompt:"My family's routine is different ___ my friend's family.", options:["to","from","of","than"], correct:1,
    explanations:[
      "Errado. Não se diz 'different to' em inglês padrão.",
      "Correto! 'different from' é a forma padrão.",
      "Errado. 'different of' não existe em inglês.",
      "Errado. 'different from' é a forma mais segura."
    ]},
  { id:"c-df-p2", category:"differentfrom", prompt:"This Christmas is different ___ the last one.", options:["to","from","of","than"], correct:1,
    explanations:[
      "Errado. Não se diz 'different to' em inglês padrão.",
      "Correto! 'different from' é a forma padrão.",
      "Errado. 'different of' não existe em inglês.",
      "Errado. 'different from' é a forma mais segura."
    ]},
  { id:"c-df-p3", category:"differentfrom", prompt:"A weekday is different ___ a weekend.", options:["to","from","of","than"], correct:1,
    explanations:[
      "Errado. Não se diz 'different to' em inglês padrão.",
      "Correto! 'different from' é a forma padrão.",
      "Errado. 'different of' não existe em inglês.",
      "Errado. 'different from' é a forma mais segura."
    ]},
  { id:"c-df-p4", category:"differentfrom", prompt:"Having dinner together is important ___ us.", options:["to","for","from","at"], correct:1,
    explanations:[
      "Errado. 'to us' sugeriria outro sentido; para dizer 'para nós' (importância), use 'for us'.",
      "Correto! 'for us' expressa 'para nós': important for us.",
      "Errado. 'from us' não expressa esse sentido aqui.",
      "Errado. 'at us' não existe com esse sentido."
    ]},

  // ---- Padrão 10 ----
  { id:"c-gt-p1", category:"gathering", prompt:"Every December, we have a big family ___.", options:["meeting","gathering","meetings","meet"], correct:1,
    explanations:[
      "Errado. 'meeting' é reunião de trabalho, não de família.",
      "Correto! 'gathering' é a palavra certa para um grande encontro de família.",
      "Errado. Além do sentido errado, a frase pede o singular.",
      "Errado. 'meet' não é usado como substantivo dessa forma em inglês."
    ]},
  { id:"c-gt-p2", category:"gathering", prompt:"My cousins and I organize a ___ every summer.", options:["meeting","reunion","meetings","meet"], correct:1,
    explanations:[
      "Errado. 'meeting' é reunião de trabalho.",
      "Correto! 'reunion' é o termo certo para o encontro entre parentes.",
      "Errado. A frase pede o singular: a reunion.",
      "Errado. 'meet' não é o substantivo certo aqui."
    ]},
  { id:"c-gt-p3", category:"gathering", prompt:"We have a family ___ once a month.", options:["meeting","get-together","meetings","meet"], correct:1,
    explanations:[
      "Errado. 'meeting' é reunião de trabalho.",
      "Correto! 'get-together' descreve bem um encontro informal de família.",
      "Errado. A frase pede o singular: a get-together.",
      "Errado. 'meet' não é o substantivo certo aqui."
    ]},
  { id:"c-gt-p4", category:"gathering", prompt:"Which word fits: 'I have a business ___ this afternoon.'", options:["gathering","meeting","reunion","get-together"], correct:1,
    explanations:[
      "Errado. 'gathering' é para encontros sociais, não de trabalho.",
      "Correto! No contexto de negócios, 'meeting' é a palavra certa.",
      "Errado. 'reunion' é para família ou amigos, não trabalho.",
      "Errado. 'get-together' é informal, usado para encontros sociais."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
