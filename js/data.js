/* Categorias avaliadas no teste A1-A2 */
const CATEGORIES = {
  tobe:          { label: "Verbo To Be",                 level: "A1" },
  pronouns:      { label: "Pronomes e Possessivos",       level: "A1" },
  articles:      { label: "Artigos (a / an / the)",       level: "A1" },
  plurals:       { label: "Plural dos Substantivos",      level: "A1" },
  presentsimple: { label: "Present Simple",               level: "A1" },
  prepositions:  { label: "Preposições (in / on / at)",   level: "A1" },
  vocabulary:    { label: "Vocabulário Básico",           level: "A1" },
  questionwords: { label: "Palavras Interrogativas (Wh-)", level: "A1" },
  continuous:    { label: "Present Continuous",           level: "A2" },
  pastsimple:    { label: "Simple Past",                  level: "A2" },
  comparatives:  { label: "Comparativos e Superlativos",  level: "A2" },
  can:           { label: "Can / Can't (habilidade)",     level: "A2" },
};

/* ================= TESTE DE NIVELAMENTO ================= */
const TEST_QUESTIONS = [
  // ---- Verb To Be ----
  { id:"tobe-t1", category:"tobe", prompt:"I ___ a student.", options:["am","is","are","be"], correct:0,
    explanations:[
      "Correto! Usamos 'am' apenas com o pronome 'I'.",
      "Errado. 'is' é usado com he/she/it, nunca com 'I'.",
      "Errado. 'are' é usado com you/we/they, não com 'I'.",
      "Errado. 'be' é a forma base do verbo; numa frase afirmativa precisamos da forma conjugada."
    ]},
  { id:"tobe-t2", category:"tobe", prompt:"She ___ a doctor.", options:["am","is","are","being"], correct:1,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Correto! 'is' é usado com he/she/it (3ª pessoa do singular).",
      "Errado. 'are' é usado com you/we/they, não com 'she'.",
      "Errado. 'being' não substitui o verbo conjugado nesta frase."
    ]},
  { id:"tobe-t3", category:"tobe", prompt:"They ___ from Brazil.", options:["is","am","are","was"], correct:2,
    explanations:[
      "Errado. 'is' é usado com he/she/it, não com 'they'.",
      "Errado. 'am' só é usado com 'I'.",
      "Correto! 'are' é usado com you/we/they.",
      "Errado. 'was' é passado; a frase está no presente."
    ]},
  { id:"tobe-t4", category:"tobe", prompt:"___ you ready?", options:["Am","Is","Are","Be"], correct:2,
    explanations:[
      "Errado. 'Am' só é usado com 'I'.",
      "Errado. 'Is' é usado com he/she/it, não com 'you'.",
      "Correto! 'Are' é usado com 'you' para formar a pergunta.",
      "Errado. 'Be' é a forma base, não é usada sozinha para iniciar uma pergunta no presente."
    ]},

  // ---- Pronouns & Possessives ----
  { id:"pron-t1", category:"pronouns", prompt:"This is Anna. ___ is my friend.", options:["She","Her","He","Hers"], correct:0,
    explanations:[
      "Correto! 'She' é o pronome sujeito usado para substituir 'Anna' antes do verbo.",
      "Errado. 'Her' é usado como objeto ou possessivo, não como sujeito da frase.",
      "Errado. 'He' é usado para pessoas do sexo masculino; Anna é mulher.",
      "Errado. 'Hers' é um pronome possessivo (ex: 'the book is hers'), não substitui o sujeito."
    ]},
  { id:"pron-t2", category:"pronouns", prompt:"This is ___ car. (belongs to me)", options:["I","me","my","mine"], correct:2,
    explanations:[
      "Errado. 'I' é pronome sujeito, não pode vir antes de um substantivo.",
      "Errado. 'me' é pronome objeto (ex: 'give it to me').",
      "Correto! 'my' é o adjetivo possessivo usado antes de um substantivo (my car).",
      "Errado. 'mine' substitui o substantivo (ex: 'this car is mine'), não vem antes dele."
    ]},
  { id:"pron-t3", category:"pronouns", prompt:"Can you help ___? (asking for myself)", options:["I","me","my","mine"], correct:1,
    explanations:[
      "Errado. 'I' é pronome sujeito; depois do verbo usamos o pronome objeto.",
      "Correto! 'me' é o pronome objeto, usado depois do verbo 'help'.",
      "Errado. 'my' é possessivo e precisa vir antes de um substantivo.",
      "Errado. 'mine' indica posse (ex: 'it's mine'), não é usado como objeto do verbo."
    ]},
  { id:"pron-t4", category:"pronouns", prompt:"Is this book ___? (belongs to you)", options:["you","your","yours","yourself"], correct:2,
    explanations:[
      "Errado. 'you' é pronome sujeito/objeto, não indica posse sozinho aqui.",
      "Errado. 'your' precisa vir antes de um substantivo (your book), não sozinho no final.",
      "Correto! 'yours' substitui 'your book' e pode ficar sozinho no fim da frase.",
      "Errado. 'yourself' é um pronome reflexivo (ex: 'you did it yourself')."
    ]},

  // ---- Articles ----
  { id:"art-t1", category:"articles", prompt:"I have ___ apple.", options:["a","an","the","(no article)"], correct:1,
    explanations:[
      "Errado. Usamos 'a' antes de palavras que começam com som de consoante.",
      "Correto! Usamos 'an' antes de palavras que começam com som de vogal, como 'apple'.",
      "Errado. 'the' é usado para algo específico já conhecido, não é o caso aqui.",
      "Errado. Substantivos contáveis no singular precisam de um artigo."
    ]},
  { id:"art-t2", category:"articles", prompt:"She is ___ teacher.", options:["a","an","the","(no article)"], correct:0,
    explanations:[
      "Correto! Usamos 'a' antes de palavras que começam com som de consoante, como 'teacher'.",
      "Errado. 'an' é usado antes de som de vogal; 'teacher' começa com som de consoante.",
      "Errado. 'the' indicaria uma professora específica já mencionada, não é o caso.",
      "Errado. Profissões no singular precisam de artigo em inglês."
    ]},
  { id:"art-t3", category:"articles", prompt:"Look at ___ sun! It's so bright today.", options:["a","an","the","(no article)"], correct:2,
    explanations:[
      "Errado. 'a' é usado para algo não específico; o sol é único.",
      "Errado. 'an' também indicaria algo não específico.",
      "Correto! Usamos 'the' para coisas únicas no mundo, como 'the sun', 'the moon'.",
      "Errado. Precisamos de um artigo antes do substantivo 'sun'."
    ]},
  { id:"art-t4", category:"articles", prompt:"I like ___ music.", options:["a","an","the","(no article)"], correct:3,
    explanations:[
      "Errado. 'music' aqui é incontável e genérico; não usamos 'a'.",
      "Errado. 'an' não é usado antes de substantivos incontáveis genéricos.",
      "Errado. 'the' seria usado se fosse uma música específica, não música em geral.",
      "Correto! Para falar de algo em geral (substantivos incontáveis), não usamos artigo."
    ]},

  // ---- Plurals ----
  { id:"plu-t1", category:"plurals", prompt:"I have two ___.", options:["dog","dogs","doges","dogies"], correct:1,
    explanations:[
      "Errado. Falta o 's' do plural, pois há mais de um cachorro.",
      "Correto! O plural regular é formado com 's': dog → dogs.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-t2", category:"plurals", prompt:"There are three ___ in the box.", options:["box","boxs","boxes","boxies"], correct:2,
    explanations:[
      "Errado. Falta o plural; a palavra 'box' está no singular.",
      "Errado. Palavras terminadas em -x recebem 'es', não apenas 's'.",
      "Correto! Palavras terminadas em -x, -s, -sh, -ch formam o plural com 'es': box → boxes.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-t3", category:"plurals", prompt:"How many ___ do you have? (child)", options:["childs","childes","children","child"], correct:2,
    explanations:[
      "Errado. 'child' tem plural irregular; não se adiciona apenas 's'.",
      "Errado. Essa forma não existe em inglês.",
      "Correto! 'child' é irregular: o plural correto é 'children'.",
      "Errado. Está no singular; a pergunta pede a forma plural."
    ]},
  { id:"plu-t4", category:"plurals", prompt:"She has two ___. (baby)", options:["babys","babies","babyes","baby"], correct:1,
    explanations:[
      "Errado. Quando a palavra termina em consoante + 'y', o 'y' muda para 'i' antes de 'es'.",
      "Correto! baby → babies (consoante + y → 'ies').",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Está no singular; precisamos do plural pois o número é 'two'."
    ]},

  // ---- Present Simple ----
  { id:"ps-t1", category:"presentsimple", prompt:"He ___ to school every day.", options:["go","goes","going","gone"], correct:1,
    explanations:[
      "Errado. Com he/she/it, o verbo no Present Simple recebe 's' ou 'es'.",
      "Correto! Com a 3ª pessoa do singular (he), adicionamos 'es' a 'go': goes.",
      "Errado. 'going' é usado com o verbo 'be' no Present Continuous (is going).",
      "Errado. 'gone' é o particípio, usado em tempos como o Present Perfect."
    ]},
  { id:"ps-t2", category:"presentsimple", prompt:"They ___ coffee in the morning.", options:["drinks","drink","drinking","drank"], correct:1,
    explanations:[
      "Errado. O 's' final é usado apenas com he/she/it, não com 'they'.",
      "Correto! Com you/we/they, o verbo fica na forma base: drink.",
      "Errado. 'drinking' precisa do verbo 'be' (are drinking) para o Present Continuous.",
      "Errado. 'drank' é a forma do passado (Simple Past)."
    ]},
  { id:"ps-t3", category:"presentsimple", prompt:"___ she like pizza?", options:["Do","Does","Is","Are"], correct:1,
    explanations:[
      "Errado. 'Do' é usado com I/you/we/they, não com 'she'.",
      "Correto! Com he/she/it usamos o auxiliar 'Does' para formar perguntas no Present Simple.",
      "Errado. 'Is' é do verbo 'to be', não é usado para formar essa pergunta com 'like'.",
      "Errado. 'Are' é usado com you/we/they no verbo 'to be', não se aplica aqui."
    ]},
  { id:"ps-t4", category:"presentsimple", prompt:"I ___ not like vegetables.", options:["do","does","am","is"], correct:0,
    explanations:[
      "Correto! Com 'I' usamos o auxiliar 'do' na forma negativa: I do not (don't) like.",
      "Errado. 'does' é usado apenas com he/she/it.",
      "Errado. 'am' é do verbo 'to be', não é usado para negar verbos de ação como 'like'.",
      "Errado. 'is' é usado com he/she/it no verbo 'to be', não se aplica a 'I'."
    ]},

  // ---- Prepositions ----
  { id:"prep-t1", category:"prepositions", prompt:"I was born ___ 2005.", options:["in","on","at","by"], correct:0,
    explanations:[
      "Correto! Usamos 'in' com anos, meses e estações: in 2005.",
      "Errado. 'on' é usado com dias e datas específicas, não com anos.",
      "Errado. 'at' é usado com horários específicos, não com anos.",
      "Errado. 'by' indica prazo ('até'), não é usado para anos."
    ]},
  { id:"prep-t2", category:"prepositions", prompt:"The meeting is ___ Monday.", options:["in","on","at","for"], correct:1,
    explanations:[
      "Errado. 'in' é usado com meses, anos e períodos longos, não com dias da semana.",
      "Correto! Usamos 'on' com dias da semana e datas: on Monday.",
      "Errado. 'at' é usado com horários específicos, como 'at 5pm'.",
      "Errado. 'for' indica duração ou finalidade, não é usado para dias."
    ]},
  { id:"prep-t3", category:"prepositions", prompt:"I'll see you ___ 6 o'clock.", options:["in","on","at","during"], correct:2,
    explanations:[
      "Errado. 'in' não é usado com horários exatos.",
      "Errado. 'on' é usado com dias e datas, não com horas.",
      "Correto! Usamos 'at' com horários específicos: at 6 o'clock.",
      "Errado. 'during' indica que algo acontece 'durante' um período, não um horário exato."
    ]},
  { id:"prep-t4", category:"prepositions", prompt:"The keys are ___ the table.", options:["in","on","at","under"], correct:1,
    explanations:[
      "Errado. 'in' indica que algo está dentro de um espaço fechado.",
      "Correto! Usamos 'on' para indicar que algo está sobre uma superfície: on the table.",
      "Errado. 'at' indica um ponto/local geral, não a posição exata 'sobre'.",
      "Errado. 'under' significa 'embaixo de', o oposto do que a figura sugere aqui (sobre a mesa)."
    ]},

  // ---- Vocabulary ----
  { id:"voc-t1", category:"vocabulary", prompt:"What color is the sky on a clear day?", options:["Red","Blue","Green","Yellow"], correct:1,
    explanations:[
      "Errado. 'Red' (vermelho) não é a cor do céu num dia claro.",
      "Correto! 'Blue' (azul) é a cor do céu num dia claro.",
      "Errado. 'Green' (verde) não é a cor do céu.",
      "Errado. 'Yellow' (amarelo) não é a cor do céu."
    ]},
  { id:"voc-t2", category:"vocabulary", prompt:"Which word means 'irmã' in English?", options:["Brother","Mother","Sister","Daughter"], correct:2,
    explanations:[
      "Errado. 'Brother' significa 'irmão'.",
      "Errado. 'Mother' significa 'mãe'.",
      "Correto! 'Sister' significa 'irmã'.",
      "Errado. 'Daughter' significa 'filha'."
    ]},
  { id:"voc-t3", category:"vocabulary", prompt:"What day comes after Monday?", options:["Sunday","Wednesday","Tuesday","Friday"], correct:2,
    explanations:[
      "Errado. 'Sunday' (domingo) vem antes de Monday, não depois.",
      "Errado. 'Wednesday' (quarta-feira) vem dois dias depois de Monday.",
      "Correto! 'Tuesday' (terça-feira) é o dia seguinte a Monday.",
      "Errado. 'Friday' (sexta-feira) vem bem depois de Monday."
    ]},
  { id:"voc-t4", category:"vocabulary", prompt:"How do you say 'quinze' in English?", options:["Five","Fifty","Fifteen","Fourteen"], correct:2,
    explanations:[
      "Errado. 'Five' significa 'cinco'.",
      "Errado. 'Fifty' significa 'cinquenta'.",
      "Correto! 'Fifteen' significa 'quinze'.",
      "Errado. 'Fourteen' significa 'quatorze'."
    ]},

  // ---- Question Words ----
  { id:"qw-t1", category:"questionwords", prompt:"___ is your name?", options:["Who","What","Where","When"], correct:1,
    explanations:[
      "Errado. 'Who' pergunta sobre uma pessoa (ex: Who is she?), não sobre um nome diretamente.",
      "Correto! 'What' é usado para perguntar 'qual/o que' — What is your name?",
      "Errado. 'Where' pergunta sobre lugar.",
      "Errado. 'When' pergunta sobre tempo/momento."
    ]},
  { id:"qw-t2", category:"questionwords", prompt:"___ do you live?", options:["What","Who","Where","Why"], correct:2,
    explanations:[
      "Errado. 'What' pergunta sobre coisas/ideias, não sobre lugar.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Correto! 'Where' é usado para perguntar sobre lugar — Where do you live?",
      "Errado. 'Why' pergunta sobre o motivo (por quê)."
    ]},
  { id:"qw-t3", category:"questionwords", prompt:"___ is your birthday?", options:["Where","Who","Why","When"], correct:3,
    explanations:[
      "Errado. 'Where' pergunta sobre lugar, não sobre data.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Errado. 'Why' pergunta sobre motivo.",
      "Correto! 'When' é usado para perguntar sobre tempo/data — When is your birthday?"
    ]},
  { id:"qw-t4", category:"questionwords", prompt:"___ are you crying?", options:["Why","What","Where","Who"], correct:0,
    explanations:[
      "Correto! 'Why' pergunta o motivo — Why are you crying?",
      "Errado. 'What' pergunta sobre coisas, não sobre motivo.",
      "Errado. 'Where' pergunta sobre lugar.",
      "Errado. 'Who' pergunta sobre pessoas."
    ]},

  // ---- Present Continuous ----
  { id:"pc-t1", category:"continuous", prompt:"Look! She ___ a song right now.", options:["sing","sings","is singing","was singing"], correct:2,
    explanations:[
      "Errado. Falta o verbo auxiliar 'be' e o sufixo '-ing' para o Present Continuous.",
      "Errado. Essa é a forma do Present Simple, usada para hábitos, não para 'agora'.",
      "Correto! 'right now' indica uma ação acontecendo neste momento: is + verbo-ing.",
      "Errado. 'was singing' é passado; a frase indica uma ação no presente ('right now')."
    ]},
  { id:"pc-t2", category:"continuous", prompt:"We ___ dinner at the moment.", options:["cook","are cooking","cooked","cooks"], correct:1,
    explanations:[
      "Errado. Essa é a forma do Present Simple, não indica ação em andamento.",
      "Correto! 'at the moment' pede o Present Continuous: are + cooking.",
      "Errado. 'cooked' é passado.",
      "Errado. 'cooks' seria usado com he/she/it no Present Simple, e ainda não indica ação em andamento."
    ]},
  { id:"pc-t3", category:"continuous", prompt:"___ you watching TV now?", options:["Do","Are","Is","Does"], correct:1,
    explanations:[
      "Errado. 'Do' é usado no Present Simple, não no Present Continuous.",
      "Correto! Com 'you' usamos 'are' para formar a pergunta no Present Continuous.",
      "Errado. 'Is' é usado com he/she/it, não com 'you'.",
      "Errado. 'Does' é usado no Present Simple com he/she/it."
    ]},
  { id:"pc-t4", category:"continuous", prompt:"I ___ TV every day, but right now I'm reading.", options:["watch","am watching","watched","watches"], correct:0,
    explanations:[
      "Correto! 'every day' indica um hábito, então usamos o Present Simple: watch.",
      "Errado. O Present Continuous descreveria uma ação acontecendo agora, mas a frase diz que agora ela está lendo, não assistindo TV.",
      "Errado. 'watched' é passado; a frase fala de um hábito atual.",
      "Errado. 'watches' seria usado apenas com he/she/it, e o sujeito aqui é 'I'."
    ]},

  // ---- Simple Past ----
  { id:"pp-t1", category:"pastsimple", prompt:"Yesterday, I ___ my homework.", options:["do","did","done","doing"], correct:1,
    explanations:[
      "Errado. 'do' é a forma do presente; 'yesterday' indica passado.",
      "Correto! 'did' é o passado do verbo irregular 'do'.",
      "Errado. 'done' é o particípio, usado com 'have' (Present Perfect).",
      "Errado. 'doing' é usado com 'be' no Continuous, não sozinho no Simple Past."
    ]},
  { id:"pp-t2", category:"pastsimple", prompt:"She ___ to the party last night.", options:["go","goes","went","gone"], correct:2,
    explanations:[
      "Errado. 'go' é a forma base, usada no presente.",
      "Errado. 'goes' é usado no Present Simple com she/he/it.",
      "Correto! 'went' é o passado irregular de 'go'.",
      "Errado. 'gone' é o particípio, usado com 'have/has' (Present Perfect)."
    ]},
  { id:"pp-t3", category:"pastsimple", prompt:"They ___ a movie last weekend. (watch)", options:["watch","watches","watched","watching"], correct:2,
    explanations:[
      "Errado. 'watch' é a forma do presente; a frase indica 'last weekend' (passado).",
      "Errado. 'watches' é usado no Present Simple com he/she/it.",
      "Correto! Verbos regulares formam o passado com '-ed': watch → watched.",
      "Errado. 'watching' precisa de um verbo auxiliar e não indica o Simple Past sozinho."
    ]},
  { id:"pp-t4", category:"pastsimple", prompt:"___ you see that movie?", options:["Do","Did","Does","Are"], correct:1,
    explanations:[
      "Errado. 'Do' forma perguntas no presente, não no passado.",
      "Correto! 'Did' é o auxiliar usado para formar perguntas no Simple Past, com qualquer sujeito.",
      "Errado. 'Does' é usado no presente com he/she/it.",
      "Errado. 'Are' é do verbo 'to be', não é usado para formar essa pergunta com 'see'."
    ]},

  // ---- Comparatives ----
  { id:"comp-t1", category:"comparatives", prompt:"This car is ___ than that one. (fast)", options:["fast","faster","fastest","more fast"], correct:1,
    explanations:[
      "Errado. Falta a forma comparativa; estamos comparando dois carros.",
      "Correto! Adjetivos curtos formam o comparativo com '-er': fast → faster.",
      "Errado. 'fastest' é o superlativo (usado com 'the'), não o comparativo entre dois itens.",
      "Errado. 'more fast' está incorreto; adjetivos curtos não usam 'more', apenas '-er'."
    ]},
  { id:"comp-t2", category:"comparatives", prompt:"She is the ___ student in the class. (smart)", options:["smarter","smartest","more smart","smart"], correct:1,
    explanations:[
      "Errado. 'smarter' é usado para comparar dois elementos, não o grupo todo.",
      "Correto! Com 'the' e comparando com todo o grupo, usamos o superlativo: smartest.",
      "Errado. 'more smart' está incorreto para um adjetivo curto; o certo seria '-est'.",
      "Errado. Falta o superlativo, pois a frase compara com todo o grupo ('in the class')."
    ]},
  { id:"comp-t3", category:"comparatives", prompt:"This book is ___ than that movie. (interesting)", options:["interestinger","more interesting","most interesting","interestingest"], correct:1,
    explanations:[
      "Errado. Adjetivos longos não recebem '-er'.",
      "Correto! Adjetivos longos (3+ sílabas) formam o comparativo com 'more': more interesting.",
      "Errado. 'most interesting' é superlativo, usado com 'the', não para comparar dois itens.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"comp-t4", category:"comparatives", prompt:"My house is ___ than yours. (big)", options:["bigger","biger","more big","biggest"], correct:0,
    explanations:[
      "Correto! Adjetivo curto com consoante final dobrada: big → bigger.",
      "Errado. A consoante final precisa dobrar antes de '-er': bigger, não 'biger'.",
      "Errado. Adjetivos curtos não usam 'more', usam '-er'.",
      "Errado. 'biggest' é superlativo, usado com 'the', não para comparar dois itens."
    ]},

  // ---- Can / Can't ----
  { id:"can-t1", category:"can", prompt:"Fish ___ live without water.", options:["can","can't","cans","canned"], correct:1,
    explanations:[
      "Errado. Peixes NÃO conseguem viver sem água, então a forma afirmativa está errada aqui.",
      "Correto! 'can't' (cannot) indica incapacidade — peixes não conseguem viver sem água.",
      "Errado. 'can' não recebe 's', é um verbo modal e não varia com a pessoa.",
      "Errado. 'canned' significa 'enlatado', não tem relação com habilidade."
    ]},
  { id:"can-t2", category:"can", prompt:"___ you swim?", options:["Do","Can","Does","Are"], correct:1,
    explanations:[
      "Errado. Para perguntar sobre habilidade usamos o modal 'can', não 'do'.",
      "Correto! 'Can' vai no início da pergunta para perguntar sobre habilidade: Can you swim?",
      "Errado. 'Does' é usado no Present Simple, não com o modal 'can'.",
      "Errado. 'Are' é do verbo 'to be', não é usado com verbos de ação como 'swim' aqui."
    ]},
  { id:"can-t3", category:"can", prompt:"Birds ___ fly.", options:["can", "cans", "canning", "is can"], correct:0,
    explanations:[
      "Correto! 'can' é um verbo modal e não muda de forma, mesmo com 'birds' (plural).",
      "Errado. Verbos modais como 'can' nunca recebem 's'.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Não se usa o verbo 'is' junto com 'can'."
    ]},
  { id:"can-t4", category:"can", prompt:"I ___ speak French, but I can speak English.", options:["can't","can","cants","not can"], correct:0,
    explanations:[
      "Correto! 'can't' indica que a pessoa não tem essa habilidade (falar francês).",
      "Errado. 'can' (afirmativo) contradiz o sentido da frase, que contrasta com 'but I can speak English'.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. A ordem correta da negação é 'can not / can't', não 'not can'."
    ]},
];

/* ================= EXERCÍCIOS DE REFORÇO ================= */
/* Usados para montar a prática personalizada nas categorias em que o usuário for mal */
const PRACTICE_QUESTIONS = [
  // ---- Verb To Be ----
  { id:"tobe-p1", category:"tobe", prompt:"We ___ happy today.", options:["am","is","are","been"], correct:2,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Errado. 'is' é usado com he/she/it.",
      "Correto! 'are' é usado com we/you/they.",
      "Errado. 'been' é o particípio do verbo 'be', usado em tempos compostos como o Present Perfect."
    ]},
  { id:"tobe-p2", category:"tobe", prompt:"He ___ my brother.", options:["am","are","is","be"], correct:2,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Errado. 'are' é usado com you/we/they.",
      "Correto! 'is' é usado com he/she/it.",
      "Errado. 'be' é a forma base, não conjugada."
    ]},
  { id:"tobe-p3", category:"tobe", prompt:"It ___ a nice day.", options:["am","are","is","were"], correct:2,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Errado. 'are' é usado com you/we/they.",
      "Correto! 'is' é usado com 'it'.",
      "Errado. 'were' é passado e usado com you/we/they, não se aplica aqui."
    ]},
  { id:"tobe-p4", category:"tobe", prompt:"___ they at home?", options:["Is","Am","Are","Being"], correct:2,
    explanations:[
      "Errado. 'Is' é usado com he/she/it, não com 'they'.",
      "Errado. 'Am' só é usado com 'I'.",
      "Correto! 'Are' é usado com they/you/we.",
      "Errado. 'Being' não é usado para iniciar perguntas assim."
    ]},

  // ---- Pronouns & Possessives ----
  { id:"pron-p1", category:"pronouns", prompt:"Peter is tall. ___ plays basketball.", options:["He","Him","His","Himself"], correct:0,
    explanations:[
      "Correto! 'He' é o pronome sujeito que substitui 'Peter'.",
      "Errado. 'Him' é pronome objeto (ex: I saw him).",
      "Errado. 'His' é possessivo (ex: his ball), precisa vir antes de um substantivo.",
      "Errado. 'Himself' é reflexivo (ex: he hurt himself)."
    ]},
  { id:"pron-p2", category:"pronouns", prompt:"These shoes are ___. (belongs to us)", options:["we","our","ours","us"], correct:2,
    explanations:[
      "Errado. 'we' é pronome sujeito.",
      "Errado. 'our' precisa vir antes de um substantivo (our shoes).",
      "Correto! 'ours' substitui 'our shoes' e pode ficar sozinho no final da frase.",
      "Errado. 'us' é pronome objeto (ex: help us)."
    ]},
  { id:"pron-p3", category:"pronouns", prompt:"I gave the book to ___. (Maria and John)", options:["they","them","their","theirs"], correct:1,
    explanations:[
      "Errado. 'they' é pronome sujeito, não pode ser usado como objeto do verbo.",
      "Correto! 'them' é o pronome objeto, usado depois de 'to'.",
      "Errado. 'their' é possessivo e precisa vir antes de um substantivo.",
      "Errado. 'theirs' substitui um substantivo já mencionado (ex: this book is theirs)."
    ]},
  { id:"pron-p4", category:"pronouns", prompt:"___ dog is very friendly. (belongs to me)", options:["Me","I","My","Mine"], correct:2,
    explanations:[
      "Errado. 'Me' é pronome objeto, não vem antes de substantivo.",
      "Errado. 'I' é pronome sujeito, não vem antes de substantivo.",
      "Correto! 'My' é o adjetivo possessivo, usado antes de um substantivo: My dog.",
      "Errado. 'Mine' substitui o substantivo (ex: this dog is mine), não vem antes dele."
    ]},

  // ---- Articles ----
  { id:"art-p1", category:"articles", prompt:"He is ___ engineer.", options:["a","an","the","(no article)"], correct:1,
    explanations:[
      "Errado. 'a' é usado antes de som de consoante.",
      "Correto! 'engineer' começa com som de vogal, então usamos 'an'.",
      "Errado. 'the' indicaria um engenheiro específico já conhecido.",
      "Errado. Profissões no singular precisam de artigo."
    ]},
  { id:"art-p2", category:"articles", prompt:"I need ___ umbrella; it's raining.", options:["a","an","the","(no article)"], correct:1,
    explanations:[
      "Errado. 'a' é usado antes de som de consoante.",
      "Correto! 'umbrella' começa com som de vogal, então usamos 'an'.",
      "Errado. 'the' seria usado para um guarda-chuva específico já mencionado.",
      "Errado. Substantivo contável no singular precisa de artigo."
    ]},
  { id:"art-p3", category:"articles", prompt:"Can you close ___ door, please? (the one right there)", options:["a","an","the","(no article)"], correct:2,
    explanations:[
      "Errado. 'a' indicaria uma porta qualquer, não uma específica.",
      "Errado. 'an' também indicaria algo não específico, além do som inicial não combinar.",
      "Correto! 'the' é usado quando a porta é específica e conhecida por quem fala e ouve.",
      "Errado. Precisamos de um artigo antes de 'door' neste contexto."
    ]},
  { id:"art-p4", category:"articles", prompt:"I love ___ dogs. (in general)", options:["a","an","the","(no article)"], correct:3,
    explanations:[
      "Errado. 'a' não é usado antes de substantivos no plural.",
      "Errado. 'an' não é usado antes de substantivos no plural.",
      "Errado. 'the' seria usado para cães específicos, não cães em geral.",
      "Correto! Para falar de algo em geral no plural, não usamos artigo."
    ]},

  // ---- Plurals ----
  { id:"plu-p1", category:"plurals", prompt:"I saw two ___ in the park. (man)", options:["mans","men","mens","manes"], correct:1,
    explanations:[
      "Errado. 'man' tem plural irregular.",
      "Correto! man → men é um plural irregular.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-p2", category:"plurals", prompt:"There are many ___ in the city. (bus)", options:["bus","buss","buses","busies"], correct:2,
    explanations:[
      "Errado. Está no singular; a frase indica 'many' (muitos).",
      "Errado. Essa forma não existe em inglês.",
      "Correto! Palavras terminadas em -s formam o plural com 'es': bus → buses.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-p3", category:"plurals", prompt:"I have three ___. (city)", options:["citys","cities","cityes","city"], correct:1,
    explanations:[
      "Errado. Quando a palavra termina em consoante + 'y', o 'y' muda para 'i' antes de 'es'.",
      "Correto! city → cities (consoante + y → 'ies').",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Está no singular; o número 'three' pede o plural."
    ]},
  { id:"plu-p4", category:"plurals", prompt:"Look at those ___ swimming! (fish)", options:["fishs","fishes","fish","fishies"], correct:2,
    explanations:[
      "Errado. Essa forma não existe; 'fish' é um plural irregular (não muda).",
      "Errado. 'fishes' não é o plural comum usado no dia a dia (apenas em contextos técnicos de espécies).",
      "Correto! 'fish' é irregular e mantém a mesma forma no singular e no plural.",
      "Errado. Essa forma não existe em inglês."
    ]},

  // ---- Present Simple ----
  { id:"ps-p1", category:"presentsimple", prompt:"My mother ___ dinner every evening.", options:["cook","cooks","cooking","cooked"], correct:1,
    explanations:[
      "Errado. Com he/she/it, o verbo precisa do 's' final.",
      "Correto! 'mother' é 3ª pessoa do singular, então adicionamos 's': cooks.",
      "Errado. 'cooking' precisa do verbo 'be' para formar o Continuous.",
      "Errado. 'cooked' é passado; a frase indica um hábito no presente ('every evening')."
    ]},
  { id:"ps-p2", category:"presentsimple", prompt:"We ___ English at school.", options:["studies","study","studying","studied"], correct:1,
    explanations:[
      "Errado. O 's' final é usado apenas com he/she/it, não com 'we'.",
      "Correto! Com we/you/they, o verbo fica na forma base: study.",
      "Errado. 'studying' precisa do verbo 'be' para o Continuous.",
      "Errado. 'studied' é passado."
    ]},
  { id:"ps-p3", category:"presentsimple", prompt:"___ your brother play football?", options:["Do","Does","Is","Are"], correct:1,
    explanations:[
      "Errado. 'Do' é usado com I/you/we/they.",
      "Correto! 'your brother' é 3ª pessoa do singular, então usamos 'Does'.",
      "Errado. 'Is' é do verbo 'to be', não forma essa pergunta com 'play'.",
      "Errado. 'Are' é usado com you/we/they no verbo 'to be'."
    ]},
  { id:"ps-p4", category:"presentsimple", prompt:"She ___ not drink coffee.", options:["do","does","is","am"], correct:1,
    explanations:[
      "Errado. 'do' é usado com I/you/we/they, não com 'she'.",
      "Correto! Com he/she/it usamos 'does' na forma negativa: she does not (doesn't) drink.",
      "Errado. 'is' é do verbo 'to be', não nega verbos de ação como 'drink'.",
      "Errado. 'am' só é usado com 'I'."
    ]},

  // ---- Prepositions ----
  { id:"prep-p1", category:"prepositions", prompt:"My birthday is ___ July.", options:["in","on","at","by"], correct:0,
    explanations:[
      "Correto! Usamos 'in' com meses: in July.",
      "Errado. 'on' é usado com dias e datas específicas, não com meses sozinhos.",
      "Errado. 'at' é usado com horários específicos.",
      "Errado. 'by' indica prazo, não é usado para meses."
    ]},
  { id:"prep-p2", category:"prepositions", prompt:"I usually wake up ___ 7 am.", options:["in","on","at","during"], correct:2,
    explanations:[
      "Errado. 'in' não é usado com horários exatos.",
      "Errado. 'on' é usado com dias e datas, não horas.",
      "Correto! Usamos 'at' com horários específicos: at 7 am.",
      "Errado. 'during' indica 'durante' um período, não um horário exato."
    ]},
  { id:"prep-p3", category:"prepositions", prompt:"The cat is ___ the box.", options:["on","in","at","under"], correct:1,
    explanations:[
      "Errado. 'on' indicaria que o gato está em cima da caixa.",
      "Correto! 'in' indica que o gato está dentro de um espaço fechado, como a caixa.",
      "Errado. 'at' indica um ponto/local geral, não 'dentro de'.",
      "Errado. 'under' significa 'embaixo de', diferente de 'dentro de'."
    ]},
  { id:"prep-p4", category:"prepositions", prompt:"We go to the beach ___ summer.", options:["on","at","in","by"], correct:2,
    explanations:[
      "Errado. 'on' é usado com dias e datas, não estações do ano.",
      "Errado. 'at' é usado com horários específicos.",
      "Correto! Usamos 'in' com estações do ano: in summer.",
      "Errado. 'by' indica prazo, não é usado para estações."
    ]},

  // ---- Vocabulary ----
  { id:"voc-p1", category:"vocabulary", prompt:"Which word means 'cachorro' in English?", options:["Cat","Dog","Bird","Fish"], correct:1,
    explanations:[
      "Errado. 'Cat' significa 'gato'.",
      "Correto! 'Dog' significa 'cachorro'.",
      "Errado. 'Bird' significa 'pássaro'.",
      "Errado. 'Fish' significa 'peixe'."
    ]},
  { id:"voc-p2", category:"vocabulary", prompt:"What do you use to write?", options:["A spoon","A pen","A plate","A shoe"], correct:1,
    explanations:[
      "Errado. 'A spoon' (uma colher) é usada para comer, não para escrever.",
      "Correto! 'A pen' (uma caneta) é usada para escrever.",
      "Errado. 'A plate' (um prato) não tem relação com escrever.",
      "Errado. 'A shoe' (um sapato) não tem relação com escrever."
    ]},
  { id:"voc-p3", category:"vocabulary", prompt:"Which month comes right after March?", options:["February","April","May","January"], correct:1,
    explanations:[
      "Errado. 'February' (fevereiro) vem antes de março, não depois.",
      "Correto! 'April' (abril) é o mês seguinte a março.",
      "Errado. 'May' (maio) vem dois meses depois de março.",
      "Errado. 'January' (janeiro) vem bem antes de março."
    ]},
  { id:"voc-p4", category:"vocabulary", prompt:"How do you say 'vinte' in English?", options:["Twelve","Twenty","Ten","Two"], correct:1,
    explanations:[
      "Errado. 'Twelve' significa 'doze'.",
      "Correto! 'Twenty' significa 'vinte'.",
      "Errado. 'Ten' significa 'dez'.",
      "Errado. 'Two' significa 'dois'."
    ]},

  // ---- Question Words ----
  { id:"qw-p1", category:"questionwords", prompt:"___ is that man? He is my uncle.", options:["What","Who","Where","When"], correct:1,
    explanations:[
      "Errado. 'What' pergunta sobre coisas, não pessoas.",
      "Correto! 'Who' é usado para perguntar sobre uma pessoa.",
      "Errado. 'Where' pergunta sobre lugar.",
      "Errado. 'When' pergunta sobre tempo."
    ]},
  { id:"qw-p2", category:"questionwords", prompt:"___ old are you?", options:["What","How","Who","Why"], correct:1,
    explanations:[
      "Errado. 'What' sozinho não forma essa expressão comum.",
      "Correto! 'How old' é a expressão usada para perguntar a idade.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Errado. 'Why' pergunta sobre motivo."
    ]},
  { id:"qw-p3", category:"questionwords", prompt:"___ does the movie start?", options:["What","Where","When","Who"], correct:2,
    explanations:[
      "Errado. 'What' pergunta sobre coisas, não horário.",
      "Errado. 'Where' pergunta sobre lugar.",
      "Correto! 'When' pergunta sobre tempo/horário — When does it start?",
      "Errado. 'Who' pergunta sobre pessoas."
    ]},
  { id:"qw-p4", category:"questionwords", prompt:"___ is your phone number?", options:["What","Who","When","Why"], correct:0,
    explanations:[
      "Correto! 'What' é usado para pedir uma informação como o número de telefone.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Errado. 'When' pergunta sobre tempo.",
      "Errado. 'Why' pergunta sobre motivo."
    ]},

  // ---- Present Continuous ----
  { id:"pc-p1", category:"continuous", prompt:"Be quiet! The baby ___ right now.", options:["sleeps","sleep","is sleeping","slept"], correct:2,
    explanations:[
      "Errado. Essa é a forma do Present Simple, usada para hábitos.",
      "Errado. Falta o auxiliar 'be' e o '-ing'.",
      "Correto! 'right now' pede o Present Continuous: is + sleeping.",
      "Errado. 'slept' é passado."
    ]},
  { id:"pc-p2", category:"continuous", prompt:"They ___ football at the moment.", options:["play","plays","are playing","played"], correct:2,
    explanations:[
      "Errado. Essa é a forma do Present Simple, não indica ação em andamento.",
      "Errado. 'plays' seria usado só com he/she/it, e ainda assim seria Present Simple.",
      "Correto! 'at the moment' pede o Present Continuous: are + playing.",
      "Errado. 'played' é passado."
    ]},
  { id:"pc-p3", category:"continuous", prompt:"___ he working today?", options:["Do","Does","Is","Are"], correct:2,
    explanations:[
      "Errado. 'Do' é usado no Present Simple.",
      "Errado. 'Does' é usado no Present Simple com he/she/it.",
      "Correto! Com 'he' usamos 'is' para formar a pergunta no Present Continuous.",
      "Errado. 'Are' é usado com you/we/they, não com 'he'."
    ]},
  { id:"pc-p4", category:"continuous", prompt:"I usually ___ coffee, but right now I'm drinking tea.", options:["drink","am drinking","drank","drinks"], correct:0,
    explanations:[
      "Correto! 'usually' indica um hábito, então usamos o Present Simple.",
      "Errado. A frase já diz que agora ela está tomando chá, não café.",
      "Errado. 'drank' é passado; a frase fala de um hábito atual.",
      "Errado. 'drinks' seria usado apenas com he/she/it; o sujeito aqui é 'I'."
    ]},

  // ---- Simple Past ----
  { id:"pp-p1", category:"pastsimple", prompt:"We ___ pizza last night. (eat)", options:["eat","eats","ate","eaten"], correct:2,
    explanations:[
      "Errado. 'eat' é a forma do presente; 'last night' indica passado.",
      "Errado. 'eats' é usado no Present Simple com he/she/it.",
      "Correto! 'ate' é o passado irregular do verbo 'eat'.",
      "Errado. 'eaten' é o particípio, usado com 'have/has'."
    ]},
  { id:"pp-p2", category:"pastsimple", prompt:"She ___ her keys yesterday. (lose)", options:["lose","loses","lost","losed"], correct:2,
    explanations:[
      "Errado. 'lose' é a forma do presente.",
      "Errado. 'loses' é usado no Present Simple com he/she/it.",
      "Correto! 'lost' é o passado irregular de 'lose'.",
      "Errado. Essa forma não existe; o verbo é irregular."
    ]},
  { id:"pp-p3", category:"pastsimple", prompt:"I ___ not sleep well last night.", options:["do","did","does","was"], correct:1,
    explanations:[
      "Errado. 'do' é usado no presente.",
      "Correto! No Simple Past, a negação usa 'did not (didn't)' com qualquer sujeito.",
      "Errado. 'does' é usado no presente com he/she/it.",
      "Errado. 'was' é do verbo 'to be', não nega verbos de ação como 'sleep'."
    ]},
  { id:"pp-p4", category:"pastsimple", prompt:"They ___ to Paris in 2019. (travel)", options:["travel","traveled","traveling","travels"], correct:1,
    explanations:[
      "Errado. 'travel' é a forma do presente; '2019' indica passado.",
      "Correto! Verbo regular: travel → traveled.",
      "Errado. 'traveling' precisa de um auxiliar e não indica o Simple Past sozinho.",
      "Errado. 'travels' é usado no Present Simple com he/she/it."
    ]},

  // ---- Comparatives ----
  { id:"comp-p1", category:"comparatives", prompt:"Winter is ___ than summer here. (cold)", options:["cold","colder","coldest","more cold"], correct:1,
    explanations:[
      "Errado. Falta a forma comparativa.",
      "Correto! Adjetivo curto: cold → colder.",
      "Errado. 'coldest' é superlativo, usado com 'the'.",
      "Errado. Adjetivos curtos não usam 'more'."
    ]},
  { id:"comp-p2", category:"comparatives", prompt:"He is the ___ boy in the school. (tall)", options:["taller","tallest","more tall","tall"], correct:1,
    explanations:[
      "Errado. 'taller' compara apenas dois elementos.",
      "Correto! Com 'the' e comparando com todo o grupo, usamos o superlativo: tallest.",
      "Errado. Adjetivos curtos não usam 'more'.",
      "Errado. Falta o superlativo, pois compara com todo o grupo."
    ]},
  { id:"comp-p3", category:"comparatives", prompt:"This exercise is ___ than the last one. (difficult)", options:["difficulter","most difficult","more difficult","difficultest"], correct:2,
    explanations:[
      "Errado. Essa forma não existe em inglês.",
      "Errado. 'most difficult' é superlativo, usado com 'the'.",
      "Correto! Adjetivos longos formam o comparativo com 'more'.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"comp-p4", category:"comparatives", prompt:"My phone is ___ than yours. (good → irregular)", options:["gooder","best","better","more good"], correct:2,
    explanations:[
      "Errado. 'good' é irregular; não recebe '-er'.",
      "Errado. 'best' é o superlativo irregular, usado com 'the'.",
      "Correto! O comparativo irregular de 'good' é 'better'.",
      "Errado. 'good' é irregular e não usa 'more'."
    ]},

  // ---- Can / Can't ----
  { id:"can-p1", category:"can", prompt:"I ___ play the piano very well.", options:["can", "cans", "am can", "canning"], correct:0,
    explanations:[
      "Correto! 'can' expressa habilidade e não muda de forma com 'I'.",
      "Errado. Verbos modais nunca recebem 's'.",
      "Errado. Não se usa 'am' junto com 'can'.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"can-p2", category:"can", prompt:"She ___ speak three languages.", options:["cans","can","canning","is can"], correct:1,
    explanations:[
      "Errado. Verbos modais como 'can' nunca recebem 's', mesmo com he/she/it.",
      "Correto! 'can' não muda de forma, independente do sujeito.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Não se usa o verbo 'is' junto com 'can'."
    ]},
  { id:"can-p3", category:"can", prompt:"___ they play chess?", options:["Does","Can","Is","Do"], correct:1,
    explanations:[
      "Errado. Para perguntar sobre habilidade usamos o modal 'can'.",
      "Correto! 'Can' vai no início da pergunta: Can they play chess?",
      "Errado. 'Is' é do verbo 'to be'.",
      "Errado. 'Do' não é usado junto com o modal 'can' na mesma pergunta."
    ]},
  { id:"can-p4", category:"can", prompt:"Penguins ___ fly, but they can swim very well.", options:["can","can't","cans","not can"], correct:1,
    explanations:[
      "Errado. Pinguins não conseguem voar, então a forma afirmativa está errada.",
      "Correto! 'can't' indica que os pinguins não têm essa habilidade (voar).",
      "Errado. Verbos modais nunca recebem 's'.",
      "Errado. A ordem correta é 'can not / can't', não 'not can'."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica */
function getPracticeForCategory(categoryKey) {
  return PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
