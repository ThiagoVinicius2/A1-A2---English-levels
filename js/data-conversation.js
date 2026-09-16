/* ============================================================
   Módulo separado: "Erros da Conversa Real"
   Baseado no feedback da 5ª rodada de prática (2ª conversa sobre
   tecnologia e ferramentas de trabalho).

   Consolidados nesta rodada e, por isso, fora deste banco:
   - "-s" da 3ª pessoa do singular (zero erro nesta rodada, depois
     de 2 na anterior — o padrão que mais resistia)
   - take a course (o "make a course" da rodada anterior: corrigido)
   - not much stuff (incontável, com a estrutura certa)
   - ortografia de technology e everything
   - vocabulário da lição: usou screen, light, carry, clear, memory
     e battery espontaneamente

   O que continua teimando, em todas as rodadas e em todos os temas,
   é ARTIGO e PREPOSIÇÃO. Por isso o artigo abre o módulo e as
   preposições ocupam três dos oito padrões.
   ============================================================ */

const CONV_CATEGORIES = {
  article:   { label: "Artigo 'a' com contável (padrão persistente)",     tag: "Padrão 1" },
  placeadv:  { label: "everywhere / home / here: sem preposição",         tag: "Padrão 2" },
  listento:  { label: "listen TO (e hear sem 'to')",                      tag: "Padrão 3" },
  contbe:    { label: "am / is / are + verbo-ing (o to be nunca some)",   tag: "Padrão 4" },
  audiounc:  { label: "'audio' é incontável (como information)",          tag: "Padrão 5" },
  asfor:     { label: "'About' não abre frase: as for / talking about",   tag: "Padrão 6" },
  fornow:    { label: "for now / so far ≠ for a while (falso amigo)",     tag: "Padrão 7" },
  caps:      { label: "Maiúsculas: depois de '!' e em marcas (iPhone)",   tag: "Padrão 8" },
};

/* ================= TESTE: ERROS DA CONVERSA REAL ================= */
const CONV_TEST_QUESTIONS = [
  // ---- Padrão 1: artigo 'a' com contável ----
  { id:"c-ar-t1", category:"article", prompt:"I don't have ___ problem with memory.", options:["a","-","the","this"], correct:0,
    explanations:[
      "Correto! Foi o seu erro: 'I don't have problem'. 'problem' é contável e no singular pede artigo. Também valeria o plural: I don't have problems.",
      "Errado. Contável no singular nunca fica sem artigo em inglês.",
      "Errado. 'the' apontaria para um problema específico já citado na conversa.",
      "Errado. 'this' indicaria um problema presente, apontado na hora."
    ]},
  { id:"c-ar-t2", category:"article", prompt:"Escolha a frase correta:", options:["I don't have problem with the battery.","I don't have a problem with the battery.","I don't have the problem with the battery.","I don't have problem with a battery."], correct:1,
    explanations:[
      "Errado. Foi assim que a frase saiu na conversa: falta o artigo antes de 'problem'.",
      "Correto! I don't have a problem — este é o padrão que aparece em todas as rodadas, de todos os temas.",
      "Errado. 'the problem' seria um problema específico já conhecido.",
      "Errado. O artigo está no lugar errado: falta antes de 'problem', não antes de 'battery'."
    ]},
  { id:"c-ar-t3", category:"article", prompt:"I have ___ iPhone, so the battery isn't very good.", options:["a","an","the","-"], correct:1,
    explanations:[
      "Errado. 'iPhone' começa com som de vogal (ai-fone), então o artigo muda.",
      "Correto! an iPhone — antes de som de vogal o artigo é 'an'. Esta é a frase pronta para a aula.",
      "Errado. 'the' indicaria um iPhone específico já mencionado.",
      "Errado. Contável no singular sempre precisa de artigo."
    ]},
  { id:"c-ar-t4", category:"article", prompt:"It's ___ good laptop, but it's a little heavy.", options:["-","the","a","an"], correct:2,
    explanations:[
      "Errado. Sem artigo a frase fica incompleta.",
      "Errado. 'the' apontaria para um laptop específico já citado.",
      "Correto! a good laptop — o artigo vem antes do adjetivo + substantivo.",
      "Errado. 'an' só antes de som de vogal (an iPhone, an old laptop)."
    ]},
  { id:"c-ar-t5", category:"article", prompt:"Escolha a frase correta:", options:["I need charger for my phone.","I need the charger for my phone.","I need a charger for my phone.","I need charger for a phone."], correct:2,
    explanations:[
      "Errado. Falta o artigo antes de 'charger'.",
      "Errado. 'the charger' seria um carregador específico já conhecido pelos dois.",
      "Correto! I need a charger — primeira menção de algo contável pede 'a'.",
      "Errado. O artigo entrou no substantivo errado."
    ]},
  { id:"c-ar-t6", category:"article", prompt:"My laptop has ___ small screen, so I connect an external monitor.", options:["the","a","-","this"], correct:1,
    explanations:[
      "Errado. 'the' apontaria para uma tela já citada na conversa.",
      "Correto! a small screen — e repare: 'an external monitor', com 'an' por causa do som de vogal.",
      "Errado. Contável no singular não fica sem artigo.",
      "Errado. 'this' seria para apontar a tela na hora."
    ]},

  // ---- Padrão 2: advérbio de lugar sem preposição ----
  { id:"c-pl-t1", category:"placeadv", prompt:"I carry my phone ___.", options:["everywhere","for everywhere","to everywhere","in everywhere"], correct:0,
    explanations:[
      "Correto! 'everywhere' já é advérbio de lugar e não leva preposição nenhuma.",
      "Errado. Foi o seu erro: 'I carry it for everywhere'. O 'for' não existe aqui.",
      "Errado. Mesma lógica de 'I go home': o advérbio de lugar dispensa o 'to'.",
      "Errado. 'in everywhere' não existe em inglês."
    ]},
  { id:"c-pl-t2", category:"placeadv", prompt:"After work I go ___ and study on my laptop.", options:["to home","home","for home","in home"], correct:1,
    explanations:[
      "Errado. 'home' funciona como advérbio aqui e não aceita 'to'.",
      "Correto! I go home — mesma família de everywhere, here e there. (Para lugar parado: I'm at home.)",
      "Errado. 'for home' não existe nesse sentido.",
      "Errado. Para dizer que está em casa, o certo seria 'at home'."
    ]},
  { id:"c-pl-t3", category:"placeadv", prompt:"My charger is ___, on the table.", options:["there","to there","in there","for there"], correct:0,
    explanations:[
      "Correto! 'there' sozinho basta: advérbio de lugar não leva preposição.",
      "Errado. 'to there' não existe.",
      "Errado. 'in there' só aparece apontando para dentro de algo fechado, e não é o caso.",
      "Errado. 'for there' não existe."
    ]},
  { id:"c-pl-t4", category:"placeadv", prompt:"Come ___ and look at my new monitor.", options:["to here","here","for here","at here"], correct:1,
    explanations:[
      "Errado. 'here' não aceita 'to'.",
      "Correto! Come here — assim como go home e carry it everywhere.",
      "Errado. 'for here' só existe em lanchonete ('for here or to go?').",
      "Errado. 'at here' não existe."
    ]},
  { id:"c-pl-t5", category:"placeadv", prompt:"Escolha a frase correta:", options:["I take my laptop for everywhere I go.","I take my laptop to everywhere I go.","I take my laptop everywhere I go.","I take my laptop in everywhere I go."], correct:2,
    explanations:[
      "Errado. Foi exatamente o erro da conversa: sobra o 'for'.",
      "Errado. O 'to' também sobra: everywhere já indica o lugar.",
      "Correto! I take my laptop everywhere I go. Para decorar: everywhere nunca leva preposição.",
      "Errado. 'in everywhere' não existe."
    ]},

  // ---- Padrão 3: listen TO ----
  { id:"c-li-t1", category:"listento", prompt:"I use earphones to listen ___ music at work.", options:["-","to","at","for"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'listen audios and music'. O verbo listen sempre pede 'to' antes do objeto.",
      "Correto! listen to music, listen to the teacher, listen to a podcast — o 'to' nunca some.",
      "Errado. 'listen at' não existe.",
      "Errado. 'listen for' é ficar atento esperando um som específico, outro sentido."
    ]},
  { id:"c-li-t2", category:"listento", prompt:"Escolha a frase correta:", options:["I listen music every morning.","I listen to music every morning.","I listen at music every morning.","I listen for music every morning."], correct:1,
    explanations:[
      "Errado. Falta o 'to' — é o erro que apareceu na conversa.",
      "Correto! I listen to music. Este é um dos três itens para decorar hoje à noite.",
      "Errado. 'listen at' não existe.",
      "Errado. 'listen for' seria esperar atento por um som."
    ]},
  { id:"c-li-t3", category:"listento", prompt:"I ___ a strange noise in my computer.", options:["listen","hear","listen to","hear to"], correct:1,
    explanations:[
      "Errado. 'listen' é escutar de propósito, e ainda faltaria o 'to'.",
      "Correto! Cuidado com o par: hear NÃO leva 'to' — I hear a noise. Já listen sempre leva.",
      "Errado. 'listen to a noise' seria prestar atenção nele de propósito, não percebê-lo por acaso.",
      "Errado. 'hear' nunca leva 'to'."
    ]},
  { id:"c-li-t4", category:"listento", prompt:"In online meetings I listen ___ my manager with headphones.", options:["at","to","-","for"], correct:1,
    explanations:[
      "Errado. 'listen at' não existe.",
      "Correto! listen to my manager — pessoa também entra depois do 'to'.",
      "Errado. Sem o 'to' o verbo fica incompleto.",
      "Errado. 'listen for' é aguardar atento um som específico."
    ]},
  { id:"c-li-t5", category:"listento", prompt:"What do you listen ___ when you work?", options:["to","-","at","for"], correct:0,
    explanations:[
      "Correto! O 'to' fica no fim da pergunta: What do you listen to?",
      "Errado. Mesmo no fim da frase o 'to' é obrigatório.",
      "Errado. 'listen at' não existe.",
      "Errado. 'listen for' tem outro sentido."
    ]},

  // ---- Padrão 4: to be no presente contínuo ----
  { id:"c-cb-t1", category:"contbe", prompt:"I use earphones when ___ videos.", options:["I watching","I'm watching","I watching to","me watching"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'when I watching videos'. O gerúndio nunca aparece sozinho.",
      "Correto! when I'm watching — é sempre am / is / are + verbo-ing.",
      "Errado. 'watch' não leva 'to' antes do objeto e ainda falta o verbo to be.",
      "Errado. 'me' é pronome objeto e não serve como sujeito."
    ]},
  { id:"c-cb-t2", category:"contbe", prompt:"___ a course right now, so I use my laptop every night.", options:["I taking","I'm taking","Me taking","I am take"], correct:1,
    explanations:[
      "Errado. Este foi o seu segundo erro do mesmo tipo: 'when I taking a course'.",
      "Correto! I'm taking a course — e repare na colocação 'take a course', que você já consolidou.",
      "Errado. 'me' não funciona como sujeito.",
      "Errado. Depois do to be o verbo vai para o gerúndio: I am taking."
    ]},
  { id:"c-cb-t3", category:"contbe", prompt:"Escolha a frase correta:", options:["When I watching videos, I use earphones.","When I'm watching videos, I use earphones.","When I watching videos, I'm use earphones.","When me watching videos, I use earphones."], correct:1,
    explanations:[
      "Errado. Falta o 'am' antes do gerúndio.",
      "Correto! O to be aparece só onde há gerúndio: I'm watching... I use...",
      "Errado. Aqui o to be entrou no lugar errado: 'I use' é presente simples e não leva to be.",
      "Errado. 'me' não é sujeito."
    ]},
  { id:"c-cb-t4", category:"contbe", prompt:"She ___ a course about Power BI this month.", options:["is taking","taking","is take","are taking"], correct:0,
    explanations:[
      "Correto! she is taking — com he/she/it o to be é 'is'.",
      "Errado. O gerúndio sozinho não forma frase.",
      "Errado. Depois do to be o verbo vai para o gerúndio.",
      "Errado. 'are' é para you/we/they."
    ]},
  { id:"c-cb-t5", category:"contbe", prompt:"We ___ the new dashboard right now.", options:["are testing","testing","is testing","are test"], correct:0,
    explanations:[
      "Correto! we are testing — com we/you/they o to be é 'are'.",
      "Errado. Falta o verbo to be antes do gerúndio.",
      "Errado. 'is' é para he/she/it.",
      "Errado. Depois de 'are' o verbo vai para o gerúndio."
    ]},
  { id:"c-cb-t6", category:"contbe", prompt:"___ you working from home today?", options:["Do","Are","Is","You are"], correct:1,
    explanations:[
      "Errado. No contínuo a pergunta começa com o verbo to be, não com 'do'.",
      "Correto! Are you working...? — o to be vai para a frente do sujeito.",
      "Errado. 'is' é para he/she/it.",
      "Errado. Nessa ordem a frase vira afirmação, não pergunta."
    ]},

  // ---- Padrão 5: 'audio' é incontável ----
  { id:"c-au-t1", category:"audiounc", prompt:"I listen to ___ when I'm working.", options:["audios","audio","an audio","audioes"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'listen to audios'. A palavra não tem plural.",
      "Correto! listen to audio — incontável, da mesma família de stuff, information e music.",
      "Errado. Incontável não aceita o artigo 'a/an'.",
      "Errado. Essa forma não existe em inglês."
    ]},
  { id:"c-au-t2", category:"audiounc", prompt:"Escolha a frase correta:", options:["I listen to audios and music.","I listen to audio and music.","I listen to audios and musics.","I listen audio and music."], correct:1,
    explanations:[
      "Errado. Foi assim que a frase saiu: 'audio' não vai para o plural.",
      "Correto! listen to audio and music — dois incontáveis, e o 'to' no lugar certo.",
      "Errado. Nem 'audio' nem 'music' têm plural.",
      "Errado. Aqui falta o 'to' do verbo listen."
    ]},
  { id:"c-au-t3", category:"audiounc", prompt:"My teacher sends me ___ every week.", options:["audios","audio files","an audios","audioes"], correct:1,
    explanations:[
      "Errado. 'audio' não tem plural.",
      "Correto! Se você precisa contar, use audio files ou voice messages — essas sim têm plural.",
      "Errado. Mistura o artigo singular com o plural.",
      "Errado. Essa forma não existe."
    ]},
  { id:"c-au-t4", category:"audiounc", prompt:"She sent me three ___ on WhatsApp.", options:["audios","voice messages","audio","informations"], correct:1,
    explanations:[
      "Errado. Com um número na frente é preciso uma palavra contável, e 'audios' não existe.",
      "Correto! three voice messages — é assim que se conta em inglês.",
      "Errado. 'audio' é incontável e não combina com 'three'.",
      "Errado. 'information' também é incontável e não tem plural."
    ]},

  // ---- Padrão 6: as for / talking about ----
  { id:"c-af-t1", category:"asfor", prompt:"___ memory, I don't have a problem.", options:["About","As for","In about","For about"], correct:1,
    explanations:[
      "Errado. Foi o seu erro: 'About memory I don't have problem'. 'About' sozinho não abre frase.",
      "Correto! As for memory, I don't have a problem — e repare na vírgula depois da expressão.",
      "Errado. 'in about' não existe nesse sentido.",
      "Errado. 'for about' indicaria duração aproximada (for about an hour)."
    ]},
  { id:"c-af-t2", category:"asfor", prompt:"Escolha a frase correta:", options:["About memory I don't have a problem.","As for memory, I don't have a problem.","About memory, I don't have problem.","For memory I don't have a problem."], correct:1,
    explanations:[
      "Errado. Foi exatamente assim que a frase saiu na conversa.",
      "Correto! Duas correções numa frase só: 'as for' no lugar de 'about' e o artigo em 'a problem'.",
      "Errado. Mesmo com a vírgula, 'about' não abre a frase — e aqui ainda falta o artigo.",
      "Errado. 'for memory' não introduz o assunto."
    ]},
  { id:"c-af-t3", category:"asfor", prompt:"___ the battery, it lasts about four hours.", options:["About","Talking about","On about","In about"], correct:1,
    explanations:[
      "Errado. 'About' sozinho não abre a frase.",
      "Correto! Talking about the battery, ... é a outra forma natural, junto com 'as for'.",
      "Errado. 'on about' não existe.",
      "Errado. 'in about' indicaria tempo aproximado (in about ten minutes)."
    ]},
  { id:"c-af-t4", category:"asfor", prompt:"In the meeting we talked ___ the new laptops.", options:["about","as for","of about","for"], correct:0,
    explanations:[
      "Correto! Depois de um verbo o 'about' é perfeito: talk about, think about, read about. O problema é só abrir frase com ele.",
      "Errado. 'as for' serve para introduzir o assunto no começo da frase, não depois do verbo.",
      "Errado. 'of about' não existe.",
      "Errado. 'talk for' tem outro sentido (falar durante um tempo)."
    ]},

  // ---- Padrão 7: for now / so far ----
  { id:"c-fn-t1", category:"fornow", prompt:"I don't have a problem with the battery ___.", options:["for a while","for now","by now","in now"], correct:1,
    explanations:[
      "Errado. Este é o falso amigo da rodada: 'for a while' é POR UM TEMPO, não 'por enquanto'.",
      "Correto! for now = por enquanto. É o que você quis dizer na conversa.",
      "Errado. 'by now' significa 'a esta altura'.",
      "Errado. 'in now' não existe."
    ]},
  { id:"c-fn-t2", category:"fornow", prompt:"___, I don't have any problem with this laptop.", options:["For a while","So far","By now","Since now"], correct:1,
    explanations:[
      "Errado. 'for a while' fala de duração, não de 'até agora'.",
      "Correto! So far = até agora, por enquanto. Anda junto com 'for now'.",
      "Errado. 'by now' é 'a esta altura já deveria...'.",
      "Errado. 'since now' não existe; o certo seria 'from now on'."
    ]},
  { id:"c-fn-t3", category:"fornow", prompt:"I lived in São Paulo ___ before I moved to Curitiba.", options:["for now","for a while","so far","by now"], correct:1,
    explanations:[
      "Errado. 'for now' é por enquanto, e a frase fala do passado.",
      "Correto! Aqui sim é 'for a while': morei lá por um tempo. Este é o uso certo da expressão.",
      "Errado. 'so far' é 'até agora', e liga o passado ao presente.",
      "Errado. 'by now' significa 'a esta altura'."
    ]},
  { id:"c-fn-t4", category:"fornow", prompt:"Para dizer 'por enquanto não tenho problema', escolha a frase correta:", options:["I don't have a problem for a while.","I don't have a problem for now.","I don't have a problem by a while.","I don't have a problem in a while."], correct:1,
    explanations:[
      "Errado. Foi assim que a frase saiu, e em inglês ela soa como 'não tenho problema por um tempo'.",
      "Correto! I don't have a problem for now — ou so far, I don't have a problem.",
      "Errado. 'by a while' não existe.",
      "Errado. 'in a while' significa 'daqui a pouco'."
    ]},

  // ---- Padrão 8: maiúsculas e marcas ----
  { id:"c-cp-t1", category:"caps", prompt:"Escolha a frase correta:", options:["The battery is not so good! as for memory, I don't have a problem.","The battery is not so good! As for memory, I don't have a problem.","the battery is not so good! As for memory, I don't have a problem.","The battery is not so good! as for Memory, I don't have a problem."], correct:1,
    explanations:[
      "Errado. Foi o seu erro: depois de '!' começa frase nova, então vai maiúscula.",
      "Correto! O ponto de exclamação encerra a frase, igual ao ponto final.",
      "Errado. Falta a maiúscula no começo da primeira frase.",
      "Errado. 'memory' é substantivo comum e não leva maiúscula."
    ]},
  { id:"c-cp-t2", category:"caps", prompt:"I use my phone for almost everything! ___ example, I read the news on it.", options:["for","For","FOR","for,"], correct:1,
    explanations:[
      "Errado. Depois de '!' a próxima palavra vai com maiúscula.",
      "Correto! For example — foi assim que você escreveu na conversa, e estava certo. Mantenha o padrão.",
      "Errado. Não se escreve a palavra inteira em maiúsculas.",
      "Errado. A vírgula vem depois de 'example', não antes."
    ]},
  { id:"c-cp-t3", category:"caps", prompt:"Escolha a grafia correta da marca:", options:["iphone","iPhone","Iphone","IPhone"], correct:1,
    explanations:[
      "Errado. Foi assim que você escreveu: a marca tem uma maiúscula no meio.",
      "Correto! iPhone — 'i' minúsculo e 'P' maiúsculo, mesmo no começo da frase.",
      "Errado. O 'P' é que leva a maiúscula, não o 'i'.",
      "Errado. As duas letras em maiúscula não é a grafia oficial."
    ]},
  { id:"c-cp-t4", category:"caps", prompt:"Escolha a frase correta:", options:["My iphone is old, but it works well.","My iPhone is old, but it works well.","My IPhone is old, but it works well.","my iPhone is old, but it works well."], correct:1,
    explanations:[
      "Errado. Falta a maiúscula do 'P' da marca.",
      "Correto! My iPhone is old — a grafia da marca não muda no meio da frase.",
      "Errado. Só o 'P' leva maiúscula.",
      "Errado. Falta a maiúscula no início da frase."
    ]},
  { id:"c-cp-t5", category:"caps", prompt:"Escolha a frase correta:", options:["I don't have a problem. so far, everything works well.","I don't have a problem. So far, everything works well.","I don't have a problem, So far everything works well.","i don't have a problem. So far, everything works well."], correct:1,
    explanations:[
      "Errado. Depois do ponto final a próxima palavra vai com maiúscula.",
      "Correto! Ponto final encerra a frase, e 'So far' abre a próxima.",
      "Errado. Com vírgula a frase continua, então não caberia maiúscula ali.",
      "Errado. 'i' é sempre maiúsculo em inglês e a frase começa com maiúscula."
    ]},
];

/* ================= PRÁTICA: ERROS DA CONVERSA REAL ================= */
const CONV_PRACTICE_QUESTIONS = [
  // ---- Padrão 1 ----
  { id:"c-ar-p1", category:"article", prompt:"She doesn't have ___ problem with the new system.", options:["-","a","the","this"], correct:1,
    explanations:[
      "Errado. Contável no singular sempre pede artigo.",
      "Correto! a problem — ou, no plural, 'problems'.",
      "Errado. 'the' seria um problema específico já citado.",
      "Errado. 'this' apontaria para um problema presente."
    ]},
  { id:"c-ar-p2", category:"article", prompt:"I bought ___ new keyboard yesterday.", options:["-","a","the","an"], correct:1,
    explanations:[
      "Errado. Falta o artigo antes de 'new keyboard'.",
      "Correto! a new keyboard — o artigo vem antes do adjetivo.",
      "Errado. 'the' indicaria um teclado já conhecido na conversa.",
      "Errado. 'an' só antes de som de vogal."
    ]},
  { id:"c-ar-p3", category:"article", prompt:"He wants to buy ___ iPhone next year.", options:["a","an","the","-"], correct:1,
    explanations:[
      "Errado. 'iPhone' tem som de vogal no começo.",
      "Correto! an iPhone — o som manda no artigo, não a letra.",
      "Errado. 'the' apontaria para um aparelho específico.",
      "Errado. Contável no singular precisa de artigo."
    ]},
  { id:"c-ar-p4", category:"article", prompt:"Escolha a frase correta:", options:["My laptop has good camera.","My laptop has a good camera.","My laptop has the good camera.","My laptop has good a camera."], correct:1,
    explanations:[
      "Errado. Falta o artigo.",
      "Correto! a good camera — artigo + adjetivo + substantivo, nessa ordem.",
      "Errado. 'the' indicaria uma câmera já mencionada.",
      "Errado. A ordem está trocada: o artigo vem antes do adjetivo."
    ]},
  { id:"c-ar-p5", category:"article", prompt:"It's ___ old computer, but it's still fast.", options:["-","the","an","a"], correct:2,
    explanations:[
      "Errado. Contável no singular não fica sem artigo.",
      "Errado. 'the' apontaria para um computador específico já citado.",
      "Correto! an old computer — 'old' começa com som de vogal.",
      "Errado. Antes de som de vogal o artigo é 'an'."
    ]},
  { id:"c-ar-p6", category:"article", prompt:"Escolha a frase correta:", options:["I don't have problem with my internet.","I don't have a problem with my internet.","I don't have the problem with my internet.","I don't have problems with a internet."], correct:1,
    explanations:[
      "Errado. É o erro que se repete em todas as rodadas: falta o 'a'.",
      "Correto! I don't have a problem with my internet.",
      "Errado. 'the problem' seria um problema específico já conhecido.",
      "Errado. 'internet' aqui não leva 'a' (e seria 'an' antes de som de vogal)."
    ]},

  // ---- Padrão 2 ----
  { id:"c-pl-p1", category:"placeadv", prompt:"I take my earphones ___.", options:["everywhere","for everywhere","to everywhere","in everywhere"], correct:0,
    explanations:[
      "Correto! everywhere nunca leva preposição.",
      "Errado. O 'for' sobra — foi o erro da conversa.",
      "Errado. O 'to' também sobra.",
      "Errado. 'in everywhere' não existe."
    ]},
  { id:"c-pl-p2", category:"placeadv", prompt:"I want to go ___ early today.", options:["to home","home","for home","in home"], correct:1,
    explanations:[
      "Errado. 'home' não aceita 'to' depois de 'go'.",
      "Correto! go home — mesma lógica de everywhere, here e there.",
      "Errado. 'for home' não existe nesse sentido.",
      "Errado. Para lugar parado o certo seria 'at home'."
    ]},
  { id:"c-pl-p3", category:"placeadv", prompt:"Put your laptop ___, on the desk.", options:["there","to there","in there","for there"], correct:0,
    explanations:[
      "Correto! 'there' sozinho já indica o lugar.",
      "Errado. 'to there' não existe.",
      "Errado. 'in there' aponta para dentro de algo fechado.",
      "Errado. 'for there' não existe."
    ]},
  { id:"c-pl-p4", category:"placeadv", prompt:"Escolha a frase correta:", options:["She carries her charger for everywhere.","She carries her charger everywhere.","She carries her charger to everywhere.","She carries her charger in everywhere."], correct:1,
    explanations:[
      "Errado. O 'for' sobra.",
      "Correto! She carries her charger everywhere.",
      "Errado. O 'to' também sobra.",
      "Errado. 'in everywhere' não existe."
    ]},
  { id:"c-pl-p5", category:"placeadv", prompt:"Come ___ — I want to show you my new monitor.", options:["to here","here","for here","at here"], correct:1,
    explanations:[
      "Errado. 'here' não aceita 'to'.",
      "Correto! Come here.",
      "Errado. 'for here' só aparece em pedido de lanchonete.",
      "Errado. 'at here' não existe."
    ]},

  // ---- Padrão 3 ----
  { id:"c-li-p1", category:"listento", prompt:"I listen ___ podcasts when I go to work.", options:["-","to","at","for"], correct:1,
    explanations:[
      "Errado. O verbo listen sempre pede 'to'.",
      "Correto! listen to podcasts.",
      "Errado. 'listen at' não existe.",
      "Errado. 'listen for' é aguardar atento por um som."
    ]},
  { id:"c-li-p2", category:"listento", prompt:"Can you ___ that noise? I think it's the computer.", options:["listen","hear","listen to","hear to"], correct:1,
    explanations:[
      "Errado. 'listen' é escutar de propósito, e faltaria o 'to'.",
      "Correto! hear = ouvir/perceber, e nunca leva 'to'.",
      "Errado. Aqui o barulho foi percebido por acaso, não escutado de propósito.",
      "Errado. 'hear' nunca leva 'to'."
    ]},
  { id:"c-li-p3", category:"listento", prompt:"Escolha a frase correta:", options:["I listen the teacher in class.","I listen to the teacher in class.","I listen at the teacher in class.","I hear to the teacher in class."], correct:1,
    explanations:[
      "Errado. Falta o 'to'.",
      "Correto! I listen to the teacher — pessoa também entra depois do 'to'.",
      "Errado. 'listen at' não existe.",
      "Errado. 'hear' não leva 'to'."
    ]},
  { id:"c-li-p4", category:"listento", prompt:"What do you like to listen ___ when you study?", options:["to","-","at","for"], correct:0,
    explanations:[
      "Correto! O 'to' fica no fim: What do you like to listen to?",
      "Errado. O 'to' é obrigatório mesmo no fim da frase.",
      "Errado. 'listen at' não existe.",
      "Errado. 'listen for' tem outro sentido."
    ]},
  { id:"c-li-p5", category:"listento", prompt:"I use headphones to listen ___ my online meetings.", options:["at","to","-","for"], correct:1,
    explanations:[
      "Errado. 'listen at' não existe.",
      "Correto! listen to my meetings.",
      "Errado. Sem o 'to' o verbo fica incompleto.",
      "Errado. 'listen for' seria esperar atento por um som específico."
    ]},

  // ---- Padrão 4 ----
  { id:"c-cb-p1", category:"contbe", prompt:"I can't talk now — ___ on a dashboard.", options:["I working","I'm working","me working","I am work"], correct:1,
    explanations:[
      "Errado. O gerúndio nunca aparece sozinho.",
      "Correto! I'm working — am / is / are + verbo-ing.",
      "Errado. 'me' não funciona como sujeito.",
      "Errado. Depois do to be o verbo vai para o gerúndio."
    ]},
  { id:"c-cb-p2", category:"contbe", prompt:"___ a course about SQL this month.", options:["I taking","I'm taking","Me taking","I am take"], correct:1,
    explanations:[
      "Errado. Falta o 'am' antes do gerúndio.",
      "Correto! I'm taking a course.",
      "Errado. 'me' não é sujeito.",
      "Errado. Depois de 'am' o verbo vira taking."
    ]},
  { id:"c-cb-p3", category:"contbe", prompt:"Escolha a frase correta:", options:["When I taking a course, I use my desktop.","When I'm taking a course, I use my desktop.","When I taking a course, I'm use my desktop.","When me taking a course, I use my desktop."], correct:1,
    explanations:[
      "Errado. Foi o erro da conversa: falta o to be no contínuo.",
      "Correto! O to be aparece só onde há gerúndio.",
      "Errado. O to be entrou no verbo errado: 'I use' é presente simples.",
      "Errado. 'me' não é sujeito."
    ]},
  { id:"c-cb-p4", category:"contbe", prompt:"My wife ___ videos on her tablet right now.", options:["watching","is watching","is watch","are watching"], correct:1,
    explanations:[
      "Errado. Falta o verbo to be.",
      "Correto! she is watching — com he/she/it o to be é 'is'.",
      "Errado. Depois do to be vem o gerúndio.",
      "Errado. 'are' é para you/we/they."
    ]},
  { id:"c-cb-p5", category:"contbe", prompt:"They ___ the new dashboard this week.", options:["testing","are testing","is testing","are test"], correct:1,
    explanations:[
      "Errado. O gerúndio sozinho não forma frase.",
      "Correto! they are testing.",
      "Errado. 'is' é para he/she/it.",
      "Errado. Depois de 'are' o verbo vai para o gerúndio."
    ]},
  { id:"c-cb-p6", category:"contbe", prompt:"___ your kids using the computer now?", options:["Do","Are","Is","Does"], correct:1,
    explanations:[
      "Errado. No contínuo a pergunta começa com o to be.",
      "Correto! Are your kids using...? — 'kids' é plural, então 'are'.",
      "Errado. 'is' é para singular.",
      "Errado. 'does' é auxiliar do presente simples."
    ]},

  // ---- Padrão 5 ----
  { id:"c-au-p1", category:"audiounc", prompt:"She sent me two ___ on WhatsApp.", options:["audios","voice messages","audio","informations"], correct:1,
    explanations:[
      "Errado. 'audios' não existe.",
      "Correto! two voice messages — palavra contável, com plural de verdade.",
      "Errado. 'audio' é incontável e não combina com um número.",
      "Errado. 'information' também não tem plural."
    ]},
  { id:"c-au-p2", category:"audiounc", prompt:"I like to listen to ___ when I run.", options:["audios","audio","an audio","audioes"], correct:1,
    explanations:[
      "Errado. A palavra não vai para o plural.",
      "Correto! listen to audio — e repare no 'to', que o verbo listen sempre pede.",
      "Errado. Incontável não aceita 'a/an'.",
      "Errado. Essa forma não existe."
    ]},
  { id:"c-au-p3", category:"audiounc", prompt:"Escolha a frase correta:", options:["The teacher sends audios every week.","The teacher sends audio files every week.","The teacher sends an audios every week.","The teacher sends audioes every week."], correct:1,
    explanations:[
      "Errado. 'audios' não existe.",
      "Correto! audio files — é assim que se conta.",
      "Errado. Mistura artigo singular com plural.",
      "Errado. Essa forma não existe."
    ]},
  { id:"c-au-p4", category:"audiounc", prompt:"There is a lot of ___ about the course on the site.", options:["informations","information","an information","information files"], correct:1,
    explanations:[
      "Errado. 'information' nunca tem plural — mesma família de audio, stuff e music.",
      "Correto! a lot of information, e o verbo no singular: there is.",
      "Errado. Incontável não aceita 'an'.",
      "Errado. Não é assim que se conta informação; use 'pieces of information' ou reescreva."
    ]},

  // ---- Padrão 6 ----
  { id:"c-af-p1", category:"asfor", prompt:"___ the screen, it's very clear and big.", options:["About","As for","In about","For about"], correct:1,
    explanations:[
      "Errado. 'About' sozinho não abre frase.",
      "Correto! As for the screen, ... — com vírgula depois.",
      "Errado. 'in about' não existe nesse sentido.",
      "Errado. 'for about' é duração aproximada."
    ]},
  { id:"c-af-p2", category:"asfor", prompt:"Escolha a frase correta:", options:["About the battery I have a problem.","As for the battery, I have a problem.","About the battery, I have problem.","For the battery, I have a problem."], correct:1,
    explanations:[
      "Errado. 'About' não abre a frase.",
      "Correto! As for the battery, I have a problem — com o artigo em 'a problem'.",
      "Errado. Além do 'about', falta o artigo.",
      "Errado. 'for the battery' não introduz o assunto."
    ]},
  { id:"c-af-p3", category:"asfor", prompt:"___ my laptop, it's light and I carry it everywhere.", options:["About","Talking about","On about","In about"], correct:1,
    explanations:[
      "Errado. 'About' sozinho não abre a frase.",
      "Correto! Talking about my laptop, ... — a alternativa natural ao 'as for'.",
      "Errado. 'on about' não existe.",
      "Errado. 'in about' é tempo aproximado."
    ]},
  { id:"c-af-p4", category:"asfor", prompt:"In the class we talked ___ new technologies.", options:["about","as for","of about","for"], correct:0,
    explanations:[
      "Correto! Depois do verbo o 'about' está perfeito: talk about, read about, think about.",
      "Errado. 'as for' só abre frase, não vem depois do verbo.",
      "Errado. 'of about' não existe.",
      "Errado. 'talk for' tem outro sentido."
    ]},

  // ---- Padrão 7 ----
  { id:"c-fn-p1", category:"fornow", prompt:"___, everything is working well on my computer.", options:["For a while","So far","By now","Since now"], correct:1,
    explanations:[
      "Errado. 'for a while' fala de duração, não de 'até agora'.",
      "Correto! So far = até agora.",
      "Errado. 'by now' é 'a esta altura'.",
      "Errado. 'since now' não existe; seria 'from now on'."
    ]},
  { id:"c-fn-p2", category:"fornow", prompt:"I use this old laptop ___, but I want a new one.", options:["for a while","for now","by now","in now"], correct:1,
    explanations:[
      "Errado. Aqui o sentido é 'por enquanto', e 'for a while' é 'por um tempo'.",
      "Correto! for now = por enquanto.",
      "Errado. 'by now' significa 'a esta altura'.",
      "Errado. 'in now' não existe."
    ]},
  { id:"c-fn-p3", category:"fornow", prompt:"I studied English ___ last year, but then I stopped.", options:["for now","for a while","so far","by now"], correct:1,
    explanations:[
      "Errado. 'for now' é por enquanto, e a frase fala do passado.",
      "Correto! Este é o uso certo: estudei por um tempo — for a while.",
      "Errado. 'so far' liga o passado ao presente, e aqui a ação acabou.",
      "Errado. 'by now' significa 'a esta altura'."
    ]},
  { id:"c-fn-p4", category:"fornow", prompt:"Para dizer 'por enquanto a bateria está bem', escolha a frase correta:", options:["The battery is fine for a while.","The battery is fine for now.","The battery is fine by a while.","The battery is fine in a while."], correct:1,
    explanations:[
      "Errado. Isso diria que a bateria fica bem por um tempo determinado.",
      "Correto! The battery is fine for now.",
      "Errado. 'by a while' não existe.",
      "Errado. 'in a while' significa 'daqui a pouco'."
    ]},

  // ---- Padrão 8 ----
  { id:"c-cp-p1", category:"caps", prompt:"Escolha a frase correta:", options:["My phone is old! as for the battery, it's not good.","My phone is old! As for the battery, it's not good.","my phone is old! As for the battery, it's not good.","My phone is old! as for the Battery, it's not good."], correct:1,
    explanations:[
      "Errado. Depois de '!' começa frase nova, com maiúscula.",
      "Correto! O '!' encerra a frase igual ao ponto final.",
      "Errado. Falta a maiúscula no começo.",
      "Errado. 'battery' é substantivo comum e fica em minúscula."
    ]},
  { id:"c-cp-p2", category:"caps", prompt:"I use my laptop for everything! ___ example, I study English on it.", options:["for","For","FOR","for,"], correct:1,
    explanations:[
      "Errado. Depois de '!' a palavra seguinte vai com maiúscula.",
      "Correto! For example, ... — com a vírgula depois de 'example'.",
      "Errado. Não se escreve tudo em maiúsculas.",
      "Errado. A vírgula fica depois de 'example'."
    ]},
  { id:"c-cp-p3", category:"caps", prompt:"Escolha a frase correta:", options:["My iphone has a good screen.","My iPhone has a good screen.","My IPhone has a good screen.","my iPhone has a good screen."], correct:1,
    explanations:[
      "Errado. Falta a maiúscula do 'P' da marca.",
      "Correto! iPhone, com 'i' minúsculo e 'P' maiúsculo.",
      "Errado. Só o 'P' leva maiúscula.",
      "Errado. Falta a maiúscula no início da frase."
    ]},
  { id:"c-cp-p4", category:"caps", prompt:"Escolha a frase correta:", options:["I take a course on youtube every week.","I take a course on YouTube every week.","I take a course on Youtube every week.","I take a course on youTube every week."], correct:1,
    explanations:[
      "Errado. Nome de marca leva maiúscula.",
      "Correto! YouTube — igual a iPhone, a grafia oficial da marca não muda.",
      "Errado. O 'T' do meio também é maiúsculo.",
      "Errado. O 'Y' inicial é que leva maiúscula."
    ]},
  { id:"c-cp-p5", category:"caps", prompt:"Escolha a frase correta:", options:["I don't have a problem. so far, it works well.","I don't have a problem. So far, it works well.","I don't have a problem, So far it works well.","i don't have a problem. So far, it works well."], correct:1,
    explanations:[
      "Errado. Depois do ponto final vem maiúscula.",
      "Correto! Ponto final encerra a frase; 'So far' abre a próxima.",
      "Errado. Com vírgula a frase continua e não caberia maiúscula.",
      "Errado. 'i' é sempre maiúsculo em inglês."
    ]},
];

/* Retorna a lista de exercícios de prática de uma categoria específica do módulo de conversa real */
function getConvPracticeForCategory(categoryKey) {
  return CONV_PRACTICE_QUESTIONS.filter(q => q.category === categoryKey);
}
