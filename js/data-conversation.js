/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado na 7ª rodada: os erros que mais se repetiram nas TRÊS
   últimas conversas, não numa aula só. Por isso o banco é de
   padrões recorrentes, e não de palavras soltas que travaram.

   Consolidados nas rodadas anteriores e, por isso, fora deste banco:
   - artigo "a / an" com contável, preposições de lugar
   - listen TO, am/is/are + verbo-ing, "audio" incontável
   - as for / talking about, for now / so far, maiúsculas
   - vocabulário que travou na fala (party, attend, useful, deaf...)

   Os cinco padrões abaixo seguem os cinco exercícios montados a
   partir das conversas. O -s de terceira pessoa abre o banco e
   ganha mais questões: é o erro que apareceu nas três conversas.
   ============================================================ */

/* `gap: true` marca os padrões em que o enunciado é uma frase com lacuna
   (`___`) e as opções preenchem o buraco. Os outros três padrões têm outra
   forma — escolher a frase correta, traduzir, escrever certo — e por isso o
   enunciado não tem lacuna nenhuma. A marca existe para o validador cobrar a
   lacuna só de quem precisa dela, em vez de distorcer os exercícios para
   caberem num formato só. */
const CONV_CATEGORIES = {
  thirds:  { label: "Third person -s: he, she, it and the team",        tag: "Pattern 1", gap: true },
  preps:   { label: "Time prepositions: on, in, at, by, until",         tag: "Pattern 2", gap: true },
  fixit:   { label: "Fix the sentence: the slips that came back",       tag: "Pattern 3" },
  saying:  { label: "Say it in English: routine, plans and deadlines",  tag: "Pattern 4" },
  spell:   { label: "Spelling: the words you keep mistyping",           tag: "Pattern 5" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Pattern 1: terceira pessoa (-s) ----
  { id:"c-3s-t1", category:"thirds", prompt:"My team always ___ at home. (win)",
    options:["wins","win","winning","winned"], correct:0,
    explanations:[
      "Correto! My team always wins at home. 'My team' é ele/ela (it), e no presente simples a terceira pessoa leva -s. Foi o erro que voltou nas três conversas: o -s some justamente quando você fala do time.",
      "Errado. 'win' sem -s serve para I, you, we, they — não para 'my team'.",
      "Errado. '-ing' sozinho não é verbo: precisaria de 'is winning', e aí seria agora, não um hábito.",
      "Errado. 'winned' não existe; o passado de 'win' é 'won'. E aqui o tempo é presente."
    ]},
  { id:"c-3s-t2", category:"thirds", prompt:"She ___ up on my health twice a year. (follow)",
    options:["followes","is follow","follow","follows"], correct:3,
    explanations:[
      "Errado. O -es é para verbos em -s, -sh, -ch, -x e -o (watches, goes). 'follow' leva só -s.",
      "Errado. 'is follow' não existe. Ou 'follows' (hábito), ou 'is following' (agora).",
      "Errado. Com 'she' o verbo precisa do -s.",
      "Correto! She follows up on my health twice a year. Verbo terminado em -ow só ganha -s: follows."
    ]},
  { id:"c-3s-t3", category:"thirds", prompt:"The season ___ next month. (start)",
    options:["startes","start","starting","starts"], correct:3,
    explanations:[
      "Errado. 'start' termina em -t, então leva só -s: starts.",
      "Errado. 'The season' é it, e it pede -s.",
      "Errado. Falta o verbo to be, e mesmo com ele a ideia seria outra.",
      "Correto! The season starts next month. Repare: o presente simples também serve para agenda futura — calendário, horário, temporada."
    ]},
  { id:"c-3s-t4", category:"thirds", prompt:"My coach ___ me practice every week. (help)",
    options:["help","helpes","helping","helps"], correct:3,
    explanations:[
      "Errado. 'My coach' é ele/ela: o verbo leva -s.",
      "Errado. 'help' não é um dos casos de -es; é só helps.",
      "Errado. Sem to be, o -ing não forma verbo.",
      "Correto! My coach helps me practice every week. E note 'helps me practice', sem 'to' — depois de help o infinitivo vem pelado."
    ]},
  { id:"c-3s-t5", category:"thirds", prompt:"My wife ___ until 6 pm. (work)",
    options:["works","work","workes","is work"], correct:0,
    explanations:[
      "Correto! My wife works until 6 pm. Foi a sua frase na conversa, e ali o -s tinha sumido.",
      "Errado. 'my wife' é she: precisa do -s.",
      "Errado. Verbo em -k leva só -s: works.",
      "Errado. 'is work' não existe como verbo."
    ]},
  { id:"c-3s-t6", category:"thirds", prompt:"Coritiba ___ against Athletico next Sunday. (play)",
    options:["play","playes","plays","plaies"], correct:2,
    explanations:[
      "Errado. Nome de time é singular em inglês americano: pede -s.",
      "Errado. Não existe 'playes'.",
      "Correto! Coritiba plays against Athletico next Sunday. Verbo terminado em vogal + y só ganha -s: plays. O -ies é para consoante + y (study → studies).",
      "Errado. 'plaies' seria a regra do -ies, que aqui não vale: antes do y tem uma vogal."
    ]},
  { id:"c-3s-t7", category:"thirds", prompt:"My daughter ___ cartoons every morning. (watch)",
    options:["watch","watchies","watchs","watches"], correct:3,
    explanations:[
      "Errado. 'my daughter' é she: o verbo precisa da terminação.",
      "Errado. O -ies é só para consoante + y.",
      "Errado. Verbo terminado em -ch não aceita só -s: fica impronunciável.",
      "Correto! My daughter watches cartoons every morning. Terminou em -s, -sh, -ch, -x ou -o? Entra -es: watches, washes, goes."
    ]},
  { id:"c-3s-t8", category:"thirds", prompt:"My friends ___ soccer on Sundays. (play)",
    options:["playing","is playing","plays","play"], correct:3,
    explanations:[
      "Errado. Sem to be, o -ing não forma verbo.",
      "Errado. 'friends' é plural: seria 'are playing' — e aí a ideia seria agora, não um hábito.",
      "Errado. Esta é a armadilha do padrão: com o plural, o -s NÃO entra. 'My friends' é they.",
      "Correto! My friends play soccer on Sundays. O -s é só de he, she e it — colocá-lo no plural é o outro lado do mesmo erro."
    ]},

  // ---- Pattern 2: preposições de tempo ----
  { id:"c-pr-t1", category:"preps", prompt:"I work ___ 7 pm every weekday.",
    options:["until","by","in","on"], correct:0,
    explanations:[
      "Correto! I work until 7 pm. 'until' é a ação que continua até aquele ponto — você trabalha o tempo todo até as 7.",
      "Errado. 'by' é prazo: alguma coisa acontece antes daquele momento, não durante.",
      "Errado. 'in' com hora não existe; é 'at 7 pm'.",
      "Errado. 'on' é para dias e datas."
    ]},
  { id:"c-pr-t2", category:"preps", prompt:"I have an appointment ___ October 24th.",
    options:["in","at","on","until"], correct:2,
    explanations:[
      "Errado. 'in' é para mês sem dia (in October), ano e período do dia.",
      "Errado. 'at' é para hora e para alguns pontos fixos (at midday, at night).",
      "Correto! on October 24th. Dia e data levam 'on' — foi um dos escorregões das conversas.",
      "Errado. 'until' marca duração, não a data de um compromisso."
    ]},
  { id:"c-pr-t3", category:"preps", prompt:"As I told you ___ the beginning, I play soccer once a week.",
    options:["on","by","in","at"], correct:3,
    explanations:[
      "Errado. 'on' é para dias e datas.",
      "Errado. 'by the beginning' marcaria prazo, o que não faz sentido aqui.",
      "Errado. 'in the beginning' existe, mas significa 'no começo de tudo', numa narrativa longa. Para o começo da conversa, é 'at'.",
      "Correto! As I told you at the beginning. 'at the beginning' é o ponto de partida de alguma coisa — da conversa, da aula, do filme."
    ]},
  { id:"c-pr-t4", category:"preps", prompt:"I usually watch the games ___ the evening.",
    options:["on","at","until","in"], correct:3,
    explanations:[
      "Errado. 'on' entra quando o período vem colado num dia: on Sunday evening.",
      "Errado. 'at' com período do dia só em 'at night'.",
      "Errado. 'until' marca duração.",
      "Correto! in the evening. Períodos do dia levam 'in': in the morning, in the afternoon, in the evening — a exceção é 'at night'."
    ]},
  { id:"c-pr-t5", category:"preps", prompt:"Please finish the report ___ Friday. (prazo final)",
    options:["in","at","until","by"], correct:3,
    explanations:[
      "Errado. 'in' com dia da semana não vai.",
      "Errado. 'at' é para hora.",
      "Errado. Aqui está o par que mais confunde: 'until Friday' seria continuar escrevendo até sexta.",
      "Correto! finish the report by Friday. 'by' é prazo: até sexta, em algum momento antes dela, tem que estar pronto."
    ]},
  { id:"c-pr-t6", category:"preps", prompt:"The store is open ___ 9 pm tonight.",
    options:["by","on","until","in"], correct:2,
    explanations:[
      "Errado. 'by 9 pm' seria 'antes das 9', e não é isso: a loja fica aberta o tempo todo.",
      "Errado. 'on' é para dias e datas.",
      "Correto! open until 9 pm. A loja continua aberta até aquele horário — é duração, então 'until'.",
      "Errado. Com hora exata a preposição seria 'at', e mesmo assim mudaria o sentido."
    ]},
  { id:"c-pr-t7", category:"preps", prompt:"___ Saturday, I'm going to play soccer.",
    options:["On","In","At","Until"], correct:0,
    explanations:[
      "Correto! On Saturday, I'm going to play soccer. Dia da semana sempre com 'on'.",
      "Errado. 'in' é para mês, ano, estação e período do dia.",
      "Errado. 'at' é para hora.",
      "Errado. 'until Saturday' marcaria duração até sábado."
    ]},
  { id:"c-pr-t8", category:"preps", prompt:"Let's meet ___ midday for lunch.",
    options:["in","on","until","at"], correct:3,
    explanations:[
      "Errado. 'in' não entra com ponto fixo do relógio.",
      "Errado. 'on' é para dia e data.",
      "Errado. 'until midday' seria esperar até o meio-dia, não marcar nele.",
      "Correto! at midday. Hora e ponto fixo do dia levam 'at': at 7 pm, at midday, at midnight, at night."
    ]},

  // ---- Pattern 3: encontre o erro ----
  { id:"c-fx-t1", category:"fixit", prompt:"Qual é a forma correta? (original: \"I have a free time on Sunday.\")",
    options:["I have free time on Sunday.","I have a free time on Sunday.","I have a free times on Sunday.","I have the free time on Sunday."], correct:0,
    explanations:[
      "Correto! I have free time on Sunday. 'free time' é incontável: não leva 'a' nem vira plural.",
      "Errado. Foi exatamente o seu erro na conversa: o 'a' não entra antes de incontável.",
      "Errado. Além do artigo, 'time' nesse sentido não tem plural.",
      "Errado. 'the' faria falar de um tempo livre específico, já combinado — não é o caso."
    ]},
  { id:"c-fx-t2", category:"fixit", prompt:"Qual é a forma correta? (original: \"Other weekdays nothing special.\")",
    options:["Other weekdays nothing special.","On the other weekdays, nothing special happens.","In other weekdays, nothing special.","The other weekdays nothing special happen."], correct:1,
    explanations:[
      "Errado. Falta o verbo: em inglês a frase não se sustenta sem ele.",
      "Correto! On the other weekdays, nothing special happens. Entraram as três peças que faltavam: a preposição 'on', o artigo e o verbo 'happens' (com -s, porque 'nothing' é singular).",
      "Errado. Com dias é 'on', não 'in' — e continua sem verbo.",
      "Errado. 'nothing' é singular: happens, não happen."
    ]},
  { id:"c-fx-t3", category:"fixit", prompt:"Qual é a forma correta? (original: \"I need to do exams twice a year.\")",
    options:["I need to make exams twice a year.","I need to do exams twice a year.","I need to take exams twice a year.","I need to realize exams twice a year."], correct:2,
    explanations:[
      "Errado. 'make' não combina com exame; make é para o que você cria.",
      "Errado. 'do an exam' existe no inglês britânico escolar, mas para exame médico — que era o seu caso — o verbo é 'take'.",
      "Correto! I need to take exams twice a year. Exame, teste e remédio em inglês se 'take': take an exam, take a test, take medicine.",
      "Errado. 'realize' é perceber, dar-se conta — falso amigo de 'realizar'."
    ]},
  { id:"c-fx-t4", category:"fixit", prompt:"Qual é a forma correta? (original: \"As I told in the beginning, I like soccer.\")",
    options:["As I told at the beginning, I like soccer.","As I told you at the beginning, I like soccer.","As I said you in the beginning, I like soccer.","As I told you in the beginning, I like soccer."], correct:1,
    explanations:[
      "Errado. A preposição ficou certa, mas 'tell' sempre pede a quem: tell someone.",
      "Correto! As I told you at the beginning. Dois consertos numa frase só: 'tell' precisa do objeto ('told you') e o começo da conversa é 'at the beginning'.",
      "Errado. É o contrário de 'tell': 'say' não leva objeto direto de pessoa — say something TO someone.",
      "Errado. O 'you' entrou, mas 'in the beginning' é o começo de uma história longa, não o da conversa."
    ]},
  { id:"c-fx-t5", category:"fixit", prompt:"Qual é a forma correta? (original: \"There's some sports with only one player.\")",
    options:["There is some sports with only one player.","There's some sport with only one player.","There are some sports with only one player.","There has some sports with only one player."], correct:2,
    explanations:[
      "Errado. 'There's' é 'there is', e 'sports' é plural.",
      "Errado. Mudar para o singular conserta a concordância, mas muda o que você queria dizer.",
      "Correto! There are some sports with only one player. O verbo concorda com o que vem depois — plural pede 'there are'.",
      "Errado. 'there has' não existe; a estrutura é there is / there are."
    ]},
  { id:"c-fx-t6", category:"fixit", prompt:"Qual é a forma correta? (original: \"It's almost impossible plays soccer alone.\")",
    options:["It's almost impossible to play soccer alone.","It's almost impossible plays soccer alone.","It's almost impossible play soccer alone.","It's almost impossible playing soccer alone."], correct:0,
    explanations:[
      "Correto! It's almost impossible to play soccer alone. Depois de adjetivo o verbo vem no infinitivo com 'to'.",
      "Errado. O -s de terceira pessoa não tem o que fazer aqui: o verbo não tem sujeito próprio.",
      "Errado. Falta o 'to'. Sem ele a frase fica solta.",
      "Errado. O -ing serviria como sujeito ('Playing soccer alone is almost impossible'), mas não depois do adjetivo."
    ]},
  { id:"c-fx-t7", category:"fixit", prompt:"Qual é a forma correta? (original: \"I went a lot of stadiums in Curitiba.\")",
    options:["I went a lot of stadiums in Curitiba.","I went in a lot of stadiums in Curitiba.","I went to a lot of stadiums in Curitiba.","I went at a lot of stadiums in Curitiba."], correct:2,
    explanations:[
      "Errado. 'go' sempre precisa de 'to' antes do destino.",
      "Errado. 'go in' é entrar em alguma coisa, não ir a um lugar.",
      "Correto! I went to a lot of stadiums in Curitiba. O 'to' do destino é o que mais some quando a frase sai rápido.",
      "Errado. 'at' marca onde você está, não para onde vai."
    ]},
  { id:"c-fx-t8", category:"fixit", prompt:"Qual é a forma correta? (original: \"People that play volleyball are hard to find here.\")",
    options:["People which play volleyball are hard to find here.","People who play volleyball are hard to find here.","People what play volleyball are hard to find here.","People who plays volleyball are hard to find here."], correct:1,
    explanations:[
      "Errado. 'which' é para coisa, nunca para pessoa.",
      "Correto! People who play volleyball. Para pessoa o natural é 'who' — 'that' até aparece na fala, mas 'who' é o que soa certo e é o que o seu interlocutor espera.",
      "Errado. 'what' não funciona como pronome relativo em inglês.",
      "Errado. O 'who' está certo, mas o verbo concorda com 'people', que é plural: play, sem -s."
    ]},

  // ---- Pattern 4: diga em inglês ----
  { id:"c-sy-t1", category:"saying", prompt:"Amanhã eu vou trabalhar até as 7 da noite.",
    options:["Tomorrow I'm going to work by 7 pm.","Tomorrow I'm going to work until 7 pm.","Tomorrow I'm going to work at 7 pm.","Tomorrow I go to work until 7 pm."], correct:1,
    explanations:[
      "Errado. 'by 7 pm' seria terminar antes das 7, e não é isso.",
      "Correto! Tomorrow I'm going to work until 7 pm. Plano com 'going to' e duração com 'until'.",
      "Errado. 'at 7 pm' seria a hora em que você começa.",
      "Errado. 'I go to work' é hábito; para amanhã, use o plano: I'm going to work."
    ]},
  { id:"c-sy-t2", category:"saying", prompt:"Na quarta à noite eu vou encontrar meus amigos.",
    options:["In Wednesday night I'm going to meet my friends.","On Wednesday night I'm going to meet my friends.","At Wednesday night I'm going to find my friends.","On Wednesday night I'm going to know my friends."], correct:1,
    explanations:[
      "Errado. Com dia da semana é 'on', mesmo quando vem junto do período.",
      "Correto! On Wednesday night I'm going to meet my friends. O período colado no dia puxa o 'on', e 'meet' é encontrar alguém combinado.",
      "Errado. Duas falhas: 'at' com dia, e 'find' é achar algo perdido.",
      "Errado. 'know' é conhecer de já conhecer; para encontrar com alguém é 'meet'."
    ]},
  { id:"c-sy-t3", category:"saying", prompt:"Eu tenho uma consulta com a médica no dia 24.",
    options:["I have an appointment with the doctor in the 24th.","I have a consultation with the doctor on 24.","I have an appointment with the doctor on the 24th.","I have an appointment with the doctor at the 24th."], correct:2,
    explanations:[
      "Errado. Data leva 'on', não 'in'.",
      "Errado. 'consultation' é consultoria técnica; e a data precisa do artigo: on the 24th.",
      "Correto! I have an appointment with the doctor on the 24th. Consulta médica é 'appointment', e dia do mês é 'on the 24th'.",
      "Errado. 'at' é para hora, não para dia do mês."
    ]},
  { id:"c-sy-t4", category:"saying", prompt:"No fim de semana eu passo bastante tempo com a minha filha.",
    options:["On the weekend I spend a lot of time with my daughter.","In the weekend I pass a lot of time with my daughter.","On the weekend I pass a lot of time with my daughter.","At the weekend I spend a lot of times with my daughter."], correct:0,
    explanations:[
      "Correto! On the weekend I spend a lot of time with my daughter. Tempo se 'spend', nunca 'pass'.",
      "Errado. Dois erros: 'in the weekend' e o falso amigo 'pass'.",
      "Errado. A preposição ficou certa, mas tempo em inglês se gasta: spend time.",
      "Errado. 'at the weekend' é britânico e passa, mas 'times' no plural não: time aqui é incontável."
    ]},
  { id:"c-sy-t5", category:"saying", prompt:"Mês que vem eu vou ter mais tempo livre.",
    options:["Next month I'm going to have more free times.","In next month I'm going to have more free time.","Next month I'm going to have more free time.","Next month I'm going to have more a free time."], correct:2,
    explanations:[
      "Errado. 'free time' é incontável: não tem plural.",
      "Errado. 'next month' já é a hora: não leva preposição nenhuma na frente.",
      "Correto! Next month I'm going to have more free time. Repare que 'next month', 'last week' e 'tomorrow' dispensam preposição.",
      "Errado. O artigo 'a' não entra antes de incontável."
    ]},
  { id:"c-sy-t6", category:"saying", prompt:"Eu preciso terminar meu projeto até sexta.",
    options:["I need to finish my project until Friday.","I need to finish my project by Friday.","I need finish my project by Friday.","I need to finish my project on Friday."], correct:1,
    explanations:[
      "Errado. 'until Friday' seria ficar mexendo no projeto até sexta; o prazo é 'by'.",
      "Correto! I need to finish my project by Friday. Prazo final é sempre 'by'.",
      "Errado. Depois de 'need' o verbo vem com 'to': need to finish.",
      "Errado. 'on Friday' marcaria o dia em que você termina, não o limite."
    ]},

  // ---- Pattern 5: ortografia ----
  { id:"c-sp-t1", category:"spell", prompt:"Como se escreve? (você escreveu \"daugther\")",
    options:["daugther","daughter","doughter","daugter"], correct:1,
    explanations:[
      "Errado. É a troca que você faz sempre: o 'gh' vem antes do 't', não depois.",
      "Correto! daughter. A ordem é d-a-u-g-h-t-e-r — o bloco 'ght' aparece igual em night, light e eight.",
      "Errado. A vogal é 'au', como em 'daughter' e 'caught'.",
      "Errado. Faltou o 'h' do bloco 'ght'."
    ]},
  { id:"c-sp-t2", category:"spell", prompt:"Como se escreve? (você escreveu \"volleiball\")",
    options:["voleyball","volleyball","volleiball","voleiboll"], correct:1,
    explanations:[
      "Errado. Falta um 'l': são dois.",
      "Correto! volleyball. Dois L e, no meio, 'ey' — não 'ei'. O português puxa o 'i', mas em inglês é volley, como em 'volley' do tênis.",
      "Errado. Foi o que você escreveu: o 'ei' aqui é 'ey'.",
      "Errado. Três problemas: um L só, o 'ei' e o 'o' no fim."
    ]},
  { id:"c-sp-t3", category:"spell", prompt:"Como se escreve? (você escreveu \"figthing\")",
    options:["fighting","figthing","fiting","fightting"], correct:0,
    explanations:[
      "Correto! fighting. Mesmo bloco 'ght' de daughter e night — e a ordem também é 'ght', nunca 'gth'.",
      "Errado. É a mesma inversão do 'daugther': o 'h' vem antes do 't'.",
      "Errado. Sem o 'gh' a palavra vira outra coisa.",
      "Errado. O 't' não dobra: fighting."
    ]},
  { id:"c-sp-t4", category:"spell", prompt:"Como se escreve? (você escreveu \"even tough\")",
    options:["even tough","even thought","even though","even trough"], correct:2,
    explanations:[
      "Errado. 'tough' existe, mas quer dizer duro, difícil — é outra palavra.",
      "Errado. 'thought' é pensamento ou o passado de think.",
      "Correto! even though — 'mesmo que', 'embora'. São quatro palavras parecidíssimas (tough, though, thought, through) e esta é a única que serve aqui.",
      "Errado. 'trough' é cocho, calha. Nem de perto."
    ]},
  { id:"c-sp-t5", category:"spell", prompt:"Como se escreve? (você escreveu \"colective\")",
    options:["colective","collective","collectve","coletive"], correct:1,
    explanations:[
      "Errado. Em inglês o L dobra: collective.",
      "Correto! collective. O português tem um L só ('coletivo') e é daí que vem o escorregão — em inglês são dois, como em collect e collection.",
      "Errado. Faltou o 'i' antes do 've'.",
      "Errado. Um L só e faltando o 'c': é a forma portuguesa."
    ]},
  { id:"c-sp-t6", category:"spell", prompt:"Como se escreve? (você escreveu \"dadicated\")",
    options:["dedicatted","dadicated","dedicated","dedicaded"], correct:2,
    explanations:[
      "Errado. O 't' não dobra.",
      "Errado. A segunda letra é 'e', não 'a': de-di-ca-ted.",
      "Correto! dedicated. Três 'e' e um 'a': d-e-d-i-c-a-t-e-d.",
      "Errado. A terminação do particípio é '-ted', com t."
    ]},
];

/* ================= PRÁTICA DIRIGIDA: ERROS DA CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Pattern 1: terceira pessoa (-s) ----
  { id:"c-3s-p1", category:"thirds", prompt:"He ___ to the gym before work. (go)",
    options:["go","goies","gos","goes"], correct:3,
    explanations:[
      "Errado. Com 'he' o verbo precisa da terminação.",
      "Errado. O -ies é para consoante + y.",
      "Errado. Verbo terminado em -o leva -es.",
      "Correto! He goes to the gym before work. Em -s, -sh, -ch, -x e -o entra -es: goes, watches, does."
    ]},
  { id:"c-3s-p2", category:"thirds", prompt:"My wife ___ English at night. (study)",
    options:["study","studys","studyes","studies"], correct:3,
    explanations:[
      "Errado. 'my wife' é she: precisa da terminação.",
      "Errado. Antes do y tem consoante, então o y cai e entra -ies.",
      "Errado. Não existe '-yes' como terminação.",
      "Correto! My wife studies English at night. Consoante + y vira -ies: study → studies, try → tries."
    ]},
  { id:"c-3s-p3", category:"thirds", prompt:"The game ___ at 4 pm. (finish)",
    options:["finishes","finishs","finish","finishies"], correct:0,
    explanations:[
      "Correto! The game finishes at 4 pm. Terminou em -sh? Entra -es.",
      "Errado. 'finishs' não se pronuncia; por isso o -es.",
      "Errado. 'The game' é it e pede a terminação.",
      "Errado. O -ies é só para consoante + y."
    ]},
  { id:"c-3s-p4", category:"thirds", prompt:"My daughter and I ___ soccer on Sundays. (watch)",
    options:["watchs","is watching","watches","watch"], correct:3,
    explanations:[
      "Errado. Além de não caber aqui, 'watchs' nem existe.",
      "Errado. Com 'we' seria 'are', e a ideia passaria a ser agora, não um hábito.",
      "Errado. É a armadilha: 'My daughter and I' são duas pessoas, ou seja 'we'.",
      "Correto! My daughter and I watch soccer on Sundays. Sujeito composto é plural — nada de -s."
    ]},
  { id:"c-3s-p5", category:"thirds", prompt:"She never ___ the news in the morning. (read)",
    options:["readies","is read","read","reads"], correct:3,
    explanations:[
      "Errado. 'readies' é outra palavra e não é isso.",
      "Errado. 'is read' não forma presente simples.",
      "Errado. 'never' não muda nada: com 'she' o verbo leva -s.",
      "Correto! She never reads the news in the morning. O advérbio de frequência vem antes do verbo, e o verbo continua com -s."
    ]},
  { id:"c-3s-p6", category:"thirds", prompt:"My team ___ every Wednesday. (practice)",
    options:["practicies","practice","practicees","practices"], correct:3,
    explanations:[
      "Errado. O -ies vale para consoante + y, e aqui termina em -e.",
      "Errado. 'My team' é it: precisa da terminação.",
      "Errado. O -es não se encaixa aqui; 'practice' já termina em -e.",
      "Correto! My team practices every Wednesday. Verbo terminado em -e só ganha -s."
    ]},
  { id:"c-3s-p7", category:"thirds", prompt:"The season ___ in December. (end)",
    options:["ends","end","endes","ending"], correct:0,
    explanations:[
      "Correto! The season ends in December. E note a preposição: mês sozinho pede 'in'.",
      "Errado. 'The season' é it.",
      "Errado. Verbo em -d leva só -s.",
      "Errado. Sem to be, o -ing não é verbo."
    ]},
  { id:"c-3s-p8", category:"thirds", prompt:"Those players ___ very hard. (train)",
    options:["is training","trains","trainies","train"], correct:3,
    explanations:[
      "Errado. Plural pediria 'are', e mudaria o sentido para agora.",
      "Errado. 'Those players' é plural: o -s não entra no verbo.",
      "Errado. Não existe essa forma.",
      "Correto! Those players train very hard. O outro lado do padrão: pôr o -s no plural é tão erro quanto esquecê-lo no singular."
    ]},

  // ---- Pattern 2: preposições de tempo ----
  { id:"c-pr-p1", category:"preps", prompt:"My wife works ___ 6 pm, so we have dinner late.",
    options:["on","in","by","until"], correct:3,
    explanations:[
      "Errado. 'on' é para dia e data.",
      "Errado. Com hora exata seria 'at', e mudaria o sentido.",
      "Errado. 'by 6 pm' seria terminar antes das 6.",
      "Correto! works until 6 pm — ela trabalha o tempo todo até aquele horário."
    ]},
  { id:"c-pr-p2", category:"preps", prompt:"The season starts ___ March.",
    options:["on","in","at","until"], correct:1,
    explanations:[
      "Errado. 'on' é para dia e data: on March 3rd.",
      "Correto! starts in March. Mês sozinho, ano e estação levam 'in'.",
      "Errado. 'at' é para hora.",
      "Errado. 'until March' marcaria duração até março."
    ]},
  { id:"c-pr-p3", category:"preps", prompt:"I need the answer ___ tomorrow morning.",
    options:["by","until","in","on"], correct:0,
    explanations:[
      "Correto! I need the answer by tomorrow morning. Prazo final é 'by'.",
      "Errado. 'until' seria precisar da resposta continuamente até amanhã.",
      "Errado. 'in' sozinho não marca prazo.",
      "Errado. 'on tomorrow' não existe: 'tomorrow' dispensa preposição."
    ]},
  { id:"c-pr-p4", category:"preps", prompt:"We always play ___ Sunday afternoon.",
    options:["until","in","at","on"], correct:3,
    explanations:[
      "Errado. 'until' é duração.",
      "Errado. 'in the afternoon' sozinho leva 'in', mas colado num dia o 'on' manda.",
      "Errado. 'at' é para hora.",
      "Correto! on Sunday afternoon. Quando o período vem junto do dia, a preposição é 'on'."
    ]},
  { id:"c-pr-p5", category:"preps", prompt:"The kids go to bed ___ night.",
    options:["at","in","on","by"], correct:0,
    explanations:[
      "Correto! at night. É a exceção dos períodos do dia: in the morning, in the afternoon, in the evening — mas at night.",
      "Errado. 'in the night' aparece, mas o normal e esperado é 'at night'.",
      "Errado. 'on' é para dia e data.",
      "Errado. 'by night' seria prazo."
    ]},
  { id:"c-pr-p6", category:"preps", prompt:"My appointment is ___ December 3rd.",
    options:["in","at","until","on"], correct:3,
    explanations:[
      "Errado. Com o dia junto, o mês perde o 'in'.",
      "Errado. 'at' é para hora.",
      "Errado. 'until' marca duração.",
      "Correto! on December 3rd. Data completa sempre com 'on'."
    ]},
  { id:"c-pr-p7", category:"preps", prompt:"I'll be in the office ___ 5 pm, then I go home.",
    options:["until","by","on","in"], correct:0,
    explanations:[
      "Correto! in the office until 5 pm. Você fica lá o tempo todo até as 5 — duração.",
      "Errado. 'by 5 pm' seria estar lá em algum momento antes das 5.",
      "Errado. 'on' é para dia e data.",
      "Errado. 'in 5 pm' não existe."
    ]},
  { id:"c-pr-p8", category:"preps", prompt:"As I said ___ the beginning of the call, I have a meeting now.",
    options:["in","on","at","by"], correct:2,
    explanations:[
      "Errado. 'in the beginning' é o começo de uma história longa.",
      "Errado. 'on' é para dia e data.",
      "Correto! at the beginning of the call. Começo de alguma coisa delimitada pede 'at'.",
      "Errado. 'by the beginning' marcaria prazo."
    ]},

  // ---- Pattern 3: encontre o erro ----
  { id:"c-fx-p1", category:"fixit", prompt:"Qual é a forma correta?",
    options:["I don't have a free time during the week.","I don't have free time during the week.","I don't have the free times during the week.","I don't have a free times during the week."], correct:1,
    explanations:[
      "Errado. 'free time' é incontável e não leva 'a'.",
      "Correto! I don't have free time during the week. Incontável vai sem artigo e sem plural.",
      "Errado. 'times' no plural muda o sentido, e o 'the' pede um contexto que não existe aqui.",
      "Errado. Junta os dois problemas: artigo e plural."
    ]},
  { id:"c-fx-p2", category:"fixit", prompt:"Qual é a forma correta?",
    options:["There is many people at the stadium.","There are many people at the stadium.","There has many people at the stadium.","There are many peoples at the stadium."], correct:1,
    explanations:[
      "Errado. 'people' já é plural: pede 'there are'.",
      "Correto! There are many people at the stadium. 'people' é plural de 'person' — o verbo acompanha.",
      "Errado. 'there has' não existe.",
      "Errado. 'peoples' só existe no sentido de povos, nações."
    ]},
  { id:"c-fx-p3", category:"fixit", prompt:"Qual é a forma correta?",
    options:["I need to do a blood test every year.","I need to take a blood test every year.","I need to make a blood test every year.","I need to realize a blood test every year."], correct:1,
    explanations:[
      "Errado. Para exame, o verbo natural é 'take'.",
      "Correto! I need to take a blood test every year. Exame, teste e remédio se 'take'.",
      "Errado. 'make' é para o que você fabrica ou cria.",
      "Errado. 'realize' é perceber — falso amigo."
    ]},
  { id:"c-fx-p4", category:"fixit", prompt:"Qual é a forma correta?",
    options:["It's difficult find time to practice.","It's difficult finding time to practice.","It's difficult to find time to practice.","It's difficult finds time to practice."], correct:2,
    explanations:[
      "Errado. Falta o 'to'.",
      "Errado. O -ing serviria como sujeito no começo da frase, não depois do adjetivo.",
      "Correto! It's difficult to find time to practice. Depois de adjetivo, infinitivo com 'to'.",
      "Errado. O -s de terceira pessoa não cabe aqui."
    ]},
  { id:"c-fx-p5", category:"fixit", prompt:"Qual é a forma correta?",
    options:["Last year I went to three different cities.","Last year I went three different cities.","Last year I went in three different cities.","Last year I went at three different cities."], correct:0,
    explanations:[
      "Correto! I went to three different cities. 'go' sempre leva 'to' antes do destino.",
      "Errado. É o mesmo 'to' que some quando a frase sai rápido.",
      "Errado. 'go in' é entrar.",
      "Errado. 'at' diz onde você está, não para onde foi."
    ]},
  { id:"c-fx-p6", category:"fixit", prompt:"Qual é a forma correta?",
    options:["The coach which trains us is very patient.","The coach what trains us is very patient.","The coach who trains us is very patient.","The coach who train us is very patient."], correct:2,
    explanations:[
      "Errado. 'which' é para coisa.",
      "Errado. 'what' não serve como pronome relativo.",
      "Correto! The coach who trains us. Pessoa pede 'who' — e repare no -s de 'trains', porque 'the coach' é ele/ela.",
      "Errado. O 'who' está certo, mas faltou o -s em 'trains'."
    ]},
  { id:"c-fx-p7", category:"fixit", prompt:"Qual é a forma correta?",
    options:["As I told her at the beginning, I can't go.","As I told at the beginning to her, I can't go.","As I said her at the beginning, I can't go.","As I told her in the beginning, I can't go."], correct:0,
    explanations:[
      "Correto! As I told her at the beginning. 'tell' pede a quem logo depois, e o começo da conversa é 'at'.",
      "Errado. Com 'tell', a pessoa vem logo depois do verbo.",
      "Errado. 'say' não leva pessoa direto: say something to someone.",
      "Errado. 'in the beginning' é o começo de uma narrativa longa."
    ]},
  { id:"c-fx-p8", category:"fixit", prompt:"Qual é a forma correta?",
    options:["On weekends nothing special.","On weekends, nothing special happen.","On weekends, nothing special happens.","In weekends, nothing special happens."], correct:2,
    explanations:[
      "Errado. Falta o verbo.",
      "Errado. 'nothing' é singular: happens.",
      "Correto! On weekends, nothing special happens. Preposição certa, verbo presente e concordância no singular.",
      "Errado. Com dia é 'on', não 'in'."
    ]},

  // ---- Pattern 4: diga em inglês ----
  { id:"c-sy-p1", category:"saying", prompt:"Hoje à noite eu vou treinar até as 9.",
    options:["Tonight I'm going to train by 9.","Tonight I'm going to train until 9.","In tonight I'm going to train until 9.","Tonight I go to train until 9."], correct:1,
    explanations:[
      "Errado. 'by 9' seria terminar antes das 9.",
      "Correto! Tonight I'm going to train until 9. Duração com 'until', e 'tonight' dispensa preposição.",
      "Errado. 'tonight' não leva preposição na frente.",
      "Errado. 'I go' é hábito; para hoje à noite, o plano é 'I'm going to'."
    ]},
  { id:"c-sy-p2", category:"saying", prompt:"No sábado de manhã eu levo minha filha na escola.",
    options:["In Saturday morning I take my daughter to school.","On Saturday morning I take my daughter to school.","On Saturday morning I bring my daughter to school.","On Saturday morning I take my daughter at school."], correct:1,
    explanations:[
      "Errado. Período colado no dia pede 'on'.",
      "Correto! On Saturday morning I take my daughter to school. E 'take' é levar para longe de quem fala.",
      "Errado. 'bring' é trazer para perto de quem fala.",
      "Errado. Com destino é 'to school', não 'at school'."
    ]},
  { id:"c-sy-p3", category:"saying", prompt:"Eu tenho que entregar o relatório até quinta.",
    options:["I have to deliver the report until Thursday.","I have to deliver the report on Thursday.","I have to deliver the report by Thursday.","I have to deliver the report in Thursday."], correct:2,
    explanations:[
      "Errado. 'until' seria entregar continuamente até quinta.",
      "Errado. 'on Thursday' marca o dia da entrega, não o prazo.",
      "Correto! I have to deliver the report by Thursday. Prazo final é sempre 'by'.",
      "Errado. 'in' não vai com dia da semana."
    ]},
  { id:"c-sy-p4", category:"saying", prompt:"Meu time joga fora de casa no domingo.",
    options:["My team play away on Sunday.","My team plays away in Sunday.","My team plays away on Sunday.","My team is play away on Sunday."], correct:2,
    explanations:[
      "Errado. 'My team' é it: o verbo leva -s.",
      "Errado. O -s está certo, mas dia da semana é 'on'.",
      "Correto! My team plays away on Sunday. Os dois padrões na mesma frase: o -s e o 'on'.",
      "Errado. 'is play' não existe."
    ]},
  { id:"c-sy-p5", category:"saying", prompt:"Semana que vem eu vou ter menos tempo livre.",
    options:["In next week I'm going to have less free time.","Next week I'm going to have less free time.","Next week I'm going to have less free times.","Next week I'm going to have fewer free time."], correct:1,
    explanations:[
      "Errado. 'next week' não leva preposição.",
      "Correto! Next week I'm going to have less free time. 'less' é para incontável, e 'free time' é incontável.",
      "Errado. 'free time' não tem plural.",
      "Errado. 'fewer' é para contável: fewer games, less time."
    ]},
  { id:"c-sy-p6", category:"saying", prompt:"A médica me acompanha duas vezes por ano.",
    options:["The doctor follow up on me twice a year.","The doctor follows up on me two times per year.","The doctor follows up on me twice a year.","The doctor follows up me twice a year."], correct:2,
    explanations:[
      "Errado. 'The doctor' é ela: follows, com -s.",
      "Errado. Entende-se, mas o natural é 'twice a year'.",
      "Correto! The doctor follows up on me twice a year. O -s da terceira pessoa e a expressão de frequência: once a week, twice a year.",
      "Errado. A expressão é 'follow up ON someone'."
    ]},

  // ---- Pattern 5: ortografia ----
  { id:"c-sp-p1", category:"spell", prompt:"Como se escreve?",
    options:["nigth","night","niht","nigt"], correct:1,
    explanations:[
      "Errado. É a mesma inversão do 'daugther': 'ght', não 'gth'.",
      "Correto! night. O bloco 'ght' se repete em night, light, right, fight e daughter.",
      "Errado. Faltou o 'g'.",
      "Errado. Faltou o 'h'."
    ]},
  { id:"c-sp-p2", category:"spell", prompt:"Como se escreve?",
    options:["bought","bougth","boght","bouht"], correct:0,
    explanations:[
      "Correto! bought — passado de 'buy'. Mais um do bloco 'ght'.",
      "Errado. Inverteu o 'ght'.",
      "Errado. Faltou o 'u'.",
      "Errado. Faltou o 'g'."
    ]},
  { id:"c-sp-p3", category:"spell", prompt:"Como se escreve?",
    options:["succesful","successfull","successful","sucessful"], correct:2,
    explanations:[
      "Errado. São dois 's' no meio: success.",
      "Errado. 'full' vira '-ful' com um L só quando é sufixo.",
      "Correto! successful. Dois 'c', dois 's' no meio e um L só no fim.",
      "Errado. Faltou um 'c'."
    ]},
  { id:"c-sp-p4", category:"spell", prompt:"Como se escreve?",
    options:["recomend","reccommend","recommend","recomendd"], correct:2,
    explanations:[
      "Errado. O 'm' dobra: recommend.",
      "Errado. O 'c' não dobra.",
      "Correto! recommend. Um 'c' e dois 'm' — o contrário do que o português sugere.",
      "Errado. O que dobra é o 'm', não o 'd'."
    ]},
  { id:"c-sp-p5", category:"spell", prompt:"Como se escreve?",
    options:["dedicated","dedicatted","dadicated","dedicaded"], correct:0,
    explanations:[
      "Correto! dedicated. Três 'e' e um 'a': d-e-d-i-c-a-t-e-d.",
      "Errado. O 't' não dobra.",
      "Errado. A segunda letra é 'e', não 'a'.",
      "Errado. A terminação é '-ted'."
    ]},
  { id:"c-sp-p6", category:"spell", prompt:"Como se escreve?",
    options:["allways","alwais","always","alaways"], correct:2,
    explanations:[
      "Errado. 'always' tem um L só.",
      "Errado. A terminação é '-ays', como em days.",
      "Correto! always. Um L e '-ways' no fim.",
      "Errado. Sobrou um 'a'."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
