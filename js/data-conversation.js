/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado no feedback da 4ª rodada de prática (tema: tecnologia,
   computadores e acessórios de trabalho).

   Já consolidados nas rodadas anteriores e, por isso, fora deste
   banco: sujeito 'it' em clima/horário, 'at' com horário, 'on' com
   dias, posição de always/never, 'be into', muitos/muitas
   (much/many com relatives) e responder exatamente o que foi
   perguntado.

   Atenção ao Padrão 1: o "-s" da 3ª pessoa do singular apareceu
   2× nesta rodada e 1× na rodada de família (my family celebrate).
   É o padrão mais persistente e por isso abre o módulo.
   ============================================================ */

const CONV_CATEGORIES = {
  thirds:      { label: "Verbo com '-s' na 3ª pessoa (padrão persistente)", tag: "Padrão 1" },
  subjectverb: { label: "Sujeito 'it' + make (não 'become')",               tag: "Padrão 2" },
  article:     { label: "Artigo 'a' com substantivo contável",              tag: "Padrão 3" },
  uncount:     { label: "'stuff' é incontável (much / things)",             tag: "Padrão 4" },
  usedto:      { label: "'be used to' — estar acostumado",                  tag: "Padrão 5" },
  toverb:      { label: "Depois de adjetivo: 'to + verbo' ou -ing",         tag: "Padrão 6" },
  collocation: { label: "'take a course' (colocações com take/do/make)",    tag: "Padrão 7" },
  prepinstr:   { label: "Preposição de instrumento: with / on",             tag: "Padrão 8" },
  spelling:    { label: "Ortografia e maiúsculas",                          tag: "Padrão 9" },
  vocab:       { label: "Vocabulário da lição (computador e acessórios)",   tag: "Extra" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: "-s" da 3ª pessoa do singular ----
  { id:"c-3s-t1", category:"thirds", prompt:"The company ___ me a desktop and a laptop.", options:["give","gives","giving","is give"], correct:1,
    explanations:[
      "Errado. Este foi o seu erro nesta rodada: 'the company give me'. 'The company' é 3ª pessoa do singular (= it).",
      "Correto! He / She / It / nome singular → verbo + s no presente simples: the company gives.",
      "Errado. O gerúndio sozinho não forma o presente simples.",
      "Errado. Não se usa o verbo to be junto do verbo principal no presente simples."
    ]},
  { id:"c-3s-t2", category:"thirds", prompt:"My personal desktop ___ at home all day.", options:["stay","stays","staying","are stay"], correct:1,
    explanations:[
      "Errado. Foi o seu outro erro do mesmo tipo: 'my personal desktop stay at home'.",
      "Correto! 'My desktop' equivale a 'it' → stays. Este é o padrão que mais resiste na sua fala.",
      "Errado. Falta o verbo conjugado; o gerúndio sozinho não se sustenta.",
      "Errado. 'are' é plural e ainda deixaria o verbo principal sem conjugação."
    ]},
  { id:"c-3s-t3", category:"thirds", prompt:"My battery ___ about five hours.", options:["last","lasts","lasting","is last"], correct:1,
    explanations:[
      "Errado. 'my battery' = it, então o verbo leva -s.",
      "Correto! My battery lasts — mesma regra de gives e stays.",
      "Errado. O gerúndio não substitui o presente simples aqui.",
      "Errado. Não se combina o to be com o verbo principal no presente simples."
    ]},
  { id:"c-3s-t4", category:"thirds", prompt:"My family ___ my birthday every year.", options:["celebrate","celebrates","celebrating","are celebrate"], correct:1,
    explanations:[
      "Errado. Este erro já tinha aparecido na rodada de família: 'my family celebrate'.",
      "Correto! 'My family' é um grupo tratado como singular em inglês americano: my family celebrates.",
      "Errado. O gerúndio sozinho não forma o presente simples.",
      "Errado. O to be não acompanha o verbo principal no presente simples."
    ]},
  { id:"c-3s-t5", category:"thirds", prompt:"Escolha a frase correta:", options:["The screen show the dashboard very well.","The screen shows the dashboard very well.","The screen showing the dashboard very well.","The screen do show the dashboard very well."], correct:1,
    explanations:[
      "Errado. 'The screen' é singular (= it) e o verbo precisa do -s.",
      "Correto! The screen shows — guarde a série: gives, stays, lasts, shows, celebrates.",
      "Errado. Falta o verbo conjugado.",
      "Errado. 'do show' serviria só para dar ênfase, e com 'it' seria 'does', não 'do'."
    ]},
  { id:"c-3s-t6", category:"thirds", prompt:"A desktop ___ have a battery.", options:["don't","doesn't","doesn't has","not"], correct:1,
    explanations:[
      "Errado. 'don't' é para I / you / we / they.",
      "Correto! Na negativa o -s migra para o auxiliar: it doesn't have (e o verbo principal fica no infinitivo).",
      "Errado. O -s aparece só uma vez: ou em 'does', ou no verbo — nunca nos dois.",
      "Errado. Sem auxiliar a negativa não se forma no presente simples."
    ]},

  // ---- Padrão 2: sujeito 'it' + make (não 'become') ----
  { id:"c-mk-t1", category:"subjectverb", prompt:"A big screen ___ me more productive.", options:["become me","makes","make","is make"], correct:1,
    explanations:[
      "Errado. Foi exatamente o seu erro: 'become me more productive' — falta o sujeito e o verbo está trocado.",
      "Correto! make = fazer alguém ficar de um jeito. E 'a big screen' é singular, então: makes.",
      "Errado. O verbo está certo, mas falta o -s da 3ª pessoa do singular.",
      "Errado. O to be não acompanha o verbo principal no presente simples."
    ]},
  { id:"c-mk-t2", category:"subjectverb", prompt:"___ makes me more productive to work with two monitors.", options:["Is","It","Become","Has"], correct:1,
    explanations:[
      "Errado. A frase ficaria sem sujeito — o mesmo problema da conversa.",
      "Correto! Toda frase em inglês precisa de sujeito, e aqui ele é o 'it' vazio.",
      "Errado. 'become' não é sujeito e nem cabe nesta estrutura.",
      "Errado. 'has' não é sujeito."
    ]},
  { id:"c-mk-t3", category:"subjectverb", prompt:"Escolha a frase correta:", options:["Become me more productive.","It makes me more productive.","It make me more productive.","It becomes me more productive."], correct:1,
    explanations:[
      "Errado. Foi assim que a frase saiu na conversa: sem sujeito e com o verbo errado.",
      "Correto! It makes me more productive — sujeito 'it' + make com -s.",
      "Errado. Falta o -s: com 'it' o verbo é makes.",
      "Errado. 'become' significa tornar-se e não leva objeto como 'me' nessa estrutura."
    ]},
  { id:"c-mk-t4", category:"subjectverb", prompt:"I studied a lot and ___ a data analyst.", options:["became","made","make me","become me"], correct:0,
    explanations:[
      "Correto! Aqui sim é become: tornar-se algo. I became a data analyst.",
      "Errado. 'made' seria fabricar/fazer algo, não mudar de profissão.",
      "Errado. 'make me' pediria um adjetivo depois (makes me productive).",
      "Errado. 'become' não leva 'me' nesta estrutura."
    ]},
  { id:"c-mk-t5", category:"subjectverb", prompt:"The second monitor ___ my work faster.", options:["become","makes","make","becomes"], correct:1,
    explanations:[
      "Errado. 'become' é tornar-se; aqui algo faz o seu trabalho ficar mais rápido.",
      "Correto! makes my work faster — make + objeto + adjetivo, com -s porque o sujeito é singular.",
      "Errado. O verbo está certo, mas falta o -s da 3ª pessoa.",
      "Errado. 'becomes' diria que o monitor se torna o seu trabalho."
    ]},

  // ---- Padrão 3: artigo 'a' com contável ----
  { id:"c-ar-t1", category:"article", prompt:"It's ___ desktop, not a laptop.", options:["-","a","the","an"], correct:1,
    explanations:[
      "Errado. Este foi o seu erro: 'It's desktop'. Contável no singular nunca fica sem artigo.",
      "Correto! It's a desktop — a desktop, a laptop, a phone.",
      "Errado. 'the' apontaria para um desktop específico já citado na conversa.",
      "Errado. 'an' só antes de som de vogal (an engineer, an app)."
    ]},
  { id:"c-ar-t2", category:"article", prompt:"Escolha a frase correta:", options:["I have laptop at home.","I have a laptop at home.","I have the laptop at home.","I have any laptop at home."], correct:1,
    explanations:[
      "Errado. Falta o artigo: 'laptop' é contável e está no singular.",
      "Correto! I have a laptop — primeira menção de algo contável pede 'a'.",
      "Errado. 'the' indicaria um laptop já conhecido pelos dois na conversa.",
      "Errado. 'any' aparece em perguntas e negativas."
    ]},
  { id:"c-ar-t3", category:"article", prompt:"I need ___ new phone because mine is very slow.", options:["-","a","the","some"], correct:1,
    explanations:[
      "Errado. 'phone' é contável e no singular exige artigo.",
      "Correto! a new phone — o artigo vem antes do adjetivo + substantivo.",
      "Errado. 'the' só se o telefone já tivesse sido mencionado.",
      "Errado. 'some' acompanha plural ou incontável (some apps, some stuff)."
    ]},
  { id:"c-ar-t4", category:"article", prompt:"My computer has ___ big screen.", options:["-","a","the","any"], correct:1,
    explanations:[
      "Errado. 'screen' é contável e não fica sozinha no singular.",
      "Correto! a big screen — mesma regra de a desktop e a laptop.",
      "Errado. 'the' indicaria uma tela específica já citada.",
      "Errado. 'any' é para perguntas e negativas."
    ]},

  // ---- Padrão 4: 'stuff' é incontável ----
  { id:"c-un-t1", category:"uncount", prompt:"I don't carry ___ stuff in my bag.", options:["many","much","manys","a many"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'not many stuffs'. 'many' só acompanha contáveis no plural.",
      "Correto! stuff é incontável → not much stuff.",
      "Errado. 'manys' não existe em inglês.",
      "Errado. 'a many' não existe."
    ]},
  { id:"c-un-t2", category:"uncount", prompt:"Escolha a frase correta:", options:["Not many stuffs.","Not much stuff.","Not many stuff.","Not much stuffs."], correct:1,
    explanations:[
      "Errado. Foi assim que a frase saiu: 'stuff' nunca vai para o plural.",
      "Correto! Not much stuff — incontável usa 'much' e fica sempre no singular.",
      "Errado. 'many' não combina com incontável.",
      "Errado. 'stuffs' não existe."
    ]},
  { id:"c-un-t3", category:"uncount", prompt:"I carry a few ___ in my backpack: a charger, my earphones and a notebook.", options:["stuffs","things","stuff","much things"], correct:1,
    explanations:[
      "Errado. 'stuff' não tem plural.",
      "Correto! Se você quiser contar no plural, a palavra é things: a few things, many things.",
      "Errado. 'a few' pede um contável no plural, e 'stuff' é incontável.",
      "Errado. 'much' não acompanha contáveis no plural."
    ]},
  { id:"c-un-t4", category:"uncount", prompt:"There ___ a lot of stuff on my desk.", options:["are","is","have","were"], correct:1,
    explanations:[
      "Errado. Como 'stuff' é incontável, o verbo fica no singular.",
      "Correto! There is a lot of stuff — incontável leva verbo no singular (com 'things' seria 'there are').",
      "Errado. Para dizer que algo existe, o inglês usa there is / there are, não 'have'.",
      "Errado. 'were' é passado plural e não descreve a sua mesa agora."
    ]},

  // ---- Padrão 5: be used to ----
  { id:"c-ut-t1", category:"usedto", prompt:"I work with two monitors, so I'm ___ it.", options:["use to","used to","using to","use of"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'I'm use to it'. A expressão sempre leva o -d.",
      "Correto! be used to = estar acostumado. I'm used to it.",
      "Errado. 'using to' não existe nessa expressão.",
      "Errado. 'use of' tem outro sentido (o uso de algo)."
    ]},
  { id:"c-ut-t2", category:"usedto", prompt:"Escolha a frase correta:", options:["I'm use to it.","I'm used to it.","I used to it.","I'm used it."], correct:1,
    explanations:[
      "Errado. Foi assim que você escreveu; falta o -d em 'used'.",
      "Correto! I'm used to it — verbo to be + used to.",
      "Errado. Sem o verbo to be a frase muda de sentido (used to = costumava, no passado).",
      "Errado. Falta o 'to' da expressão."
    ]},
  { id:"c-ut-t3", category:"usedto", prompt:"I ___ my laptop for online meetings.", options:["'m used","use","used to","'m use to"], correct:1,
    explanations:[
      "Errado. Aqui você não está dizendo que se acostumou, e sim o que faz no dia a dia.",
      "Correto! Cuidado para não confundir: I use it = eu uso. I'm used to it = estou acostumado.",
      "Errado. 'used to' fala de um hábito que existia no passado e acabou.",
      "Errado. Além de faltar o -d, a expressão não cabe no sentido da frase."
    ]},
  { id:"c-ut-t4", category:"usedto", prompt:"She isn't used to ___ from home yet.", options:["work","working","works","to work"], correct:1,
    explanations:[
      "Errado. Depois de 'used to' (acostumado) o verbo vai para o gerúndio.",
      "Correto! be used to + -ing: used to working, used to using two screens.",
      "Errado. O verbo não se conjuga depois de 'to' nesta expressão.",
      "Errado. Não se repete o 'to': a expressão já termina em 'to'."
    ]},

  // ---- Padrão 6: verbo depois de 'it's + adjetivo' ----
  { id:"c-tv-t1", category:"toverb", prompt:"It's weird ___ with only one monitor.", options:["work","to work","works","worked"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'it's weird work with only one'. Falta o 'to'.",
      "Correto! Depois de adjetivo o segundo verbo pede 'to': it's weird to work.",
      "Errado. O verbo não se conjuga nessa posição.",
      "Errado. O passado não cabe: você fala de uma situação em geral."
    ]},
  { id:"c-tv-t2", category:"toverb", prompt:"Qual frase também está correta, com o verbo no gerúndio?", options:["It's weird work with only one.","It's weird working with only one.","It's weird to working with only one.","It's weird works with only one."], correct:1,
    explanations:[
      "Errado. Esta é justamente a versão sem 'to' e sem gerúndio.",
      "Correto! As duas formas valem: it's weird to work ou it's weird working.",
      "Errado. Ou 'to' + verbo, ou o gerúndio — nunca os dois juntos.",
      "Errado. O verbo conjugado não cabe depois do adjetivo."
    ]},
  { id:"c-tv-t3", category:"toverb", prompt:"It's easy ___ dashboards on a big screen.", options:["read","to read","reads","for read"], correct:1,
    explanations:[
      "Errado. Falta o 'to' depois do adjetivo.",
      "Correto! It's easy to read — a estrutura é it's + adjetivo + to + verbo.",
      "Errado. O verbo conjugado não cabe nessa posição.",
      "Errado. 'for' seria seguido de gerúndio (useful for reading), não de verbo no infinitivo."
    ]},
  { id:"c-tv-t4", category:"toverb", prompt:"Escolha a frase correta:", options:["It's difficult work without a mouse.","It's difficult to work without a mouse.","It's difficult works without a mouse.","It's difficult for work without a mouse."], correct:1,
    explanations:[
      "Errado. Sem o 'to', 'work' parece o substantivo trabalho e a frase muda de sentido.",
      "Correto! It's difficult to work — ou, no gerúndio, it's difficult working.",
      "Errado. O verbo não se conjuga depois do adjetivo.",
      "Errado. Depois de 'for' o verbo iria para o gerúndio: for working."
    ]},

  // ---- Padrão 7: colocações com take / do / make ----
  { id:"c-co-t1", category:"collocation", prompt:"I want to ___ some courses to improve my English.", options:["make","take","made","making"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'make some courses'. Em inglês não se 'faz' um curso com make.",
      "Correto! take some courses (ou do some courses) — a colocação certa é com take.",
      "Errado. Além do verbo errado, 'made' está no passado depois de 'to'.",
      "Errado. Depois de 'want to' o verbo vem no infinitivo."
    ]},
  { id:"c-co-t2", category:"collocation", prompt:"Escolha a frase correta:", options:["I make a course about Power BI.","I take a course about Power BI.","I do a course of Power BI.","I make courses about Power BI."], correct:1,
    explanations:[
      "Errado. 'make a course' é tradução direta do português e não existe em inglês.",
      "Correto! take a course — e repare no artigo 'a', que também estava faltando na sua conversa.",
      "Errado. 'do a course' existe no inglês britânico, mas a preposição aqui seria 'in/on', não 'of'.",
      "Errado. O verbo continua errado, mesmo no plural."
    ]},
  { id:"c-co-t3", category:"collocation", prompt:"I ___ an English test last month.", options:["made","took","did make","make"], correct:1,
    explanations:[
      "Errado. 'make a test' não é usado nesse sentido em inglês.",
      "Correto! take a test, take a course, take a class — tudo com take.",
      "Errado. 'did make' só serviria para dar ênfase e o verbo continua errado.",
      "Errado. A frase está no passado ('last month')."
    ]},
  { id:"c-co-t4", category:"collocation", prompt:"I always ___ my homework before the English class.", options:["make","do","take","have"], correct:1,
    explanations:[
      "Errado. Com 'homework' o verbo é do, não make.",
      "Correto! do my homework, do the dishes — e make a mistake, take a course. São combinações fixas.",
      "Errado. 'take' vai com course, test, class, bus — não com homework.",
      "Errado. 'have homework' significa ter lição de casa, não fazê-la."
    ]},

  // ---- Padrão 8: preposição de instrumento ----
  { id:"c-pr-t1", category:"prepinstr", prompt:"I can study English ___ my phone.", options:["through","on","at","of"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'through it I can study'. 'through' é atravessar algo.",
      "Correto! Para aparelhos e telas o inglês usa 'on': on my phone, on my laptop.",
      "Errado. 'at' é para horários e lugares (at home, at 6 p.m.).",
      "Errado. 'of' indica posse ou pertencimento."
    ]},
  { id:"c-pr-t2", category:"prepinstr", prompt:"___ my laptop I can work anywhere.", options:["Through","With","By the","In"], correct:1,
    explanations:[
      "Errado. 'through' significa atravessando, e não cabe para ferramentas.",
      "Correto! Para instrumento/ferramenta use 'with': with my laptop.",
      "Errado. 'by' nesse sentido não leva artigo e serve para meio de transporte (by bus).",
      "Errado. 'in my laptop' diria dentro do aparelho."
    ]},
  { id:"c-pr-t3", category:"prepinstr", prompt:"We walked ___ the park to get to the office.", options:["with","through","on","at"], correct:1,
    explanations:[
      "Errado. 'with' é para ferramenta ou companhia.",
      "Correto! Aqui sim é 'through': atravessar um espaço — through the park, through the door.",
      "Errado. 'on' seria a superfície (on the street).",
      "Errado. 'at' marcaria o ponto, não o trajeto atravessado."
    ]},
  { id:"c-pr-t4", category:"prepinstr", prompt:"Escolha a frase correta:", options:["Through it I can study at night.","I can study on it at night.","In it I can study at night.","By it I can study at night."], correct:1,
    explanations:[
      "Errado. Foi assim que a frase saiu na conversa.",
      "Correto! I can study on it — ou with it. São as opções naturais para ferramenta.",
      "Errado. 'in it' diria dentro do aparelho.",
      "Errado. 'by it' soa como 'ao lado dele'."
    ]},

  // ---- Padrão 9: ortografia e maiúsculas ----
  { id:"c-sp-t1", category:"spelling", prompt:"I work with ___ every day.", options:["tecnology","technology","thecnology","technolgy"], correct:1,
    explanations:[
      "Errado. Foi assim que você escreveu, duas vezes: falta o 'h'.",
      "Correto! t-e-c-h-n-o-l-o-g-y — em inglês tem 'ch', como em technical e technique.",
      "Errado. O 'h' vem depois do 'c', não antes.",
      "Errado. Falta o 'o' antes do 'g'."
    ]},
  { id:"c-sp-t2", category:"spelling", prompt:"My laptop has ___ I need for work.", options:["everithing","everything","every thing","everthing"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: não existe 'i' nessa palavra.",
      "Correto! every + thing = everything, tudo junto e com 'y'.",
      "Errado. Neste sentido a palavra é escrita junto.",
      "Errado. Falta o 'y' de 'every'."
    ]},
  { id:"c-sp-t3", category:"spelling", prompt:"I go to the office by ___ every morning.", options:["onibus","ônibus","bus","buss"], correct:2,
    explanations:[
      "Errado. 'onibus' é português escrito sem acento — e em inglês a palavra é outra.",
      "Errado. Em português o certo é 'ônibus' com acento, mas aqui a frase é em inglês.",
      "Correto! Em inglês é bus: I go by bus. Cuidado com o português entrando no meio da frase.",
      "Errado. 'bus' tem um 's' só."
    ]},
  { id:"c-sp-t4", category:"spelling", prompt:"Escolha a frase correta:", options:["My favorite? for sure, my computer!","My favorite? For sure, my computer!","My favorite? for Sure, my computer!","my favorite? For sure, my computer!"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: depois de ponto (ou de interrogação) começa frase nova, com maiúscula.",
      "Correto! For sure, my computer! — início de frase sempre com maiúscula.",
      "Errado. A maiúscula ficou na palavra errada.",
      "Errado. Falta a maiúscula no começo da primeira frase."
    ]},
  { id:"c-sp-t5", category:"spelling", prompt:"Escolha a frase correta:", options:["It helps me improve my knowledge. as a data analyst, I use English every day.","It helps me improve my knowledge. As a data analyst, I use English every day.","it helps me improve my knowledge. As a data analyst, I use English every day.","It helps me improve my knowledge. As a Data Analyst, I use English every day."], correct:1,
    explanations:[
      "Errado. Depois do ponto final a próxima palavra vai com maiúscula.",
      "Correto! Foi exatamente assim que você escreveu na conversa — esta parte estava certa. Mantenha o padrão.",
      "Errado. Falta a maiúscula no começo da primeira frase.",
      "Errado. Nomes de profissão são substantivos comuns e ficam em minúscula no meio da frase."
    ]},

  // ---- Extra: vocabulário da lição ----
  { id:"c-vo-t1", category:"vocab", prompt:"My desktop has a clear ___, so it's useful for reading dashboards.", options:["battery","screen","charger","cable"], correct:1,
    explanations:[
      "Errado. 'battery' é a bateria, e um desktop nem tem uma.",
      "Correto! screen = tela. Frase pronta para a aula: My desktop has a clear screen.",
      "Errado. 'charger' é o carregador.",
      "Errado. 'cable' é o cabo."
    ]},
  { id:"c-vo-t2", category:"vocab", prompt:"I ___ my phone and my earphones everywhere.", options:["carry","connect","charge","turn"], correct:0,
    explanations:[
      "Correto! carry = levar consigo. I carry my phone and my earphones everywhere.",
      "Errado. 'connect' é conectar uma coisa à outra.",
      "Errado. 'charge' é carregar a bateria.",
      "Errado. 'turn' sozinho não tem esse sentido (turn on/off = ligar/desligar)."
    ]},
  { id:"c-vo-t3", category:"vocab", prompt:"I don't carry my desktop because it's not ___.", options:["light","heavy","fast","clear"], correct:0,
    explanations:[
      "Correto! light = leve. I don't carry my desktop because it's not light.",
      "Errado. 'heavy' é pesado — dizer que não é pesado inverteria o sentido.",
      "Errado. 'fast' é rápido, não tem a ver com carregar o aparelho.",
      "Errado. 'clear' descreve a tela, não o peso."
    ]},
  { id:"c-vo-t4", category:"vocab", prompt:"My computer has a lot of ___, so it's fast.", options:["batteries","memory","screens","cables"], correct:1,
    explanations:[
      "Errado. Bateria não deixa o computador rápido.",
      "Correto! memory = memória, e é incontável: a lot of memory (nunca 'memories' neste sentido).",
      "Errado. Ter várias telas não é o que deixa o computador rápido.",
      "Errado. 'cables' são os cabos."
    ]},
  { id:"c-vo-t5", category:"vocab", prompt:"I ___ my headphones to the computer for meetings.", options:["connect","carry","charge","read"], correct:0,
    explanations:[
      "Correto! connect A to B = conectar. I connect my headphones to the computer.",
      "Errado. 'carry' é levar consigo, não ligar um ao outro.",
      "Errado. 'charge' é carregar a bateria.",
      "Errado. 'read' é ler."
    ]},
  { id:"c-vo-t6", category:"vocab", prompt:"A desktop doesn't have a battery — I need to connect it to ___.", options:["power","memory","light","stuff"], correct:0,
    explanations:[
      "Correto! connect it to power = ligar na tomada. Esta frase mostra domínio do vocabulário fazendo um contraste — leve pronta para a aula.",
      "Errado. 'memory' é a memória do aparelho.",
      "Errado. 'light' aqui seria luz, não energia elétrica da tomada.",
      "Errado. 'stuff' são coisas em geral."
    ]},
];

/* ================= PRÁTICA: ERROS DA CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1 ----
  { id:"c-3s-p1", category:"thirds", prompt:"My wife ___ a laptop for work.", options:["use","uses","using","are use"], correct:1,
    explanations:[
      "Errado. 'my wife' = she, então o verbo leva -s.",
      "Correto! My wife uses — He / She / It / nome singular → verbo + s.",
      "Errado. O gerúndio sozinho não forma o presente simples.",
      "Errado. O to be não acompanha o verbo principal no presente simples."
    ]},
  { id:"c-3s-p2", category:"thirds", prompt:"The screen ___ all the charts at the same time.", options:["show","shows","showing","do show"], correct:1,
    explanations:[
      "Errado. Falta o -s: 'the screen' equivale a 'it'.",
      "Correto! The screen shows — mesma regra de gives, stays e lasts.",
      "Errado. O gerúndio não substitui o presente simples.",
      "Errado. Com 'it' o auxiliar seria 'does', e ele só apareceria para dar ênfase."
    ]},
  { id:"c-3s-p3", category:"thirds", prompt:"Escolha a frase correta:", options:["My battery last four hours.","My battery lasts four hours.","My battery lasting four hours.","My battery are last four hours."], correct:1,
    explanations:[
      "Errado. 'my battery' é singular e o verbo precisa do -s.",
      "Correto! My battery lasts four hours.",
      "Errado. Falta o verbo conjugado.",
      "Errado. 'are' é plural e ainda deixaria o verbo principal solto."
    ]},
  { id:"c-3s-p4", category:"thirds", prompt:"My brother ___ in a big company, like me.", options:["work","works","working","is work"], correct:1,
    explanations:[
      "Errado. 'my brother' = he, então entra o -s.",
      "Correto! My brother works — repita a série em voz alta: works, gives, stays, lasts, shows.",
      "Errado. O gerúndio sozinho não forma o presente simples.",
      "Errado. O to be não acompanha o verbo principal aqui."
    ]},
  { id:"c-3s-p5", category:"thirds", prompt:"My phone ___ have a good camera.", options:["don't","doesn't","doesn't has","not"], correct:1,
    explanations:[
      "Errado. 'don't' é para I / you / we / they.",
      "Correto! Na negativa o -s vai para o auxiliar: it doesn't have.",
      "Errado. O -s aparece só uma vez: em 'does' ou no verbo, nunca nos dois.",
      "Errado. Sem auxiliar não se forma a negativa no presente simples."
    ]},
  { id:"c-3s-p6", category:"thirds", prompt:"___ your company give you a laptop?", options:["Do","Does","Is","Are"], correct:1,
    explanations:[
      "Errado. 'your company' é singular (= it), então o auxiliar é 'does'.",
      "Correto! Does your company give...? — com 'does' o verbo principal fica sem o -s.",
      "Errado. O verbo da frase é 'give', então a pergunta precisa de do/does.",
      "Errado. Além de ser o verbo errado, 'are' é plural."
    ]},

  // ---- Padrão 2 ----
  { id:"c-mk-p1", category:"subjectverb", prompt:"Two monitors ___ my work much easier.", options:["makes","make","becomes","is make"], correct:1,
    explanations:[
      "Errado. Aqui o sujeito é plural ('two monitors'), então o verbo fica sem -s.",
      "Correto! Two monitors make — o -s é só para he/she/it e nomes no singular.",
      "Errado. 'become' é tornar-se, não cabe nesta estrutura.",
      "Errado. O to be não acompanha o verbo principal no presente simples."
    ]},
  { id:"c-mk-p2", category:"subjectverb", prompt:"___ makes me tired to work with a small screen.", options:["Is","It","Become","Have"], correct:1,
    explanations:[
      "Errado. A frase ficaria sem sujeito.",
      "Correto! O 'it' vazio ocupa o lugar do sujeito: It makes me tired to work...",
      "Errado. 'become' não é sujeito.",
      "Errado. 'have' não é sujeito."
    ]},
  { id:"c-mk-p3", category:"subjectverb", prompt:"Coffee ___ me more focused in the morning.", options:["become","makes","make","becomes"], correct:1,
    explanations:[
      "Errado. 'become' significa tornar-se e não leva objeto como 'me'.",
      "Correto! makes me focused — make + objeto + adjetivo, com -s porque 'coffee' é singular.",
      "Errado. O verbo está certo, mas falta o -s.",
      "Errado. 'becomes me' não existe nessa estrutura."
    ]},
  { id:"c-mk-p4", category:"subjectverb", prompt:"After the course, I ___ a data analyst.", options:["made","became","become me","make"], correct:1,
    explanations:[
      "Errado. 'made' seria fabricar/fazer algo.",
      "Correto! become = tornar-se: I became a data analyst.",
      "Errado. 'become' não leva 'me' nesta estrutura.",
      "Errado. A frase está no passado e o verbo é outro."
    ]},
  { id:"c-mk-p5", category:"subjectverb", prompt:"Escolha a frase correta:", options:["Become me more focused.","It makes me more focused.","Makes me more focused.","It become me more focused."], correct:1,
    explanations:[
      "Errado. Falta o sujeito e o verbo está trocado — foi o padrão da sua conversa.",
      "Correto! It makes me more focused: sujeito 'it' + makes + objeto + adjetivo.",
      "Errado. Mesmo com o verbo certo, a frase continua sem sujeito.",
      "Errado. 'become' não cabe aqui e ainda faltaria o -s."
    ]},

  // ---- Padrão 3 ----
  { id:"c-ar-p1", category:"article", prompt:"It's ___ laptop, not a tablet.", options:["-","a","the","an"], correct:1,
    explanations:[
      "Errado. Contável no singular sempre precisa de artigo.",
      "Correto! It's a laptop — a mesma regra de 'It's a desktop'.",
      "Errado. 'the' apontaria para um laptop específico já citado.",
      "Errado. 'an' só antes de som de vogal."
    ]},
  { id:"c-ar-p2", category:"article", prompt:"I need ___ new charger for my phone.", options:["-","a","the","any"], correct:1,
    explanations:[
      "Errado. 'charger' é contável e está no singular.",
      "Correto! a new charger — o artigo vem antes do adjetivo.",
      "Errado. 'the' só se o carregador já fosse conhecido na conversa.",
      "Errado. 'any' é para perguntas e negativas."
    ]},
  { id:"c-ar-p3", category:"article", prompt:"Escolha a frase correta:", options:["On my desk I have computer and printer.","On my desk I have a computer and a printer.","On my desk I have the computer and the printer.","On my desk I have computer and a printer."], correct:1,
    explanations:[
      "Errado. Faltam os dois artigos.",
      "Correto! Cada contável no singular leva o seu artigo: a computer and a printer.",
      "Errado. 'the' indicaria objetos específicos já mencionados.",
      "Errado. Ainda falta o artigo antes de 'computer'."
    ]},
  { id:"c-ar-p4", category:"article", prompt:"She wants to buy ___ external monitor.", options:["a","an","-","the"], correct:1,
    explanations:[
      "Errado. 'external' começa com som de vogal.",
      "Correto! an external monitor — antes de som de vogal o artigo é 'an'.",
      "Errado. Contável no singular não fica sem artigo.",
      "Errado. 'the' apontaria para um monitor já conhecido."
    ]},

  // ---- Padrão 4 ----
  { id:"c-un-p1", category:"uncount", prompt:"How ___ stuff do you carry in your bag?", options:["many","much","manys","a lot"], correct:1,
    explanations:[
      "Errado. 'many' é só para contáveis no plural.",
      "Correto! How much stuff — incontável sempre com much.",
      "Errado. 'manys' não existe.",
      "Errado. 'how a lot' não existe; seria how much / how many."
    ]},
  { id:"c-un-p2", category:"uncount", prompt:"I don't have ___ things on my desk.", options:["much","many","a much","much of"], correct:1,
    explanations:[
      "Errado. 'things' é contável no plural, então não usa much.",
      "Correto! Com 'things' (contável) o certo é many: not many things.",
      "Errado. 'a much' não existe.",
      "Errado. 'much of' pediria um incontável específico depois."
    ]},
  { id:"c-un-p3", category:"uncount", prompt:"Escolha a frase correta:", options:["I have a lot of stuffs at home.","I have a lot of stuff at home.","I have many stuffs at home.","I have many stuff at home."], correct:1,
    explanations:[
      "Errado. 'stuff' nunca vai para o plural.",
      "Correto! a lot of stuff — 'a lot of' serve para contável e incontável.",
      "Errado. Erra duas vezes: o plural e o 'many'.",
      "Errado. 'many' não acompanha incontável."
    ]},
  { id:"c-un-p4", category:"uncount", prompt:"All my stuff ___ in this backpack.", options:["are","is","have","were"], correct:1,
    explanations:[
      "Errado. Como 'stuff' é incontável, o verbo vai no singular.",
      "Correto! All my stuff is — com 'things' seria 'all my things are'.",
      "Errado. Para dizer onde algo está, use o verbo to be.",
      "Errado. 'were' é passado plural."
    ]},

  // ---- Padrão 5 ----
  { id:"c-ut-p1", category:"usedto", prompt:"She's ___ working with two monitors.", options:["use to","used to","using to","use of"], correct:1,
    explanations:[
      "Errado. Falta o -d: a expressão é 'be used to'.",
      "Correto! She's used to working — acostumada, com o verbo seguinte no gerúndio.",
      "Errado. 'using to' não existe nessa expressão.",
      "Errado. 'use of' tem outro sentido."
    ]},
  { id:"c-ut-p2", category:"usedto", prompt:"I ___ this laptop every day at work.", options:["'m used to","use","used","'m use to"], correct:1,
    explanations:[
      "Errado. Aqui a frase diz o que você faz, não que você se acostumou.",
      "Correto! I use it = eu uso. Não confunda com I'm used to it = estou acostumado.",
      "Errado. 'used' sozinho jogaria a frase para o passado.",
      "Errado. Falta o -d e o sentido também não é esse."
    ]},
  { id:"c-ut-p3", category:"usedto", prompt:"Escolha a frase correta:", options:["I'm use to the new system.","I'm used to the new system.","I use to the new system.","I'm used the new system."], correct:1,
    explanations:[
      "Errado. Falta o -d em 'used' — foi o seu erro na conversa.",
      "Correto! I'm used to the new system.",
      "Errado. Sem o verbo to be a expressão não se forma.",
      "Errado. Falta o 'to' da expressão."
    ]},
  { id:"c-ut-p4", category:"usedto", prompt:"Are you ___ the new keyboard yet?", options:["use to","used to","using to","used"], correct:1,
    explanations:[
      "Errado. Sempre com -d: used to.",
      "Correto! Are you used to the new keyboard? — pergunta com o verbo to be na frente.",
      "Errado. 'using to' não existe nessa expressão.",
      "Errado. Falta o 'to' depois de 'used'."
    ]},

  // ---- Padrão 6 ----
  { id:"c-tv-p1", category:"toverb", prompt:"It's difficult ___ without a second screen.", options:["work","to work","works","for work"], correct:1,
    explanations:[
      "Errado. Sem o 'to', 'work' parece o substantivo trabalho.",
      "Correto! It's difficult to work — depois do adjetivo vem 'to' + verbo.",
      "Errado. O verbo não se conjuga nessa posição.",
      "Errado. Depois de 'for' o verbo iria para o gerúndio."
    ]},
  { id:"c-tv-p2", category:"toverb", prompt:"It's important ___ my files every week.", options:["save","to save","saves","for save"], correct:1,
    explanations:[
      "Errado. Falta o 'to'.",
      "Correto! It's important to save — ou, no gerúndio, it's important saving.",
      "Errado. O verbo conjugado não cabe aqui.",
      "Errado. Depois de 'for' usaríamos o gerúndio: for saving."
    ]},
  { id:"c-tv-p3", category:"toverb", prompt:"Escolha a frase correta, com o verbo no gerúndio:", options:["It's boring work alone.","It's boring working alone.","It's boring to working alone.","It's boring works alone."], correct:1,
    explanations:[
      "Errado. É a versão sem 'to' e sem gerúndio — exatamente o erro da conversa.",
      "Correto! It's boring working alone (ou it's boring to work alone).",
      "Errado. Ou 'to' + verbo, ou o gerúndio — nunca os dois.",
      "Errado. O verbo conjugado não cabe depois do adjetivo."
    ]},
  { id:"c-tv-p4", category:"toverb", prompt:"It's easy ___ my phone to the computer.", options:["connect","to connect","connects","for connect"], correct:1,
    explanations:[
      "Errado. Falta o 'to' depois do adjetivo.",
      "Correto! It's easy to connect — estrutura fixa: it's + adjetivo + to + verbo.",
      "Errado. O verbo não se conjuga nessa posição.",
      "Errado. Depois de 'for' o verbo viria no gerúndio: for connecting."
    ]},

  // ---- Padrão 7 ----
  { id:"c-co-p1", category:"collocation", prompt:"I want to ___ an online course about SQL.", options:["make","take","made","making"], correct:1,
    explanations:[
      "Errado. 'make a course' é tradução direta do português.",
      "Correto! take an online course (ou do an online course).",
      "Errado. Depois de 'to' o verbo fica no infinitivo, e o verbo certo é outro.",
      "Errado. Depois de 'want to' não se usa gerúndio."
    ]},
  { id:"c-co-p2", category:"collocation", prompt:"Escolha a frase correta:", options:["I made a course last year.","I took a course last year.","I make a course last year.","I did a course of English last year."], correct:1,
    explanations:[
      "Errado. 'make a course' não existe em inglês.",
      "Correto! I took a course last year — take no passado é took.",
      "Errado. Além do verbo errado, a frase está no passado.",
      "Errado. 'do a course' existe no inglês britânico, mas a preposição aqui não é 'of'."
    ]},
  { id:"c-co-p3", category:"collocation", prompt:"I ___ a lot of mistakes when I speak fast.", options:["do","make","take","have"], correct:1,
    explanations:[
      "Errado. Com 'mistake' o verbo é make.",
      "Correto! make a mistake — assim como make a decision e make a plan.",
      "Errado. 'take' vai com course, test, class, bus.",
      "Errado. 'have' não combina com 'mistakes' nesse sentido."
    ]},
  { id:"c-co-p4", category:"collocation", prompt:"Every night I ___ my homework before dinner.", options:["make","do","take","have"], correct:1,
    explanations:[
      "Errado. 'make homework' não existe.",
      "Correto! do my homework — guarde o trio: do homework, make mistakes, take courses.",
      "Errado. 'take' não combina com homework.",
      "Errado. 'have homework' é ter lição de casa, não fazê-la."
    ]},

  // ---- Padrão 8 ----
  { id:"c-pr-p1", category:"prepinstr", prompt:"I watch English videos ___ my tablet.", options:["through","on","at","of"], correct:1,
    explanations:[
      "Errado. 'through' é atravessar algo.",
      "Correto! Telas e aparelhos levam 'on': on my tablet, on TV, on my phone.",
      "Errado. 'at' é para horários e lugares.",
      "Errado. 'of' indica posse."
    ]},
  { id:"c-pr-p2", category:"prepinstr", prompt:"___ this app I can practice English every day.", options:["Through","With","By the","In"], correct:1,
    explanations:[
      "Errado. 'through' não serve para ferramenta.",
      "Correto! With this app — instrumento sempre com 'with'.",
      "Errado. 'by' aqui não leva artigo e serve para meio de transporte.",
      "Errado. 'in this app' diria dentro do aplicativo."
    ]},
  { id:"c-pr-p3", category:"prepinstr", prompt:"The cable goes ___ the hole in the desk.", options:["with","through","on","at"], correct:1,
    explanations:[
      "Errado. 'with' é ferramenta ou companhia.",
      "Correto! Aqui é o sentido original de 'through': atravessar — through the hole, through the door.",
      "Errado. 'on' seria em cima da mesa.",
      "Errado. 'at' marcaria um ponto, não o trajeto."
    ]},
  { id:"c-pr-p4", category:"prepinstr", prompt:"Escolha a frase correta:", options:["Through my laptop I study at night.","I study at night on my laptop.","In my laptop I study at night.","By my laptop I study at night."], correct:1,
    explanations:[
      "Errado. 'through' não cabe para ferramentas.",
      "Correto! on my laptop — ou with my laptop.",
      "Errado. 'in my laptop' seria dentro do aparelho.",
      "Errado. 'by my laptop' soa como 'ao lado do laptop'."
    ]},

  // ---- Padrão 9 ----
  { id:"c-sp-p1", category:"spelling", prompt:"I like to read about new ___.", options:["tecnologies","technologies","thecnologies","technolgies"], correct:1,
    explanations:[
      "Errado. Falta o 'h' — foi o erro que apareceu duas vezes na conversa.",
      "Correto! technology / technologies, sempre com 'ch'.",
      "Errado. O 'h' vem depois do 'c'.",
      "Errado. Falta o 'o' antes do 'g'."
    ]},
  { id:"c-sp-p2", category:"spelling", prompt:"___ is on my computer: my files, my photos and my work.", options:["Everithing","Everything","Every thing","Everthing"], correct:1,
    explanations:[
      "Errado. Não existe 'i' nessa palavra.",
      "Correto! Everything, tudo junto: every + thing.",
      "Errado. Neste sentido escreve-se junto.",
      "Errado. Falta o 'y' de 'every'."
    ]},
  { id:"c-sp-p3", category:"spelling", prompt:"I take the ___ to work every morning.", options:["onibus","ônibus","bus","buss"], correct:2,
    explanations:[
      "Errado. Isso é português, e ainda sem acento.",
      "Errado. 'ônibus' é a palavra em português; a frase aqui é em inglês.",
      "Correto! Em inglês é bus — e repare: take the bus, mais uma colocação com take.",
      "Errado. 'bus' tem um 's' só."
    ]},
  { id:"c-sp-p4", category:"spelling", prompt:"Escolha a frase correta:", options:["I love this laptop. for sure, it's my favorite.","I love this laptop. For sure, it's my favorite.","I love this laptop. for Sure, it's my favorite.","i love this laptop. For sure, it's my favorite."], correct:1,
    explanations:[
      "Errado. Depois do ponto final começa frase nova, com maiúscula.",
      "Correto! For sure, it's my favorite.",
      "Errado. A maiúscula ficou na palavra errada.",
      "Errado. Falta a maiúscula no começo da primeira frase."
    ]},
  { id:"c-sp-p5", category:"spelling", prompt:"Escolha a frase correta:", options:["I study every day. it helps me improve my knowledge.","I study every day. It helps me improve my knowledge.","I study every day, It helps me improve my knowledge.","i study every day. It helps me improve my knowledge."], correct:1,
    explanations:[
      "Errado. Falta a maiúscula depois do ponto.",
      "Correto! Ponto final encerra a frase; a próxima palavra vai com maiúscula.",
      "Errado. Com vírgula a frase continua, então 'it' ficaria em minúscula (e aqui o certo é ponto).",
      "Errado. 'i' é sempre maiúsculo em inglês e a frase começa com maiúscula."
    ]},

  // ---- Extra ----
  { id:"c-vo-p1", category:"vocab", prompt:"My laptop is ___, so I can carry it everywhere.", options:["light","heavy","clear","slow"], correct:0,
    explanations:[
      "Correto! light = leve. O contrário é heavy.",
      "Errado. 'heavy' é pesado, o contrário do que a frase diz.",
      "Errado. 'clear' descreve a tela, não o peso.",
      "Errado. 'slow' é lento."
    ]},
  { id:"c-vo-p2", category:"vocab", prompt:"I use ___ in online meetings so nobody hears the noise.", options:["headphones","a charger","memory","a cable"], correct:0,
    explanations:[
      "Correto! headphones (ou earphones) = fones de ouvido. Sempre no plural.",
      "Errado. 'charger' é o carregador.",
      "Errado. 'memory' é a memória do computador.",
      "Errado. 'cable' é o cabo."
    ]},
  { id:"c-vo-p3", category:"vocab", prompt:"My phone has a small ___, so reading dashboards is difficult.", options:["battery","screen","memory","charger"], correct:1,
    explanations:[
      "Errado. Uma bateria pequena afetaria a duração, não a leitura.",
      "Correto! screen = tela. A small screen / a clear screen / a big screen.",
      "Errado. 'memory' tem a ver com velocidade, não com o tamanho da tela.",
      "Errado. 'charger' é o carregador."
    ]},
  { id:"c-vo-p4", category:"vocab", prompt:"A desktop needs ___ from the wall; it doesn't have a battery.", options:["power","memory","stuff","light"], correct:0,
    explanations:[
      "Correto! power = energia elétrica. connect it to power / plug it into power.",
      "Errado. 'memory' é a memória do aparelho.",
      "Errado. 'stuff' são coisas em geral.",
      "Errado. 'light' é luz, não a energia da tomada."
    ]},
  { id:"c-vo-p5", category:"vocab", prompt:"This computer is fast because it has a lot of ___.", options:["memory","screens","cables","batteries"], correct:0,
    explanations:[
      "Correto! memory = memória, e é incontável: a lot of memory.",
      "Errado. Várias telas não deixam o computador mais rápido.",
      "Errado. 'cables' são os cabos.",
      "Errado. Bateria não tem relação com velocidade."
    ]},
  { id:"c-vo-p6", category:"vocab", prompt:"I ___ my charger in my backpack every day.", options:["carry","connect","charge","read"], correct:0,
    explanations:[
      "Correto! carry = levar consigo. I carry my charger in my backpack.",
      "Errado. 'connect' é ligar um aparelho a outro.",
      "Errado. 'charge' é carregar a bateria.",
      "Errado. 'read' é ler."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
