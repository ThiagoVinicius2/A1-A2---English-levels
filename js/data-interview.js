/* ============================================================
   MÓDULO 04 — "Job Interview" (entrevista em inglês)

   A pergunta vem em inglês e a pessoa escreve a resposta, em inglês. Cada
   pergunta declara o seu `kind`:

   - `kind:"mirror"` — a resposta padrão desta pergunta JÁ existe, escrita pelo
     dono, e o exercício é reproduzi-la até sair sem pensar. **Só estas entram
     na rodada.** Aqui existe gabarito: o texto digitado é comparado com o da
     resposta, parte por parte, pelo mesmo corretor do módulo de tradução
     (contração, caixa, pontuação e erro de digitação já resolvidos lá). A
     resposta vive em `partes[]`, **cinco blocos temáticos** — a âncora, de
     onde você vem, a virada para dados, o que você faz hoje e por que esta
     vaga —, e o `modelo` guarda a resposta inteira emendada. A tela não dá
     deixa em português: mostra a pergunta, o **tópico** do bloco e o campo.
     A resposta inteira numa caixa só já foi tentada e não funcionou nesta
     etapa: são quase duzentas palavras de memória, e o dono pediu para
     separar.

     Cada bloco leva duas orientações, e **a ordem em que elas aparecem é
     regra**: a `funcao` diz o que aquele bloco precisa fazer e aparece
     ANTES, junto da contagem de palavras — por isso ela não pode citar
     palavra nenhuma da resposta (o validador confere isso, procurando
     qualquer trio de palavras da resposta dentro dela). A `dica` é como
     dizer o bloco em voz alta e cita palavra em inglês de propósito, então
     só aparece DEPOIS de conferir, no lugar onde ela serve. As duas são
     conteúdo pedagógico, então em português; o rótulo "Delivery" é
     interface, então em inglês.
   - `kind:"soon"` — a resposta padrão ainda não foi escrita. A pergunta fica
     **fora da rodada**, e o que ela guarda (`porque` e `pontos`) é o material
     para escrever essa resposta: por que o entrevistador faz a pergunta e o
     que uma resposta forte precisa cobrir. O `modelo` é uma resposta de
     exemplo, de analista de dados, para servir de ponto de partida — não é
     gabarito de nada.

   O combinado é um espelho por vez: o dono pratica uma pergunta até ela sair
   inteira, escreve a resposta padrão da próxima, e aí ela vira `mirror` — o
   `modelo` passa a ser a resposta dele (não mais um exemplo), o `kind` muda e
   os `pontos`, que eram o roteiro de escrita, saem.

   Idioma: a pergunta e o modelo são o inglês que a pessoa vai produzir. O
   `porque` e os `pontos` são a orientação — conteúdo pedagógico, então em
   português.
   ============================================================ */

const INTERVIEW_QUESTIONS = [
  /* ---- Pergunta 1: resposta-espelho ----
     Esta é a resposta padrão do dono, escrita por ele. O exercício é
     reproduzi-la: o texto digitado é comparado parte por parte com o que está
     aqui, e o corretor é o mesmo do módulo de tradução. Por isso a resposta é
     guardada em BLOCOS — um tópico por vez. Mandar escrever a resposta
     inteira de uma vez não ensina nada: o erro apareceria todo junto no fim,
     sem dizer qual frase escapou.

     A nota não é um veredito só: mesmo num bloco de 40 palavras, "certo ou
     errado" seria inútil — uma palavra trocada já derruba a comparação
     inteira. Quem conta é o `transDiffWords()` do módulo de tradução, palavra
     por palavra: a nota é quantas palavras da resposta saíram, e a tela
     mostra quais faltaram e quais sobraram. As palavras dos cinco blocos
     somam a resposta inteira — o validador confere essa soma.

     Não cadastre `accept` com outra formulação: o objetivo é dizer ESTA
     resposta, não uma parecida. */
  { id: "i-1",
    kind: "mirror",
    tag: "Opening",
    question: "Tell me about yourself.",
    porque: "É a primeira pergunta e serve para você escolher a história que o resto da "
          + "entrevista vai seguir. A sua resposta padrão vem em cinco blocos: escreva cada "
          + "um de memória, e a tela marca palavra por palavra o que saiu, o que faltou e o "
          + "que sobrou. No fim do quinto você lê a resposta inteira.",
    partes: [
      { topic: "The anchor — one line, then stop",
        funcao: "Dar à recrutadora uma etiqueta mental para você já na primeira frase.",
        dica: "Fale essa frase devagar e pare. É a frase mais importante da resposta.",
        en: "Sure, happy to. I'm a production engineer who moved into data." },
      { topic: "Where you came from",
        funcao: "Mostrar os dez anos de bagagem sem parecer que você está fora do mundo de dados.",
        dica: "Os nomes das empresas fazem trabalho sozinhos: diga-os com calma. “Bosch” em inglês "
            + "é BOSH, e “Volkswagen” é VOLKS-wagen, não “vólksvagen”.",
        en: "I worked for about ten years in industrial companies — Volkswagen, Bosch, Sumitomo and "
          + "KYB. Most of that time I worked with production data: machine stoppages, quality and "
          + "waste." },
      { topic: "The turn into data",
        funcao: "Explicar por que você mudou. Sem isso fica a dúvida “por que um cara de fábrica "
              + "está aqui?” — e dúvida não respondida vira objeção.",
        dica: "“analysis” é uh-NAL-uh-sis, não “aná-lisis”. “reliable” é "
            + "ri-LAI-uh-bul.",
        en: "I started working with data because of that. In the factory, the hard part was never "
          + "the analysis — it was getting reliable data. So I learned SQL and BI tools to solve that "
          + "myself. In 2025 I moved into data full time." },
      { topic: "What you do today",
        funcao: "O bloco mais concreto. Um número, nada de sopa de siglas.",
        dica: "“I take data from different systems, organise it, test it, and deliver it” é "
            + "ouro com recrutador: explica engenharia de dados sem usar a palavra. “Qlik” "
            + "se fala “click”.",
        en: "Today I'm a Data and BI Analyst. I build and maintain data "
          + "pipelines — I take data from different systems, organise it, test it, and deliver it "
          + "ready for analysis. The largest datasets I work with have around twenty million rows, "
          + "and they feed Power BI and Qlik Sense dashboards. I also use Python and Airflow to "
          + "automate these processes." },
      { topic: "Why this role",
        funcao: "Fechar amarrando a sua história à vaga. Nunca termine no bloco 4 — termine aqui, "
              + "senão ela precisa perguntar.",
        dica: "É o fecho: depois dele, silêncio. Deixe a próxima pergunta vir.",
        en: "And that's why this position caught my attention. It's a data engineering role, which "
          + "is the direction I've been building towards. And it's in an industrial environment, "
          + "which is where I come from. I'm used to working with engineers, so that part feels "
          + "natural to me." },
    ],
    modelo: "Sure, happy to. I'm a production engineer who moved into data.\n\n"
          + "I worked for about ten years in industrial companies — Volkswagen, Bosch, Sumitomo "
          + "and KYB. Most of that time I worked with production data: machine stoppages, quality "
          + "and waste.\n\n"
          + "I started working with data because of that. In the factory, the hard part was never "
          + "the analysis — it was getting reliable data. So I learned SQL and BI tools to solve "
          + "that myself. In 2025 I moved into data full time.\n\n"
          + "Today I'm a Data and BI Analyst. I build and maintain data "
          + "pipelines — I take data from different systems, organise it, test it, and deliver it "
          + "ready for analysis. The largest datasets I work with have around twenty million rows, "
          + "and they feed Power BI and Qlik Sense dashboards. I also use Python and Airflow to "
          + "automate these processes.\n\n"
          + "And that's why this position caught my attention. It's a data engineering role, which "
          + "is the direction I've been building towards. And it's in an industrial environment, "
          + "which is where I come from. I'm used to working with engineers, so that part feels "
          + "natural to me." },

  { id: "i-2",
    kind: "soon",
    tag: "Your move",
    question: "Why are you looking to leave your current role?",
    porque: "Eles querem saber se você está fugindo de um problema ou indo atrás de algo. "
          + "Fale do que você quer fazer, não do que te incomoda. Criticar a empresa ou a "
          + "gestão atual é o jeito mais rápido de perder a vaga.",
    pontos: [
      "uma frase positiva e verdadeira sobre o trabalho atual",
      "o que você quer fazer e hoje não dá",
      "a ligação com esta vaga",
      "nenhuma reclamação de pessoa ou de empresa",
    ],
    modelo: "I've learned a lot where I am — I built most of our reporting from scratch. "
          + "What I'm looking for now is more depth on the engineering side: dbt, testing, "
          + "data quality. In my current team there isn't much room to go that way, because "
          + "we are two analysts and the daily reporting always comes first. This role is "
          + "the opposite: the pipeline work is the core of the job, and I want to be closer "
          + "to that." },

  { id: "i-3",
    kind: "soon",
    tag: "Project story",
    question: "Walk me through a recent project.",
    porque: "Aqui eles medem como você pensa, não o tamanho do projeto. Use uma estrutura "
          + "simples: qual era o problema do negócio, o que você fez, como ficou. Termine "
          + "com o número e com o que faria diferente — isso separa quem executou de quem "
          + "entendeu.",
    pontos: [
      "o problema, do ponto de vista do negócio",
      "o que exatamente você fez",
      "as ferramentas que entraram",
      "o resultado, com número",
      "o que você faria diferente hoje",
    ],
    modelo: "Of course. The problem was that the sales team didn't trust the weekly report — "
          + "every area had its own number for revenue. What I did was map where each number "
          + "came from, and we found three different definitions of a closed deal. I started "
          + "by agreeing on one definition with the sales lead, then I rebuilt the model in "
          + "dbt with tests on the key columns and put a single dashboard on top of it. In "
          + "the end we went from three numbers to one, and the weekly meeting stopped "
          + "arguing about the data. If I did it again, I would write the definitions down "
          + "with the business before touching any SQL." },

  { id: "i-4",
    kind: "soon",
    tag: "Tools",
    question: "What's your experience with Power BI?",
    porque: "A pergunta é sobre a ferramenta que o anúncio pede — troque Power BI pela que "
          + "estiver na vaga. Responda em três camadas: quanto tempo, o que você construiu "
          + "com ela e onde está o seu limite. Dizer o limite com honestidade vale mais que "
          + "inflar: a próxima pergunta costuma ser técnica.",
    pontos: [
      "quanto tempo de uso, e com que frequência",
      "o que você construiu com ela",
      "um detalhe técnico que mostra profundidade",
      "o que você ainda não domina, sem drama",
    ],
    modelo: "I've used it for about four years, almost every day. I built the reporting "
          + "layer for the commercial team — around fifteen dashboards, with row-level "
          + "security so each regional manager only sees their own area. I'm comfortable "
          + "with the data model side, star schema, and writing DAX measures. I'm still "
          + "learning the heavier DAX, things like time intelligence over a custom calendar. "
          + "I haven't worked with Fabric yet, but the SQL behind the reports is the part I "
          + "know best." },

  { id: "i-5",
    kind: "soon",
    tag: "Money",
    question: "What are your salary expectations?",
    porque: "É pergunta de negociação, não de inglês — mas em inglês ela trava muita gente. "
          + "Dê uma faixa, mostre de onde ela vem e devolva a pergunta. Um número único te "
          + "prende; não dizer nada passa despreparo.",
    pontos: [
      "uma faixa, não um número único",
      "de onde vem a faixa (mercado, sua experiência)",
      "deixar claro que o pacote todo conta",
      "devolver a pergunta com elegância",
    ],
    modelo: "Based on what I've seen for data analyst roles at this level, I'm looking for "
          + "something in the range of X to Y, depending on the rest of the package — "
          + "benefits, remote work and the learning budget matter to me as well. Is that in "
          + "line with the range you have in mind for this role?" },

  { id: "i-6",
    kind: "soon",
    tag: "Your turn",
    question: "Do you have any questions for me?",
    porque: "Tenha sempre duas ou três. É aqui que você mostra que entendeu a vaga e que "
          + "está escolhendo também. Pergunta de salário não entra aqui; pergunta sobre o "
          + "dia a dia, o time e o que é sucesso entra.",
    pontos: [
      "uma pergunta sobre o trabalho do dia a dia",
      "uma pergunta sobre o time ou a stack",
      "uma pergunta sobre o que é sucesso nos primeiros meses",
      "fechar agradecendo e dizendo que segue interessado",
    ],
    modelo: "Yes, a couple. How is the data team organized today — are the analysts embedded "
          + "in the business areas, or is it one central team? And what would success look "
          + "like for this role in the first six months? Last one: which tools are already "
          + "in place, and is there anything you plan to replace this year? Thanks, that's "
          + "helpful — this is the kind of work I was hoping to hear about." },
];

/* A pergunta é de reproduzir a resposta padrão? */
function interviewIsMirror(q) {
  return !!q && q.kind === "mirror";
}

/* A rodada é só o que tem resposta padrão. As `soon` aparecem na tela inicial
   como o que ainda falta escrever, nunca como exercício: sem resposta não há
   o que espelhar, e cobrar uma resposta livre seria outro módulo. */
function getInterviewRound() {
  return INTERVIEW_QUESTIONS.filter(interviewIsMirror);
}

/* Confere a resposta inteira contra a padrão, palavra por palavra. Quem
   compara é o transDiffWords() do módulo de tradução, carregado antes deste
   arquivo — a mesma decisão do módulo da conversa: um segundo corretor
   duplicaria a parte mais delicada do site. A chamada só acontece em tempo de
   execução, nunca na carga.

   Devolve as palavras que saíram, o total da resposta padrão, quantas
   sobraram e o próprio diff, que a tela desenha.

   Por que palavra, e não o veredito inteiro do gradeTransAnswer(): numa
   resposta de 210 palavras, uma trocada já derruba tudo para "diferente", e
   a nota não diria nada sobre o que a pessoa de fato lembrou. A régua é uma
   só — conta palavra —, e por isso escrever "I am" onde a resposta tem "I'm"
   aparece como diferença: num espelho, a meta é dizer ESTA resposta, e uma
   palavra em 210 custa meio ponto percentual. */
function interviewCheckText(esperado, digitado) {
  const diff = transDiffWords(esperado, digitado || "");
  return {
    acertos: diff.expected.filter(w => w.state === "same").length,
    total: diff.expected.length,
    sobraram: diff.typed.filter(w => w.state !== "same").length,
    diff,
  };
}

/* Quantas palavras cada bloco cobra, e quantas a pergunta inteira cobra. É o
   denominador da nota, e sai do mesmo diff que conta os acertos — se saísse de
   outra contagem, o total da tela poderia não bater com a soma dos blocos. */
function interviewPartTotal(parte) {
  return interviewCheckText(parte.en, "").total;
}

function interviewTotalWords(q) {
  return q.partes.reduce((t, parte) => t + interviewPartTotal(parte), 0);
}

/* A chave do bloco, que é o que o histórico guarda. Prefixada pela pergunta
   porque o "bloco 1" da próxima resposta não é este — a mesma razão das
   chaves de deck do módulo de tradução serem prefixadas pela unidade. */
function interviewBlockKey(q, i) {
  return q.id + "-b" + (i + 1);
}

/* Todos os blocos praticáveis, de todas as perguntas que já têm resposta
   padrão, na ordem. É o que a tela de escolha lista. */
function getInterviewBlocks() {
  const blocos = [];
  getInterviewRound().forEach(q => {
    q.partes.forEach((parte, i) => {
      blocos.push({ key: interviewBlockKey(q, i), q, i, parte, total: interviewPartTotal(parte) });
    });
  });
  return blocos;
}

function getInterviewBlockByKey(key) {
  return getInterviewBlocks().filter(b => b.key === key)[0] || null;
}

/* Quantas palavras tem um texto. Serve para a tela inicial dizer o tamanho da
   resposta padrão ("your 210-word answer"). */
function interviewWordCount(texto) {
  return String(texto || "").trim().split(/\s+/).filter(Boolean).length;
}

function getInterviewQuestionById(id) {
  return INTERVIEW_QUESTIONS.filter(q => q.id === id)[0] || null;
}
