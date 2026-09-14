/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado no feedback de uma conversa sobre a rotina em família
   (tema: aula de nível básico sobre família).
   10 padrões de erro identificados, cada um vira uma categoria de
   prática própria — independente do teste A1-A2 original.
   ============================================================ */

const CONV_CATEGORIES = {
  spelling:      { label: "Ortografia e maiúsculas",                 tag: "Padrão 1" },
  alongwith:     { label: "'Along' vs. 'With'",                      tag: "Padrão 2" },
  allsubject:    { label: "'All' vs. 'Everybody/Everyone'",          tag: "Padrão 3" },
  everyroutine:  { label: "'Every' + singular para rotina",          tag: "Padrão 4" },
  missingverb:   { label: "Verbo obrigatório na frase",              tag: "Padrão 5" },
  subjectverb:   { label: "Concordância verbal (3ª pessoa)",         tag: "Padrão 6" },
  forto:         { label: "'For' vs. 'To' + verbo",                  tag: "Padrão 7" },
  muchmany:      { label: "'Much' vs. 'Many'",                       tag: "Padrão 8" },
  sentencecore:  { label: "Frase completa (sujeito + verbo)",        tag: "Padrão 9" },
  placeposs:     { label: "Lugar e possessivo ('s)",                 tag: "Padrão 10" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: Ortografia e maiúsculas ----
  { id:"c-sp-t1", category:"spelling", prompt:"My ___ is seven years old.", options:["daugther","daughter","doughter","daughther"], correct:1,
    explanations:[
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'daughter'.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-sp-t2", category:"spelling", prompt:"We usually visit my parents on ___.", options:["fridays","Fridays","freidays","frydays"], correct:1,
    explanations:[
      "Errado. Dias da semana são sempre escritos com letra maiúscula em inglês.",
      "Correto! 'Fridays', com maiúscula — dias da semana sempre levam maiúscula.",
      "Errado. Grafia errada e sem maiúscula.",
      "Errado. Grafia errada e sem maiúscula."
    ]},
  { id:"c-sp-t3", category:"spelling", prompt:"Her hair is very ___.", options:["straigth","streight","straight","straght"], correct:2,
    explanations:[
      "Errado. As letras 'gh' vêm antes do 't': straight.",
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'straight'.",
      "Errado. Falta o 'i' antes do 'gh'."
    ]},
  { id:"c-sp-t4", category:"spelling", prompt:"Christmas is our favorite ___.", options:["holyday","holidays","holiday","holliday"], correct:2,
    explanations:[
      "Errado. Não é 'holy' + 'day'; a grafia correta é 'holiday'.",
      "Errado. A frase pede o singular: 'holiday'.",
      "Correto! A grafia certa é 'holiday'.",
      "Errado. Essa grafia não existe em inglês."
    ]},

  // ---- Padrão 2: 'Along' vs. 'With' ----
  { id:"c-aw-t1", category:"alongwith", prompt:"I have breakfast ___ my family every morning.", options:["along","with","over","under"], correct:1,
    explanations:[
      "Errado. 'along' sozinho não significa 'junto com' uma pessoa.",
      "Correto! Para acompanhar alguém, use 'with': with my family.",
      "Errado. 'over' não expressa companhia.",
      "Errado. 'under' não expressa companhia."
    ]},
  { id:"c-aw-t2", category:"alongwith", prompt:"My daughter sleeps ___ her cousins on Fridays.", options:["along","with","without","at"], correct:1,
    explanations:[
      "Errado. 'along' não significa 'junto com' uma pessoa.",
      "Correto! 'with' é a preposição certa para acompanhar alguém: with her cousins.",
      "Errado. 'without' significa 'sem', o oposto do sentido da frase.",
      "Errado. 'at' não expressa companhia."
    ]},
  { id:"c-aw-t3", category:"alongwith", prompt:"I go to work ___ my wife every day.", options:["along","with","by","from"], correct:1,
    explanations:[
      "Errado. 'along' não substitui 'with' para dizer 'junto com alguém'.",
      "Correto! 'with my wife' é a forma certa de dizer 'junto com minha esposa'.",
      "Errado. 'by' aqui indicaria meio de transporte (by car), não companhia.",
      "Errado. 'from' indica origem, não companhia."
    ]},
  { id:"c-aw-t4", category:"alongwith", prompt:"We watch TV ___ our kids after dinner.", options:["along","with","at","in"], correct:1,
    explanations:[
      "Errado. 'along' não significa 'junto com' uma pessoa.",
      "Correto! 'with our kids' expressa companhia.",
      "Errado. 'at' não expressa companhia.",
      "Errado. 'in' não expressa companhia."
    ]},

  // ---- Padrão 3: 'All' vs. 'Everybody/Everyone' ----
  { id:"c-as-t1", category:"allsubject", prompt:"After the wedding, ___ dances all night.", options:["all","everybody","all people","the all"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não funciona como sujeito da frase.",
      "Correto! 'everybody' é o sujeito certo, com verbo no singular: everybody dances.",
      "Errado. 'all people' pede o verbo no plural (all people dance), não é o mais natural aqui.",
      "Errado. 'the all' não existe em inglês."
    ]},
  { id:"c-as-t2", category:"allsubject", prompt:"___ gets dressed before breakfast.", options:["All","Everybody","All people","Everybody's"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não pode ser o sujeito da frase.",
      "Correto! 'everybody' + verbo no singular: everybody gets.",
      "Errado. Soa estranho aqui; o mais natural é 'everybody'.",
      "Errado. 'everybody's' é forma possessiva, não é o sujeito da frase."
    ]},
  { id:"c-as-t3", category:"allsubject", prompt:"At Christmas, ___ opens presents together.", options:["all","everyone","all family","everyone's"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não funciona como sujeito.",
      "Correto! 'everyone' + verbo no singular: everyone opens.",
      "Errado. 'all family' não é uma expressão natural em inglês; o certo seria 'the whole family'.",
      "Errado. 'everyone's' é possessivo, não é o sujeito que a frase pede."
    ]},
  { id:"c-as-t4", category:"allsubject", prompt:"___ wants to see the new baby.", options:["all","everyone","all of","everyone's"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não pode ser o sujeito da frase.",
      "Correto! 'everyone' + verbo no singular: everyone wants.",
      "Errado. 'all of' precisa de um substantivo depois (all of us), não fica sozinho.",
      "Errado. 'everyone's' é possessivo, não é o sujeito da frase."
    ]},

  // ---- Padrão 4: 'Every' + singular para rotina ----
  { id:"c-er-t1", category:"everyroutine", prompt:"___ my daughter sleeps at my parents' house.", options:["All Fridays","Every Friday","All Friday","Every Fridays"], correct:1,
    explanations:[
      "Errado. Não se diz 'all Fridays' para rotina; o certo é 'every Friday'.",
      "Correto! Para rotina que se repete, usamos 'every' + singular: every Friday.",
      "Errado. Falta o 's' em 'Fridays' e ainda assim 'all' não combina com rotina.",
      "Errado. 'every' sempre vem com substantivo no singular, sem 's'."
    ]},
  { id:"c-er-t2", category:"everyroutine", prompt:"We visit my grandparents ___.", options:["all Sundays","every Sunday","all Sunday","every Sundays"], correct:1,
    explanations:[
      "Errado. 'all Sundays' não é a forma natural para expressar rotina.",
      "Correto! 'every Sunday' é a forma certa para uma rotina semanal.",
      "Errado. Falta o 's' em 'Sundays' e 'all' ainda não combina aqui.",
      "Errado. 'every' pede o substantivo no singular, sem 's'."
    ]},
  { id:"c-er-t3", category:"everyroutine", prompt:"My son calls me ___.", options:["all mornings","every morning","all morning","every mornings"], correct:1,
    explanations:[
      "Errado. 'all mornings' não é usado para rotina diária.",
      "Correto! 'every morning' expressa uma rotina que se repete todo dia.",
      "Errado. 'all morning' significa 'a manhã inteira' (duração), não rotina diária.",
      "Errado. 'every' pede o substantivo no singular, sem 's'."
    ]},
  { id:"c-er-t4", category:"everyroutine", prompt:"They travel to Brazil ___.", options:["all years","every year","all year","every years"], correct:1,
    explanations:[
      "Errado. 'all years' não é usado para rotina.",
      "Correto! 'every year' expressa uma rotina anual.",
      "Errado. 'all year' significa 'o ano inteiro' (duração), não rotina.",
      "Errado. 'every' pede o substantivo no singular, sem 's'."
    ]},

  // ---- Padrão 5: Verbo obrigatório na frase ----
  { id:"c-mv-t1", category:"missingverb", prompt:"Which sentence is correct?", options:["I by bus and my wife by car.","I go by bus and my wife goes by car.","I by bus and my wife go by car.","I go by bus and my wife by car."], correct:1,
    explanations:[
      "Errado. Faltam os verbos; em inglês toda oração precisa de um verbo, mesmo quando o português permite omitir.",
      "Correto! Cada parte da frase tem seu verbo: I go... my wife goes.",
      "Errado. Falta o verbo na primeira parte da frase.",
      "Errado. Falta o verbo na segunda parte da frase."
    ]},
  { id:"c-mv-t2", category:"missingverb", prompt:"Which sentence is correct?", options:["My daughter to school by bike.","My daughter goes to school by bike.","My daughter by bike to school.","My daughter going to school by bike."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! 'goes' é o verbo obrigatório aqui: my daughter goes to school.",
      "Errado. Falta o verbo principal da frase.",
      "Errado. Falta o verbo auxiliar 'is' antes de 'going', ou o verbo deveria ser 'goes'."
    ]},
  { id:"c-mv-t3", category:"missingverb", prompt:"Which sentence is correct?", options:["On Sundays, we to my parents' house.","On Sundays, we go to my parents' house.","On Sundays, we at my parents' house.","On Sundays, we our parents' house."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! 'go' é o verbo obrigatório: we go to my parents' house.",
      "Errado. Falta o verbo; 'at' sozinho não substitui o verbo.",
      "Errado. Falta o verbo principal da frase."
    ]},
  { id:"c-mv-t4", category:"missingverb", prompt:"Which sentence is correct?", options:["She to the gym every morning.","She goes to the gym every morning.","She the gym every morning.","She go to the gym every morning."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! Com 'she' (3ª pessoa), o verbo é 'goes': she goes to the gym.",
      "Errado. Falta o verbo principal da frase.",
      "Errado. Com 'she' (3ª pessoa), o verbo precisa do 's': goes."
    ]},

  // ---- Padrão 6: Concordância verbal (3ª pessoa) ----
  { id:"c-sv-t1", category:"subjectverb", prompt:"The main holiday that my family ___ is Christmas.", options:["celebrate","celebrates","celebrating","celebrated"], correct:1,
    explanations:[
      "Errado. 'family' é singular em inglês; falta o 's' no verbo.",
      "Correto! 'family' é tratada como singular, então o verbo recebe 's': family celebrates.",
      "Errado. 'celebrating' precisa do verbo 'be' antes (is celebrating).",
      "Errado. 'celebrated' é passado; a frase descreve algo atual."
    ]},
  { id:"c-sv-t2", category:"subjectverb", prompt:"My family ___ together every Sunday.", options:["eat","eats","eating","ate"], correct:1,
    explanations:[
      "Errado. 'family' é singular; falta o 's' no verbo.",
      "Correto! 'family eats' — sujeito singular pede verbo com 's'.",
      "Errado. 'eating' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'ate' é passado; a frase descreve uma rotina no presente."
    ]},
  { id:"c-sv-t3", category:"subjectverb", prompt:"My daughter ___ her homework every night.", options:["do","does","doing","did"], correct:1,
    explanations:[
      "Errado. Com 'my daughter' (3ª pessoa), o verbo é 'does', não 'do'.",
      "Correto! 3ª pessoa do singular + 's': daughter does.",
      "Errado. 'doing' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'did' é passado; a frase descreve uma rotina no presente."
    ]},
  { id:"c-sv-t4", category:"subjectverb", prompt:"My grandmother ___ a delicious cake on holidays.", options:["bake","bakes","baking","baked"], correct:1,
    explanations:[
      "Errado. Com 'my grandmother' (3ª pessoa), falta o 's' no verbo.",
      "Correto! 3ª pessoa do singular + 's': grandmother bakes.",
      "Errado. 'baking' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'baked' é passado; a frase descreve uma rotina."
    ]},

  // ---- Padrão 7: 'For' vs. 'To' + verbo ----
  { id:"c-ft-t1", category:"forto", prompt:"We meet at my parents' house ___ have barbecues.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. Depois de 'for' só vem substantivo ou gerúndio (for a barbecue), não verbo no infinitivo.",
      "Correto! Para expressar finalidade com um verbo, usamos 'to + verbo': to have barbecues.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'in order for' precisa de uma estrutura diferente (in order for someone to do something)."
    ]},
  { id:"c-ft-t2", category:"forto", prompt:"My family gets together ___ celebrate birthdays.", options:["for","to","for to","at"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo para expressar finalidade.",
      "Correto! 'to + verbo' expressa finalidade: to celebrate birthdays.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'at' não expressa finalidade."
    ]},
  { id:"c-ft-t3", category:"forto", prompt:"I wake up early ___ prepare breakfast for my kids.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo.",
      "Correto! 'to prepare' expressa a finalidade de acordar cedo.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'in order for' precisa de uma estrutura diferente."
    ]},
  { id:"c-ft-t4", category:"forto", prompt:"We travel every year ___ visit my grandparents.", options:["for","to","for to","at"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo.",
      "Correto! 'to visit' expressa a finalidade da viagem.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'at' não expressa finalidade."
    ]},

  // ---- Padrão 8: 'Much' vs. 'Many' ----
  { id:"c-mm-t1", category:"muchmany", prompt:"We don't have ___ traditions in my family.", options:["much","many","a much","many's"], correct:1,
    explanations:[
      "Errado. 'tradition' é contável (traditions no plural); com contáveis usamos 'many'.",
      "Correto! 'many traditions' — contável no plural pede 'many'.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},
  { id:"c-mm-t2", category:"muchmany", prompt:"My grandmother doesn't have ___ free time.", options:["much","many","a many","much's"], correct:0,
    explanations:[
      "Correto! 'time' é incontável, então usamos 'much': much free time.",
      "Errado. 'many' é usado com substantivos contáveis no plural, e 'time' é incontável.",
      "Errado. 'a many' não existe em inglês.",
      "Errado. 'much's' não existe em inglês."
    ]},
  { id:"c-mm-t3", category:"muchmany", prompt:"There aren't ___ people at our family dinners.", options:["much","many","a much","a many"], correct:1,
    explanations:[
      "Errado. 'people' é contável no plural; com contáveis usamos 'many'.",
      "Correto! 'many people' — contável no plural pede 'many'.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'a many' não existe em inglês."
    ]},
  { id:"c-mm-t4", category:"muchmany", prompt:"We don't spend ___ money on holidays.", options:["much","many","a much","many's"], correct:0,
    explanations:[
      "Correto! 'money' é incontável, então usamos 'much': much money.",
      "Errado. 'many' é usado com substantivos contáveis no plural, e 'money' é incontável.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},

  // ---- Padrão 9: Frase completa (sujeito + verbo) ----
  { id:"c-sc-t1", category:"sentencecore", prompt:"Which sentence is correct?", options:["Eating delicious desserts like mousse and ice cream.","We eat delicious desserts like mousse and ice cream.","Eat delicious desserts like mousse and ice cream.","Eating delicious dessert like mousse and ice cream."], correct:1,
    explanations:[
      "Errado. Começar com gerúndio solto não forma uma frase completa; falta sujeito e verbo conjugado.",
      "Correto! 'We eat' dá sujeito e verbo conjugado à frase, além de 'desserts' no plural.",
      "Errado. Falta o sujeito da frase.",
      "Errado. Falta sujeito, verbo conjugado, e 'dessert' deveria estar no plural."
    ]},
  { id:"c-sc-t2", category:"sentencecore", prompt:"Which sentence is correct?", options:["Cooking dinner for the whole family every Sunday.","My mother cooks dinner for the whole family every Sunday.","Cook dinner for the whole family every Sunday.","Cooking dinner for the whole family, every Sunday."], correct:1,
    explanations:[
      "Errado. Gerúndio solto no início não forma uma frase completa.",
      "Correto! 'My mother cooks' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. Ainda falta sujeito e verbo conjugado; a vírgula não resolve isso."
    ]},
  { id:"c-sc-t3", category:"sentencecore", prompt:"Which sentence is correct?", options:["Visiting my grandparents every weekend.","We visit my grandparents every weekend.","Visit my grandparents every weekend.","Visiting my grandparents, every weekend."], correct:1,
    explanations:[
      "Errado. Gerúndio solto não forma uma frase completa.",
      "Correto! 'We visit' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. A vírgula não resolve a falta de sujeito e verbo conjugado."
    ]},
  { id:"c-sc-t4", category:"sentencecore", prompt:"Which sentence is correct?", options:["Watching movies together on Friday nights.","My family watches movies together on Friday nights.","Watch movies together on Friday nights.","Watching movie together on Friday nights."], correct:1,
    explanations:[
      "Errado. Gerúndio solto não forma uma frase completa.",
      "Correto! 'My family watches' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. Falta sujeito, verbo conjugado, e 'movie' deveria estar no plural."
    ]},

  // ---- Padrão 10: Lugar e possessivo ('s) ----
  { id:"c-pp-t1", category:"placeposs", prompt:"My daughter sleeps at my ___ house.", options:["parents","parent's","parents'","parents's"], correct:2,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Errado. 'parent's' (singular) indica a casa de um só pai/mãe, não do casal.",
      "Correto! Plural + apóstrofo depois do 's': parents' house.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"c-pp-t2", category:"placeposs", prompt:"We spend Christmas at my ___ house.", options:["grandparents","grandparent's","grandparents'","grandparents's"], correct:2,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Errado. 'grandparent's' (singular) indica apenas um avô ou avó.",
      "Correto! Plural + apóstrofo depois do 's': grandparents' house.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"c-pp-t3", category:"placeposs", prompt:"This is my ___ car.", options:["sister","sister's","sisters'","sisters"], correct:1,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Correto! Singular + apóstrofo antes do 's': sister's car.",
      "Errado. 'sisters'' (com apóstrofo depois do s) seria para várias irmãs.",
      "Errado. Falta o apóstrofo indicando posse."
    ]},
  { id:"c-pp-t4", category:"placeposs", prompt:"My kids play at my ___ house every weekend.", options:["parents","parent's","parents'","parents's"], correct:2,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Errado. 'parent's' (singular) indica a casa de um só pai/mãe.",
      "Correto! Plural + apóstrofo depois do 's': parents' house.",
      "Errado. Essa forma não existe em inglês."
    ]},
];

/* ================= EXERCÍCIOS DE REFORÇO: CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1 ----
  { id:"c-sp-p1", category:"spelling", prompt:"My grandmother is ___.", options:["brazilian","Brazilian","brazilan","Brazilan"], correct:1,
    explanations:[
      "Errado. Nacionalidades são sempre escritas com letra maiúscula em inglês.",
      "Correto! 'Brazilian', com maiúscula — nacionalidades sempre levam maiúscula.",
      "Errado. Grafia errada e sem maiúscula.",
      "Errado. Grafia errada e sem maiúscula."
    ]},
  { id:"c-sp-p2", category:"spelling", prompt:"My family is ___.", options:["christian","Christian","cristian","Christiam"], correct:1,
    explanations:[
      "Errado. Religiões e adjetivos derivados delas levam maiúscula em inglês.",
      "Correto! 'Christian', com maiúscula.",
      "Errado. Grafia errada e sem maiúscula.",
      "Errado. Grafia errada."
    ]},
  { id:"c-sp-p3", category:"spelling", prompt:"My daughter has ___ hair.", options:["straigth","straght","straight","streight"], correct:2,
    explanations:[
      "Errado. As letras 'gh' vêm antes do 't': straight.",
      "Errado. Falta o 'i' antes do 'gh'.",
      "Correto! A grafia certa é 'straight'.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-sp-p4", category:"spelling", prompt:"We celebrate this ___ every year.", options:["holyday","holliday","holiday","holladay"], correct:2,
    explanations:[
      "Errado. Não é 'holy' + 'day'.",
      "Errado. Essa grafia não existe em inglês.",
      "Correto! A grafia certa é 'holiday'.",
      "Errado. Essa grafia não existe em inglês."
    ]},

  // ---- Padrão 2 ----
  { id:"c-aw-p1", category:"alongwith", prompt:"He travels ___ his family every summer.", options:["along","with","for","of"], correct:1,
    explanations:[
      "Errado. 'along' não significa 'junto com' uma pessoa.",
      "Correto! 'with his family' expressa companhia.",
      "Errado. 'for' não expressa companhia.",
      "Errado. 'of' não expressa companhia."
    ]},
  { id:"c-aw-p2", category:"alongwith", prompt:"I live ___ my parents.", options:["along","with","in","on"], correct:1,
    explanations:[
      "Errado. 'along' não significa 'junto com' uma pessoa.",
      "Correto! 'live with someone' é a estrutura certa: with my parents.",
      "Errado. 'in' não expressa companhia aqui.",
      "Errado. 'on' não expressa companhia."
    ]},
  { id:"c-aw-p3", category:"alongwith", prompt:"She cooks dinner ___ her mother on Sundays.", options:["along","with","to","at"], correct:1,
    explanations:[
      "Errado. 'along' não significa 'junto com' uma pessoa.",
      "Correto! 'with her mother' expressa companhia.",
      "Errado. 'to' não expressa companhia.",
      "Errado. 'at' não expressa companhia."
    ]},
  { id:"c-aw-p4", category:"alongwith", prompt:"My son does his homework ___ me every evening.", options:["along","with","for","at"], correct:1,
    explanations:[
      "Errado. 'along' não significa 'junto com' uma pessoa.",
      "Correto! 'with me' expressa companhia.",
      "Errado. 'for' não expressa companhia.",
      "Errado. 'at' não expressa companhia."
    ]},

  // ---- Padrão 3 ----
  { id:"c-as-p1", category:"allsubject", prompt:"___ arrives early for Sunday lunch.", options:["all","everybody","all people","everybodies"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não pode ser o sujeito da frase.",
      "Correto! 'everybody' + verbo no singular: everybody arrives.",
      "Errado. Soa menos natural aqui; o esperado é 'everybody'.",
      "Errado. 'everybodies' não existe em inglês."
    ]},
  { id:"c-as-p2", category:"allsubject", prompt:"In my family, ___ helps in the kitchen.", options:["all","everyone","all everyone","everyones"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não pode ser o sujeito da frase.",
      "Correto! 'everyone' + verbo no singular: everyone helps.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'everyones' não existe em inglês."
    ]},
  { id:"c-as-p3", category:"allsubject", prompt:"___ loves my grandmother's cake.", options:["all","everybody","all of them","everybodys"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não pode ser o sujeito da frase.",
      "Correto! 'everybody' + verbo no singular: everybody loves.",
      "Errado. 'all of them' precisa de um contexto anterior (quem são 'them'), não funciona sozinho aqui.",
      "Errado. 'everybodys' não existe em inglês."
    ]},
  { id:"c-as-p4", category:"allsubject", prompt:"On my birthday, ___ sings for me.", options:["all","everyone","all people","everyones"], correct:1,
    explanations:[
      "Errado. 'all' sozinho não pode ser o sujeito da frase.",
      "Correto! 'everyone' + verbo no singular: everyone sings.",
      "Errado. 'all people' soa menos natural aqui.",
      "Errado. 'everyones' não existe em inglês."
    ]},

  // ---- Padrão 4 ----
  { id:"c-er-p1", category:"everyroutine", prompt:"My wife cooks a big lunch ___.", options:["all Sundays","every Sunday","all Sunday","every sundays"], correct:1,
    explanations:[
      "Errado. 'all Sundays' não é a forma natural para rotina.",
      "Correto! 'every Sunday' expressa a rotina semanal.",
      "Errado. 'all Sunday' significa 'o domingo inteiro' (duração), não rotina.",
      "Errado. 'every' pede o substantivo no singular e com maiúscula: Sunday."
    ]},
  { id:"c-er-p2", category:"everyroutine", prompt:"He calls his mother ___.", options:["all weeks","every week","all week","every weeks"], correct:1,
    explanations:[
      "Errado. 'all weeks' não é usado para rotina.",
      "Correto! 'every week' expressa a rotina semanal.",
      "Errado. 'all week' significa 'a semana inteira' (duração), não rotina.",
      "Errado. 'every' pede o substantivo no singular, sem 's'."
    ]},
  { id:"c-er-p3", category:"everyroutine", prompt:"We celebrate Christmas ___.", options:["all years","every year","all year","every-year"], correct:1,
    explanations:[
      "Errado. 'all years' não é usado para rotina.",
      "Correto! 'every year' expressa a rotina anual.",
      "Errado. 'all year' significa 'o ano inteiro' (duração), não rotina.",
      "Errado. Não se usa hífen entre 'every' e 'year'."
    ]},
  { id:"c-er-p4", category:"everyroutine", prompt:"My daughter visits us ___.", options:["all Fridays","every Friday","all Friday","everyfriday"], correct:1,
    explanations:[
      "Errado. 'all Fridays' não é a forma natural para rotina.",
      "Correto! 'every Friday' expressa a rotina semanal.",
      "Errado. 'all Friday' significa 'a sexta-feira inteira' (duração), não rotina.",
      "Errado. 'every' e 'Friday' são duas palavras separadas."
    ]},

  // ---- Padrão 5 ----
  { id:"c-mv-p1", category:"missingverb", prompt:"Which sentence is correct?", options:["They to church on Sundays.","They go to church on Sundays.","They church on Sundays.","They going to church on Sundays."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! 'go' é o verbo obrigatório: they go to church.",
      "Errado. Falta o verbo principal da frase.",
      "Errado. Falta o verbo auxiliar 'are' antes de 'going', ou o verbo deveria ser 'go'."
    ]},
  { id:"c-mv-p2", category:"missingverb", prompt:"Which sentence is correct?", options:["My mother to the market on Saturdays.","My mother goes to the market on Saturdays.","My mother the market on Saturdays.","My mother go to the market on Saturdays."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! 'goes' é o verbo obrigatório, com o 's' da 3ª pessoa.",
      "Errado. Falta o verbo principal da frase.",
      "Errado. Com 'my mother' (3ª pessoa), o verbo precisa do 's': goes."
    ]},
  { id:"c-mv-p3", category:"missingverb", prompt:"Which sentence is correct?", options:["We by train to my grandparents' house.","We go by train to my grandparents' house.","We by train my grandparents' house.","We going by train to my grandparents' house."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! 'go' é o verbo obrigatório: we go by train.",
      "Errado. Falta o verbo e a preposição 'to' antes do lugar.",
      "Errado. Falta o verbo auxiliar 'are' antes de 'going', ou o verbo deveria ser 'go'."
    ]},
  { id:"c-mv-p4", category:"missingverb", prompt:"Which sentence is correct?", options:["I to bed at 10 pm.","I go to bed at 10 pm.","I bed at 10 pm.","I going to bed at 10 pm."], correct:1,
    explanations:[
      "Errado. Falta o verbo principal da frase.",
      "Correto! 'go' é o verbo obrigatório: I go to bed.",
      "Errado. Falta o verbo principal da frase.",
      "Errado. Falta o verbo auxiliar 'am' antes de 'going', ou o verbo deveria ser 'go'."
    ]},

  // ---- Padrão 6 ----
  { id:"c-sv-p1", category:"subjectverb", prompt:"My son ___ soccer every weekend.", options:["play","plays","playing","played"], correct:1,
    explanations:[
      "Errado. Com 'my son' (3ª pessoa), falta o 's' no verbo.",
      "Correto! 3ª pessoa do singular + 's': son plays.",
      "Errado. 'playing' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'played' é passado; a frase descreve uma rotina."
    ]},
  { id:"c-sv-p2", category:"subjectverb", prompt:"The whole family ___ presents on Christmas Eve.", options:["open","opens","opening","opened"], correct:1,
    explanations:[
      "Errado. 'the whole family' é tratado como singular; falta o 's' no verbo.",
      "Correto! Sujeito singular + verbo com 's': family opens.",
      "Errado. 'opening' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'opened' é passado; a frase descreve uma tradição atual."
    ]},
  { id:"c-sv-p3", category:"subjectverb", prompt:"My husband ___ the dishes after dinner.", options:["wash","washes","washing","washed"], correct:1,
    explanations:[
      "Errado. Com 'my husband' (3ª pessoa), falta o 's' no verbo.",
      "Correto! 3ª pessoa do singular + 's': husband washes.",
      "Errado. 'washing' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'washed' é passado; a frase descreve uma rotina."
    ]},
  { id:"c-sv-p4", category:"subjectverb", prompt:"My mother-in-law ___ us every Friday.", options:["visit","visits","visiting","visited"], correct:1,
    explanations:[
      "Errado. Com 'my mother-in-law' (3ª pessoa), falta o 's' no verbo.",
      "Correto! 3ª pessoa do singular + 's': mother-in-law visits.",
      "Errado. 'visiting' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'visited' é passado; a frase descreve uma rotina."
    ]},

  // ---- Padrão 7 ----
  { id:"c-ft-p1", category:"forto", prompt:"My daughter calls me ___ say good night.", options:["for","to","for to","at"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo para expressar finalidade.",
      "Correto! 'to say' expressa a finalidade da ligação.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'at' não expressa finalidade."
    ]},
  { id:"c-ft-p2", category:"forto", prompt:"We go to my mother's house ___ have Sunday lunch.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo.",
      "Correto! 'to have' expressa a finalidade.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'in order for' precisa de uma estrutura diferente."
    ]},
  { id:"c-ft-p3", category:"forto", prompt:"He works hard ___ support his family.", options:["for","to","for to","at"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo.",
      "Correto! 'to support' expressa a finalidade.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'at' não expressa finalidade."
    ]},
  { id:"c-ft-p4", category:"forto", prompt:"They save money ___ buy a bigger house.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. 'for' não é seguido de verbo no infinitivo.",
      "Correto! 'to buy' expressa a finalidade.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'in order for' precisa de uma estrutura diferente."
    ]},

  // ---- Padrão 8 ----
  { id:"c-mm-p1", category:"muchmany", prompt:"My family doesn't have ___ special traditions.", options:["much","many","a much","many's"], correct:1,
    explanations:[
      "Errado. 'tradition' é contável; com contáveis no plural usamos 'many'.",
      "Correto! 'many traditions' — contável no plural.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},
  { id:"c-mm-p2", category:"muchmany", prompt:"There isn't ___ time before the party.", options:["much","many","a much","a many"], correct:0,
    explanations:[
      "Correto! 'time' é incontável, então usamos 'much'.",
      "Errado. 'many' é usado com contáveis no plural; 'time' é incontável.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'a many' não existe em inglês."
    ]},
  { id:"c-mm-p3", category:"muchmany", prompt:"We don't have ___ relatives living nearby.", options:["much","many","a much","a many"], correct:1,
    explanations:[
      "Errado. 'relative' é contável; com contáveis no plural usamos 'many'.",
      "Correto! 'many relatives' — contável no plural.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'a many' não existe em inglês."
    ]},
  { id:"c-mm-p4", category:"muchmany", prompt:"My daughter doesn't eat ___ candy.", options:["much","many","a much","many's"], correct:0,
    explanations:[
      "Correto! 'candy' é incontável, então usamos 'much'.",
      "Errado. 'many' é usado com contáveis no plural; 'candy' é incontável.",
      "Errado. 'a much' não existe em inglês.",
      "Errado. 'many's' não existe em inglês."
    ]},

  // ---- Padrão 9 ----
  { id:"c-sc-p1", category:"sentencecore", prompt:"Which sentence is correct?", options:["Playing games with my kids after school.","I play games with my kids after school.","Play games with my kids after school.","Playing game with my kids after school."], correct:1,
    explanations:[
      "Errado. Gerúndio solto não forma uma frase completa.",
      "Correto! 'I play' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. Falta sujeito, verbo conjugado, e 'game' deveria estar no plural."
    ]},
  { id:"c-sc-p2", category:"sentencecore", prompt:"Which sentence is correct?", options:["Singing songs at every birthday party.","We sing songs at every birthday party.","Sing songs at every birthday party.","Singing song at every birthday party."], correct:1,
    explanations:[
      "Errado. Gerúndio solto não forma uma frase completa.",
      "Correto! 'We sing' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. Falta sujeito, verbo conjugado, e 'song' deveria estar no plural."
    ]},
  { id:"c-sc-p3", category:"sentencecore", prompt:"Which sentence is correct?", options:["Making pizza on Saturday nights.","My family makes pizza on Saturday nights.","Make pizza on Saturday nights.","Making pizza, on Saturday night."], correct:1,
    explanations:[
      "Errado. Gerúndio solto não forma uma frase completa.",
      "Correto! 'My family makes' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. A vírgula não resolve a falta de sujeito e verbo conjugado."
    ]},
  { id:"c-sc-p4", category:"sentencecore", prompt:"Which sentence is correct?", options:["Traveling to the beach every summer.","We travel to the beach every summer.","Travel to the beach every summer.","Traveling to beach every summer."], correct:1,
    explanations:[
      "Errado. Gerúndio solto não forma uma frase completa.",
      "Correto! 'We travel' dá sujeito e verbo conjugado à frase.",
      "Errado. Falta o sujeito da frase.",
      "Errado. Falta sujeito, verbo conjugado, e o artigo 'the' antes de 'beach'."
    ]},

  // ---- Padrão 10 ----
  { id:"c-pp-p1", category:"placeposs", prompt:"We celebrate Thanksgiving at my ___ house.", options:["uncle","uncle's","uncles'","uncles"], correct:1,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Correto! Singular + apóstrofo antes do 's': uncle's house.",
      "Errado. 'uncles'' seria para vários tios.",
      "Errado. Falta o apóstrofo indicando posse."
    ]},
  { id:"c-pp-p2", category:"placeposs", prompt:"My son studies at his ___ house after school.", options:["friends","friend's","friends'","friend"], correct:1,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Correto! Singular + apóstrofo antes do 's': friend's house.",
      "Errado. 'friends'' seria para vários amigos.",
      "Errado. Falta o apóstrofo e o 's' indicando posse."
    ]},
  { id:"c-pp-p3", category:"placeposs", prompt:"We have lunch at my ___ house every Sunday.", options:["parents","parent's","parents'","parentss"], correct:2,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Errado. 'parent's' (singular) indica a casa de um só pai/mãe.",
      "Correto! Plural + apóstrofo depois do 's': parents' house.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-pp-p4", category:"placeposs", prompt:"This is my ___ room.", options:["daughter","daughters","daughter's","daughters'"], correct:2,
    explanations:[
      "Errado. Falta o apóstrofo indicando posse.",
      "Errado. Falta o apóstrofo; 'daughters' sozinho é só plural.",
      "Correto! Singular + apóstrofo antes do 's': daughter's room.",
      "Errado. 'daughters'' seria para várias filhas."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
