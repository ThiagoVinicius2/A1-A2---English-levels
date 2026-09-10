/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado no diagnóstico feito a partir de uma conversa simulando
   uma situação real de trabalho (entrevista/reunião em inglês).
   7 padrões de erro identificados, cada um vira uma categoria de
   prática própria — independente do teste A1-A2 original.
   ============================================================ */

const CONV_CATEGORIES = {
  gerundprep:    { label: "Gerúndio depois de preposição",          tag: "Padrão 1" },
  needto:        { label: "Need / Ask + to",                        tag: "Padrão 2" },
  fixedpreps:    { label: "Wait for / Go to / Arrive at",           tag: "Padrão 3" },
  subjectverb:   { label: "Concordância verbal (3ª pessoa)",        tag: "Padrão 4" },
  allevery:      { label: "All vs. Every",                          tag: "Padrão 5" },
  wordorder:     { label: "Ordem das palavras (a lot / to + verbo)", tag: "Padrão 6" },
  vocabspelling: { label: "Vocabulário e Grafia",                   tag: "Padrão 7" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: Gerúndio depois de preposição ----
  { id:"c-gp-t1", category:"gerundprep", prompt:"Ana avoids ___ formulas without testing them first.", options:["use","to use","using","used"], correct:2,
    explanations:[
      "Errado. Depois de 'avoid', o verbo precisa terminar em '-ing'.",
      "Errado. 'avoid' nunca é seguido de 'to + verbo'.",
      "Correto! 'avoid' sempre pede o verbo no gerúndio: avoid using.",
      "Errado. 'used' é passado; aqui precisamos do gerúndio."
    ]},
  { id:"c-gp-t2", category:"gerundprep", prompt:"Before ___ the new dashboard, Ana always checks the data source.", options:["start","to start","starting","started"], correct:2,
    explanations:[
      "Errado. Depois de preposição (before, after, without...), o verbo vai para '-ing'.",
      "Errado. Depois de preposição não usamos 'to + verbo'.",
      "Correto! 'before' é uma preposição aqui, então o verbo fica no gerúndio: before starting.",
      "Errado. 'started' é passado; a preposição pede o gerúndio, não o passado."
    ]},
  { id:"c-gp-t3", category:"gerundprep", prompt:"Ana finished ___ the report an hour before the deadline.", options:["write","to write","writing","wrote"], correct:2,
    explanations:[
      "Errado. Depois de 'finish', o verbo vai para '-ing'.",
      "Errado. 'finish' nunca é seguido de 'to + verbo'.",
      "Correto! 'finish' sempre pede o gerúndio: finish writing.",
      "Errado. 'wrote' é passado; depois de 'finish' usamos o gerúndio."
    ]},
  { id:"c-gp-t4", category:"gerundprep", prompt:"The manager talked about ___ the process for the whole team.", options:["change","to change","changing","changes"], correct:2,
    explanations:[
      "Errado. Depois da preposição 'about', o verbo vai para '-ing'.",
      "Errado. Depois de preposição não usamos 'to + verbo'.",
      "Correto! 'about' é preposição, então usamos o gerúndio: about changing.",
      "Errado. 'changes' não é a forma correta depois de uma preposição."
    ]},

  // ---- Padrão 2: Need / Ask + to ----
  { id:"c-need-t1", category:"needto", prompt:"Marcos ___ finish the dashboard before the client call.", options:["need","needs","need to","needs to"], correct:3,
    explanations:[
      "Errado. Falta o 's' da 3ª pessoa e o 'to' antes do verbo.",
      "Errado. 'needs' sozinho precisa do 'to' antes do próximo verbo.",
      "Errado. Com 'Marcos' (3ª pessoa), o certo é 'needs', não 'need'.",
      "Correto! 'need' sempre pede 'to + verbo', e com 'Marcos' (he) usamos 'needs to'."
    ]},
  { id:"c-need-t2", category:"needto", prompt:"I ___ talk to the data engineer about this bug.", options:["need","needs","need to","needs to"], correct:2,
    explanations:[
      "Errado. Falta o 'to' antes do verbo 'talk'.",
      "Errado. 'needs' é usado apenas com he/she/it, não com 'I'.",
      "Correto! Com 'I' usamos 'need to' antes do verbo: need to talk.",
      "Errado. 'needs to' é usado com he/she/it, não com 'I'."
    ]},
  { id:"c-need-t3", category:"needto", prompt:"Can you ___ him to send the updated file?", options:["ask","ask to","ask for","asking"], correct:0,
    explanations:[
      "Correto! Quando pedimos para uma pessoa fazer algo, usamos 'ask + pessoa + to + verbo', sem preposição antes da pessoa: ask him to send.",
      "Errado. Não usamos 'to' logo depois de 'ask' quando o próximo elemento é uma pessoa.",
      "Errado. 'ask for' é usado para pedir uma coisa (ask for help), não antes de uma pessoa + verbo.",
      "Errado. Depois de 'can you', o verbo principal fica na forma base, não em '-ing'."
    ]},
  { id:"c-need-t4", category:"needto", prompt:"Ana ___ for a raise during the performance review.", options:["asked","asked for","asked to","ask for"], correct:1,
    explanations:[
      "Errado. Quando pedimos por uma coisa (um aumento), precisamos da preposição 'for': asked for a raise.",
      "Correto! 'ask for something' é a estrutura usada para pedir uma coisa: asked for a raise.",
      "Errado. 'asked to' é usado antes de um verbo (asked to leave), não antes de um substantivo como 'a raise'.",
      "Errado. Falta o 'ed' do passado; a frase já indica que isso aconteceu durante a review."
    ]},

  // ---- Padrão 3: Wait for / Go to / Arrive at ----
  { id:"c-fprep-t1", category:"fixedpreps", prompt:"Ana is waiting ___ the recruiter to call her back.", options:["for","to","at","of"], correct:0,
    explanations:[
      "Correto! 'wait' sempre vem acompanhado de 'for': wait for someone.",
      "Errado. 'wait' nunca é seguido diretamente de 'to'.",
      "Errado. 'at' não é usado com 'wait' neste sentido.",
      "Errado. 'of' não é usado com 'wait'."
    ]},
  { id:"c-fprep-t2", category:"fixedpreps", prompt:"She goes ___ the office every day by train.", options:["to","at","in","for"], correct:0,
    explanations:[
      "Correto! Movimento em direção a um lugar usa 'to': go to the office.",
      "Errado. 'at' indica posição em um lugar, não movimento até ele.",
      "Errado. 'in' indica estar dentro de um espaço, não indica movimento até lá.",
      "Errado. 'for' não é usado para indicar destino de um movimento."
    ]},
  { id:"c-fprep-t3", category:"fixedpreps", prompt:"The team usually arrives ___ the office before 9 am.", options:["to","in","at","for"], correct:2,
    explanations:[
      "Errado. 'arrive' não usa 'to' diretamente antes de um lugar (exceto em 'arrive home').",
      "Errado. 'in' é usado com 'arrive' apenas para cidades/países grandes (arrive in London).",
      "Correto! 'arrive at' é usado para lugares específicos, como um prédio ou endereço: arrive at the office.",
      "Errado. 'for' não indica chegada a um lugar."
    ]},
  { id:"c-fprep-t4", category:"fixedpreps", prompt:"Ana is looking ___ a new job in data analysis.", options:["for","at","to","of"], correct:0,
    explanations:[
      "Correto! 'look for' significa 'procurar': looking for a new job.",
      "Errado. 'look at' significa 'olhar para', não 'procurar'.",
      "Errado. 'look to' não é usado com este sentido de procurar algo.",
      "Errado. 'of' não é usado com 'look' neste sentido."
    ]},

  // ---- Padrão 4: Concordância verbal (3ª pessoa) ----
  { id:"c-sv-t1", category:"subjectverb", prompt:"The dashboard ___ the sales numbers for each region.", options:["show","shows","showing","is show"], correct:1,
    explanations:[
      "Errado. 'dashboard' é 3ª pessoa do singular (it); falta o 's' no verbo.",
      "Correto! Com he/she/it, o Present Simple recebe 's': the dashboard shows.",
      "Errado. 'showing' precisa do verbo 'be' antes (is showing) para formar o Present Continuous.",
      "Errado. Não se usa 'is' junto com a forma '-s' do verbo; são duas estruturas diferentes."
    ]},
  { id:"c-sv-t2", category:"subjectverb", prompt:"Every employee must ___ their own password.", options:["choice","choose","choosing","chooses"], correct:1,
    explanations:[
      "Errado. 'choice' é substantivo ('escolha'); aqui precisamos do verbo 'choose'.",
      "Correto! Depois de um verbo modal como 'must', o verbo principal fica na forma base: must choose.",
      "Errado. Depois de 'must', não usamos '-ing'.",
      "Errado. Depois de 'must', o verbo nunca recebe 's', mesmo com sujeito singular."
    ]},
  { id:"c-sv-t3", category:"subjectverb", prompt:"___ the results of last month's campaign.", options:["It's shows","It shows","It are show","Its show"], correct:1,
    explanations:[
      "Errado. 'It's' já é 'it is'; não se junta 'is' com um verbo no '-s' (it's shows misturaria duas estruturas). Esse foi um erro real do seu diagnóstico.",
      "Correto! No Present Simple, 'it' pede o verbo com 's', sem o auxiliar 'is' junto: it shows.",
      "Errado. 'It' é singular; não combina com 'are'.",
      "Errado. 'Its' é possessivo ('seu/dela'), não é o pronome sujeito 'It's'/'It'."
    ]},
  { id:"c-sv-t4", category:"subjectverb", prompt:"Every manager must rate ___ at the end of the quarter.", options:["his employee","their employee","his employees","their employees"], correct:3,
    explanations:[
      "Errado. 'employee' está no singular, mas um manager avalia vários funcionários (employees), no plural.",
      "Errado. Falta o plural em 'employee', e 'their' sozinho com singular fica incompleto aqui.",
      "Errado. 'his' assume que o manager é homem; em inglês moderno, quando o gênero não é especificado, usa-se 'their'.",
      "Correto! 'their employees' usa o plural correto (employees) e o possessivo neutro 'their', que não assume o gênero da pessoa."
    ]},

  // ---- Padrão 5: All vs. Every ----
  { id:"c-ae-t1", category:"allevery", prompt:"All ___ must complete the training by Friday.", options:["employee","employees","employe","employeess"], correct:1,
    explanations:[
      "Errado. 'all' sempre vem seguido de um substantivo no plural.",
      "Correto! 'All' + plural: all employees.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-ae-t2", category:"allevery", prompt:"Every ___ wants a clear dashboard.", options:["employee","employees","employe","employees'"], correct:0,
    explanations:[
      "Correto! 'every' sempre vem seguido de um substantivo no singular: every employee.",
      "Errado. 'every' nunca vem seguido de substantivo no plural.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa forma indica posse (dos funcionários), não é o que a frase pede aqui."
    ]},
  { id:"c-ae-t3", category:"allevery", prompt:"All ___ need access to the shared folder.", options:["analyst","analysts","analysist","analysts'"], correct:1,
    explanations:[
      "Errado. 'all' pede um substantivo no plural.",
      "Correto! 'All' + plural: all analysts.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa forma indica posse, não é o que a frase pede aqui."
    ]},
  { id:"c-ae-t4", category:"allevery", prompt:"Every report ___ reviewed before it goes to the client.", options:["is","are","were","be"], correct:0,
    explanations:[
      "Correto! 'every' torna o sujeito singular, então o verbo 'to be' fica em 'is': every report is.",
      "Errado. 'are' é para sujeitos no plural; 'every + substantivo' é sempre singular.",
      "Errado. 'were' é passado e plural; a frase está no presente e é singular.",
      "Errado. 'be' é a forma base, não a forma conjugada que a frase precisa."
    ]},

  // ---- Padrão 6: Ordem das palavras ----
  { id:"c-wo-t1", category:"wordorder", prompt:"Which sentence is correct?", options:["I used a lot SQL.","I used SQL a lot.","I a lot used SQL.","I used lot SQL."], correct:1,
    explanations:[
      "Errado. 'a lot' vem depois do objeto, não antes dele.",
      "Correto! Em inglês, 'a lot' vem depois do objeto da frase: I used SQL a lot.",
      "Errado. 'a lot' nunca fica entre o sujeito e o verbo.",
      "Errado. Falta o artigo 'a' antes de 'lot', e a ordem também está errada."
    ]},
  { id:"c-wo-t2", category:"wordorder", prompt:"I use AI ___ help me write emails.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. Para expressar finalidade ('para fazer algo'), usamos 'to + verbo', não 'for + verbo'.",
      "Correto! Finalidade em inglês se expressa com 'to + verbo': to help me.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'in order for' precisa de uma estrutura diferente (in order for someone to do something), não se encaixa aqui."
    ]},
  { id:"c-wo-t3", category:"wordorder", prompt:"Which sentence is correct?", options:["I need each day more learn.","I need to learn more every day.","I need learn more each day.","Every day I more need to learn."], correct:1,
    explanations:[
      "Errado. A ordem das palavras está incorreta, e falta o 'to' antes de 'learn'.",
      "Correto! 'need to + verbo' no início, e o advérbio de frequência ('every day') fica no final: I need to learn more every day.",
      "Errado. Falta o 'to' entre 'need' e 'learn'.",
      "Errado. 'more' está na posição errada; o correto é 'need to learn more'."
    ]},
  { id:"c-wo-t4", category:"wordorder", prompt:"She uses Python ___ automate reports.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. Finalidade não usa 'for + verbo'.",
      "Correto! 'to + verbo' expressa finalidade: to automate reports.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. Não se encaixa nesta estrutura sem um sujeito depois de 'for'."
    ]},

  // ---- Padrão 7: Vocabulário e Grafia ----
  { id:"c-vs-t1", category:"vocabspelling", prompt:"Which is the correct way to write 'Inteligência Artificial' in English?", options:["IA","AI","Enteligence","Artifical"], correct:1,
    explanations:[
      "Errado. 'IA' é a ordem em português; em inglês, a ordem das letras inverte: AI.",
      "Correto! 'AI' (Artificial Intelligence) é a forma correta em inglês — a ordem inverte em relação ao português.",
      "Errado. A grafia correta é 'intelligence', com dois 'l'.",
      "Errado. A grafia correta é 'artificial', com dois 'i'."
    ]},
  { id:"c-vs-t2", category:"vocabspelling", prompt:"I want to ___ Python this year.", options:["lear","learn","learnt","learns"], correct:1,
    explanations:[
      "Errado. Falta o 'n' final; a grafia correta é 'learn'.",
      "Correto! 'learn' é a grafia correta do verbo, e depois de 'want to' o verbo fica na forma base.",
      "Errado. 'learnt' é uma forma de passado (British English), não se encaixa depois de 'want to'.",
      "Errado. Depois de 'want to', o verbo fica na forma base, sem 's'."
    ]},
  { id:"c-vs-t3", category:"vocabspelling", prompt:"The data goes ___ several validation steps before publishing.", options:["throug","through","throught","tru"], correct:1,
    explanations:[
      "Errado. Falta o 'h' final; a grafia correta é 'through'.",
      "Correto! 'through' é a grafia correta ('através de').",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. 'tru' é uma abreviação informal, não a forma correta para escrita profissional."
    ]},
  { id:"c-vs-t4", category:"vocabspelling", prompt:"Comparing the two branches' results is called a ___ comparison.", options:["finance","financial","financially","finances"], correct:1,
    explanations:[
      "Errado. 'finance' é substantivo ('finanças'); antes de 'comparison' precisamos de um adjetivo.",
      "Correto! 'financial' é o adjetivo correto para descrever 'comparison': financial comparison.",
      "Errado. 'financially' é advérbio, usado com verbos, não para descrever um substantivo diretamente.",
      "Errado. 'finances' é o plural do substantivo, ainda não é o adjetivo que a frase precisa."
    ]},
];

/* ================= EXERCÍCIOS DE REFORÇO: CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1 ----
  { id:"c-gp-p1", category:"gerundprep", prompt:"Ana really enjoys ___ new data visualization tools.", options:["learn","to learn","learning","learns"], correct:2,
    explanations:[
      "Errado. Depois de 'enjoy', o verbo vai para '-ing'.",
      "Errado. 'enjoy' nunca é seguido de 'to + verbo'.",
      "Correto! 'enjoy' sempre pede o gerúndio: enjoy learning.",
      "Errado. 'learns' não é a forma correta depois de 'enjoy'."
    ]},
  { id:"c-gp-p2", category:"gerundprep", prompt:"After ___ the presentation, Ana answered questions from the client.", options:["finish","to finish","finishing","finished"], correct:2,
    explanations:[
      "Errado. Depois de preposição ('after'), o verbo vai para '-ing'.",
      "Errado. Depois de preposição não usamos 'to + verbo'.",
      "Correto! 'after' é preposição aqui, então usamos o gerúndio: after finishing.",
      "Errado. 'finished' é passado; a preposição pede o gerúndio."
    ]},
  { id:"c-gp-p3", category:"gerundprep", prompt:"Without ___ the numbers twice, Ana wouldn't have found the error.", options:["check","to check","checking","checked"], correct:2,
    explanations:[
      "Errado. Depois de 'without', o verbo vai para '-ing'.",
      "Errado. Depois de preposição não usamos 'to + verbo'.",
      "Correto! 'without' é preposição, então usamos o gerúndio: without checking.",
      "Errado. 'checked' é passado; a preposição pede o gerúndio."
    ]},
  { id:"c-gp-p4", category:"gerundprep", prompt:"Ana is good ___ with large spreadsheets.", options:["work","to work","working","works"], correct:2,
    explanations:[
      "Errado. Depois da preposição 'at' (good at), o verbo vai para '-ing'.",
      "Errado. 'good at' não é seguido de 'to + verbo'.",
      "Correto! 'good at' + gerúndio: good at working.",
      "Errado. 'works' não é a forma correta depois de uma preposição."
    ]},

  // ---- Padrão 2 ----
  { id:"c-need-p1", category:"needto", prompt:"She ___ to review the query before we run it in production.", options:["need","needs","need to","needs to"], correct:3,
    explanations:[
      "Errado. Com 'she' (3ª pessoa), o certo é 'needs', e ainda falta o 'to'.",
      "Errado. Falta o 'to' antes do próximo verbo.",
      "Errado. Com 'she', usamos 'needs', não 'need'.",
      "Correto! Com he/she/it usamos 'needs to + verbo': needs to review."
    ]},
  { id:"c-need-p2", category:"needto", prompt:"They ___ update the client every Friday.", options:["need","needs","need to","needs to"], correct:2,
    explanations:[
      "Errado. Falta o 'to' antes do verbo 'update'.",
      "Errado. 'needs' é usado apenas com he/she/it, não com 'they'.",
      "Correto! Com 'they' usamos 'need to': need to update.",
      "Errado. 'needs to' é usado com he/she/it, não com 'they'."
    ]},
  { id:"c-need-p3", category:"needto", prompt:"I'll ___ my colleague to double-check the numbers.", options:["ask","ask to","ask for","asking"], correct:0,
    explanations:[
      "Correto! Pedir para uma pessoa fazer algo: ask + pessoa + to + verbo, sem preposição antes da pessoa.",
      "Errado. Não se usa 'to' logo depois de 'ask' quando vem uma pessoa em seguida.",
      "Errado. 'ask for' é para pedir uma coisa, não antes de pessoa + verbo.",
      "Errado. Depois de 'I'll' (will), o verbo principal fica na forma base."
    ]},
  { id:"c-need-p4", category:"needto", prompt:"He ___ for more time to finish the analysis.", options:["ask","asked","asked for","ask for"], correct:2,
    explanations:[
      "Errado. Falta o 'ed' do passado e a preposição correta.",
      "Errado. Falta a preposição 'for'; pedir por uma coisa (mais tempo) precisa de 'ask for'.",
      "Correto! 'asked for' — passado de 'ask for something': asked for more time.",
      "Errado. Falta o 'ed' do passado; a frase indica uma ação já concluída."
    ]},

  // ---- Padrão 3 ----
  { id:"c-fprep-p1", category:"fixedpreps", prompt:"Can you wait ___ me? I'm almost done with this query.", options:["for","to","at","of"], correct:0,
    explanations:[
      "Correto! 'wait for someone' é a estrutura fixa: wait for me.",
      "Errado. 'wait' nunca é seguido diretamente de 'to'.",
      "Errado. 'at' não é usado com 'wait' neste sentido.",
      "Errado. 'of' não é usado com 'wait'."
    ]},
  { id:"c-fprep-p2", category:"fixedpreps", prompt:"We need to go ___ the meeting room on the third floor.", options:["at","to","in","for"], correct:1,
    explanations:[
      "Errado. 'at' indica posição, não movimento até um lugar.",
      "Correto! Movimento em direção a um lugar usa 'to': go to the meeting room.",
      "Errado. 'in' indica estar dentro de um espaço, não movimento até ele.",
      "Errado. 'for' não indica destino de um movimento."
    ]},
  { id:"c-fprep-p3", category:"fixedpreps", prompt:"The plane arrives ___ the airport at 6 pm.", options:["to","in","at","for"], correct:2,
    explanations:[
      "Errado. 'arrive' não usa 'to' diretamente antes de um lugar.",
      "Errado. 'in' é usado com 'arrive' para cidades/países (arrive in Brazil), não para um local específico como o aeroporto.",
      "Correto! 'arrive at' é usado para lugares específicos: arrive at the airport.",
      "Errado. 'for' não indica chegada a um lugar."
    ]},
  { id:"c-fprep-p4", category:"fixedpreps", prompt:"Ana is looking ___ her notes before the interview.", options:["for","at","to","of"], correct:0,
    explanations:[
      "Correto! 'look for' significa 'procurar': looking for her notes.",
      "Errado. 'look at' significa 'olhar para', diferente de 'procurar'.",
      "Errado. 'look to' não é usado com este sentido.",
      "Errado. 'of' não é usado com 'look' neste sentido."
    ]},

  // ---- Padrão 4 ----
  { id:"c-sv-p1", category:"subjectverb", prompt:"The report ___ every transaction from the last quarter.", options:["include","includes","including","included"], correct:1,
    explanations:[
      "Errado. 'report' é 3ª pessoa do singular; falta o 's' no verbo.",
      "Correto! Com he/she/it, o Present Simple recebe 's': the report includes.",
      "Errado. 'including' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'included' é passado; a frase descreve uma característica atual do relatório."
    ]},
  { id:"c-sv-p2", category:"subjectverb", prompt:"Every analyst must ___ the numbers before submitting the report.", options:["double-checks","double-checking","double-check","double-checked"], correct:2,
    explanations:[
      "Errado. Depois de 'must', o verbo nunca recebe 's'.",
      "Errado. Depois de 'must', não usamos '-ing'.",
      "Correto! Depois de um verbo modal como 'must', o verbo principal fica na forma base: must double-check.",
      "Errado. Depois de 'must', o verbo nunca vai para o passado."
    ]},
  { id:"c-sv-p3", category:"subjectverb", prompt:"___ how many users clicked the button.", options:["It's show","It shows","It show","Its shows"], correct:1,
    explanations:[
      "Errado. 'It's' já significa 'it is'; não se junta com a forma base do verbo sem '-ing'.",
      "Correto! No Present Simple, 'it' pede o verbo com 's', sem o auxiliar 'is': it shows.",
      "Errado. Falta o 's' do Present Simple na 3ª pessoa.",
      "Errado. 'Its' é possessivo, não é o pronome sujeito que a frase precisa aqui."
    ]},
  { id:"c-sv-p4", category:"subjectverb", prompt:"Every analyst must send ___ report by Friday.", options:["his","their","its","my"], correct:1,
    explanations:[
      "Errado. 'his' assume que o analista é homem; quando o gênero não é especificado, o inglês moderno usa 'their'.",
      "Correto! 'their' é o possessivo neutro usado para se referir a uma pessoa sem especificar o gênero.",
      "Errado. 'its' é usado para objetos e animais, não para pessoas.",
      "Errado. 'my' se refere a quem fala, não a 'every analyst'."
    ]},

  // ---- Padrão 5 ----
  { id:"c-ae-p1", category:"allevery", prompt:"All ___ are stored in the cloud.", options:["file","files","filies","fileses"], correct:1,
    explanations:[
      "Errado. 'all' sempre vem seguido de um substantivo no plural.",
      "Correto! 'All' + plural: all files.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa grafia não existe em inglês."
    ]},
  { id:"c-ae-p2", category:"allevery", prompt:"Every ___ has a different login.", options:["user","users","usser","user's"], correct:0,
    explanations:[
      "Correto! 'every' sempre vem seguido de substantivo no singular: every user.",
      "Errado. 'every' nunca vem seguido de plural.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa forma indica posse, não é o que a frase pede."
    ]},
  { id:"c-ae-p3", category:"allevery", prompt:"All ___ were updated this morning.", options:["dashboard","dashboards","dashbords","dashboard's"], correct:1,
    explanations:[
      "Errado. 'all' pede um substantivo no plural.",
      "Correto! 'All' + plural: all dashboards.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Essa forma indica posse, não é o que a frase pede."
    ]},
  { id:"c-ae-p4", category:"allevery", prompt:"Every meeting ___ at 9 am sharp.", options:["start","starts","starting","started"], correct:1,
    explanations:[
      "Errado. Com 'every meeting' (singular), o verbo precisa do 's'.",
      "Correto! 'every' torna o sujeito singular, então o verbo recebe 's': every meeting starts.",
      "Errado. 'starting' precisa do verbo 'be' antes para formar o Continuous.",
      "Errado. 'started' é passado; a frase descreve um hábito no presente."
    ]},

  // ---- Padrão 6 ----
  { id:"c-wo-p1", category:"wordorder", prompt:"Which sentence is correct?", options:["I work a lot with dashboards.","I a lot work with dashboards.","I work with a lot dashboards.","A lot I work with dashboards."], correct:0,
    explanations:[
      "Correto! 'a lot' vem depois do verbo/objeto principal da frase: I work a lot with dashboards.",
      "Errado. 'a lot' nunca fica entre o sujeito e o verbo.",
      "Errado. 'a lot' não vem entre uma preposição e o substantivo desse jeito.",
      "Errado. 'a lot' nunca inicia a frase com esse sentido."
    ]},
  { id:"c-wo-p2", category:"wordorder", prompt:"Ana studies English ___ improve her chances of getting a job abroad.", options:["for","to","for to","in order for"], correct:1,
    explanations:[
      "Errado. Finalidade não se expressa com 'for + verbo'.",
      "Correto! 'to + verbo' expressa finalidade: to improve her chances.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. Não se encaixa nesta estrutura sem um sujeito depois de 'for'."
    ]},
  { id:"c-wo-p3", category:"wordorder", prompt:"Which sentence is correct?", options:["I use a lot Excel.","I use Excel a lot.","I a lot use Excel.","I use lot of Excel."], correct:1,
    explanations:[
      "Errado. 'a lot' vem depois do objeto, não antes dele.",
      "Correto! 'a lot' vem depois do objeto da frase: I use Excel a lot.",
      "Errado. 'a lot' nunca fica entre o sujeito e o verbo.",
      "Errado. Falta o artigo 'a' antes de 'lot', e a ordem também está errada."
    ]},
  { id:"c-wo-p4", category:"wordorder", prompt:"The team meets every Monday ___ discuss weekly goals.", options:["for","to","for to","at"], correct:1,
    explanations:[
      "Errado. Finalidade não se expressa com 'for + verbo'.",
      "Correto! 'to + verbo' expressa finalidade: to discuss.",
      "Errado. Essa combinação não existe em inglês.",
      "Errado. 'at' não é usado para expressar finalidade."
    ]},

  // ---- Padrão 7 ----
  { id:"c-vs-p1", category:"vocabspelling", prompt:"This dashboard is ___ — it takes a little time to learn, but it's not too hard.", options:["mid level to maintain","moderately complex","mid complex","middle level"], correct:1,
    explanations:[
      "Errado. Essa expressão soa artificial em inglês; não é assim que se descreve dificuldade.",
      "Correto! 'moderately complex' é a forma natural de dizer 'nível médio de complexidade' em inglês.",
      "Errado. 'mid complex' não é uma expressão natural em inglês.",
      "Errado. 'middle level' descreve hierarquia (cargo), não dificuldade de uma ferramenta."
    ]},
  { id:"c-vs-p2", category:"vocabspelling", prompt:"I use ___ a lot to help me write reports faster.", options:["IA","AI","Enteligence","Artifical Inteligence"], correct:1,
    explanations:[
      "Errado. 'IA' é a ordem em português; em inglês a sigla é 'AI'.",
      "Correto! 'AI' (Artificial Intelligence) é a forma correta em inglês.",
      "Errado. A grafia correta é 'intelligence'.",
      "Errado. A grafia correta é 'Artificial Intelligence', com 'i' duplicado e 'll'."
    ]},
  { id:"c-vs-p3", category:"vocabspelling", prompt:"She wants to ___ new skills every month.", options:["lear","learn","lerning","learns"], correct:1,
    explanations:[
      "Errado. Falta o 'n' final; a grafia correta é 'learn'.",
      "Correto! 'learn' é a grafia correta, e depois de 'want to' o verbo fica na forma base.",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. Depois de 'want to', o verbo fica na forma base, sem 's'."
    ]},
  { id:"c-vs-p4", category:"vocabspelling", prompt:"Data ___ this pipeline gets cleaned automatically.", options:["throug","through","truogh","tru"], correct:1,
    explanations:[
      "Errado. Falta o 'h' final; a grafia correta é 'through'.",
      "Correto! 'through' é a grafia correta ('através de').",
      "Errado. Essa grafia não existe em inglês.",
      "Errado. 'tru' é uma abreviação informal, não adequada aqui."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
