/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado na 6ª rodada de prática: as palavras e expressões que
   você não conseguiu lembrar durante a aula com a professora.

   Diferente das rodadas anteriores, esta não é uma lista de erros
   de gramática: é o vocabulário que travou na hora de falar. Cada
   questão é uma frase da sua aula com a palavra-chave apagada —
   você precisa reconhecer qual é a peça que faltava.

   Consolidados nas rodadas anteriores e, por isso, fora deste banco:
   - artigo "a / an" com contável (o padrão mais teimoso de todos)
   - preposições de lugar (everywhere / home / at school)
   - listen TO, am/is/are + verbo-ing, "audio" incontável
   - as for / talking about, for now / so far, maiúsculas (iPhone, YouTube)

   Os seis temas abaixo seguem a ordem da sua própria lista. O tema
   de tecnologia e celular abre o bloco maior do banco: foi onde mais
   palavras faltaram na hora de falar.
   ============================================================ */

const CONV_CATEGORIES = {
  plans:   { label: "Plans and events: party, invitation, requests",     tag: "Pattern 1" },
  tech:    { label: "Tech and phones: devices and their verbs",          tag: "Pattern 2" },
  useful:  { label: "Useful vs useless: useful, useless, pointless",     tag: "Pattern 3" },
  rules:   { label: "Daughter, school and rules: bans and habits",       tag: "Pattern 4" },
  access:  { label: "Accessibility and knowledge: deaf, illiterate",     tag: "Pattern 5" },
  daily:   { label: "Everyday life and money: cash, taxes, routine",     tag: "Pattern 6" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: planos e eventos ----
  { id:"c-pn-t1", category:"plans", prompt:"On Saturday I ___ with my daughter.",
    options:["am going to go to a kids' party","am going go to a kids' party","am going to go at a kids' party","going to go to a kids' party"], correct:0,
    explanations:[
      "Correto! Foi a frase da sua aula: I am going to go to a kids' party. 'am going to' é o plano e 'go to' é o verbo — os dois aparecem, mesmo parecendo repetição. Repare também no apóstrofo: kids' party, a festa das crianças.",
      "Errado. Falta o 'to' da estrutura do futuro: am going to + verbo.",
      "Errado. Com 'go' o destino leva 'to', nunca 'at': go to a party.",
      "Errado. Falta o 'am': sem o verbo to be a frase não se sustenta."
    ]},
  { id:"c-pn-t2", category:"plans", prompt:"My wife can't come, so I ___ alone.",
    options:["am going to assist the kids' party","am going to attend to the kids' party","am going to attend the kids' party","am going to participate the kids' party"], correct:2,
    explanations:[
      "Errado. 'assist' é falso amigo: significa ajudar, não assistir/comparecer.",
      "Errado. 'attend' já carrega a ideia de comparecer e não leva 'to' depois.",
      "Correto! I am going to attend the kids' party — 'attend' é o verbo formal de comparecer a um evento, sem preposição.",
      "Errado. 'participate' pede 'in': participate in the party. Para comparecer, o natural é attend."
    ]},
  { id:"c-pn-t3", category:"plans", prompt:"The party is for ___, who is turning seven.",
    options:["my friend's child","my friend child","my friends' child","the child of my friend"], correct:0,
    explanations:[
      "Correto! my friend's child — com pessoas, o possessivo em inglês é 's, e o apóstrofo é justamente o que costuma sumir.",
      "Errado. Sem o 's não existe posse: ficaria 'criança amiga'.",
      "Errado. O apóstrofo depois do 's' indica vários amigos (friends'), e aqui é um só.",
      "Errado. Entende-se, mas soa traduzido do português; com pessoas o inglês usa o possessivo 's."
    ]},
  { id:"c-pn-t4", category:"plans", prompt:"The teacher asked if I prefer coffee, tea or juice, and I said: ___, I prefer water.",
    options:["no one of the options","none of the options","any of the options","nothing of the options"], correct:1,
    explanations:[
      "Errado. 'no one' é para pessoas (ninguém), não para opções.",
      "Correto! None of the options — foi exatamente o que você quis dizer na aula: nenhuma das opções.",
      "Errado. 'any' em frase afirmativa vira 'qualquer uma', o contrário da sua resposta.",
      "Errado. 'nothing' é 'nada', e não acompanha 'of the options' desse jeito."
    ]},
  { id:"c-pn-t5", category:"plans", prompt:"My manager ___ to prepare the report before the meeting.",
    options:["asked to me","asked for me","asked me","asked me for"], correct:2,
    explanations:[
      "Errado. 'ask' não leva 'to' antes da pessoa: quem recebe o pedido vem direto.",
      "Errado. 'ask for' é pedir uma coisa (ask for a phone), não pedir que alguém faça algo.",
      "Correto! asked me to prepare — a pessoa vem logo depois de 'ask', sem preposição nenhuma.",
      "Errado. O 'for' sobra: ou é 'asked me to prepare', ou 'asked me for the report'."
    ]},

  // ---- Padrão 2: tecnologia e celular ----
  { id:"c-tc-t1", category:"tech", prompt:"I ___ on my phone for twenty minutes before I sleep.",
    options:["roll","scroll","scrolls","slide"], correct:1,
    explanations:[
      "Errado. 'roll' é rolar no sentido físico, como uma bola.",
      "Correto! to scroll — é o verbo de deslizar a tela do celular, a palavra que faltou na aula.",
      "Errado. O '-s' só entra com he / she / it: I scroll, she scrolls.",
      "Errado. 'slide' é deslizar um objeto; na tela do celular o verbo é scroll."
    ]},
  { id:"c-tc-t2", category:"tech", prompt:"I use my phone ___, so I never go to the bank.",
    options:["to pay bills","for pay bills","to pay accounts","for paying the bank"], correct:0,
    explanations:[
      "Correto! to pay bills — 'bill' é a conta que chega para pagar (luz, água, cartão).",
      "Errado. Antes de verbo, a finalidade é 'to': for + verbo no infinitivo não existe.",
      "Errado. 'account' é conta bancária ou cadastro; conta a pagar é 'bill'.",
      "Errado. Você não paga o banco, paga as contas: pay bills."
    ]},
  { id:"c-tc-t3", category:"tech", prompt:"I use the GPS ___, because it shows me the traffic.",
    options:["even I know the way","same when I know the way","even that I know the way","even when I know the way"], correct:3,
    explanations:[
      "Errado. Falta o 'when': sozinho, 'even' não liga as duas frases.",
      "Errado. 'same' é 'mesmo' no sentido de igual; 'mesmo quando' é even when.",
      "Errado. 'even that' não existe nessa função — as formas são even when, even if e even though.",
      "Correto! even when I know the way — e repare em 'the way' (o caminho), não 'the road'."
    ]},
  { id:"c-tc-t4", category:"tech", prompt:"My friend has a ___ in his kitchen, and he asks it to play music while he cooks.",
    options:["smart speaker","smart sound","intelligent speaker","speak machine"], correct:0,
    explanations:[
      "Correto! smart speaker — é o nome da caixinha com assistente de voz (Alexa, Google Home).",
      "Errado. 'sound' é o som; o aparelho é o 'speaker'.",
      "Errado. É gramatical, mas ninguém chama assim: o nome do produto é smart speaker.",
      "Errado. Não existe 'speak machine' em inglês."
    ]},
  { id:"c-tc-t5", category:"tech", prompt:"My old headphones are ___, but my new ones are wireless.",
    options:["connected with wire","connected through a wire","connect through a wire","connected through the wireless"], correct:1,
    explanations:[
      "Errado. Falta o artigo: 'a wire' é contável no singular.",
      "Correto! connected through a wire — literalmente, ligados por um fio; o contrário é wireless.",
      "Errado. Depois de 'are' o verbo fica no particípio: connected.",
      "Errado. 'wireless' é justamente o oposto de ter fio."
    ]},
  { id:"c-tc-t6", category:"tech", prompt:"My TV came with ___, but now I control everything with an app.",
    options:["remote control","the control remote","a control","a remote control"], correct:3,
    explanations:[
      "Errado. Falta o artigo 'a' — o mesmo detalhe que aparece em todas as rodadas.",
      "Errado. A ordem está invertida: em inglês o adjetivo vem antes, remote control.",
      "Errado. 'a control' sozinho não é o aparelho; o controle remoto é 'a remote control'.",
      "Correto! a remote control — e, no inglês americano, também se ouve 'a remote'."
    ]},
  { id:"c-tc-t7", category:"tech", prompt:"This laptop has ___ screen — the colors are really clear.",
    options:["top-notch","a top notch of","a top-notch","the most top-notch"], correct:2,
    explanations:[
      "Errado. Falta o artigo: 'screen' é contável no singular e pede 'a'.",
      "Errado. O 'of' sobra: top-notch é adjetivo e vem direto antes do substantivo.",
      "Correto! a top-notch screen — 'top-notch' é de primeira qualidade, com hífen porque é adjetivo composto.",
      "Errado. 'top-notch' já é o grau máximo; não leva 'the most'."
    ]},
  { id:"c-tc-t8", category:"tech", prompt:"Technology is always ___, so I need to study every week.",
    options:["develop","developed","developing","development"], correct:2,
    explanations:[
      "Errado. Depois de 'is' o verbo precisa do -ing para indicar algo em curso.",
      "Errado. 'developed' dá ideia de já pronto, terminado.",
      "Correto! is always developing — está sempre se desenvolvendo, sem parar.",
      "Errado. 'development' é o substantivo (o desenvolvimento)."
    ]},
  { id:"c-tc-t9", category:"tech", prompt:"The data field is ___ fast; five years ago nobody talked about dbt.",
    options:["evolving","evoluting","evolved","evolution"], correct:0,
    explanations:[
      "Correto! is evolving fast — 'evolve' é evoluir, e o -ing marca o processo em andamento.",
      "Errado. 'evoluting' não existe: o verbo é evolve → evolving.",
      "Errado. 'evolved' é passado/particípio e não combina com 'is ... fast' aqui.",
      "Errado. 'evolution' é o substantivo (a evolução)."
    ]},
  { id:"c-tc-t10", category:"tech", prompt:"A desktop is usually ___ than a laptop with the same memory.",
    options:["more cheap","cheapest","more cheaper","cheaper"], correct:3,
    explanations:[
      "Errado. Adjetivo curto faz comparativo com -er, não com 'more'.",
      "Errado. 'cheapest' é superlativo (o mais barato de todos) e não combina com 'than'.",
      "Errado. É uma comparação dobrada: ou 'more', ou '-er', nunca os dois.",
      "Correto! cheaper than — adjetivo de uma sílaba vira comparativo com -er."
    ]},

  // ---- Padrão 3: útil × inútil ----
  { id:"c-us-t1", category:"useful", prompt:"A phone without internet is almost ___ for me.",
    options:["useless","unuseful","useful","use less"], correct:0,
    explanations:[
      "Correto! useless — o sufixo -less é o que tira o valor da palavra: sem utilidade.",
      "Errado. 'unuseful' não existe; o contrário de useful é useless.",
      "Errado. Aqui é o contrário do que você quis dizer: useful é útil.",
      "Errado. Separado, 'use less' significa 'usar menos'."
    ]},
  { id:"c-us-t2", category:"useful", prompt:"It's ___ to buy a new phone every year.",
    options:["point less","without point","pointless","no point"], correct:2,
    explanations:[
      "Errado. Separado perde o sentido: é uma palavra só, com o sufixo -less.",
      "Errado. Não é assim que se diz em inglês.",
      "Correto! It's pointless — não faz sentido, não adianta. Mesmo sufixo de useless.",
      "Errado. 'no point' aparece em outra estrutura: There's no point in buying a new phone."
    ]},
  { id:"c-us-t3", category:"useful", prompt:"My old tablet is ___ now, but my laptop is very ___ for work.",
    options:["useful / useless","useless / useful","useless / useless","unuseful / useful"], correct:1,
    explanations:[
      "Errado. Os dois estão trocados de lugar.",
      "Correto! useless × useful — o tablet velho não serve mais; o laptop serve muito. É o par que você quis contrastar.",
      "Errado. O segundo precisa ser o positivo: o laptop é útil.",
      "Errado. 'unuseful' não existe em inglês."
    ]},

  // ---- Padrão 4: filha, escola e regras ----
  { id:"c-rl-t1", category:"rules", prompt:"My daughter asked me for a phone, but I said no — ___ it is a good idea for her to use a phone that often.",
    options:["specially because I don't think","especially because I don't think","especially why I don't think","especially because I not think"], correct:1,
    explanations:[
      "Errado. 'specially' existe, mas significa 'de propósito, para um fim específico'.",
      "Correto! especially because I don't think — 'sobretudo porque' é especially because.",
      "Errado. 'why' não introduz motivo aqui; o motivo vem com 'because'.",
      "Errado. Na negativa do presente entra o auxiliar: I don't think."
    ]},
  { id:"c-rl-t2", category:"rules", prompt:"Phones are ___ in her classroom.",
    options:["forbid","prohibit","forbade","forbidden"], correct:3,
    explanations:[
      "Errado. 'forbid' é o infinitivo; depois de 'are' vem o particípio.",
      "Errado. 'prohibit' também é infinitivo — o particípio seria 'prohibited'.",
      "Errado. 'forbade' é o passado simples (ele proibiu), não o particípio.",
      "Correto! are forbidden — proibidos. Forbid → forbade → forbidden."
    ]},
  { id:"c-rl-t3", category:"rules", prompt:"She can't use her tablet ___, only at home.",
    options:["in the school","at the school","at school","on school"], correct:2,
    explanations:[
      "Errado. Com artigo a frase fala do prédio, não da escola como atividade.",
      "Errado. Mesmo problema: 'at the school' aponta para um prédio específico.",
      "Correto! at school — sem artigo, do mesmo jeito que at home e at work.",
      "Errado. 'on' não é usado com school."
    ]},
  { id:"c-rl-t4", category:"rules", prompt:"She dropped my phone last week. ___, but she was very honest and told me immediately.",
    options:["She broke it","She broke him","She breaked it","She broke"], correct:0,
    explanations:[
      "Correto! She broke it — o celular é 'it', e o passado de break é broke.",
      "Errado. 'him' é para pessoas; um objeto é sempre 'it'.",
      "Errado. 'break' é irregular: break → broke → broken.",
      "Errado. Falta o objeto: quebrar sempre pede o que foi quebrado (it)."
    ]},
  { id:"c-rl-t5", category:"rules", prompt:"___ writing everything on paper, even when they have a phone.",
    options:["Older people have the habit to","Old peoples have the habit of","Older people have the habit of","The older people has the habit of"], correct:2,
    explanations:[
      "Errado. Depois de 'habit' vem 'of' + verbo com -ing.",
      "Errado. 'people' já é plural — 'peoples' seria 'povos'.",
      "Correto! Older people have the habit of writing — 'older people' é o jeito respeitoso de dizer pessoas mais velhas, e 'habit of + -ing'.",
      "Errado. 'people' é plural, então o verbo é 'have'; e aqui não se usa 'the'."
    ]},

  // ---- Padrão 5: acessibilidade e conhecimento ----
  { id:"c-ac-t1", category:"access", prompt:"This app has subtitles for people who are ___.",
    options:["deaf","death","deafs","deft"], correct:0,
    explanations:[
      "Correto! deaf — surdo. A escrita engana, mas a palavra termina em -f.",
      "Errado. 'death' é o substantivo 'morte' — a troca mais comum com deaf.",
      "Errado. 'deaf' é adjetivo e adjetivo em inglês não vai para o plural.",
      "Errado. 'deft' significa hábil, destro."
    ]},
  { id:"c-ac-t2", category:"access", prompt:"My grandfather is almost ___, so he uses voice messages instead of texting.",
    options:["iliterate","unliterate","illiterated","illiterate"], correct:3,
    explanations:[
      "Errado. Falta um 'l': a palavra dobra o L — illiterate.",
      "Errado. O prefixo aqui é 'il-', não 'un-'.",
      "Errado. Não é particípio: o adjetivo é illiterate, sem -d.",
      "Correto! illiterate — analfabeto. Dois L e terminação -ate."
    ]},
  { id:"c-ac-t3", category:"access", prompt:"I'm a ___ when it comes to design — I only know the technical side.",
    options:["layman person","layperson","lay","laic"], correct:1,
    explanations:[
      "Errado. 'layman' já é a pessoa; juntar 'person' fica redundante.",
      "Correto! a layperson — leigo, quem não é da área. Também se usa 'a layman'.",
      "Errado. 'lay' sozinho é adjetivo: a lay opinion, mas a layperson.",
      "Errado. 'laic' é termo religioso e praticamente não se usa assim."
    ]},

  // ---- Padrão 6: dia a dia e dinheiro ----
  { id:"c-dy-t1", category:"daily", prompt:"I check the ___ every morning before I leave home.",
    options:["weather forecast","time forecast","weather prevision","whether forecast"], correct:0,
    explanations:[
      "Correto! the weather forecast — a previsão do tempo, a expressão que faltou na aula.",
      "Errado. 'time' é hora ou tempo de duração, nunca o tempo meteorológico.",
      "Errado. 'prevision' não existe nesse uso; previsão do tempo é forecast.",
      "Errado. 'whether' é 'se' (dúvida) — mesmo som, palavra completamente diferente."
    ]},
  { id:"c-dy-t2", category:"daily", prompt:"I almost never carry ___; I pay everything with my phone.",
    options:["cashes","money cash","cash","the cash"], correct:2,
    explanations:[
      "Errado. 'cash' é incontável e nunca vai para o plural.",
      "Errado. 'cash' sozinho já é dinheiro em espécie.",
      "Correto! carry cash — dinheiro vivo, em papel. Incontável e sem artigo.",
      "Errado. Com 'the' viraria um dinheiro específico; aqui a ideia é geral."
    ]},
  { id:"c-dy-t3", category:"daily", prompt:"In Brazil we pay a lot of ___ on imported electronics.",
    options:["taxes","taxs","rates","fees"], correct:0,
    explanations:[
      "Correto! taxes — imposto é 'tax', e o plural de palavras terminadas em -x leva -es.",
      "Errado. Palavra terminada em -x faz o plural com -es: taxes.",
      "Errado. 'rate' é taxa no sentido de índice ou percentual (interest rate).",
      "Errado. 'fee' é taxa de serviço, o que se paga a alguém — imposto é tax."
    ]},
  { id:"c-dy-t4", category:"daily", prompt:"Notifications ___ me when I'm working, so I turn them off.",
    options:["disturbs","disturb","disturbe","distract to"], correct:1,
    explanations:[
      "Errado. O sujeito é plural (notifications), então o verbo não leva -s.",
      "Correto! Notifications disturb me — atrapalham, incomodam.",
      "Errado. A grafia é 'disturb', sem o -e final.",
      "Errado. 'distract' não leva 'to': distract me."
    ]},
  { id:"c-dy-t5", category:"daily", prompt:"The commute is long, but ___, I like my job.",
    options:["apart of that","a part from that","apart that","apart from that"], correct:3,
    explanations:[
      "Errado. A preposição da expressão é 'from', não 'of'.",
      "Errado. 'a part' separado é 'uma parte'; a expressão é 'apart', tudo junto.",
      "Errado. Falta o 'from': apart from that.",
      "Correto! apart from that — 'fora isso', para abrir a exceção. E 'commute' é o trajeto casa-trabalho."
    ]},
  { id:"c-dy-t6", category:"daily", prompt:"Working from home is good because ___ as going to the office every day.",
    options:["it is not as demanding for me","it is not as demanding for me than","it is not more demanding for me","it is not as demand for me"], correct:0,
    explanations:[
      "Correto! it is not as demanding for me as ... — a comparação de igualdade é 'as + adjetivo + as', e 'demanding' é exigente, cansativo.",
      "Errado. Com 'as ... as' o segundo termo é 'as', nunca 'than'.",
      "Errado. 'more' pediria 'than'; aqui a frase continua com 'as'.",
      "Errado. Falta o -ing: o adjetivo é 'demanding'."
    ]},
];

/* ================= PRÁTICA DIRIGIDA: ERROS DA CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1: planos e eventos ----
  { id:"c-pn-p1", category:"plans", prompt:"Next Sunday we ___ at the park.",
    options:["are going to go to a birthday party","are going to a birthday party at","are going to go at a birthday party","are go to a birthday party"], correct:0,
    explanations:[
      "Correto! are going to go to — o plano ('going to') e o verbo ('go to') convivem na mesma frase.",
      "Errado. A frase já termina com 'at the park'; esta opção repete a preposição.",
      "Errado. Com 'go', o destino vem com 'to'.",
      "Errado. Falta o -ing: are going to."
    ]},
  { id:"c-pn-p2", category:"plans", prompt:"I can't go out tonight, so I ___ the meeting online.",
    options:["am going to assist","am going to attend to","am going to attend","am going to assist to"], correct:2,
    explanations:[
      "Errado. 'assist' é ajudar — falso amigo de 'assistir'.",
      "Errado. 'attend' não leva preposição.",
      "Correto! I am going to attend the meeting — comparecer, participar de um evento.",
      "Errado. Dois problemas: o falso amigo e a preposição a mais."
    ]},
  { id:"c-pn-p3", category:"plans", prompt:"This is ___ tablet, not mine.",
    options:["my daughter tablet","the tablet of my daughter","my daughters' tablet","my daughter's tablet"], correct:3,
    explanations:[
      "Errado. Sem o 's não há posse.",
      "Errado. Entende-se, mas com pessoas o inglês prefere o possessivo 's.",
      "Errado. O apóstrofo depois do 's' indicaria várias filhas.",
      "Correto! my daughter's tablet — possessivo com apóstrofo + s."
    ]},
  { id:"c-pn-p4", category:"plans", prompt:"He offered me tea, coffee and soda, but I said ___.",
    options:["nothing of them","none of them","no one of them","any of them"], correct:1,
    explanations:[
      "Errado. 'nothing' não acompanha 'of them' nesse sentido.",
      "Correto! none of them — nenhum deles, para escolher zero entre opções.",
      "Errado. 'no one' é para pessoas.",
      "Errado. Em frase afirmativa 'any' vira 'qualquer um'."
    ]},
  { id:"c-pn-p5", category:"plans", prompt:"The client ___ to send the data by Friday.",
    options:["asked to us","asked us","asked for us","asked us for"], correct:1,
    explanations:[
      "Errado. Depois de 'ask' a pessoa vem direto, sem 'to'.",
      "Correto! asked us to send — ask + pessoa + to + verbo.",
      "Errado. 'ask for' é pedir uma coisa, não pedir que alguém faça algo.",
      "Errado. O 'for' sobra antes de 'to send'."
    ]},

  // ---- Padrão 2: tecnologia e celular ----
  { id:"c-tc-p1", category:"tech", prompt:"She ___ on her phone during lunch.",
    options:["scroll","scrolls","scrolling","scroll on"], correct:1,
    explanations:[
      "Errado. Com 'she' o verbo leva -s.",
      "Correto! She scrolls on her phone — o verbo de deslizar a tela, com o -s da 3ª pessoa.",
      "Errado. Sozinho, o -ing precisa do verbo 'to be' antes: she is scrolling.",
      "Errado. A frase já tem 'on her phone'."
    ]},
  { id:"c-tc-p2", category:"tech", prompt:"He uses an app ___ every month.",
    options:["for pay the bills","to pay the bills","to pay the accounts","for paying bills of the house"], correct:1,
    explanations:[
      "Errado. Finalidade antes de verbo é 'to', não 'for'.",
      "Correto! to pay the bills — as contas que chegam para pagar.",
      "Errado. 'accounts' são contas bancárias ou cadastros.",
      "Errado. Soa traduzido; o natural é 'to pay the bills'."
    ]},
  { id:"c-tc-p3", category:"tech", prompt:"I take an umbrella ___ the sky is blue.",
    options:["even when","same when","even that","same that"], correct:0,
    explanations:[
      "Correto! even when — 'mesmo quando', para contrariar a expectativa.",
      "Errado. 'same' é 'mesmo' no sentido de igual.",
      "Errado. 'even that' não existe nessa função.",
      "Errado. Nenhuma das duas palavras funciona aqui."
    ]},
  { id:"c-tc-p4", category:"tech", prompt:"She asks her ___ to set a timer while she cooks.",
    options:["intelligent speaker","speaker machine","smart sound","smart speaker"], correct:3,
    explanations:[
      "Errado. É gramatical, mas o nome do aparelho é outro.",
      "Errado. Não existe essa combinação em inglês.",
      "Errado. 'sound' é o som, não o aparelho.",
      "Correto! smart speaker — a caixinha com assistente de voz."
    ]},
  { id:"c-tc-p5", category:"tech", prompt:"Escolha a frase correta:",
    options:["My mouse is connected through wire.","My mouse is connected through a wire.","My mouse is connect through a wire.","My mouse is connected through the wireless."], correct:1,
    explanations:[
      "Errado. Falta o artigo antes de 'wire'.",
      "Correto! connected through a wire — com fio; sem fio é 'wireless'.",
      "Errado. Depois de 'is' o verbo fica no particípio: connected.",
      "Errado. 'wireless' é o oposto de ter fio."
    ]},
  { id:"c-tc-p6", category:"tech", prompt:"I lost ___ of the TV, so now I use the app.",
    options:["the control remote","a remote control","the remote control","remote control"], correct:2,
    explanations:[
      "Errado. A ordem está invertida: remote control.",
      "Errado. Depois de 'lost ... of the TV' falamos de um controle específico, então é 'the'.",
      "Correto! the remote control — o controle remoto daquela TV, já conhecido na conversa.",
      "Errado. Falta o artigo."
    ]},
  { id:"c-tc-p7", category:"tech", prompt:"The restaurant has ___ coffee — the best in the city.",
    options:["a top-notch","top-notch","the top-notch of","most top-notch"], correct:1,
    explanations:[
      "Errado. 'coffee' aqui é incontável e não leva 'a'.",
      "Correto! top-notch coffee — de primeira qualidade; com incontável, o adjetivo vem sem artigo.",
      "Errado. O 'of' sobra: top-notch é adjetivo.",
      "Errado. 'top-notch' já é o grau máximo."
    ]},
  { id:"c-tc-p8", category:"tech", prompt:"Artificial intelligence is ___ every month, and the tools change fast.",
    options:["evolution","evolved","evoluting","evolving"], correct:3,
    explanations:[
      "Errado. 'evolution' é o substantivo.",
      "Errado. 'evolved' dá ideia de processo encerrado.",
      "Errado. Não existe: o verbo é evolve → evolving.",
      "Correto! is evolving — está evoluindo, em processo. Mesma ideia de 'is developing'."
    ]},

  // ---- Padrão 3: útil × inútil ----
  { id:"c-us-p1", category:"useful", prompt:"A car without fuel is ___.",
    options:["unuseful","useless","use less","useful"], correct:1,
    explanations:[
      "Errado. 'unuseful' não existe.",
      "Correto! useless — sem utilidade nenhuma.",
      "Errado. Separado significa 'usar menos'.",
      "Errado. É o contrário: useful é útil."
    ]},
  { id:"c-us-p2", category:"useful", prompt:"It's ___ to argue with him; he never changes his mind.",
    options:["pointless","point less","without point","no point"], correct:0,
    explanations:[
      "Correto! It's pointless — não adianta, não faz sentido.",
      "Errado. É uma palavra só.",
      "Errado. Não se diz assim em inglês.",
      "Errado. 'no point' entra em outra estrutura: There's no point in arguing."
    ]},
  { id:"c-us-p3", category:"useful", prompt:"This old cable is ___, but the new one is really ___.",
    options:["useful / useless","useless / useless","useless / useful","pointless / useful"], correct:2,
    explanations:[
      "Errado. Os dois estão trocados.",
      "Errado. O segundo precisa ser o positivo.",
      "Correto! useless × useful — o velho não serve, o novo serve muito.",
      "Errado. 'pointless' é para ações sem sentido, não para objetos sem utilidade."
    ]},
  { id:"c-us-p4", category:"useful", prompt:"Escolha a frase correta:",
    options:["My notes are very useful for the exam.","My notes are very useless for the exam.","My notes are very unuseful for the exam.","My notes are very use full for the exam."], correct:0,
    explanations:[
      "Correto! very useful — o sufixo -ful é o que dá o sentido positivo.",
      "Errado. 'useless' diria que as anotações não servem para nada.",
      "Errado. 'unuseful' não existe.",
      "Errado. 'useful' é uma palavra só, e o -ful tem um L só."
    ]},

  // ---- Padrão 4: filha, escola e regras ----
  { id:"c-rl-p1", category:"rules", prompt:"I didn't buy the game, ___ it is too violent for her age.",
    options:["especially why","specially because","especially because","especially that"], correct:2,
    explanations:[
      "Errado. O motivo vem com 'because'.",
      "Errado. 'specially' é 'de propósito, para um fim específico'.",
      "Correto! especially because — sobretudo porque.",
      "Errado. 'especially that' não introduz motivo."
    ]},
  { id:"c-rl-p2", category:"rules", prompt:"Smoking is ___ inside the building.",
    options:["forbidden","forbid","forbade","forbidding"], correct:0,
    explanations:[
      "Correto! is forbidden — proibido. Forbid → forbade → forbidden.",
      "Errado. Depois de 'is' vem o particípio.",
      "Errado. 'forbade' é o passado simples.",
      "Errado. O -ing daria ideia de quem proíbe, não do que é proibido."
    ]},
  { id:"c-rl-p3", category:"rules", prompt:"My daughter has lunch ___ and dinner at home.",
    options:["in the school","at school","on the school","at a school"], correct:1,
    explanations:[
      "Errado. Com artigo a frase fala do prédio.",
      "Correto! at school — sem artigo, como at home e at work.",
      "Errado. 'on' não se usa com school.",
      "Errado. 'a school' seria uma escola qualquer."
    ]},
  { id:"c-rl-p4", category:"rules", prompt:"He dropped the glass and ___ in front of everyone.",
    options:["broke","breaked it","broke it","broke him"], correct:2,
    explanations:[
      "Errado. Falta o objeto: quebrou o quê?",
      "Errado. 'break' é irregular: broke.",
      "Correto! broke it — passado de break, com o objeto 'it'.",
      "Errado. 'him' é para pessoas."
    ]},
  { id:"c-rl-p5", category:"rules", prompt:"Many ___ checking the phone as soon as they wake up.",
    options:["young people have the habit to","young people has the habit of","young peoples have the habit of","young people have the habit of"], correct:3,
    explanations:[
      "Errado. Depois de 'habit' vem 'of' + verbo com -ing.",
      "Errado. Com 'people' o verbo é 'have'.",
      "Errado. 'people' já é plural.",
      "Correto! have the habit of checking — ter o hábito de fazer algo."
    ]},

  // ---- Padrão 5: acessibilidade e conhecimento ----
  { id:"c-ac-p1", category:"access", prompt:"My neighbor is ___, so we talk using sign language.",
    options:["death","deafs","deaf","deft"], correct:2,
    explanations:[
      "Errado. 'death' é o substantivo 'morte'.",
      "Errado. Adjetivo em inglês não vai para o plural.",
      "Correto! deaf — surdo, terminado em -f.",
      "Errado. 'deft' é hábil, destro."
    ]},
  { id:"c-ac-p2", category:"access", prompt:"In some regions many adults are still ___ and can't read a bill.",
    options:["illiterate","iliterate","illiterated","unliterate"], correct:0,
    explanations:[
      "Correto! illiterate — analfabeto, com dois L.",
      "Errado. Falta um L.",
      "Errado. Não é particípio; o adjetivo não leva -d.",
      "Errado. O prefixo é 'il-'."
    ]},
  { id:"c-ac-p3", category:"access", prompt:"He explained the diagnosis in simple words, for ___.",
    options:["a lay","laics","laypeople","layman people"], correct:2,
    explanations:[
      "Errado. 'lay' é adjetivo: a lay audience.",
      "Errado. 'laic' praticamente não se usa nesse sentido.",
      "Correto! laypeople — os leigos, quem não é da área. No singular, a layperson.",
      "Errado. 'layman' já é a pessoa; 'people' fica redundante."
    ]},
  { id:"c-ac-p4", category:"access", prompt:"Escolha a frase correta:",
    options:["The video has subtitles for death people.","The video has subtitles for deaf people.","The video has subtitles for deafs people.","The video has subtitles for the deft."], correct:1,
    explanations:[
      "Errado. 'death' é 'morte' — a troca de escrita mais comum.",
      "Correto! deaf people — e também vale 'people who are deaf'.",
      "Errado. Adjetivo não recebe -s no plural.",
      "Errado. 'deft' significa hábil."
    ]},

  // ---- Padrão 6: dia a dia e dinheiro ----
  { id:"c-dy-p1", category:"daily", prompt:"The ___ says it's going to rain tomorrow.",
    options:["time forecast","weather prevision","weather forecast","whether forecast"], correct:2,
    explanations:[
      "Errado. 'time' é hora, não o tempo meteorológico.",
      "Errado. 'prevision' não existe nesse uso.",
      "Correto! the weather forecast — a previsão do tempo.",
      "Errado. 'whether' é 'se', de dúvida."
    ]},
  { id:"c-dy-p2", category:"daily", prompt:"The small shop only accepts ___, so bring some money.",
    options:["cash","cashes","the cash","money cash"], correct:0,
    explanations:[
      "Correto! accepts cash — dinheiro em espécie, incontável e sem artigo.",
      "Errado. 'cash' não tem plural.",
      "Errado. Aqui a ideia é geral, sem artigo.",
      "Errado. 'cash' sozinho já diz tudo."
    ]},
  { id:"c-dy-p3", category:"daily", prompt:"Companies pay high ___ when they import equipment.",
    options:["taxs","rates","taxes","fees"], correct:2,
    explanations:[
      "Errado. Palavra terminada em -x faz plural com -es.",
      "Errado. 'rate' é taxa no sentido de índice (exchange rate).",
      "Correto! taxes — impostos.",
      "Errado. 'fee' é taxa de serviço, não imposto."
    ]},
  { id:"c-dy-p4", category:"daily", prompt:"The noise from the street ___ me while I study.",
    options:["disturbs","disturb","disturbe","disturbs to"], correct:0,
    explanations:[
      "Correto! The noise disturbs me — sujeito no singular, verbo com -s.",
      "Errado. 'noise' é singular, então o verbo leva -s.",
      "Errado. A grafia é 'disturb', sem -e.",
      "Errado. 'disturb' não leva preposição antes do objeto."
    ]},
  { id:"c-dy-p5", category:"daily", prompt:"The salary is low, but ___, the company is great.",
    options:["apart that","a part from that","apart of that","apart from that"], correct:3,
    explanations:[
      "Errado. Falta o 'from'.",
      "Errado. 'apart' é uma palavra só.",
      "Errado. A preposição é 'from', não 'of'.",
      "Correto! apart from that — fora isso, tirando isso."
    ]},
  { id:"c-dy-p6", category:"daily", prompt:"This project is ___ as the last one, so I sleep well.",
    options:["not as demanding","not as demanding than","not more demanding","not as demand"], correct:0,
    explanations:[
      "Correto! not as demanding as — comparação de igualdade na negativa: não é tão exigente quanto.",
      "Errado. Com 'as ... as' não entra 'than'.",
      "Errado. 'more' pediria 'than', e a frase continua com 'as'.",
      "Errado. Falta o -ing: demanding."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
