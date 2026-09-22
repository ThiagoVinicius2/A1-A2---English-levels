# EN•Check — Teste de Inglês A1-A2 para Dados

Site estático (HTML + CSS + JS puro, sem build e sem dependências) publicado
pelo GitHub Pages a partir da branch `main`. São três avaliações independentes:

- **Teste A1-A2** — `js/data.js` (`TEST_QUESTIONS`, `PRACTICE_QUESTIONS`, `CATEGORIES`)
- **Erros da Conversa Real** — `js/data-conversation.js`, um módulo refeito a cada
  rodada de feedback da aula de conversação, com os erros reais daquela conversa
- **Do Português para o Inglês** — `js/data-translate.js`, o único com resposta
  **digitada**: mostra a frase em português e a pessoa escreve o equivalente em inglês

`js/app.js` tem todo o estado e a renderização das três; `index.html` só carrega
os quatro scripts na ordem data → data-conversation → data-translate → app.

## Fluxo de trabalho (padrão combinado — não precisa perguntar)

Para **toda** alteração, leve até o site estar no ar:

1. Branch a partir da `main` atualizada
2. Commit com a identidade do dono do repositório:
   `Thiago Vinicius dos Santos Alexandre <226152649+ThiagoVinicius2@users.noreply.github.com>`
3. Push, PR e **merge na `main`** — é o merge que publica no Pages (leva 1-2 min)
4. Confirmar que a `main` ficou com o conteúdo novo

Mensagens de commit, PR e textos da interface em português.

Ao mudar qualquer arquivo em `css/` ou `js/`, suba o cache-busting dos quatro
scripts e do CSS em `index.html` (`?v=AAAAMMDD` + letra, ex.: `?v=20260916a`),
senão o navegador serve a versão antiga.

## Regras do módulo "Erros da Conversa Real"

Cada nova rodada de feedback **substitui** o banco anterior — os padrões já
consolidados saem e ficam registrados no comentário do topo do arquivo.

- `CONV_CATEGORIES`: um padrão por erro real da conversa, com `label` (aparece na
  interface) e `tag` (`Padrão 1`, `Padrão 2`, …). O padrão mais persistente abre o
  módulo e ganha mais questões.
- Toda categoria precisa existir nos **dois** bancos: `CONV_TEST_QUESTIONS` e
  `CONV_PRACTICE_QUESTIONS` (a prática dirigida filtra por categoria).
- Cada questão: 4 opções e 4 explicações alinhadas por índice. A explicação da
  resposta certa começa com `Correto!`; as demais com `Errado.`.
- As opções **não** são embaralhadas em tempo de execução — varie o índice de
  `correct` entre as questões.
- Quando o erro veio da conversa, diga isso na explicação ("Foi o seu erro...")
  e traga a frase original — é o que dá valor ao módulo.
- Ao trocar o banco, suba `CONV_STORAGE_KEY` em `js/app.js` (`_r3` → `_r4` → …)
  para o resultado da rodada anterior não se misturar, e atualize o texto do
  card em `renderConvLandingCard()` com o tema da nova rodada.

## Regras do módulo "Do Português para o Inglês"

Banco de cartões vindo do CSV do deck MemHack do curso (colunas
`id, deck, ingles, portugues`).

- **O CSV vem em UTF-8 com BOM.** Ao reimportar, ler com `encoding="utf-8-sig"`:
  com `utf-8` puro o cabeçalho da primeira coluna vira `\ufeffid` e a coluna `id`
  some sem dar erro.
- `TRANS_DECKS`: um deck por bloco do curso, com `label` e `tag` (`Deck 1`, …).
  Todo cartão precisa apontar para um deck existente — a rodada filtra por deck.
- Cada cartão: `pt`, `en` e, quando couber, `accept` (traduções alternativas
  igualmente corretas) e `note`. **Cadastre `accept` sempre que a frase em
  português admitir mais de um inglês certo** — sobretudo nas despedidas do deck
  Immersion Time; sem isso a rodada reprova resposta boa.
- Se uma célula do CSV trouxer duas respostas (`Peace! / Peace out!`), separe: a
  primeira vira `en`, a segunda entra em `accept`, e `note` avisa na interface.
- A correção (`transNormalize`, `gradeTransAnswer`, `transDiffWords`) fica no
  próprio `js/data-translate.js`, porque são funções puras sobre os cartões.
  Ela ignora acento, caixa, pontuação, hífen e contração, e distingue erro de
  digitação (`quase`) de erro de inglês (`diferente`).
- `TRANS_STORAGE_KEY` guarda **histórico por deck**, não o resultado de uma
  rodada: `{ date, decks: { deckKey: { pct, correct, total, date } } }`. Cada
  rodada **mescla** — só os decks praticados são atualizados, os outros mantêm a
  nota da última vez. Suba a chave (`_r2` → `_r3` → …) se o formato mudar de novo.
- **Duas notas por cartão, e elas não podem se misturar:**
  `state.transGrades` é o placar da rodada (a autoavaliação "minha resposta também
  está certa" conta ali) e `state.transFirstGrades` guarda só o **primeiro
  veredito**, que alimenta a porcentagem "de primeira" mostrada em cada deck.
  `markTransAnswerCorrect()` só pode tocar `transGrades` — se algum dia escrever
  também em `transFirstGrades`, a porcentagem por deck perde o sentido.
  Conta como acerto de primeira: `certo` e `quase` (o inglês estava certo, só a
  digitação escorregou). Não contam: `diferente`, `naoLembro` e `aceitoManual`.
- O card da página inicial **não** mostra resultado geral de propósito: com muitos
  decks, uma média só não diz onde o estudo está fraco. O feedback fica na tela de
  escolha de decks, uma porcentagem à direita de cada deck.
- **Rodada de correção** (`startTransRetry()`, primeiro botão da tela de resultado):
  refaz só os cartões que ficaram errados, não o deck inteiro. Ela marca
  `state.transIsRetry`, e com esse sinal `finishTransRound()` **não grava** o
  histórico do deck — refazer só os erros acertando tudo gravaria um 100% que não
  representa o deck. A porcentagem de um deck só é recalculada quando ele é
  praticado inteiro.
- **Cuidado com o campo de digitação:** é o único `<input>` do projeto. Nunca
  chame `render()` enquanto a pessoa digita (o `innerHTML` é reescrito inteiro e
  leva junto o campo, o foco e o cursor) e nunca coloque texto digitado ou frase
  de cartão dentro de atributo HTML — o `escapeHtml` do projeto não escapa aspas.

## Antes de publicar

- `node --check` nos quatro arquivos de `js/`
- Validar os bancos: toda categoria com teste e prática, 4 opções e 4 explicações,
  `correct` dentro do intervalo, ids únicos; nos cartões de tradução, todo `deck`
  existente e a contagem por deck igual à do CSV
- Autoteste do corretor de tradução: para todo cartão, a própria resposta (`en`) e
  cada string de `accept` precisam ser corrigidas como `certo`
- Teste da porcentagem por deck: numa rodada com um acerto, um typo, uma resposta
  diferente aceita na autoavaliação e um "Não lembro", a tela de resultado mostra
  75% e o histórico do deck grava 50% — se os dois números baterem, as duas notas
  se misturaram
- Teste da rodada de correção: errando 4 de 9 cartões e depois acertando os 4 na
  correção, o histórico do deck precisa continuar em 56% (5/9) — se virar 100%,
  a correção voltou a gravar por cima
- Smoke test no Chromium (Playwright, `executablePath: '/opt/pw-browsers/chromium'`):
  abrir `index.html` por `file://`, responder o teste inteiro, chegar no resultado
  e rodar a prática dirigida; no módulo de tradução, escolher um deck e passar por
  um acerto, um erro de digitação, uma resposta diferente (com a autoavaliação) e
  um "Não lembro", conferindo que não há erro de JS
  (o erro de certificado do Google Fonts é do proxy do ambiente, pode ignorar)
