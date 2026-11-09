/* Módulo "Job Interview": escrever a resposta padrão inteira, de memória.

   O que este teste defende:
   1. A rodada é SÓ das perguntas com resposta padrão escrita.
   2. A nota é por PALAVRA, não um veredito só. Numa resposta de 210 palavras,
      "certo ou errado" não diria nada — uma palavra trocada derrubaria tudo
      para zero. Quem conta é o transDiffWords() do módulo de tradução.
   3. A porcentagem que a TELA mostra é a mesma da régua e a mesma que fica
      gravada. É o bug que o módulo da conversa teve (7% com tudo certo), e ele
      só aparece quando o teste olha a tela, não só a função. */
const { carregar, carregarApp, criarPlacar } = require("./comum.js");
const A = carregar();
const P = carregarApp();
const p = criarPlacar("MÓDULO DA ENTREVISTA");

const rodada = A.getInterviewRound();
const faltam = A.INTERVIEW_QUESTIONS.filter(q => !A.interviewIsMirror(q));
p.ok(rodada.length >= 1, "existe ao menos uma pergunta com resposta padrão");
p.ok(rodada.every(A.interviewIsMirror), "só entram na rodada perguntas com resposta padrão");
p.ok(faltam.every(q => q.kind === "soon" && !q.modelo === false),
     "as perguntas sem resposta padrão são 'soon'");

/* ---- 1. a contagem palavra por palavra ---- */
const q1 = rodada[0];
const modelo = q1.modelo;
const inteira = A.interviewCheckAnswer(q1, modelo);
p.ok(inteira.acertos === inteira.total && inteira.sobraram === 0,
     `a própria resposta devia contar ${inteira.total} de ${inteira.total} (deu ${inteira.acertos})`);

const vazia = A.interviewCheckAnswer(q1, "");
p.ok(vazia.acertos === 0 && vazia.total === inteira.total, "campo vazio conta zero palavras");

const umaTrocada = A.interviewCheckAnswer(q1, modelo.replace("technology", "tech"));
p.ok(umaTrocada.acertos === inteira.total - 1,
     `trocar uma palavra devia custar exatamente uma (deu ${umaTrocada.acertos} de ${inteira.total})`);
p.ok(umaTrocada.sobraram === 1, "a palavra que não é da resposta aparece como sobra");
/* o porquê da régua por palavra: o veredito inteiro não distingue uma palavra
   trocada de uma resposta inventada — as duas dão "diferente" */
p.ok(A.gradeTransAnswer({ en: modelo }, modelo.replace("technology", "tech")).level === "diferente" &&
     A.gradeTransAnswer({ en: modelo }, "Something else entirely.").level === "diferente",
     "o veredito inteiro não serve de nota numa resposta longa — é por isso que a conta é por palavra");

const semFrase = A.interviewCheckAnswer(q1, modelo.replace("I didn't start in data.", ""));
p.ok(semFrase.acertos === inteira.total - 5 && semFrase.sobraram === 0,
     `tirar uma frase de 5 palavras devia custar 5 (deu ${inteira.total - semFrase.acertos})`);

/* A contração escrita por extenso é diferença, e de propósito: o espelho cobra
   ESTA resposta. Custa uma palavra em 210, e aparece marcada na tela. */
const contraida = A.interviewCheckAnswer(q1, modelo.replace("I'm a Data", "I am a Data"));
p.ok(contraida.acertos === inteira.total - 1,
     `escrever "I am" onde a resposta tem "I'm" custa uma palavra (deu ${inteira.total - contraida.acertos})`);
/* mas o resto da frase continua casando: não pode desalinhar o diff inteiro */
p.ok(contraida.acertos >= inteira.total - 2,
     "uma contração por extenso não pode desalinhar o diff do resto da resposta");

/* ---- 2. a rodada inteira, pelas funções de verdade ---- */
P.startInterview();
p.ok(P.state.view === "interview", "startInterview abre a tela da entrevista");
p.ok(P.state.interviewQuestions.length === rodada.length,
     `a rodada traz as ${rodada.length} perguntas prontas (trouxe ${P.state.interviewQuestions.length})`);

/* campo vazio avisa em vez de revelar a resposta */
P.campo("interview-input").value = "   ";
P.submitInterviewAnswer();
p.ok(P.state.interviewEmptyWarn === true && !P.state.interviewRevealed[q1.id],
     "campo vazio avisa em vez de revelar a resposta padrão");

/* responde com a resposta quase inteira: uma palavra trocada e uma frase fora */
const resposta = modelo.replace("technology", "tech").replace("I didn't start in data.", "");
P.campo("interview-input").value = resposta;
P.submitInterviewAnswer();
p.ok(P.state.interviewRevealed[q1.id], "a resposta enviada revela o resultado");

const s = P.interviewScore(P.state.interviewQuestions[0]);
const esperadoAcertos = inteira.total - 6;   // 1 trocada + 5 da frase que saiu
p.ok(s.acertos === esperadoAcertos && s.total === inteira.total,
     `a régua devia dar ${esperadoAcertos} de ${inteira.total} (deu ${s.acertos} de ${s.total})`);

/* a tela da pergunta mostra a mesma conta e o diff */
const telaPergunta = P.telaHtml();
p.ok(telaPergunta.indexOf(`${s.acertos} of ${s.total} words came out`) !== -1,
     `a tela devia mostrar "${s.acertos} of ${s.total} words came out"`);
p.ok(telaPergunta.indexOf("diff-miss") !== -1, "a tela marca as palavras que não saíram");
p.ok(telaPergunta.indexOf("diff-extra") !== -1, "a tela risca as palavras que não são da resposta");

/* ---- 3. a nota, nas duas pontas ---- */
const esperado = P.pct(s.acertos, s.total);
P.nextInterviewQuestion();
p.ok(P.state.view === "interviewResults", "a última pergunta leva à tela de resultado");
p.ok(P.state.interviewResults.overallPct === esperado,
     `a régua devia dar ${esperado}% (deu ${P.state.interviewResults.overallPct}%)`);

const tela = P.telaHtml();
p.ok(tela.indexOf(esperado + "%") !== -1, `a tela de resultado devia mostrar ${esperado}%`);
p.ok(tela.indexOf(`${s.acertos} of ${s.total} words reproduced`) !== -1,
     `a tela devia mostrar "${s.acertos} of ${s.total} words reproduced"`);
p.ok(tela.indexOf("to read out loud") !== -1,
     "o resultado traz a resposta inteira para ler em voz alta");
p.ok(tela.indexOf("still without your standard") !== -1,
     "a tela lembra quantas perguntas ainda não têm resposta padrão");

const guardado = JSON.parse(P.localStorage.getItem(P.INTERVIEW_STORAGE_KEY));
p.ok(guardado && guardado.overall === esperado,
     `o histórico devia gravar ${esperado}% (gravou ${guardado && guardado.overall})`);
p.ok(guardado.acertos === s.acertos && guardado.total === s.total,
     "o histórico guarda a mesma fração da tela");

/* ---- 4. o card da tela inicial ---- */
const card = P.renderInterviewLandingCard();
p.ok(card.indexOf(esperado + "%") !== -1, "o card mostra a porcentagem da última rodada");
p.ok(card.indexOf(`${rodada.length} of ${A.INTERVIEW_QUESTIONS.length}`) !== -1,
     "o card diz quantas perguntas já têm resposta padrão");
p.ok(card.indexOf(`${inteira.total} words`) !== -1, "o card diz quantas palavras há para reproduzir");

/* ---- 5. "não lembro" dá 0% e mantém o total ---- */
P.startInterview();
P.skipInterviewQuestion();
P.finishInterview();
p.ok(P.state.interviewResults.overallPct === 0, "pular dá 0%");
p.ok(P.state.interviewResults.total === inteira.total, "pular não tira palavras do denominador");

/* ---- 6. o texto digitado não se perde nem vira HTML ---- */
P.startInterview();
const rascunho = 'I said "hello" & <b>built</b> a dashboard';
P.saveInterviewDraft(rascunho);
P.campo("interview-input").value = rascunho;
P.requestExitInterview();      // abre o modal, e o render leva o campo embora
P.cancelExitInterview();       // volta para a pergunta
p.ok(P.telaHtml().indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && P.telaHtml().indexOf("<b>built</b>") === -1,
     "o rascunho volta no campo depois do modal de saída, e escapado");

P.campo("interview-input").value = rascunho;
P.submitInterviewAnswer();
const telaResposta = P.telaHtml();
p.ok(telaResposta.indexOf("&lt;b&gt;built&lt;/b&gt;") !== -1 && telaResposta.indexOf("<b>built</b>") === -1,
     "o texto digitado sai escapado também no diff");
p.ok(telaResposta.indexOf("&amp;") !== -1, "o & do texto digitado sai escapado");

p.fim();
