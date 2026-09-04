/* Categorias avaliadas no teste A1-A2 */
const CATEGORIES = {
  tobe:          { label: "Verbo To Be",                 level: "A1" },
  pronouns:      { label: "Pronomes e Possessivos",       level: "A1" },
  articles:      { label: "Artigos (a / an / the)",       level: "A1" },
  plurals:       { label: "Plural dos Substantivos",      level: "A1" },
  presentsimple: { label: "Present Simple",               level: "A1" },
  prepositions:  { label: "Preposições (in / on / at)",   level: "A1" },
  vocabulary:    { label: "Vocabulário de Trabalho",      level: "A1" },
  questionwords: { label: "Palavras Interrogativas (Wh-)", level: "A1" },
  continuous:    { label: "Present Continuous",           level: "A2" },
  pastsimple:    { label: "Simple Past",                  level: "A2" },
  comparatives:  { label: "Comparativos e Superlativos",  level: "A2" },
  can:           { label: "Can / Can't (habilidade)",     level: "A2" },
};

/* ================= TESTE DE NIVELAMENTO =================
   Contexto: Ana é analista de dados e está se preparando para conseguir
   uma vaga em uma empresa que usa inglês no dia a dia. Todas as questões
   giram em torno de entrevistas, reuniões, relatórios e rotina de trabalho. */
const TEST_QUESTIONS = [
  // ---- Verb To Be ----
  { id:"tobe-t1", category:"tobe", prompt:"Ana is updating her professional profile before applying for jobs abroad. She writes: 'I ___ a data analyst with three years of experience in reports and dashboards.'", options:["am","is","are","be"], correct:0,
    explanations:[
      "Correto! Usamos 'am' apenas com o pronome 'I' — 'I am a data analyst...'.",
      "Errado. 'is' é usado com he/she/it, nunca com 'I'.",
      "Errado. 'are' é usado com you/we/they, não com 'I'.",
      "Errado. 'be' é a forma base do verbo; numa frase afirmativa precisamos da forma conjugada."
    ]},
  { id:"tobe-t2", category:"tobe", prompt:"During the interview, the recruiter asks about Ana's teammate. Ana answers: 'She ___ the person who built our sales dashboard.'", options:["am","is","are","being"], correct:1,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Correto! 'is' é usado com he/she/it (3ª pessoa do singular): 'She is the person who...'.",
      "Errado. 'are' é usado com you/we/they, não com 'she'.",
      "Errado. 'being' não substitui o verbo conjugado nesta frase."
    ]},
  { id:"tobe-t3", category:"tobe", prompt:"The recruiter asks about the data team at Ana's company. Ana explains: 'They ___ all analysts, but each one works with a different type of report.'", options:["is","am","are","was"], correct:2,
    explanations:[
      "Errado. 'is' é usado com he/she/it, não com 'they'.",
      "Errado. 'am' só é usado com 'I'.",
      "Correto! 'are' é usado com you/we/they: 'They are all analysts...'.",
      "Errado. 'was' é passado; a frase está no presente."
    ]},
  { id:"tobe-t4", category:"tobe", prompt:"Before starting a technical test for the job, the recruiter asks Ana: '___ you ready to start the Excel test now?'", options:["Am","Is","Are","Be"], correct:2,
    explanations:[
      "Errado. 'Am' só é usado com 'I'.",
      "Errado. 'Is' é usado com he/she/it, não com 'you'.",
      "Correto! 'Are' é usado com 'you' para formar a pergunta: 'Are you ready...?'.",
      "Errado. 'Be' é a forma base, não é usada sozinha para iniciar uma pergunta no presente."
    ]},

  // ---- Pronouns & Possessives ----
  { id:"pron-t1", category:"pronouns", prompt:"Ana is talking about her manager, Laura, who reviews every report before it goes to the client. 'This is Laura. ___ is responsible for approving my analysis.'", options:["She","Her","He","Hers"], correct:0,
    explanations:[
      "Correto! 'She' é o pronome sujeito usado para substituir 'Laura' antes do verbo.",
      "Errado. 'Her' é usado como objeto ou possessivo, não como sujeito da frase.",
      "Errado. 'He' é usado para pessoas do sexo masculino; Laura é mulher.",
      "Errado. 'Hers' é um pronome possessivo (ex: 'the final decision is hers'), não substitui o sujeito."
    ]},
  { id:"pron-t2", category:"pronouns", prompt:"Ana points to a laptop on her desk during the interview. 'This is ___ laptop. I use it to build dashboards every day.' (belongs to me)", options:["I","me","my","mine"], correct:2,
    explanations:[
      "Errado. 'I' é pronome sujeito, não pode vir antes de um substantivo.",
      "Errado. 'me' é pronome objeto (ex: 'give it to me').",
      "Correto! 'my' é o adjetivo possessivo usado antes de um substantivo: 'my laptop'.",
      "Errado. 'mine' substitui o substantivo (ex: 'this laptop is mine'), não vem antes dele."
    ]},
  { id:"pron-t3", category:"pronouns", prompt:"Ana is stuck on a formula in a spreadsheet and asks a coworker. 'Can you help ___ with this formula? I can't find the error.' (asking for herself)", options:["I","me","my","mine"], correct:1,
    explanations:[
      "Errado. 'I' é pronome sujeito; depois do verbo usamos o pronome objeto.",
      "Correto! 'me' é o pronome objeto, usado depois do verbo 'help'.",
      "Errado. 'my' é possessivo e precisa vir antes de um substantivo.",
      "Errado. 'mine' indica posse (ex: 'it's mine'), não é usado como objeto do verbo."
    ]},
  { id:"pron-t4", category:"pronouns", prompt:"The recruiter left a laptop on the table after the interview. Ana asks the other candidate: 'Is this laptop ___?' (belongs to you)", options:["you","your","yours","yourself"], correct:2,
    explanations:[
      "Errado. 'you' é pronome sujeito/objeto, não indica posse sozinho aqui.",
      "Errado. 'your' precisa vir antes de um substantivo (your laptop), não sozinho no final.",
      "Correto! 'yours' substitui 'your laptop' e pode ficar sozinho no fim da frase.",
      "Errado. 'yourself' é um pronome reflexivo (ex: 'you did it yourself')."
    ]},

  // ---- Articles ----
  { id:"art-t1", category:"articles", prompt:"Ana is preparing something quick to eat before a long day of interviews. 'I have ___ apple and some coffee for breakfast.'", options:["a","an","the","(no article)"], correct:1,
    explanations:[
      "Errado. Usamos 'a' antes de palavras que começam com som de consoante.",
      "Correto! Usamos 'an' antes de palavras que começam com som de vogal, como 'apple'.",
      "Errado. 'the' é usado para algo específico já conhecido, não é o caso aqui.",
      "Errado. Substantivos contáveis no singular precisam de um artigo."
    ]},
  { id:"art-t2", category:"articles", prompt:"Ana is describing a new coworker who just joined the data team. 'She is ___ business analyst, and she also knows Python.'", options:["a","an","the","(no article)"], correct:0,
    explanations:[
      "Correto! Usamos 'a' antes de palavras que começam com som de consoante, como 'business'.",
      "Errado. 'an' é usado antes de som de vogal; 'business' começa com som de consoante.",
      "Errado. 'the' indicaria uma analista específica já mencionada, não é o caso.",
      "Errado. Profissões no singular precisam de artigo em inglês."
    ]},
  { id:"art-t3", category:"articles", prompt:"Ana is finishing her report late at night, before the deadline. 'Look at ___ time! It's already midnight and I still have two charts to finish.'", options:["a","an","the","(no article)"], correct:2,
    explanations:[
      "Errado. 'a' é usado para algo não específico; aqui estamos falando de um horário exato e conhecido (midnight).",
      "Errado. 'an' também indicaria algo não específico.",
      "Correto! Usamos 'the' para algo já conhecido e específico no contexto: 'the time'.",
      "Errado. Precisamos de um artigo antes do substantivo 'time' nesta expressão."
    ]},
  { id:"art-t4", category:"articles", prompt:"During a break, Ana talks about what helps her focus while cleaning and organizing data. 'I like ___ music while I work.' (in general)", options:["a","an","the","(no article)"], correct:3,
    explanations:[
      "Errado. 'music' aqui é incontável e genérico; não usamos 'a'.",
      "Errado. 'an' não é usado antes de substantivos incontáveis genéricos.",
      "Errado. 'the' seria usado se fosse uma música específica, não música em geral.",
      "Correto! Para falar de algo em geral (substantivos incontáveis), não usamos artigo."
    ]},

  // ---- Plurals ----
  { id:"plu-t1", category:"plurals", prompt:"Ana is listing what she still needs to finish before the client meeting. 'I have two ___ to update before the meeting.' (report)", options:["report","reports","reportes","reportos"], correct:1,
    explanations:[
      "Errado. Falta o 's' do plural, pois há mais de um relatório.",
      "Correto! O plural regular é formado com 's': report → reports.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-t2", category:"plurals", prompt:"Ana is organizing folders in the storage room before the office move. 'There are three ___ in this room.' (box)", options:["box","boxs","boxes","boxies"], correct:2,
    explanations:[
      "Errado. Falta o plural; a palavra 'box' está no singular.",
      "Errado. Palavras terminadas em -x recebem 'es', não apenas 's'.",
      "Correto! Palavras terminadas em -x, -s, -sh, -ch formam o plural com 'es': box → boxes.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-t3", category:"plurals", prompt:"The recruiter asks about Ana's family situation, since the job includes a relocation package. 'How many ___ do you have?' (child)", options:["childs","childes","children","child"], correct:2,
    explanations:[
      "Errado. 'child' tem plural irregular; não se adiciona apenas 's'.",
      "Errado. Essa forma não existe em inglês.",
      "Correto! 'child' é irregular: o plural correto é 'children'.",
      "Errado. Está no singular; a pergunta pede a forma plural."
    ]},
  { id:"plu-t4", category:"plurals", prompt:"Ana has been searching for opportunities abroad for a few weeks. 'I found many interesting job ___ this week.' (vacancy)", options:["vacancys","vacancies","vacancyes","vacancy"], correct:1,
    explanations:[
      "Errado. Quando a palavra termina em consoante + 'y', o 'y' muda para 'i' antes de 'es'.",
      "Correto! vacancy → vacancies (consoante + y → 'ies').",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Está no singular; precisamos do plural pois a frase diz 'many'."
    ]},

  // ---- Present Simple ----
  { id:"ps-t1", category:"presentsimple", prompt:"Ana's daily routine as a data analyst is very organized. 'My coworker Marcos ___ to the office every day to check the dashboards.'", options:["go","goes","going","gone"], correct:1,
    explanations:[
      "Errado. Com he/she/it, o verbo no Present Simple recebe 's' ou 'es'.",
      "Correto! Com a 3ª pessoa do singular ('Marcos' = he), adicionamos 'es' a 'go': goes.",
      "Errado. 'going' é usado com o verbo 'be' no Present Continuous (is going).",
      "Errado. 'gone' é o particípio, usado em tempos como o Present Perfect."
    ]},
  { id:"ps-t2", category:"presentsimple", prompt:"Describing the team's habits during work hours, Ana says: 'They ___ coffee before every morning meeting.'", options:["drinks","drink","drinking","drank"], correct:1,
    explanations:[
      "Errado. O 's' final é usado apenas com he/she/it, não com 'they'.",
      "Correto! Com you/we/they, o verbo fica na forma base: drink.",
      "Errado. 'drinking' precisa do verbo 'be' (are drinking) para o Present Continuous.",
      "Errado. 'drank' é a forma do passado (Simple Past)."
    ]},
  { id:"ps-t3", category:"presentsimple", prompt:"Ana wants to know if a candidate enjoys working with numbers. '___ she like working with spreadsheets?'", options:["Do","Does","Is","Are"], correct:1,
    explanations:[
      "Errado. 'Do' é usado com I/you/we/they, não com 'she'.",
      "Correto! Com he/she/it usamos o auxiliar 'Does' para formar perguntas no Present Simple.",
      "Errado. 'Is' é do verbo 'to be', não é usado para formar essa pergunta com 'like'.",
      "Errado. 'Are' é usado com you/we/they no verbo 'to be', não se aplica aqui."
    ]},
  { id:"ps-t4", category:"presentsimple", prompt:"Ana explains her preferences during a team lunch. 'I ___ not like coffee without sugar.'", options:["do","does","am","is"], correct:0,
    explanations:[
      "Correto! Com 'I' usamos o auxiliar 'do' na forma negativa: I do not (don't) like.",
      "Errado. 'does' é usado apenas com he/she/it.",
      "Errado. 'am' é do verbo 'to be', não é usado para negar verbos de ação como 'like'.",
      "Errado. 'is' é usado com he/she/it no verbo 'to be', não se aplica a 'I'."
    ]},

  // ---- Prepositions ----
  { id:"prep-t1", category:"prepositions", prompt:"Ana fills out a form for a job application abroad. 'I was born ___ 1996.'", options:["in","on","at","by"], correct:0,
    explanations:[
      "Correto! Usamos 'in' com anos, meses e estações: in 1996.",
      "Errado. 'on' é usado com dias e datas específicas, não com anos.",
      "Errado. 'at' é usado com horários específicos, não com anos.",
      "Errado. 'by' indica prazo ('até'), não é usado para anos."
    ]},
  { id:"prep-t2", category:"prepositions", prompt:"Ana checks the team calendar for the sprint review. 'The meeting is ___ Monday.'", options:["in","on","at","for"], correct:1,
    explanations:[
      "Errado. 'in' é usado com meses, anos e períodos longos, não com dias da semana.",
      "Correto! Usamos 'on' com dias da semana e datas: on Monday.",
      "Errado. 'at' é usado com horários específicos, como 'at 5pm'.",
      "Errado. 'for' indica duração ou finalidade, não é usado para dias."
    ]},
  { id:"prep-t3", category:"prepositions", prompt:"Ana confirms the exact time of a call with a recruiter abroad. 'I'll call you ___ 6 o'clock, right after my last meeting.'", options:["in","on","at","during"], correct:2,
    explanations:[
      "Errado. 'in' não é usado com horários exatos.",
      "Errado. 'on' é usado com dias e datas, não com horas.",
      "Correto! Usamos 'at' com horários específicos: at 6 o'clock.",
      "Errado. 'during' indica que algo acontece 'durante' um período, não um horário exato."
    ]},
  { id:"prep-t4", category:"prepositions", prompt:"Ana can't find her notes before a presentation. 'The report is ___ my desk, next to the laptop.'", options:["in","on","at","under"], correct:1,
    explanations:[
      "Errado. 'in' indica que algo está dentro de um espaço fechado.",
      "Correto! Usamos 'on' para indicar que algo está sobre uma superfície: on my desk.",
      "Errado. 'at' indica um ponto/local geral, não a posição exata 'sobre'.",
      "Errado. 'under' significa 'embaixo de', o oposto do que a frase descreve (sobre a mesa)."
    ]},

  // ---- Vocabulary (workplace / job search) ----
  { id:"voc-t1", category:"vocabulary", prompt:"Ana is updating her CV in English and needs the right word. Which word means 'currículo' in English?", options:["Resume","Receipt","Recipe","Register"], correct:0,
    explanations:[
      "Correto! 'Resume' (ou 'CV') significa 'currículo' em inglês.",
      "Errado. 'Receipt' significa 'recibo'.",
      "Errado. 'Recipe' significa 'receita (de cozinha)'.",
      "Errado. 'Register' significa 'registrar' ou 'registro', não 'currículo'."
    ]},
  { id:"voc-t2", category:"vocabulary", prompt:"Ana wants to schedule a call with her new manager. Which word means 'reunião' in English?", options:["Meeting","Market","Message","Manager"], correct:0,
    explanations:[
      "Correto! 'Meeting' significa 'reunião'.",
      "Errado. 'Market' significa 'mercado'.",
      "Errado. 'Message' significa 'mensagem'.",
      "Errado. 'Manager' significa 'gerente', a pessoa que dirige a reunião, não a reunião em si."
    ]},
  { id:"voc-t3", category:"vocabulary", prompt:"Ana needs to describe the tool she uses most at work. Which word means 'planilha' in English?", options:["Notebook","Spreadsheet","Newspaper","Textbook"], correct:1,
    explanations:[
      "Errado. 'Notebook' significa 'caderno' ou 'notebook (computador)'.",
      "Correto! 'Spreadsheet' significa 'planilha', como as usadas no Excel.",
      "Errado. 'Newspaper' significa 'jornal'.",
      "Errado. 'Textbook' significa 'livro didático'."
    ]},
  { id:"voc-t4", category:"vocabulary", prompt:"During a salary negotiation, Ana wants to say 'salário' in English. Which word is correct?", options:["Salary","Celery","Salad","Solitary"], correct:0,
    explanations:[
      "Correto! 'Salary' significa 'salário'.",
      "Errado. 'Celery' significa 'aipo' (o vegetal) — a palavra parece com 'salary', mas o significado é bem diferente.",
      "Errado. 'Salad' significa 'salada'.",
      "Errado. 'Solitary' significa 'solitário'."
    ]},

  // ---- Question Words ----
  { id:"qw-t1", category:"questionwords", prompt:"At the start of a job interview, the recruiter wants to confirm Ana's name. '___ is your name?'", options:["Who","What","Where","When"], correct:1,
    explanations:[
      "Errado. 'Who' pergunta sobre uma pessoa (ex: Who is she?), não sobre um nome diretamente.",
      "Correto! 'What' é usado para perguntar 'qual/o que' — What is your name?",
      "Errado. 'Where' pergunta sobre lugar.",
      "Errado. 'When' pergunta sobre tempo/momento."
    ]},
  { id:"qw-t2", category:"questionwords", prompt:"The recruiter wants to know where Ana currently works. '___ do you work now?'", options:["What","Who","Where","Why"], correct:2,
    explanations:[
      "Errado. 'What' pergunta sobre coisas/ideias, não sobre lugar.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Correto! 'Where' é usado para perguntar sobre lugar — Where do you work now?",
      "Errado. 'Why' pergunta sobre o motivo (por quê)."
    ]},
  { id:"qw-t3", category:"questionwords", prompt:"Filling in an HR form for the new job, Ana reads: '___ is your birthday?'", options:["Where","Who","Why","When"], correct:3,
    explanations:[
      "Errado. 'Where' pergunta sobre lugar, não sobre data.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Errado. 'Why' pergunta sobre motivo.",
      "Correto! 'When' é usado para perguntar sobre tempo/data — When is your birthday?"
    ]},
  { id:"qw-t4", category:"questionwords", prompt:"The manager notices that Ana looks stressed right before her presentation. '___ are you so nervous about this meeting?'", options:["Why","What","Where","Who"], correct:0,
    explanations:[
      "Correto! 'Why' pergunta o motivo — Why are you so nervous?",
      "Errado. 'What' pergunta sobre coisas, não sobre motivo.",
      "Errado. 'Where' pergunta sobre lugar.",
      "Errado. 'Who' pergunta sobre pessoas."
    ]},

  // ---- Present Continuous ----
  { id:"pc-t1", category:"continuous", prompt:"Ana's manager walks by her desk during work. 'Look! She ___ the sales report right now.'", options:["analyze","analyzes","is analyzing","was analyzing"], correct:2,
    explanations:[
      "Errado. Falta o verbo auxiliar 'be' e o sufixo '-ing' para o Present Continuous.",
      "Errado. Essa é a forma do Present Simple, usada para hábitos, não para 'agora'.",
      "Correto! 'right now' indica uma ação acontecendo neste momento: is + verbo-ing.",
      "Errado. 'was analyzing' é passado; a frase indica uma ação no presente ('right now')."
    ]},
  { id:"pc-t2", category:"continuous", prompt:"During the sprint, the whole data team works together. 'We ___ the new dashboard at the moment.'", options:["build","are building","built","builds"], correct:1,
    explanations:[
      "Errado. Essa é a forma do Present Simple, não indica ação em andamento.",
      "Correto! 'at the moment' pede o Present Continuous: are + building.",
      "Errado. 'built' é passado.",
      "Errado. 'builds' seria usado com he/she/it no Present Simple, e ainda não indica ação em andamento."
    ]},
  { id:"pc-t3", category:"continuous", prompt:"Ana checks if a colleague is free for a quick call. '___ you working on the report now?'", options:["Do","Are","Is","Does"], correct:1,
    explanations:[
      "Errado. 'Do' é usado no Present Simple, não no Present Continuous.",
      "Correto! Com 'you' usamos 'are' para formar a pergunta no Present Continuous.",
      "Errado. 'Is' é usado com he/she/it, não com 'you'.",
      "Errado. 'Does' é usado no Present Simple com he/she/it."
    ]},
  { id:"pc-t4", category:"continuous", prompt:"Comparing her habits with what she's doing right now, Ana says: 'I usually ___ data every morning, but right now I'm reviewing emails.'", options:["analyze","am analyzing","analyzed","analyzes"], correct:0,
    explanations:[
      "Correto! 'usually' indica um hábito, então usamos o Present Simple: analyze.",
      "Errado. O Present Continuous descreveria uma ação acontecendo agora, mas a frase diz que agora ela está revisando e-mails, não analisando dados.",
      "Errado. 'analyzed' é passado; a frase fala de um hábito atual.",
      "Errado. 'analyzes' seria usado apenas com he/she/it, e o sujeito aqui é 'I'."
    ]},

  // ---- Simple Past ----
  { id:"pp-t1", category:"pastsimple", prompt:"During the stand-up meeting, Ana recalls yesterday's tasks. 'Yesterday, I ___ the monthly report.' (finish)", options:["finish","finished","finishes","finishing"], correct:1,
    explanations:[
      "Errado. 'finish' é a forma do presente; 'yesterday' indica passado.",
      "Correto! Verbos regulares formam o passado com '-ed': finish → finished.",
      "Errado. 'finishes' é usado no Present Simple com he/she/it.",
      "Errado. 'finishing' precisa de um auxiliar e não indica o Simple Past sozinho."
    ]},
  { id:"pp-t2", category:"pastsimple", prompt:"Describing what happened at a networking event, a coworker says: 'She ___ to the job fair last night.' (go)", options:["go","goes","went","gone"], correct:2,
    explanations:[
      "Errado. 'go' é a forma base, usada no presente.",
      "Errado. 'goes' é usado no Present Simple com she/he/it.",
      "Correto! 'went' é o passado irregular de 'go'.",
      "Errado. 'gone' é o particípio, usado com 'have/has' (Present Perfect)."
    ]},
  { id:"pp-t3", category:"pastsimple", prompt:"Talking about last week's project, Ana says: 'They ___ a new dashboard last weekend.' (build)", options:["build","builds","built","building"], correct:2,
    explanations:[
      "Errado. 'build' é a forma do presente; a frase indica 'last weekend' (passado).",
      "Errado. 'builds' é usado no Present Simple com he/she/it.",
      "Correto! 'built' é o passado irregular de 'build'.",
      "Errado. 'building' precisa de um verbo auxiliar e não indica o Simple Past sozinho."
    ]},
  { id:"pp-t4", category:"pastsimple", prompt:"After work, a coworker asks Ana about a company presentation. '___ you see the presentation about the new tool?'", options:["Do","Did","Does","Are"], correct:1,
    explanations:[
      "Errado. 'Do' forma perguntas no presente, não no passado.",
      "Correto! 'Did' é o auxiliar usado para formar perguntas no Simple Past, com qualquer sujeito.",
      "Errado. 'Does' é usado no presente com he/she/it.",
      "Errado. 'Are' é do verbo 'to be', não é usado para formar essa pergunta com 'see'."
    ]},

  // ---- Comparatives ----
  { id:"comp-t1", category:"comparatives", prompt:"During a design review, Ana compares two dashboards. 'This dashboard is ___ than that one.' (fast)", options:["fast","faster","fastest","more fast"], correct:1,
    explanations:[
      "Errado. Falta a forma comparativa; estamos comparando dois dashboards.",
      "Correto! Adjetivos curtos formam o comparativo com '-er': fast → faster.",
      "Errado. 'fastest' é o superlativo (usado com 'the'), não o comparativo entre dois itens.",
      "Errado. 'more fast' está incorreto; adjetivos curtos não usam 'more', apenas '-er'."
    ]},
  { id:"comp-t2", category:"comparatives", prompt:"The manager is praising the team's best analyst during a meeting. 'She is the ___ analyst in the team.' (smart)", options:["smarter","smartest","more smart","smart"], correct:1,
    explanations:[
      "Errado. 'smarter' é usado para comparar dois elementos, não o grupo todo.",
      "Correto! Com 'the' e comparando com todo o grupo, usamos o superlativo: smartest.",
      "Errado. 'more smart' está incorreto para um adjetivo curto; o certo seria '-est'.",
      "Errado. Falta o superlativo, pois a frase compara com todo o grupo ('in the team')."
    ]},
  { id:"comp-t3", category:"comparatives", prompt:"Reviewing two documents for a client presentation, Ana says: 'This report is ___ than that spreadsheet.' (interesting)", options:["interestinger","more interesting","most interesting","interestingest"], correct:1,
    explanations:[
      "Errado. Adjetivos longos não recebem '-er'.",
      "Correto! Adjetivos longos (3+ sílabas) formam o comparativo com 'more': more interesting.",
      "Errado. 'most interesting' é superlativo, usado com 'the', não para comparar dois itens.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"comp-t4", category:"comparatives", prompt:"Comparing office spaces after her company moved to a new building, Ana says: 'My new office is ___ than the old one.' (big)", options:["bigger","biger","more big","biggest"], correct:0,
    explanations:[
      "Correto! Adjetivo curto com consoante final dobrada: big → bigger.",
      "Errado. A consoante final precisa dobrar antes de '-er': bigger, não 'biger'.",
      "Errado. Adjetivos curtos não usam 'more', usam '-er'.",
      "Errado. 'biggest' é superlativo, usado com 'the', não para comparar dois itens."
    ]},

  // ---- Can / Can't ----
  { id:"can-t1", category:"can", prompt:"Explaining a technical limitation to her manager, Ana says: 'Excel ___ handle a million rows without crashing.'", options:["can","can't","cans","canned"], correct:1,
    explanations:[
      "Errado. O Excel geralmente NÃO consegue lidar bem com um milhão de linhas sem travar, então a forma afirmativa está errada aqui.",
      "Correto! 'can't' (cannot) indica incapacidade — o programa não consegue lidar com esse volume de dados.",
      "Errado. 'can' não recebe 's', é um verbo modal e não varia com a pessoa.",
      "Errado. 'canned' significa 'enlatado', não tem relação com capacidade técnica."
    ]},
  { id:"can-t2", category:"can", prompt:"During a technical interview, the recruiter asks about Ana's skills. '___ you use SQL to query a database?'", options:["Do","Can","Does","Are"], correct:1,
    explanations:[
      "Errado. Para perguntar sobre habilidade usamos o modal 'can', não 'do'.",
      "Correto! 'Can' vai no início da pergunta para perguntar sobre habilidade: Can you use SQL...?",
      "Errado. 'Does' é usado no Present Simple, não com o modal 'can'.",
      "Errado. 'Are' é do verbo 'to be', não é usado com verbos de ação como 'use' aqui."
    ]},
  { id:"can-t3", category:"can", prompt:"Explaining the company's remote work policy, Ana says: 'Analysts ___ access the database remotely.'", options:["can","cans","canning","is can"], correct:0,
    explanations:[
      "Correto! 'can' é um verbo modal e não muda de forma, mesmo com 'analysts' (plural).",
      "Errado. Verbos modais como 'can' nunca recebem 's'.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Não se usa o verbo 'is' junto com 'can'."
    ]},
  { id:"can-t4", category:"can", prompt:"Talking about her language skills during small talk in an interview, Ana says: 'I ___ speak French, but I can speak English and Portuguese fluently.'", options:["can't","can","cants","not can"], correct:0,
    explanations:[
      "Correto! 'can't' indica que a pessoa não tem essa habilidade (falar francês).",
      "Errado. 'can' (afirmativo) contradiz o sentido da frase, que contrasta com 'but I can speak English...'.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. A ordem correta da negação é 'can not / can't', não 'not can'."
    ]},
];

/* ================= EXERCÍCIOS DE REFORÇO =================
   Usados para montar a prática personalizada nas categorias em que o usuário
   ainda não atingiu 100% de acerto. Mantém o mesmo universo de Ana buscando
   uma vaga em inglês na área de dados. */
const PRACTICE_QUESTIONS = [
  // ---- Verb To Be ----
  { id:"tobe-p1", category:"tobe", prompt:"The manager is talking about the whole data team before a big presentation. 'We ___ ready to present the sales report.'", options:["am","is","are","been"], correct:2,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Errado. 'is' é usado com he/she/it.",
      "Correto! 'are' é usado com we/you/they: 'We are ready...'.",
      "Errado. 'been' é o particípio do verbo 'be', usado em tempos compostos como o Present Perfect."
    ]},
  { id:"tobe-p2", category:"tobe", prompt:"Introducing a new colleague during onboarding, Ana says: 'He ___ the new data engineer on our team.'", options:["am","are","is","be"], correct:2,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Errado. 'are' é usado com you/we/they.",
      "Correto! 'is' é usado com he/she/it: 'He is the new data engineer...'.",
      "Errado. 'be' é a forma base, não conjugada."
    ]},
  { id:"tobe-p3", category:"tobe", prompt:"Commenting on the day of an important client call, Ana says: 'It ___ an important day for the data project.'", options:["am","are","is","were"], correct:2,
    explanations:[
      "Errado. 'am' só é usado com 'I'.",
      "Errado. 'are' é usado com you/we/they.",
      "Correto! 'is' é usado com 'it': 'It is an important day...'.",
      "Errado. 'were' é passado e usado com you/we/they, não se aplica aqui."
    ]},
  { id:"tobe-p4", category:"tobe", prompt:"Checking if colleagues are online before starting a video call, Ana asks: '___ they at their desks right now?'", options:["Is","Am","Are","Being"], correct:2,
    explanations:[
      "Errado. 'Is' é usado com he/she/it, não com 'they'.",
      "Errado. 'Am' só é usado com 'I'.",
      "Correto! 'Are' é usado com they/you/we: 'Are they at their desks...?'.",
      "Errado. 'Being' não é usado para iniciar perguntas assim."
    ]},

  // ---- Pronouns & Possessives ----
  { id:"pron-p1", category:"pronouns", prompt:"Ana introduces the colleague who mentors new analysts on the team. 'Peter is our team lead. ___ helped me learn SQL.'", options:["He","Him","His","Himself"], correct:0,
    explanations:[
      "Correto! 'He' é o pronome sujeito que substitui 'Peter'.",
      "Errado. 'Him' é pronome objeto (ex: I asked him).",
      "Errado. 'His' é possessivo (ex: his idea), precisa vir antes de um substantivo.",
      "Errado. 'Himself' é reflexivo (ex: he taught himself)."
    ]},
  { id:"pron-p2", category:"pronouns", prompt:"Talking about company laptops during onboarding, the IT technician says: 'These laptops are ___.' (belong to us)", options:["we","our","ours","us"], correct:2,
    explanations:[
      "Errado. 'we' é pronome sujeito.",
      "Errado. 'our' precisa vir antes de um substantivo (our laptops).",
      "Correto! 'ours' substitui 'our laptops' e pode ficar sozinho no final da frase.",
      "Errado. 'us' é pronome objeto (ex: help us)."
    ]},
  { id:"pron-p3", category:"pronouns", prompt:"Ana finishes a project together with two colleagues. 'I sent the final report to ___.' (Maria and John)", options:["they","them","their","theirs"], correct:1,
    explanations:[
      "Errado. 'they' é pronome sujeito, não pode ser usado como objeto do verbo.",
      "Correto! 'them' é o pronome objeto, usado depois de 'to'.",
      "Errado. 'their' é possessivo e precisa vir antes de um substantivo.",
      "Errado. 'theirs' substitui um substantivo já mencionado (ex: this report is theirs)."
    ]},
  { id:"pron-p4", category:"pronouns", prompt:"Describing her own workspace to a new coworker, Ana says: '___ desk is next to the window.' (belongs to me)", options:["Me","I","My","Mine"], correct:2,
    explanations:[
      "Errado. 'Me' é pronome objeto, não vem antes de substantivo.",
      "Errado. 'I' é pronome sujeito, não vem antes de substantivo.",
      "Correto! 'My' é o adjetivo possessivo, usado antes de um substantivo: My desk.",
      "Errado. 'Mine' substitui o substantivo (ex: this desk is mine), não vem antes dele."
    ]},

  // ---- Articles ----
  { id:"art-p1", category:"articles", prompt:"Describing a coworker's role during a team meeting, Ana says: 'He is ___ engineer, and he built our data pipeline.'", options:["a","an","the","(no article)"], correct:1,
    explanations:[
      "Errado. 'a' é usado antes de som de consoante.",
      "Correto! 'engineer' começa com som de vogal, então usamos 'an'.",
      "Errado. 'the' indicaria um engenheiro específico já conhecido.",
      "Errado. Profissões no singular precisam de artigo."
    ]},
  { id:"art-p2", category:"articles", prompt:"Preparing for an outdoor networking event, Ana says: 'I need ___ umbrella; it's raining and I don't want to be late for the event.'", options:["a","an","the","(no article)"], correct:1,
    explanations:[
      "Errado. 'a' é usado antes de som de consoante.",
      "Correto! 'umbrella' começa com som de vogal, então usamos 'an'.",
      "Errado. 'the' seria usado para um guarda-chuva específico já mencionado.",
      "Errado. Substantivo contável no singular precisa de artigo."
    ]},
  { id:"art-p3", category:"articles", prompt:"During a video call, people outside are too loud. Ana asks a coworker: 'Can you close ___ door, please?' (the one right there)", options:["a","an","the","(no article)"], correct:2,
    explanations:[
      "Errado. 'a' indicaria uma porta qualquer, não uma específica.",
      "Errado. 'an' também indicaria algo não específico, além do som inicial não combinar.",
      "Correto! 'the' é usado quando a porta é específica e conhecida por quem fala e ouve.",
      "Errado. Precisamos de um artigo antes de 'door' neste contexto."
    ]},
  { id:"art-p4", category:"articles", prompt:"Talking about her interests during small talk in an interview, Ana says: 'I love ___ numbers and puzzles.' (in general)", options:["a","an","the","(no article)"], correct:3,
    explanations:[
      "Errado. 'a' não é usado antes de substantivos no plural.",
      "Errado. 'an' não é usado antes de substantivos no plural.",
      "Errado. 'the' seria usado para números específicos, não números em geral.",
      "Correto! Para falar de algo em geral no plural, não usamos artigo."
    ]},

  // ---- Plurals ----
  { id:"plu-p1", category:"plurals", prompt:"Describing the office during a busy hiring season, Ana says: 'I saw two new ___ in the interview room.' (man)", options:["mans","men","mens","manes"], correct:1,
    explanations:[
      "Errado. 'man' tem plural irregular.",
      "Correto! man → men é um plural irregular.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-p2", category:"plurals", prompt:"Talking about the city's transportation near her new job, Ana says: 'There are many ___ near the office.' (bus)", options:["bus","buss","buses","busies"], correct:2,
    explanations:[
      "Errado. Está no singular; a frase indica 'many' (muitos).",
      "Errado. Essa forma não existe em inglês.",
      "Correto! Palavras terminadas em -s formam o plural com 'es': bus → buses.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"plu-p3", category:"plurals", prompt:"Discussing possible relocation options for the new job, Ana says: 'I have applied to jobs in three different ___.' (city)", options:["citys","cities","cityes","city"], correct:1,
    explanations:[
      "Errado. Quando a palavra termina em consoante + 'y', o 'y' muda para 'i' antes de 'es'.",
      "Correto! city → cities (consoante + y → 'ies').",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Está no singular; o número 'three' pede o plural."
    ]},
  { id:"plu-p4", category:"plurals", prompt:"During a tour of the new office, someone points at the aquarium in the break room. 'Look at those ___ swimming in the tank!' (fish)", options:["fishs","fishes","fish","fishies"], correct:2,
    explanations:[
      "Errado. Essa forma não existe; 'fish' é um plural irregular (não muda).",
      "Errado. 'fishes' não é o plural comum usado no dia a dia (apenas em contextos técnicos de espécies).",
      "Correto! 'fish' é irregular e mantém a mesma forma no singular e no plural.",
      "Errado. Essa forma não existe em inglês."
    ]},

  // ---- Present Simple ----
  { id:"ps-p1", category:"presentsimple", prompt:"Describing a colleague's routine on the data team, Ana says: 'My colleague ___ the dashboard every evening before leaving.' (check)", options:["check","checks","checking","checked"], correct:1,
    explanations:[
      "Errado. Com he/she/it, o verbo precisa do 's' final.",
      "Correto! 'colleague' é 3ª pessoa do singular, então adicionamos 's': checks.",
      "Errado. 'checking' precisa do verbo 'be' para formar o Continuous.",
      "Errado. 'checked' é passado; a frase indica um hábito no presente ('every evening')."
    ]},
  { id:"ps-p2", category:"presentsimple", prompt:"Talking about training at the new company, Ana says: 'We ___ English at work every week.' (study)", options:["studies","study","studying","studied"], correct:1,
    explanations:[
      "Errado. O 's' final é usado apenas com he/she/it, não com 'we'.",
      "Correto! Com we/you/they, o verbo fica na forma base: study.",
      "Errado. 'studying' precisa do verbo 'be' para o Continuous.",
      "Errado. 'studied' é passado."
    ]},
  { id:"ps-p3", category:"presentsimple", prompt:"Asking about a colleague's technical skills, Ana says: '___ your brother work with spreadsheets?'", options:["Do","Does","Is","Are"], correct:1,
    explanations:[
      "Errado. 'Do' é usado com I/you/we/they.",
      "Correto! 'your brother' é 3ª pessoa do singular, então usamos 'Does'.",
      "Errado. 'Is' é do verbo 'to be', não forma essa pergunta com 'work'.",
      "Errado. 'Are' é usado com you/we/they no verbo 'to be'."
    ]},
  { id:"ps-p4", category:"presentsimple", prompt:"Talking about food preferences during a team lunch, a coworker says: 'She ___ not drink coffee before presentations.'", options:["do","does","is","am"], correct:1,
    explanations:[
      "Errado. 'do' é usado com I/you/we/they, não com 'she'.",
      "Correto! Com he/she/it usamos 'does' na forma negativa: she does not (doesn't) drink.",
      "Errado. 'is' é do verbo 'to be', não nega verbos de ação como 'drink'.",
      "Errado. 'am' só é usado com 'I'."
    ]},

  // ---- Prepositions ----
  { id:"prep-p1", category:"prepositions", prompt:"Filling in personal details on an international job application, Ana writes: 'My birthday is ___ July.'", options:["in","on","at","by"], correct:0,
    explanations:[
      "Correto! Usamos 'in' com meses: in July.",
      "Errado. 'on' é usado com dias e datas específicas, não com meses sozinhos.",
      "Errado. 'at' é usado com horários específicos.",
      "Errado. 'by' indica prazo, não é usado para meses."
    ]},
  { id:"prep-p2", category:"prepositions", prompt:"Describing her morning routine before work, Ana says: 'I usually wake up ___ 7 am to review my emails.'", options:["in","on","at","during"], correct:2,
    explanations:[
      "Errado. 'in' não é usado com horários exatos.",
      "Errado. 'on' é usado com dias e datas, não horas.",
      "Correto! Usamos 'at' com horários específicos: at 7 am.",
      "Errado. 'during' indica 'durante' um período, não um horário exato."
    ]},
  { id:"prep-p3", category:"prepositions", prompt:"Talking about where her laptop bag is during a video call, Ana says: 'The laptop bag is ___ my desk drawer.'", options:["on","in","at","under"], correct:1,
    explanations:[
      "Errado. 'on' indicaria que a bolsa está em cima da gaveta.",
      "Correto! 'in' indica que a bolsa está dentro de um espaço fechado, como a gaveta.",
      "Errado. 'at' indica um ponto/local geral, não 'dentro de'.",
      "Errado. 'under' significa 'embaixo de', diferente de 'dentro de'."
    ]},
  { id:"prep-p4", category:"prepositions", prompt:"Talking about seasonal work patterns at her company, Ana says: 'We have fewer meetings ___ summer.'", options:["on","at","in","by"], correct:2,
    explanations:[
      "Errado. 'on' é usado com dias e datas, não estações do ano.",
      "Errado. 'at' é usado com horários específicos.",
      "Correto! Usamos 'in' com estações do ano: in summer.",
      "Errado. 'by' indica prazo, não é usado para estações."
    ]},

  // ---- Vocabulary (workplace / job search) ----
  { id:"voc-p1", category:"vocabulary", prompt:"Ana is nervous before her first conversation with a recruiter. Which word means 'entrevista' in English?", options:["Interview","Intern","Internet","Interval"], correct:0,
    explanations:[
      "Correto! 'Interview' significa 'entrevista'.",
      "Errado. 'Intern' significa 'estagiário'.",
      "Errado. 'Internet' é a rede mundial de computadores, não tem relação direta com 'entrevista'.",
      "Errado. 'Interval' significa 'intervalo'."
    ]},
  { id:"voc-p2", category:"vocabulary", prompt:"Ana needs to send a document summarizing last month's sales. Which word means 'relatório' in English?", options:["Report","Support","Resort","Reporter"], correct:0,
    explanations:[
      "Correto! 'Report' significa 'relatório'.",
      "Errado. 'Support' significa 'suporte'.",
      "Errado. 'Resort' significa 'resort (hotel de lazer)' — a palavra parece com 'report', mas o significado é diferente.",
      "Errado. 'Reporter' significa 'repórter' (a pessoa), não o documento em si."
    ]},
  { id:"voc-p3", category:"vocabulary", prompt:"Ana explains where all the company's customer information is stored. Which word means 'banco de dados' in English?", options:["Database","Data","Debate","Datebook"], correct:0,
    explanations:[
      "Correto! 'Database' significa 'banco de dados'.",
      "Errado. 'Data' significa apenas 'dados', sem o sentido de 'banco' (sistema organizado).",
      "Errado. 'Debate' significa 'debate'.",
      "Errado. 'Datebook' não é uma palavra comum em inglês para isso."
    ]},
  { id:"voc-p4", category:"vocabulary", prompt:"Ana finds a job opening posted online. Which word means 'vaga (de emprego)' in English?", options:["Vacancy","Vacation","Vacuum","Vaccine"], correct:0,
    explanations:[
      "Correto! 'Vacancy' (ou 'job opening') significa 'vaga de emprego'.",
      "Errado. 'Vacation' significa 'férias'.",
      "Errado. 'Vacuum' significa 'aspirador de pó' ou 'vácuo'.",
      "Errado. 'Vaccine' significa 'vacina'."
    ]},

  // ---- Question Words ----
  { id:"qw-p1", category:"questionwords", prompt:"During onboarding, Ana meets someone she doesn't recognize in the meeting. '___ is that woman? She is our HR manager.'", options:["What","Who","Where","When"], correct:1,
    explanations:[
      "Errado. 'What' pergunta sobre coisas, não pessoas.",
      "Correto! 'Who' é usado para perguntar sobre uma pessoa.",
      "Errado. 'Where' pergunta sobre lugar.",
      "Errado. 'When' pergunta sobre tempo."
    ]},
  { id:"qw-p2", category:"questionwords", prompt:"Filling out a visa form required for the relocation package, Ana reads: '___ old are you?'", options:["What","How","Who","Why"], correct:1,
    explanations:[
      "Errado. 'What' sozinho não forma essa expressão comum.",
      "Correto! 'How old' é a expressão usada para perguntar a idade.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Errado. 'Why' pergunta sobre motivo."
    ]},
  { id:"qw-p3", category:"questionwords", prompt:"Ana doesn't want to be late on her first day. '___ does the training session start?'", options:["What","Where","When","Who"], correct:2,
    explanations:[
      "Errado. 'What' pergunta sobre coisas, não horário.",
      "Errado. 'Where' pergunta sobre lugar.",
      "Correto! 'When' pergunta sobre tempo/horário — When does it start?",
      "Errado. 'Who' pergunta sobre pessoas."
    ]},
  { id:"qw-p4", category:"questionwords", prompt:"The HR representative needs to send Ana the contract. '___ is your email address?'", options:["What","Who","When","Why"], correct:0,
    explanations:[
      "Correto! 'What' é usado para pedir uma informação como o endereço de e-mail.",
      "Errado. 'Who' pergunta sobre pessoas.",
      "Errado. 'When' pergunta sobre tempo.",
      "Errado. 'Why' pergunta sobre motivo."
    ]},

  // ---- Present Continuous ----
  { id:"pc-p1", category:"continuous", prompt:"A coworker asks people to be quiet because the manager needs to concentrate. 'Be quiet! She ___ the quarterly report right now.'", options:["reads","read","is reading","was reading"], correct:2,
    explanations:[
      "Errado. Essa é a forma do Present Simple, usada para hábitos.",
      "Errado. Falta o auxiliar 'be' e o '-ing'.",
      "Correto! 'right now' pede o Present Continuous: is + reading.",
      "Errado. 'was reading' é passado."
    ]},
  { id:"pc-p2", category:"continuous", prompt:"Someone tries to call the team during a busy sprint. 'They ___ a new dashboard at the moment, so please don't interrupt.'", options:["build","builds","are building","built"], correct:2,
    explanations:[
      "Errado. Essa é a forma do Present Simple, não indica ação em andamento.",
      "Errado. 'builds' seria usado só com he/she/it, e ainda assim seria Present Simple.",
      "Correto! 'at the moment' pede o Present Continuous: are + building.",
      "Errado. 'built' é passado."
    ]},
  { id:"pc-p3", category:"continuous", prompt:"Ana wants to know if a coworker is available for a quick question. '___ he working on the database today?'", options:["Do","Does","Is","Are"], correct:2,
    explanations:[
      "Errado. 'Do' é usado no Present Simple.",
      "Errado. 'Does' é usado no Present Simple com he/she/it.",
      "Correto! Com 'he' usamos 'is' para formar a pergunta no Present Continuous.",
      "Errado. 'Are' é usado com you/we/they, não com 'he'."
    ]},
  { id:"pc-p4", category:"continuous", prompt:"Comparing her habits with what she's doing right now, Ana says: 'I usually ___ spreadsheets every morning, but right now I'm answering emails.'", options:["check","am checking","checked","checks"], correct:0,
    explanations:[
      "Correto! 'usually' indica um hábito, então usamos o Present Simple.",
      "Errado. A frase já diz que agora ela está respondendo e-mails, não revisando planilhas.",
      "Errado. 'checked' é passado; a frase fala de um hábito atual.",
      "Errado. 'checks' seria usado apenas com he/she/it; o sujeito aqui é 'I'."
    ]},

  // ---- Simple Past ----
  { id:"pp-p1", category:"pastsimple", prompt:"Celebrating the end of a big project last night, the team ordered food. 'We ___ pizza after finishing the project.' (eat)", options:["eat","eats","ate","eaten"], correct:2,
    explanations:[
      "Errado. 'eat' é a forma do presente; 'last night' indica passado.",
      "Errado. 'eats' é usado no Present Simple com he/she/it.",
      "Correto! 'ate' é o passado irregular do verbo 'eat'.",
      "Errado. 'eaten' é o particípio, usado com 'have/has'."
    ]},
  { id:"pp-p2", category:"pastsimple", prompt:"Explaining why a coworker was late yesterday, Ana says: 'She ___ her badge yesterday and couldn't enter the office.' (lose)", options:["lose","loses","lost","losed"], correct:2,
    explanations:[
      "Errado. 'lose' é a forma do presente.",
      "Errado. 'loses' é usado no Present Simple com he/she/it.",
      "Correto! 'lost' é o passado irregular de 'lose'.",
      "Errado. Essa forma não existe; o verbo é irregular."
    ]},
  { id:"pp-p3", category:"pastsimple", prompt:"Explaining why she looked tired during the interview, Ana says: 'I ___ not sleep well before the interview.'", options:["do","did","does","was"], correct:1,
    explanations:[
      "Errado. 'do' é usado no presente.",
      "Correto! No Simple Past, a negação usa 'did not (didn't)' com qualquer sujeito.",
      "Errado. 'does' é usado no presente com he/she/it.",
      "Errado. 'was' é do verbo 'to be', não nega verbos de ação como 'sleep'."
    ]},
  { id:"pp-p4", category:"pastsimple", prompt:"Talking about a past work trip, Ana says: 'They ___ to London for a conference in 2019.' (travel)", options:["travel","traveled","traveling","travels"], correct:1,
    explanations:[
      "Errado. 'travel' é a forma do presente; '2019' indica passado.",
      "Correto! Verbo regular: travel → traveled.",
      "Errado. 'traveling' precisa de um auxiliar e não indica o Simple Past sozinho.",
      "Errado. 'travels' é usado no Present Simple com he/she/it."
    ]},

  // ---- Comparatives ----
  { id:"comp-p1", category:"comparatives", prompt:"Comparing computers before choosing one for heavy spreadsheets, Ana says: 'This laptop is ___ than my old one.' (fast)", options:["fast","faster","fastest","more fast"], correct:1,
    explanations:[
      "Errado. Falta a forma comparativa.",
      "Correto! Adjetivo curto: fast → faster.",
      "Errado. 'fastest' é superlativo, usado com 'the'.",
      "Errado. Adjetivos curtos não usam 'more'."
    ]},
  { id:"comp-p2", category:"comparatives", prompt:"Talking about who solves problems fastest on the team, the manager says: 'She is the ___ analyst on the team.' (smart)", options:["smarter","smartest","more smart","smart"], correct:1,
    explanations:[
      "Errado. 'smarter' compara apenas dois elementos.",
      "Correto! Com 'the' e comparando com todo o grupo, usamos o superlativo: smartest.",
      "Errado. Adjetivos curtos não usam 'more'.",
      "Errado. Falta o superlativo, pois compara com todo o grupo."
    ]},
  { id:"comp-p3", category:"comparatives", prompt:"Talking about the workload of two different projects, Ana says: 'This project is ___ than the last one.' (difficult)", options:["difficulter","most difficult","more difficult","difficultest"], correct:2,
    explanations:[
      "Errado. Essa forma não existe em inglês.",
      "Errado. 'most difficult' é superlativo, usado com 'the'.",
      "Correto! Adjetivos longos formam o comparativo com 'more'.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"comp-p4", category:"comparatives", prompt:"Comparing her current manager with the previous one, Ana says: 'My new manager is ___ than my old one.' (good → irregular)", options:["gooder","best","better","more good"], correct:2,
    explanations:[
      "Errado. 'good' é irregular; não recebe '-er'.",
      "Errado. 'best' é o superlativo irregular, usado com 'the'.",
      "Correto! O comparativo irregular de 'good' é 'better'.",
      "Errado. 'good' é irregular e não usa 'more'."
    ]},

  // ---- Can / Can't ----
  { id:"can-p1", category:"can", prompt:"Talking about her Excel skills during the interview, Ana says: 'I ___ create charts in Excel very well.'", options:["can","cans","am can","canning"], correct:0,
    explanations:[
      "Correto! 'can' expressa habilidade e não muda de forma com 'I'.",
      "Errado. Verbos modais nunca recebem 's'.",
      "Errado. Não se usa 'am' junto com 'can'.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"can-p2", category:"can", prompt:"Praising a coworker's language skills with international clients, Ana says: 'She ___ speak three languages, which helps a lot.'", options:["cans","can","canning","is can"], correct:1,
    explanations:[
      "Errado. Verbos modais como 'can' nunca recebem 's', mesmo com he/she/it.",
      "Correto! 'can' não muda de forma, independente do sujeito.",
      "Errado. Essa forma não existe em inglês.",
      "Errado. Não se usa o verbo 'is' junto com 'can'."
    ]},
  { id:"can-p3", category:"can", prompt:"Asking about the team's reporting tools during a meeting, Ana asks: '___ they use Power BI for reports?'", options:["Does","Can","Is","Do"], correct:1,
    explanations:[
      "Errado. Para perguntar sobre habilidade/possibilidade usamos o modal 'can'.",
      "Correto! 'Can' vai no início da pergunta: Can they use Power BI...?",
      "Errado. 'Is' é do verbo 'to be'.",
      "Errado. 'Do' não é usado junto com o modal 'can' na mesma pergunta."
    ]},
  { id:"can-p4", category:"can", prompt:"Explaining the limits of a free software plan, Ana says: 'This free plan ___ store large files, but the premium plan can.'", options:["can","can't","cans","not can"], correct:1,
    explanations:[
      "Errado. O plano gratuito NÃO consegue armazenar arquivos grandes, então a forma afirmativa está errada.",
      "Correto! 'can't' indica que o plano gratuito não tem essa capacidade.",
      "Errado. Verbos modais nunca recebem 's'.",
      "Errado. A ordem correta é 'can not / can't', não 'not can'."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica */
function getPracticeForCategory(categoryKey) {
  return PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
