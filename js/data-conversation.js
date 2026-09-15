/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado no feedback da 3ª rodada de prática (mesmo tema: rotina
   em família).

   Já consolidados nas rodadas anteriores e, por isso, fora deste
   banco: at my parents' house, many relatives (much/many),
   on weekdays, barbecue (ortografia), verbo presente nas duas
   orações (I go... / my wife goes...) e falsos cognatos.

   Os 8 padrões abaixo são os erros que apareceram nesta rodada.
   ============================================================ */

const CONV_CATEGORIES = {
  itsubject: { label: "Sujeito 'it' vazio (frase sem sujeito)",     tag: "Padrão 1" },
  tobe:      { label: "Verbo 'to be' obrigatório",                  tag: "Padrão 2" },
  attime:    { label: "'at' com horário (não 'in')",                tag: "Padrão 3" },
  ondays:    { label: "'on' com dias (não 'during')",               tag: "Padrão 4" },
  article:   { label: "Artigo 'a' com substantivo contável",        tag: "Padrão 5" },
  alwayspos: { label: "Posição de 'always' e 'never'",              tag: "Padrão 6" },
  caps:      { label: "Maiúsculas, pontuação e ortografia",         tag: "Padrão 7" },
  answering: { label: "Responder exatamente o que foi perguntado",  tag: "Padrão 8" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: sujeito 'it' vazio ----
  { id:"c-it-t1", category:"itsubject", prompt:"On weekdays ___ always a rush in my house.", options:["is","it's","are","has"], correct:1,
    explanations:[
      "Errado. Este foi o seu erro: em português dizemos 'é sempre uma correria' sem sujeito, mas em inglês o verbo sozinho deixa a frase incompleta.",
      "Correto! Quando não existe um sujeito real, o inglês usa o 'it' vazio para ocupar esse lugar: it's always a rush.",
      "Errado. Além de faltar o sujeito, 'a rush' é singular e pediria 'is'.",
      "Errado. 'has' não substitui o verbo to be nem resolve a falta de sujeito."
    ]},
  { id:"c-it-t2", category:"itsubject", prompt:"But on weekends ___ calm at home.", options:["is","it's","are","there"], correct:1,
    explanations:[
      "Errado. A frase fica sem sujeito — foi exatamente o que aconteceu no seu 'on the weekends is calm'.",
      "Correto! 'it's calm' — o 'it' vazio segura o lugar do sujeito.",
      "Errado. Falta o sujeito, e 'calm' aqui descreve a situação no singular.",
      "Errado. 'there' sozinho não é sujeito; 'there is' serviria para dizer que algo existe, não como a situação está."
    ]},
  { id:"c-it-t3", category:"itsubject", prompt:"___ cold in the kitchen early in the morning.", options:["Is","It's","Has","Are"], correct:1,
    explanations:[
      "Errado. Sem sujeito a frase não se sustenta em inglês.",
      "Correto! Para clima, temperatura e horário o inglês sempre usa o 'it' vazio: it's cold, it's late.",
      "Errado. 'has' não é o verbo usado para descrever temperatura.",
      "Errado. Falta o sujeito e 'are' é plural."
    ]},
  { id:"c-it-t4", category:"itsubject", prompt:"We need to hurry because ___ late.", options:["is","it's","are","has"], correct:1,
    explanations:[
      "Errado. Depois de 'because' começa uma nova oração, que também precisa de sujeito.",
      "Correto! 'because it's late' — cada oração em inglês tem o seu próprio sujeito.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'has' não cabe aqui; a frase pede o verbo to be."
    ]},
  { id:"c-it-t5", category:"itsubject", prompt:"___ always a rush before the kids go to school.", options:["Is","It's","Are","Have"], correct:1,
    explanations:[
      "Errado. A frase começaria sem sujeito.",
      "Correto! It's always a rush. Repare também que 'always' vem depois do verbo to be.",
      "Errado. Falta o sujeito e 'a rush' é singular.",
      "Errado. 'have' não substitui o verbo to be nesta estrutura."
    ]},
  { id:"c-it-t6", category:"itsubject", prompt:"In December ___ hot in Brazil, so we stay in the pool.", options:["is","it's","are","there"], correct:1,
    explanations:[
      "Errado. Mesmo com 'In December' no começo, o sujeito da frase ainda está faltando.",
      "Correto! O 'it' vazio é obrigatório para falar de clima: it's hot, it's raining.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'there' sozinho não funciona como sujeito aqui."
    ]},

  // ---- Padrão 2: verbo 'to be' obrigatório ----
  { id:"c-be-t1", category:"tobe", prompt:"___ really into cooking with my family.", options:["I","I'm","I have","Me"], correct:1,
    explanations:[
      "Errado. Foi o seu erro em 'I really into it': sem verbo não existe frase em inglês.",
      "Correto! A expressão 'be into something' (gostar muito de algo) exige o verbo to be: I'm really into it.",
      "Errado. 'have' não combina com 'into' nesse sentido.",
      "Errado. 'me' é pronome objeto e a frase continuaria sem verbo."
    ]},
  { id:"c-be-t2", category:"tobe", prompt:"My wife ___ really into TV series about cooking.", options:["is","has","does","have"], correct:0,
    explanations:[
      "Correto! 'be into something' usa o verbo to be, e 'my wife' é singular: she is / my wife is.",
      "Errado. 'has' não é usado com 'into' para dizer que alguém gosta muito de algo.",
      "Errado. 'does' é auxiliar de perguntas e negativas, não o verbo da frase.",
      "Errado. Além de 'have' não caber aqui, o sujeito é singular."
    ]},
  { id:"c-be-t3", category:"tobe", prompt:"My kids ___ very tired on Friday nights.", options:["is","are","have","has"], correct:1,
    explanations:[
      "Errado. 'my kids' é plural e pede 'are'.",
      "Correto! O verbo to be é obrigatório para ligar o sujeito ao adjetivo: they are tired.",
      "Errado. Em inglês não se diz 'have tired'; cansaço é descrito com to be.",
      "Errado. 'has' é singular e também não cabe com adjetivo."
    ]},
  { id:"c-be-t4", category:"tobe", prompt:"___ you into sports?", options:["Do","Are","Have","Does"], correct:1,
    explanations:[
      "Errado. 'do' seria usado com um verbo comum (do you like...?), mas aqui o verbo é o próprio to be.",
      "Correto! Como a expressão é 'be into', a pergunta começa com o verbo to be: Are you into sports?",
      "Errado. 'have' não forma essa pergunta.",
      "Errado. 'does' é para he/she/it e, de novo, o verbo aqui é to be."
    ]},

  // ---- Padrão 3: 'at' com horário ----
  { id:"c-at-t1", category:"attime", prompt:"All of us wake up ___ the same time.", options:["in","at","on","for"], correct:1,
    explanations:[
      "Errado. Foi o seu erro nesta rodada: horário nunca leva 'in'.",
      "Correto! Horário sempre com 'at': at 6:50, at the same time, at noon.",
      "Errado. 'on' é para dias e datas (on Monday), não para horários.",
      "Errado. 'for' indica duração (for two hours), não o momento."
    ]},
  { id:"c-at-t2", category:"attime", prompt:"I leave home ___ 6:50 a.m. every day.", options:["in","at","on","to"], correct:1,
    explanations:[
      "Errado. Horas exatas não usam 'in'.",
      "Correto! Hora marcada pede 'at': at 6:50 a.m.",
      "Errado. 'on' acompanha dias e datas, não horas.",
      "Errado. 'to' indica destino, não horário."
    ]},
  { id:"c-at-t3", category:"attime", prompt:"My family and I have dinner together ___ night.", options:["in","at","on","by"], correct:1,
    explanations:[
      "Errado. 'night' é a exceção entre as partes do dia: não usa 'in'.",
      "Correto! 'at night' é fixo, assim como at noon e at midnight.",
      "Errado. 'on' só apareceria com uma data específica (on Monday night).",
      "Errado. 'by night' tem outro sentido e não indica a rotina."
    ]},
  { id:"c-at-t4", category:"attime", prompt:"The English class starts ___ noon.", options:["in","at","on","for"], correct:1,
    explanations:[
      "Errado. 'noon' é um horário, então não leva 'in'.",
      "Correto! at noon, at midnight, at 3 p.m. — todos com 'at'.",
      "Errado. 'on' é para dias e datas.",
      "Errado. 'for' indica por quanto tempo algo dura."
    ]},
  { id:"c-at-t5", category:"attime", prompt:"We have breakfast together ___ the morning.", options:["at","in","on","to"], correct:1,
    explanations:[
      "Errado. Cuidado para não corrigir demais: 'at' é para horários exatos, não para partes do dia.",
      "Correto! Partes do dia levam 'in': in the morning, in the afternoon, in the evening (só 'at night' foge à regra).",
      "Errado. 'on' é para dias e datas (on Monday morning), não para a parte do dia sozinha.",
      "Errado. 'to' indica direção, não tempo."
    ]},

  // ---- Padrão 4: 'on' com dias ----
  { id:"c-on-t1", category:"ondays", prompt:"___ weekdays my house is always a rush.", options:["During","On","Into","At"], correct:1,
    explanations:[
      "Errado. Este foi o seu erro: 'during the weekdays'. 'during' é para um período que se atravessa, não para dias da semana.",
      "Correto! Dias levam 'on': on weekdays, on Monday, on weekends.",
      "Errado. 'into' indica movimento para dentro de algo.",
      "Errado. 'at' é para horários, não para dias."
    ]},
  { id:"c-on-t2", category:"ondays", prompt:"We have a barbecue with my relatives ___ Saturdays.", options:["during","on","in","to"], correct:1,
    explanations:[
      "Errado. 'during' pediria um período (during the summer), não um dia da semana.",
      "Correto! on Saturdays, on Sundays — dias sempre com 'on'.",
      "Errado. 'in' é para meses, anos e estações (in July, in 2026).",
      "Errado. 'to' indica destino."
    ]},
  { id:"c-on-t3", category:"ondays", prompt:"My family goes to church ___ December 31st.", options:["during","on","in","at"], correct:1,
    explanations:[
      "Errado. Uma data exata não usa 'during'.",
      "Correto! Datas completas levam 'on': on December 31st, on March 5th.",
      "Errado. 'in December' funcionaria só com o mês sozinho, sem o dia.",
      "Errado. 'at' é para horários."
    ]},
  { id:"c-on-t4", category:"ondays", prompt:"The kids sleep a lot ___ the school holidays.", options:["on","during","at","to"], correct:1,
    explanations:[
      "Errado. 'on' é para dias e datas, não para um período inteiro.",
      "Correto! Aqui 'during' é a palavra certa: é um período que se atravessa (during the holidays, during the meeting).",
      "Errado. 'at' é para horários.",
      "Errado. 'to' indica destino, não tempo."
    ]},

  // ---- Padrão 5: artigo 'a' com contável ----
  { id:"c-ar-t1", category:"article", prompt:"Escolha a frase correta:", options:["Every Sunday we have barbecue together.","Every Sunday we have a barbecue together.","Every Sunday we have the barbecue together.","Every Sunday we have barbecues together at the same time."], correct:1,
    explanations:[
      "Errado. Foi o seu erro nesta rodada: sem artigo, 'barbecue' vira o alimento em geral, não o evento.",
      "Correto! Como evento, barbecue é contável e pede o artigo: we have a barbecue.",
      "Errado. 'the' indicaria um churrasco específico já mencionado antes.",
      "Errado. O plural muda o sentido e o final da frase não é natural aqui."
    ]},
  { id:"c-ar-t2", category:"article", prompt:"My wife and I have ___ meeting with the teacher tomorrow.", options:["-","a","the","some"], correct:1,
    explanations:[
      "Errado. 'meeting' é contável e não pode aparecer sozinho no singular.",
      "Correto! Substantivo contável no singular sempre precisa de artigo: a meeting.",
      "Errado. 'the' só se a reunião já tivesse sido mencionada antes.",
      "Errado. 'some' é usado com plural ou incontável (some meetings, some water)."
    ]},
  { id:"c-ar-t3", category:"article", prompt:"Escolha a frase correta:", options:["I have big family.","I have a big family.","I have the big family.","I have big families."], correct:1,
    explanations:[
      "Errado. 'family' no singular é contável e precisa de artigo.",
      "Correto! I have a big family — o artigo é obrigatório.",
      "Errado. 'the' indicaria uma família específica já conhecida na conversa.",
      "Errado. O plural diria que você tem várias famílias."
    ]},
  { id:"c-ar-t4", category:"article", prompt:"We usually take ___ walk around the neighborhood after dinner.", options:["-","a","the","any"], correct:1,
    explanations:[
      "Errado. 'walk' aqui é contável e não fica sozinho no singular.",
      "Correto! take a walk, take a shower, have a coffee — todas pedem o artigo.",
      "Errado. 'the' apontaria para uma caminhada específica já citada.",
      "Errado. 'any' é usado em perguntas e negativas."
    ]},

  // ---- Padrão 6: posição de always / never ----
  { id:"c-al-t1", category:"alwayspos", prompt:"Escolha a frase correta:", options:["On weekdays it always is a rush.","On weekdays it is always a rush.","On weekdays always it is a rush.","On weekdays it is a rush always."], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'always is'. Depois do verbo to be, o advérbio vem atrás, não na frente.",
      "Correto! Com o verbo to be a ordem é: verbo + always → it is always a rush.",
      "Errado. 'always' não abre a frase nessa estrutura.",
      "Errado. Jogar 'always' para o fim soa estranho em inglês."
    ]},
  { id:"c-al-t2", category:"alwayspos", prompt:"My kids ___ hungry after school.", options:["always are","are always","are, always","always"], correct:1,
    explanations:[
      "Errado. A ordem está invertida: o advérbio vem depois do to be.",
      "Correto! are always hungry — mesma regra de 'it is always a rush'.",
      "Errado. A vírgula não tem função aqui e quebra a frase.",
      "Errado. Sem o verbo to be a frase fica incompleta."
    ]},
  { id:"c-al-t3", category:"alwayspos", prompt:"I ___ at 6 a.m. to get ready for work.", options:["wake up always","always wake up","am always wake up","wake always up"], correct:1,
    explanations:[
      "Errado. Com verbos comuns o advérbio vem antes, não depois.",
      "Correto! Com verbos que não são o to be, 'always' vem antes do verbo: I always wake up.",
      "Errado. Aqui não existe verbo to be na frase.",
      "Errado. 'wake up' não se separa desse jeito."
    ]},
  { id:"c-al-t4", category:"alwayspos", prompt:"She ___ late on Mondays, because the traffic is heavy.", options:["never is","is never","never","is, never"], correct:1,
    explanations:[
      "Errado. A ordem está invertida, como em 'always is'.",
      "Correto! 'never' segue a mesma regra de 'always': depois do verbo to be.",
      "Errado. Sem o verbo to be a frase fica incompleta.",
      "Errado. A vírgula não cabe aqui."
    ]},

  // ---- Padrão 7: maiúsculas, pontuação e ortografia ----
  { id:"c-cp-t1", category:"caps", prompt:"Escolha a frase correta:", options:["On weekdays, Every morning is a rush.","On weekdays, every morning is a rush.","on weekdays, Every morning is a rush.","On Weekdays, Every Morning is a rush."], correct:1,
    explanations:[
      "Errado. Foi o seu erro: depois de vírgula a frase continua, então a palavra fica em minúscula.",
      "Correto! Vírgula não encerra a frase — só depois de ponto final se volta à maiúscula.",
      "Errado. O começo da frase precisa de maiúscula.",
      "Errado. Em inglês não se usa maiúscula em palavras comuns no meio da frase."
    ]},
  { id:"c-cp-t2", category:"caps", prompt:"Escolha a frase correta:", options:["I wake up at 6 a.m. during the week my house is a rush.","I wake up at 6 a.m. During the week, my house is a rush.","I wake up at 6 a.m. during the week, My house is a rush.","i wake up at 6 a.m. During the week, my house is a rush."], correct:1,
    explanations:[
      "Errado. Depois do ponto final começa uma frase nova, que pede maiúscula.",
      "Correto! Ponto final encerra a frase; a próxima palavra vai com maiúscula.",
      "Errado. Aqui a maiúscula apareceu no lugar errado, depois de vírgula.",
      "Errado. O 'i' inicial precisa de maiúscula (e 'I' é sempre maiúsculo em inglês)."
    ]},
  { id:"c-cp-t3", category:"caps", prompt:"Escolha a frase correta:", options:["I have many relatives, like Aunts, uncles and cousins.","I have many relatives, like aunts, uncles and cousins.","I have many Relatives, like Aunts, Uncles and Cousins.","i have many relatives, like aunts, uncles and cousins."], correct:1,
    explanations:[
      "Errado. Foi o seu erro: grau de parentesco não é nome próprio.",
      "Correto! aunt, uncle, cousin são substantivos comuns e vão em minúscula (só viram maiúscula antes do nome: Aunt Maria).",
      "Errado. Nenhuma dessas palavras leva maiúscula no meio da frase.",
      "Errado. Falta a maiúscula no início da frase."
    ]},
  { id:"c-cp-t4", category:"caps", prompt:"Escolha a resposta escrita corretamente:", options:["Yes, I do !","Yes, I do!","yes, i do!","Yes I do !"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: em inglês não existe espaço antes de ! ou ?.",
      "Correto! O ponto de exclamação vem colado na palavra: Yes, I do!",
      "Errado. Faltam as maiúsculas em 'Yes' e em 'I'.",
      "Errado. Falta a vírgula depois de 'Yes' e há espaço antes do '!'."
    ]},
  { id:"c-cp-t5", category:"caps", prompt:"Escolha a frase correta:", options:["On Sundays, usually My family and I cook together.","On Sundays, my family and I usually cook together.","On sundays, my family and i usually cook together.","On Sundays, My Family and I usually cook together."], correct:1,
    explanations:[
      "Errado. Foi o seu erro em 'usually My family': no meio da frase vai minúscula.",
      "Correto! Maiúscula só no início da frase e em nomes próprios — e 'usually' fica antes do verbo.",
      "Errado. Dias da semana são nomes próprios em inglês (Sunday) e 'I' é sempre maiúsculo.",
      "Errado. 'family' é substantivo comum e não leva maiúscula."
    ]},
  { id:"c-cp-t6", category:"caps", prompt:"We usually take a walk ___ the neighborhood after dinner.", options:["aroud","around","arround","arownd"], correct:1,
    explanations:[
      "Errado. Foi assim que você escreveu: falta o 'n' antes do 'd'.",
      "Correto! a-r-o-u-n-d. Vale repetir em voz alta separando as letras.",
      "Errado. 'around' tem um 'r' só.",
      "Errado. A grafia certa termina em -ound, como em sound e found."
    ]},

  // ---- Padrão 8: responder exatamente o que foi perguntado ----
  { id:"c-an-t1", category:"answering", prompt:"Pergunta: 'Tell me about a family tradition that is NOT on a holiday.' Qual resposta responde exatamente o que foi perguntado?", options:["On December 31st we all go to church together.","Every Sunday we have a barbecue at my parents' house.","At Christmas we have dinner with all my relatives.","On Easter we travel to my grandparents' house."], correct:1,
    explanations:[
      "Errado. Foi o que aconteceu na conversa: 31 de dezembro é justamente uma data de feriado, e a pergunta pedia uma tradição fora dos feriados.",
      "Correto! Domingo não é feriado — a resposta respeita a restrição da pergunta.",
      "Errado. Natal é feriado, então a resposta ignora o 'NOT on a holiday'.",
      "Errado. Páscoa também é feriado."
    ]},
  { id:"c-an-t2", category:"answering", prompt:"Pergunta: 'What do you do on weekdays, not on weekends?' Qual resposta responde exatamente o que foi perguntado?", options:["On Saturdays we have a barbecue with my family.","I go to work by bus and my wife goes by car.","On Sundays we visit my parents.","On weekends it's calm at home."], correct:1,
    explanations:[
      "Errado. Sábado é fim de semana, e a pergunta pediu justamente os dias de semana.",
      "Correto! Ir ao trabalho é rotina de dia útil — responde o que foi perguntado.",
      "Errado. Domingo é fim de semana.",
      "Errado. A resposta fala do fim de semana, exatamente o que a pergunta excluiu."
    ]},
  { id:"c-an-t3", category:"answering", prompt:"Pergunta: 'Tell me about a hobby you do alone.' Qual resposta responde exatamente o que foi perguntado?", options:["We play soccer with my cousins on Sundays.","I read books in the evening, before I sleep.","My family and I watch TV series together.","We have dinner together every night."], correct:1,
    explanations:[
      "Errado. A pergunta pediu algo que você faz sozinho, e essa resposta é em grupo.",
      "Correto! Ler antes de dormir é uma atividade individual — respeita o 'alone'.",
      "Errado. Assistir junto com a família não é sozinho.",
      "Errado. Jantar com a família também é uma atividade em grupo."
    ]},
  { id:"c-an-t4", category:"answering", prompt:"Pergunta: 'What is the first thing you do in the morning?' Qual resposta responde exatamente o que foi perguntado?", options:["I usually go to bed at 11 p.m.","I turn off the alarm and drink a glass of water.","In the evening I take a walk with my wife.","On weekends I wake up late."], correct:1,
    explanations:[
      "Errado. A pergunta é sobre a manhã, e essa resposta fala da hora de dormir.",
      "Correto! Responde qual é a primeira coisa, e de manhã — exatamente o que foi pedido.",
      "Errado. A resposta fala da noite.",
      "Errado. A pergunta é sobre a rotina da manhã em geral, não sobre o fim de semana."
    ]},
];

/* ================= PRÁTICA: ERROS DA CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1 ----
  { id:"c-it-p1", category:"itsubject", prompt:"___ 6:50 a.m. and everybody is already awake.", options:["Is","It's","Are","There"], correct:1,
    explanations:[
      "Errado. Falta o sujeito da frase.",
      "Correto! Para dizer que horas são, o inglês usa o 'it' vazio: it's 6:50.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'there' sozinho não é sujeito."
    ]},
  { id:"c-it-p2", category:"itsubject", prompt:"On Sundays ___ quiet at my parents' house.", options:["is","it's","are","there"], correct:1,
    explanations:[
      "Errado. A frase fica sem sujeito.",
      "Correto! it's quiet — o 'it' vazio descreve como está a situação.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'there' sozinho não funciona como sujeito."
    ]},
  { id:"c-it-p3", category:"itsubject", prompt:"___ difficult to have dinner together on weekdays.", options:["Is","It's","Are","Has"], correct:1,
    explanations:[
      "Errado. A frase começaria sem sujeito.",
      "Correto! 'It's difficult to...' é a estrutura fixa para dizer que algo é difícil.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'has' não cabe nesta estrutura."
    ]},
  { id:"c-it-p4", category:"itsubject", prompt:"We take the umbrella because ___ raining.", options:["is","it's","are","has"], correct:1,
    explanations:[
      "Errado. Depois de 'because' a nova oração também precisa de sujeito.",
      "Correto! Para clima é sempre o 'it' vazio: it's raining, it's hot, it's cold.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'has' não forma o presente contínuo aqui."
    ]},
  { id:"c-it-p5", category:"itsubject", prompt:"___ always a rush in the morning, but on weekends we relax.", options:["Is","It's","Are","There"], correct:1,
    explanations:[
      "Errado. Sem sujeito a frase não se sustenta.",
      "Correto! It's always a rush — e repare que 'always' vem depois do verbo to be.",
      "Errado. Falta o sujeito e 'a rush' é singular.",
      "Errado. 'there' sozinho não é sujeito."
    ]},
  { id:"c-it-p6", category:"itsubject", prompt:"My son says ___ boring to wake up early.", options:["is","it's","are","has"], correct:1,
    explanations:[
      "Errado. A oração depois de 'says' também precisa do seu próprio sujeito.",
      "Correto! He says it's boring — cada oração carrega o seu sujeito.",
      "Errado. Falta o sujeito e 'are' é plural.",
      "Errado. 'has' não cabe aqui."
    ]},

  // ---- Padrão 2 ----
  { id:"c-be-p1", category:"tobe", prompt:"___ really into music and I play the guitar on weekends.", options:["I","I'm","I have","Me"], correct:1,
    explanations:[
      "Errado. Sem verbo a frase fica incompleta.",
      "Correto! 'be into something' pede o verbo to be: I'm really into music.",
      "Errado. 'have' não combina com 'into' nesse sentido.",
      "Errado. 'me' é pronome objeto e ainda faltaria o verbo."
    ]},
  { id:"c-be-p2", category:"tobe", prompt:"My husband ___ very tired after work.", options:["is","have","do","are"], correct:0,
    explanations:[
      "Correto! O verbo to be liga o sujeito ao adjetivo, e 'my husband' é singular.",
      "Errado. Em inglês não se diz 'have tired'.",
      "Errado. 'do' é auxiliar, não o verbo da frase.",
      "Errado. 'are' é plural; o sujeito aqui é singular."
    ]},
  { id:"c-be-p3", category:"tobe", prompt:"We ___ happy when the whole family is together.", options:["is","are","have","has"], correct:1,
    explanations:[
      "Errado. 'we' é plural e pede 'are'.",
      "Correto! We are happy — o to be é obrigatório antes do adjetivo.",
      "Errado. Sentimentos vão com to be, não com 'have'.",
      "Errado. 'has' é singular e também não cabe com adjetivo."
    ]},
  { id:"c-be-p4", category:"tobe", prompt:"___ your kids into video games?", options:["Do","Are","Have","Does"], correct:1,
    explanations:[
      "Errado. 'do' seria usado com um verbo comum, mas o verbo aqui é o to be.",
      "Correto! Are your kids into video games? — 'be into' sempre com to be.",
      "Errado. 'have' não forma essa pergunta.",
      "Errado. 'does' é para singular e o verbo aqui é to be."
    ]},

  // ---- Padrão 3 ----
  { id:"c-at-p1", category:"attime", prompt:"My alarm rings ___ 6 o'clock every morning.", options:["in","at","on","for"], correct:1,
    explanations:[
      "Errado. Horário exato não leva 'in'.",
      "Correto! at 6 o'clock — hora marcada sempre com 'at'.",
      "Errado. 'on' acompanha dias e datas.",
      "Errado. 'for' indica duração."
    ]},
  { id:"c-at-p2", category:"attime", prompt:"We all have lunch ___ the same time on Sundays.", options:["in","at","on","by"], correct:1,
    explanations:[
      "Errado. Foi o erro da rodada: 'in the same time' não existe.",
      "Correto! at the same time — momento no relógio pede 'at'.",
      "Errado. 'on' é para dias e datas.",
      "Errado. 'by' indicaria prazo (by 3 p.m. = até as 3)."
    ]},
  { id:"c-at-p3", category:"attime", prompt:"My wife and I watch a series ___ night, after the kids sleep.", options:["in","at","on","during"], correct:1,
    explanations:[
      "Errado. 'night' não usa 'in'.",
      "Correto! 'at night' é fixo em inglês.",
      "Errado. 'on' pediria uma data (on Friday night).",
      "Errado. 'during the night' existe, mas muda o sentido para 'ao longo da noite'."
    ]},
  { id:"c-at-p4", category:"attime", prompt:"The family lunch starts ___ midday.", options:["in","at","on","to"], correct:1,
    explanations:[
      "Errado. 'midday' é horário e não leva 'in'.",
      "Correto! at midday, at noon, at midnight — todos com 'at'.",
      "Errado. 'on' é para dias e datas.",
      "Errado. 'to' indica destino."
    ]},
  { id:"c-at-p5", category:"attime", prompt:"I check my e-mail ___ the afternoon, when the office is quiet.", options:["at","in","on","for"], correct:1,
    explanations:[
      "Errado. Não corrija demais: 'at' é para hora exata, não para a parte do dia.",
      "Correto! in the morning, in the afternoon, in the evening — partes do dia levam 'in'.",
      "Errado. 'on' precisaria de um dia junto (on Monday afternoon).",
      "Errado. 'for' indica duração."
    ]},

  // ---- Padrão 4 ----
  { id:"c-on-p1", category:"ondays", prompt:"___ weekends we visit my grandparents' house.", options:["During","On","In","At"], correct:1,
    explanations:[
      "Errado. 'during' é para um período que se atravessa, não para dias.",
      "Correto! on weekends, on weekdays, on Monday — dias sempre com 'on'.",
      "Errado. 'in' é para meses, anos e estações.",
      "Errado. 'at' é para horários."
    ]},
  { id:"c-on-p2", category:"ondays", prompt:"I don't work ___ Fridays, so I stay with my kids.", options:["during","on","in","to"], correct:1,
    explanations:[
      "Errado. Dias da semana não usam 'during'.",
      "Correto! on Fridays — dia da semana pede 'on'.",
      "Errado. 'in' seria para mês ou ano.",
      "Errado. 'to' indica destino."
    ]},
  { id:"c-on-p3", category:"ondays", prompt:"My daughter was born ___ March 12th.", options:["during","on","in","at"], correct:1,
    explanations:[
      "Errado. Uma data exata não leva 'during'.",
      "Correto! Data completa vai com 'on': on March 12th.",
      "Errado. 'in March' funcionaria só com o mês sozinho.",
      "Errado. 'at' é para horários."
    ]},
  { id:"c-on-p4", category:"ondays", prompt:"Nobody uses the phone ___ the family dinner.", options:["on","during","at","to"], correct:1,
    explanations:[
      "Errado. 'on' é para dias e datas.",
      "Correto! 'during' é o certo para um período que se atravessa: during the dinner, during the meeting.",
      "Errado. 'at' marcaria o horário, não a duração do jantar.",
      "Errado. 'to' indica destino."
    ]},

  // ---- Padrão 5 ----
  { id:"c-ar-p1", category:"article", prompt:"Escolha a frase correta:", options:["We have barbecue every Sunday afternoon.","We have a barbecue every Sunday afternoon.","We have the barbecue every Sunday afternoon.","We have any barbecue every Sunday afternoon."], correct:1,
    explanations:[
      "Errado. Sem artigo, 'barbecue' deixa de ser o evento.",
      "Correto! O churrasco como evento é contável: we have a barbecue.",
      "Errado. 'the' indicaria um churrasco específico já citado.",
      "Errado. 'any' é usado em perguntas e negativas."
    ]},
  { id:"c-ar-p2", category:"article", prompt:"My son wants to be ___ engineer.", options:["-","an","a","the"], correct:1,
    explanations:[
      "Errado. Profissões no singular sempre levam artigo em inglês.",
      "Correto! 'engineer' começa com som de vogal, então o artigo é 'an'.",
      "Errado. 'a' é usado antes de som de consoante.",
      "Errado. 'the' apontaria para um engenheiro específico."
    ]},
  { id:"c-ar-p3", category:"article", prompt:"Escolha a frase correta:", options:["I take shower before work.","I take a shower before work.","I take the shower before work.","I take showers before work every day at the same time."], correct:1,
    explanations:[
      "Errado. 'shower' é contável e não fica sozinho no singular.",
      "Correto! take a shower, take a walk, have a coffee — sempre com artigo.",
      "Errado. 'the' indicaria um banho específico já mencionado.",
      "Errado. O plural muda o sentido e a frase fica pouco natural."
    ]},
  { id:"c-ar-p4", category:"article", prompt:"We had ___ meeting with my son's teacher last week.", options:["-","a","the","some"], correct:1,
    explanations:[
      "Errado. Substantivo contável no singular precisa de artigo.",
      "Correto! a meeting — primeira menção de algo contável pede 'a'.",
      "Errado. 'the' só se a reunião já tivesse sido citada.",
      "Errado. 'some' acompanha plural ou incontável."
    ]},

  // ---- Padrão 6 ----
  { id:"c-al-p1", category:"alwayspos", prompt:"Escolha a frase correta:", options:["My house always is full on Sundays.","My house is always full on Sundays.","Always my house is full on Sundays.","My house is full always on Sundays."], correct:1,
    explanations:[
      "Errado. Com o verbo to be o advérbio vem depois, não antes.",
      "Correto! is always full — verbo to be primeiro, advérbio em seguida.",
      "Errado. 'always' não abre a frase nessa estrutura.",
      "Errado. Jogar 'always' para o fim soa estranho."
    ]},
  { id:"c-al-p2", category:"alwayspos", prompt:"The traffic ___ heavy at 7 a.m.", options:["always is","is always","always","is, always"], correct:1,
    explanations:[
      "Errado. A ordem está invertida.",
      "Correto! is always heavy — mesma regra de 'it is always a rush'.",
      "Errado. Sem o verbo to be a frase fica incompleta.",
      "Errado. A vírgula não cabe aqui."
    ]},
  { id:"c-al-p3", category:"alwayspos", prompt:"My wife ___ coffee before she leaves home.", options:["drinks always","always drinks","is always drink","drinks, always"], correct:1,
    explanations:[
      "Errado. Com verbos comuns o advérbio vem antes do verbo.",
      "Correto! always drinks — a regra muda quando o verbo não é o to be.",
      "Errado. Aqui não existe verbo to be na frase.",
      "Errado. A vírgula quebra a frase sem motivo."
    ]},
  { id:"c-al-p4", category:"alwayspos", prompt:"We ___ late for the family lunch.", options:["never are","are never","never","are, never"], correct:1,
    explanations:[
      "Errado. A ordem está invertida, como em 'always is'.",
      "Correto! 'never' segue a mesma regra: depois do verbo to be.",
      "Errado. Sem o verbo to be a frase fica incompleta.",
      "Errado. A vírgula não cabe aqui."
    ]},

  // ---- Padrão 7 ----
  { id:"c-cp-p1", category:"caps", prompt:"Escolha a frase correta:", options:["In the morning, Everybody wakes up at the same time.","In the morning, everybody wakes up at the same time.","in the morning, everybody wakes up at the same time.","In The Morning, Everybody wakes up at the same time."], correct:1,
    explanations:[
      "Errado. Depois de vírgula a frase continua, então vai minúscula.",
      "Correto! Só o início da frase e os nomes próprios levam maiúscula.",
      "Errado. Falta a maiúscula no começo da frase.",
      "Errado. Palavras comuns não levam maiúscula no meio da frase."
    ]},
  { id:"c-cp-p2", category:"caps", prompt:"Escolha a frase correta:", options:["We have dinner at 7 p.m. after that we watch TV.","We have dinner at 7 p.m. After that, we watch TV.","We have dinner at 7 p.m. after that, We watch TV.","we have dinner at 7 p.m. After that, we watch TV."], correct:1,
    explanations:[
      "Errado. Depois do ponto final começa frase nova, com maiúscula.",
      "Correto! Ponto final encerra a frase; a próxima palavra vai com maiúscula.",
      "Errado. A maiúscula ficou no lugar errado, no meio da frase.",
      "Errado. Falta a maiúscula no início."
    ]},
  { id:"c-cp-p3", category:"caps", prompt:"Escolha a frase correta:", options:["My Cousins and my Uncle live in another city.","My cousins and my uncle live in another city.","my cousins and my uncle live in another city.","My cousins and my Uncle live in another City."], correct:1,
    explanations:[
      "Errado. Grau de parentesco é substantivo comum, vai em minúscula.",
      "Correto! cousin, uncle, aunt em minúscula (só maiúsculo antes do nome: Uncle Pedro).",
      "Errado. Falta a maiúscula no começo da frase.",
      "Errado. 'city' também é substantivo comum."
    ]},
  { id:"c-cp-p4", category:"caps", prompt:"Escolha a resposta escrita corretamente:", options:["Yes , I am !","Yes, I am!","yes, i am!","Yes I am !"], correct:1,
    explanations:[
      "Errado. Não existe espaço antes da vírgula nem antes do '!'.",
      "Correto! Pontuação colada na palavra: Yes, I am!",
      "Errado. Faltam as maiúsculas em 'Yes' e no 'I'.",
      "Errado. Falta a vírgula e sobra o espaço antes do '!'."
    ]},
  { id:"c-cp-p5", category:"caps", prompt:"Escolha a frase correta:", options:["On saturdays, my Family and i cook together.","On Saturdays, my family and I cook together.","on Saturdays, my family and I cook together.","On Saturdays, My Family and I cook together."], correct:1,
    explanations:[
      "Errado. Dias da semana são maiúsculos em inglês e 'I' é sempre maiúsculo.",
      "Correto! Saturdays com maiúscula (é nome próprio), 'family' com minúscula e 'I' sempre maiúsculo.",
      "Errado. Falta a maiúscula no começo da frase.",
      "Errado. 'family' é substantivo comum e não leva maiúscula."
    ]},
  { id:"c-cp-p6", category:"caps", prompt:"My kids like to run ___ the house after dinner.", options:["aroud","around","arround","arounde"], correct:1,
    explanations:[
      "Errado. Falta o 'n': foi assim que a palavra saiu na conversa.",
      "Correto! a-r-o-u-n-d — mesma terminação de sound e found.",
      "Errado. 'around' tem um 'r' só.",
      "Errado. Não existe 'e' no final."
    ]},

  // ---- Padrão 8 ----
  { id:"c-an-p1", category:"answering", prompt:"Pergunta: 'Tell me about something you do with your family that is NOT at home.' Qual resposta responde exatamente o que foi perguntado?", options:["We watch TV series together in the living room.","We take a walk around the neighborhood after dinner.","We have dinner together every night.","My wife and I cook together on Sundays."], correct:1,
    explanations:[
      "Errado. Assistir na sala é dentro de casa, e a pergunta pediu fora.",
      "Correto! Caminhar pelo bairro acontece fora de casa — a restrição foi respeitada.",
      "Errado. O jantar em família é em casa.",
      "Errado. Cozinhar também é uma atividade dentro de casa."
    ]},
  { id:"c-an-p2", category:"answering", prompt:"Pergunta: 'What do you do in the evening, not in the morning?' Qual resposta responde exatamente o que foi perguntado?", options:["I wake up at 6:50 and take a shower.","I help my kids with their homework after dinner.","I have breakfast with my wife.","I leave home at 7 a.m. to go to work."], correct:1,
    explanations:[
      "Errado. Acordar e tomar banho é rotina da manhã, justamente o que a pergunta excluiu.",
      "Correto! Depois do jantar é à noite — responde o que foi perguntado.",
      "Errado. O café da manhã é de manhã.",
      "Errado. Sair as 7 da manhã também é rotina matinal."
    ]},
  { id:"c-an-p3", category:"answering", prompt:"Pergunta: 'Tell me about a place you visit that is NOT a relative's house.' Qual resposta responde exatamente o que foi perguntado?", options:["We go to my parents' house every Sunday.","We go to the park near my house on Saturdays.","We visit my grandparents' house in December.","We have lunch at my aunt's house on holidays."], correct:1,
    explanations:[
      "Errado. A casa dos pais é casa de parente, e a pergunta pediu outro lugar.",
      "Correto! O parque não é casa de ninguém da família — a restrição foi respeitada.",
      "Errado. A casa dos avós também é de parentes.",
      "Errado. A casa da tia também é casa de parente."
    ]},
  { id:"c-an-p4", category:"answering", prompt:"Pergunta: 'How do you go to work? I don't want to know about your wife.' Qual resposta responde exatamente o que foi perguntado?", options:["My wife goes to work by car and I go by bus.","I go to work by bus, and it takes 40 minutes.","We both leave home at the same time in the morning.","My wife works near our house, so she goes on foot."], correct:1,
    explanations:[
      "Errado. A pergunta pediu só sobre você, e a resposta começa pela sua esposa.",
      "Correto! Fala apenas do seu trajeto, que foi exatamente o que foi perguntado.",
      "Errado. 'We both' inclui a esposa, que a pergunta excluiu.",
      "Errado. A resposta é inteiramente sobre a esposa."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
