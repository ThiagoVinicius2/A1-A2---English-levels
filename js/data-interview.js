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

   **Cada pergunta é uma UNIDADE.** Os blocos são dela, o histórico é dela e a
   rodada nunca atravessa de uma resposta para outra: a navegação é escolher a
   pergunta, escolher os blocos e praticar, igual a unidade → decks → rodada do
   módulo de tradução. Por isso a chave do bloco é prefixada pelo id da
   pergunta (`i-2-b3`), e o `getInterviewBlocks(id)` filtra por ela.

   O número de blocos é da resposta, não uma tabela: a pergunta 1 tem cinco
   (foi como o dono escreveu) e a pergunta 2 tem quatro, que são os quatro
   parágrafos dela. Cortar a 2 em cinco para igualar partiria um parágrafo no
   meio, e parágrafo é a unidade em que a resposta é dita.

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
        en: "I worked for about ten years in industrial companies — Volkswagen, Bosch and "
          + "Sumitomo. Most of that time I worked with production data: machine stoppages, quality and "
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
          + "I worked for about ten years in industrial companies — Volkswagen, Bosch and "
          + "Sumitomo. Most of that time I worked with production data: machine stoppages, quality "
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

  /* ---- Pergunta 2: resposta-espelho ----
     A segunda resposta padrão do dono, e a segunda pergunta a virar espelho. Ela
     responde ao que o recrutador vê no currículo (várias trocas em dois anos) e,
     no mesmo movimento, diz o que ele procura agora — que era a pergunta antiga
     desta posição ("Why are you looking to leave your current role?"). O
     enunciado passou a ser o que de fato é perguntado numa entrevista.

     Os quatro blocos são os quatro parágrafos da resposta, na ordem em que ele a
     escreveu: a explicação das trocas, a troca que não foi escolha dele, o
     motivo principal de hoje e o segundo motivo. Cortar em cinco para igualar a
     pergunta 1 partiria um parágrafo no meio, e parágrafo é a unidade em que a
     resposta é dita. */
  { id: "i-2",
    kind: "mirror",
    tag: "Your move",
    question: "I noticed a few changes in the last two years — can you walk me through them?",
    porque: "É a pergunta que o currículo provoca: várias trocas em pouco tempo pedem uma "
          + "explicação, e quem não a dá deixa o recrutador preencher o espaço sozinho. A sua "
          + "resposta padrão vem em quatro blocos — a explicação, a troca que não foi sua "
          + "escolha, o que você quer agora e o segundo motivo.",
    partes: [
      { topic: "The changes, and the reason behind them",
        funcao: "Assumir as trocas na primeira frase e dizer que existe um fio — depois mostrar "
              + "esse fio como evolução técnica, não como inquietação.",
        dica: "A lista no fim é uma escada e se diz como escada: uma pausa curta depois de cada "
            + "etapa, subindo. Não corra nela.",
        en: "Yes, since moving into data, I've had a few job changes. But there's a reason "
          + "behind that. Each move gave me new challenges and the chance to learn new tools. I "
          + "started with dashboards, then moved into data modeling, and later into building "
          + "data pipelines." },
      { topic: "The change that was not your call",
        funcao: "Tirar da conta a troca que não foi decisão sua, explicando o contrato sem "
              + "queixa e sem culpar ninguém. É fato, não desabafo.",
        dica: "Tom neutro e ritmo normal: foi um contrato que mudou, não uma demissão por "
            + "desempenho — se a voz pedir desculpa, o recrutador ouve problema onde não há.",
        en: "One of these changes was not my decision. My position at Quality Digital was "
          + "linked to a service contract with Boticário, and when the contract was renewed, "
          + "the Data Analyst position was not part of the new agreement." },
      { topic: "The main reason you want this move",
        funcao: "Virar a resposta para a frente: o que você quer fazer, o que hoje divide o seu "
              + "tempo e por que esta vaga é exatamente o lado que você quer.",
        dica: "As três palavras da lista são o centro da resposta — diga-as separadas, com "
            + "vírgula de verdade. E a última frase é um fecho: não emende nela.",
        en: "Now, the main reason I'm looking for a change is the work itself. Today my job is "
          + "split between building the data and presenting it, and I want to be fully on the "
          + "engineering side: ETL, pipelines, modeling. This is a data engineering position, "
          + "not a BI one, and that's the move I want to make." },
      { topic: "The second reason",
        funcao: "Fechar com o segundo motivo, que mostra que você já viveu o ambiente da vaga "
              + "— é experiência, não desejo solto.",
        dica: "É o bloco mais curto e o último: diga-o devagar e pare. O silêncio depois dele "
            + "é o convite para a próxima pergunta.",
        en: "And there's a second reason: it would be a chance to work in a multinational and "
          + "with a global team again. I had that experience as a Process Analyst, and it's "
          + "something I'd like to have again." },
    ],
    modelo: "Yes, since moving into data, I've had a few job changes. But there's a reason "
          + "behind that. Each move gave me new challenges and the chance to learn new tools. "
          + "I started with dashboards, then moved into data modeling, and later into building "
          + "data pipelines.\n\n"
          + "One of these changes was not my decision. My position at Quality Digital was "
          + "linked to a service contract with Boticário, and when the contract was renewed, "
          + "the Data Analyst position was not part of the new agreement.\n\n"
          + "Now, the main reason I'm looking for a change is the work itself. Today my job is "
          + "split between building the data and presenting it, and I want to be fully on the "
          + "engineering side: ETL, pipelines, modeling. This is a data engineering position, "
          + "not a BI one, and that's the move I want to make.\n\n"
          + "And there's a second reason: it would be a chance to work in a multinational and "
          + "with a global team again. I had that experience as a Process Analyst, and it's "
          + "something I'd like to have again." },

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

  /* ---- Pergunta 4: resposta-espelho ----
     A pergunta das ferramentas da vaga, agora na forma em que ela é feita de
     verdade: o recrutador lê a lista do cliente e pede a sua posição em cada
     item. O enunciado guardado é a versão curta dessa pergunta — o que o
     recrutador diz antes ("Now I'd like to go through the technical
     requirements with you, because the client was very specific about them")
     é moldura, e o enunciado é o que ele pede. A versão `soon` desta posição
     era "What's your experience with Power BI?", com uma ferramenta só.

     Seis blocos, na ordem em que o dono escreveu a resposta: anunciar a
     estrutura, o que é forte, o que já está coberto, a ferramenta com a
     fronteira clara, o gap e a ponte. A ordem é a tática da resposta — o gap
     só funciona DEPOIS do que é forte, e a ponte só funciona depois do gap. */
  { id: "i-4",
    kind: "mirror",
    tag: "Tools",
    question: "The role asks for Python, SQL, Spark, Databricks and Airflow — where do you stand on each?",
    porque: "É a pergunta que decide a parte técnica da entrevista. A resposta do dono não "
          + "vende nem se encolhe: ela abre pelo que é forte, marca rápido o que já está "
          + "coberto, delimita sozinha onde o uso ainda não chegou, diz o gap sem rodeio e "
          + "fecha com o que ele leva para o que ainda não usou.",
    partes: [
      { topic: "Announcing the structure",
        funcao: "Dar a ela o sinal de que vem uma lista — ela prepara o papel. E te devolve a "
              + "estrutura se você travar no meio.",
        dica: "Uma frase e um respiro: é um anúncio, não o começo da resposta. Depois dela, "
            + "vá direto para o primeiro item.",
        en: "Sure, let me go through them one by one." },
      { topic: "Where you are strongest",
        funcao: "Abrir pelos dois requisitos que você domina, cada um com o que você FAZ e "
              + "com um número — é o que separa “uso” de “trabalho com isso”.",
        dica: "São duas ferramentas e duas frases: pare entre elas. O número é a âncora do "
            + "bloco, então diga-o devagar.",
        en: "SQL is my strongest. I use it every day: modeling, transformations and query "
          + "optimisation, on datasets of around twenty million rows.\n\n"
          + "Python I use for ETL and automation — extraction from APIs, cleaning and "
          + "validation, mainly with Pandas and NumPy." },
      { topic: "What is already covered",
        funcao: "Uma frase só. É requisito da vaga, você domina, e não vale gastar tempo "
              + "aqui — o tempo é dos blocos que vêm depois.",
        dica: "Ritmo rápido, tom de quem marca item numa lista. Alongar aqui tira o tempo "
            + "dos blocos que decidem a pergunta.",
        en: "On the BI side, Power BI with DAX and Qlik Sense — that's where I come from, so "
          + "that part is well covered." },
      { topic: "Airflow, and where it ends",
        funcao: "Mostrar o que você construiu com a ferramenta e, na última frase, delimitar "
              + "sozinho onde o uso dela ainda não chegou. Parece custar, mas ganha: quem "
              + "delimita o que não fez passa a ser confiável no que diz que fez.",
        dica: "A última frase sai no mesmo tom das outras, sem pausa antes e sem desculpa "
            + "depois — ela é informação, não confissão.",
        en: "Airflow I've used in my own projects. I built a pipeline with idempotent DAGs "
          + "and annual backfill, running in Docker. I haven't used it in production at work "
          + "yet." },
      { topic: "The gap, said straight",
        funcao: "Dizer o que falta antes que ela pergunte, em uma frase e sem rodeio. Quem "
              + "levanta o próprio gap escolhe como ele é dito.",
        dica: "Sem baixar a voz e sem emendar justificativa: a frase termina aqui, e quem "
            + "responde ao gap é o bloco seguinte.",
        en: "Spark and Databricks are the gap, and I'd rather be straight about that. I'm "
          + "studying both at the moment, and I haven't used them in production." },
      { topic: "The bridge",
        funcao: "Fechar com o que você leva para o que ainda não usou: o método é o mesmo, "
              + "o que muda é o motor. É o bloco que transforma o gap em coisa resolvível.",
        dica: "É o bloco mais longo e o fecho da resposta: quatro frases, uma pausa entre "
            + "cada. A última é a prova — diga-a sem pressa e pare.",
        en: "What I do have is the discipline underneath them: layered modeling, incremental "
          + "loads, automated tests and backfill. I apply that every day with SQL and "
          + "Airflow. When I move to Spark, what changes is the execution engine, not the "
          + "way I think about data. And I pick tools up fast — I learned dbt and Airflow on "
          + "my own, outside work." },
    ],
    modelo: "Sure, let me go through them one by one.\n\n"
          + "SQL is my strongest. I use it every day: modeling, transformations and query "
          + "optimisation, on datasets of around twenty million rows.\n\n"
          + "Python I use for ETL and automation — extraction from APIs, cleaning and "
          + "validation, mainly with Pandas and NumPy.\n\n"
          + "On the BI side, Power BI with DAX and Qlik Sense — that's where I come from, so "
          + "that part is well covered.\n\n"
          + "Airflow I've used in my own projects. I built a pipeline with idempotent DAGs "
          + "and annual backfill, running in Docker. I haven't used it in production at work "
          + "yet.\n\n"
          + "Spark and Databricks are the gap, and I'd rather be straight about that. I'm "
          + "studying both at the moment, and I haven't used them in production.\n\n"
          + "What I do have is the discipline underneath them: layered modeling, incremental "
          + "loads, automated tests and backfill. I apply that every day with SQL and "
          + "Airflow. When I move to Spark, what changes is the execution engine, not the "
          + "way I think about data. And I pick tools up fast — I learned dbt and Airflow on "
          + "my own, outside work." },

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
/* Sem argumento devolve os blocos de TODAS as perguntas-espelho (é o que as
   redes de teste percorrem); com o id de uma pergunta, só os dela — a pergunta
   é a unidade do módulo, como a unidade é a do módulo de tradução, e cada tela
   trabalha dentro de uma só. */
function getInterviewBlocks(questionId) {
  const blocos = [];
  getInterviewRound().filter(q => !questionId || q.id === questionId).forEach(q => {
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
