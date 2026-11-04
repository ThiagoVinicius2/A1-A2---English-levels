/* ============================================================
   MÓDULO 04 — "Job Interview" (entrevista em inglês)

   A pergunta vem em inglês e a pessoa escreve a resposta inteira, em inglês.
   É o único módulo em que NÃO existe resposta certa: "Tell me about yourself"
   tem infinitas respostas boas, e um corretor por comparação de string não
   serve para nada aqui.

   Então a régua é outra, e é honesta sobre o que dá para medir sem IA:

   1. **Checklist** (`pontos`) — o que uma resposta forte tem. A pessoa marca
      o que cobriu, e a porcentagem do módulo é isso: pontos marcados sobre
      pontos possíveis. É autoavaliação de propósito; o módulo é de preparação
      para entrevista, e quem sabe se a resposta cobriu o ponto é quem a
      escreveu.
   2. **Blocos de inglês** (`frases`) — o app procura cada bloco no texto
      digitado e diz quais apareceram. Isso é automático e vale como dica, não
      como nota. Quem compara é o `transNormalize()` do módulo de tradução:
      ele já ignora caixa, pontuação e contração, então "I've been working" e
      "I have been working" contam igual. **Reusar foi decisão deliberada** —
      um segundo normalizador duplicaria a parte mais delicada do site.
   3. **Tamanho** (`palavras`) — a faixa de palavras que cabe em 30-60
      segundos de fala. Resposta de 15 palavras não é resposta de entrevista;
      de 250, ninguém ouve até o fim.
   4. **Resposta modelo** (`modelo`) — uma resposta inteira, de analista de
      dados, para comparar depois de escrever a sua. Nunca antes.

   Idioma: a pergunta, os blocos e o modelo são o inglês que a pessoa vai
   produzir. O `porque` e os `pontos` são a orientação — conteúdo pedagógico,
   então em português.
   ============================================================ */

const INTERVIEW_QUESTIONS = [
  { id: "i-1",
    tag: "Opening",
    question: "Tell me about yourself.",
    porque: "É a primeira pergunta e serve para você escolher a história que o resto da "
          + "entrevista vai seguir. Não é a sua biografia: são 60 a 90 segundos sobre o que "
          + "você faz hoje, o que fez antes e por que está nesta conversa.",
    pontos: [
      "quanto tempo você trabalha com dados",
      "o que você faz hoje, em uma frase",
      "uma ou duas ferramentas que você usa de verdade",
      "um resultado concreto, com número se der",
      "por que esta vaga, fechando a resposta",
    ],
    frases: [
      "I've been working with data for",
      "Right now I'm",
      "My main tools are",
      "What I enjoy most is",
      "That's why I'm interested in",
    ],
    modelo: "Sure. I've been working with data for about six years. Right now I'm a data "
          + "analyst at a retail company, where I build dashboards in Power BI and maintain "
          + "the SQL models behind them. Last year I rebuilt our sales reporting, and the "
          + "team went from waiting two days for the numbers to having them every morning. "
          + "What I enjoy most is sitting with the business and turning a vague question "
          + "into a metric. That's why I'm interested in this role — you're building the "
          + "data team from the ground up, and that's the work I like best.",
    palavras: [70, 140] },

  { id: "i-2",
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
    frases: [
      "I've learned a lot",
      "What I'm looking for now is",
      "there isn't much room to",
      "This role is",
      "closer to",
    ],
    modelo: "I've learned a lot where I am — I built most of our reporting from scratch. "
          + "What I'm looking for now is more depth on the engineering side: dbt, testing, "
          + "data quality. In my current team there isn't much room to go that way, because "
          + "we are two analysts and the daily reporting always comes first. This role is "
          + "the opposite: the pipeline work is the core of the job, and I want to be closer "
          + "to that.",
    palavras: [50, 120] },

  { id: "i-3",
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
    frases: [
      "The problem was",
      "What I did was",
      "I started by",
      "In the end",
      "If I did it again",
    ],
    modelo: "Of course. The problem was that the sales team didn't trust the weekly report — "
          + "every area had its own number for revenue. What I did was map where each number "
          + "came from, and we found three different definitions of a closed deal. I started "
          + "by agreeing on one definition with the sales lead, then I rebuilt the model in "
          + "dbt with tests on the key columns and put a single dashboard on top of it. In "
          + "the end we went from three numbers to one, and the weekly meeting stopped "
          + "arguing about the data. If I did it again, I would write the definitions down "
          + "with the business before touching any SQL.",
    palavras: [80, 160] },

  { id: "i-4",
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
    frases: [
      "I've used it for",
      "I built",
      "I'm comfortable with",
      "I'm still learning",
      "I haven't worked with",
    ],
    modelo: "I've used it for about four years, almost every day. I built the reporting "
          + "layer for the commercial team — around fifteen dashboards, with row-level "
          + "security so each regional manager only sees their own area. I'm comfortable "
          + "with the data model side, star schema, and writing DAX measures. I'm still "
          + "learning the heavier DAX, things like time intelligence over a custom calendar. "
          + "I haven't worked with Fabric yet, but the SQL behind the reports is the part I "
          + "know best.",
    palavras: [60, 130] },

  { id: "i-5",
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
    frases: [
      "Based on what I've seen",
      "I'm looking for something in the range of",
      "depending on the rest of the package",
      "what range do you have in mind",
      "Is that in line with",
    ],
    modelo: "Based on what I've seen for data analyst roles at this level, I'm looking for "
          + "something in the range of X to Y, depending on the rest of the package — "
          + "benefits, remote work and the learning budget matter to me as well. Is that in "
          + "line with the range you have in mind for this role?",
    palavras: [40, 100] },

  { id: "i-6",
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
    frases: [
      "Yes, a couple",
      "How is the data team",
      "What would success look like",
      "which tools",
      "that's helpful",
    ],
    modelo: "Yes, a couple. How is the data team organized today — are the analysts embedded "
          + "in the business areas, or is it one central team? And what would success look "
          + "like for this role in the first six months? Last one: which tools are already "
          + "in place, and is there anything you plan to replace this year? Thanks, that's "
          + "helpful — this is the kind of work I was hoping to hear about.",
    palavras: [45, 110] },
];

/* Quais blocos de inglês apareceram no que a pessoa escreveu.

   Quem normaliza é o transNormalize() do módulo de tradução, carregado antes
   deste arquivo em index.html — então a comparação já ignora caixa, acento,
   pontuação e contração de graça, e "I've been working" casa com "I have been
   working". A chamada só acontece em tempo de execução, nunca na carga. */
function interviewPhrasesFound(question, typed) {
  const texto = " " + transNormalize(typed || "") + " ";
  return question.frases.map(f => ({
    frase: f,
    achou: texto.indexOf(" " + transNormalize(f) + " ") !== -1,
  }));
}

/* Quantas palavras a pessoa escreveu. Palavra é bloco separado por espaço:
   serve para dizer "você escreveu 40, mire entre 70 e 140", que é o tamanho
   de 30 a 60 segundos de fala. */
function interviewWordCount(typed) {
  return String(typed || "").trim().split(/\s+/).filter(Boolean).length;
}

function getInterviewQuestionById(id) {
  return INTERVIEW_QUESTIONS.filter(q => q.id === id)[0] || null;
}
