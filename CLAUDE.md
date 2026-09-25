# Fluent Data — inglês A1-A2 para quem trabalha com Dados

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

Mensagens de commit, PR e **comentários de código em português**.

## Idioma: interface em inglês, conteúdo em português

Regra que vale em todo o site, e a linha é esta:

- **Interface em inglês** — botões, títulos, progresso, resultados, rótulos de
  categoria e de deck, avisos, modais. Tudo que é moldura.
- **Conteúdo pedagógico em português** — os enunciados, as opções e, sobretudo,
  as explicações dos exercícios (`Correto! …` / `Errado. …`). São para ensinar a
  regra na língua de quem estuda.
- No módulo de tradução, a frase em português **é o enunciado**: traduzi-la
  eliminaria o módulo. O campo `pt` nunca vira inglês.

Ao mudar qualquer arquivo em `css/` ou `js/`, suba o cache-busting dos quatro
scripts e do CSS em `index.html` (`?v=AAAAMMDD` + letra, ex.: `?v=20260916a`),
senão o navegador serve a versão antiga.

## Visual

O tema vem de um design feito no Claude Design ("Fluent Data"): fundo quase
preto `#0a0b0d`, destaque ciano `#4fd1e5` e roxo `#9b8cff`, texto `#e6eaee`,
Schibsted Grotesk no texto e IBM Plex Mono nas etiquetas. Os tokens estão no
`:root` de `css/style.css` — mexa neles, não em valores soltos.

- O **fundo decorativo** (estrelas, constelações, grade e os gráficos) é markup
  estático em `index.html`, dentro de `.backdrop`, animado só por CSS. Fica
  **fora de `#app`** de propósito: `render()` reescreve `#app` inteiro e apagaria
  o fundo a cada tela. As estrelas e o heatmap são preenchidos uma única vez por
  `initBackdrop()`, no boot.
- O palco do fundo tem 1920x1080 fixos e encolhe por `--bgs` em telas menores,
  senão os gráficos ficam cortados na borda.
- `.app` leva `overflow-x: clip` porque o brilho do hero (`.hero::before`) sangra
  22% para os lados e, sem isso, cria rolagem lateral em tela estreita. `clip`
  (e não `hidden`) evita virar contêiner de rolagem, e não corta o modal, que é
  `position: fixed`.
- A tela inicial usa `.app.app-landing` (mais larga, centralizada na altura); as
  telas de questão ficam nos 960px, que é a largura boa de leitura.
- `renderModuleCard()` monta os três cards da tela inicial no formato do design:
  número, etiqueta, título, uma linha de descrição e os links no rodapé do card.

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

### Unidades

Os decks vivem dentro de **unidades** (`TRANS_UNITS`, `Unit 1` … `Unit 15`), que
são as unidades do curso. A navegação é: card da página inicial → escolha da
unidade → escolha dos decks daquela unidade → rodada.

- **A chave de cada deck é prefixada pela unidade** (`u01-comprehension`). Os
  nomes de baralho se repetem a cada unidade do curso ("Comprehension Practice",
  "Vocab Rocket", "Grammar Hacks"…), então sem o prefixo as chaves colidiriam —
  e o histórico por deck no `localStorage` misturaria unidades diferentes.
- O CSV já traz o número da unidade no nome do deck (`#01 | Comprehension
  Practice`), então importar uma unidade nova é mapear esse prefixo para a chave
  da unidade e declarar os decks com `unit: "uNN"`.
- Unidade sem deck aparece na grade como **"No decks yet"**, com o card em
  tracejado e sem link. É o estado normal das unidades ainda não importadas.
- `transUnitProgress(unitKey)` dá a média de acerto "de primeira" dos decks já
  praticados da unidade — é o que o card da unidade mostra.

- **O CSV vem em UTF-8 com BOM.** Ao reimportar, ler com `encoding="utf-8-sig"`:
  com `utf-8` puro o cabeçalho da primeira coluna vira `\ufeffid` e a coluna `id`
  some sem dar erro.
- `TRANS_DECKS`: um deck por bloco do curso, com `label` e `tag` (`Deck 1`, …).
  Todo cartão precisa apontar para um deck existente — a rodada filtra por deck.
  **O conjunto de decks muda de unidade para unidade** (a Unit 4 trouxe "Study
  Tips", que não existia antes, e chama o segundo Grammar de "Grammar Hacks
  (part II)"). Use sempre o nome como o app do curso mostra, e numere as `tag`
  na ordem daquela unidade.
- **Cartão repetido entre unidades acontece** (`What does it mean?` está em
  `t-122` e `t-231`, com o mesmo `pt` e o mesmo `en`). Não é problema: o curso
  repete a frase e o cruzamento é automático quando as respostas são iguais. O
  autoteste reporta o par para você conferir que é intencional.
- Cada cartão: `pt`, `en` e, quando couber, `accept` (traduções alternativas
  igualmente corretas) e `note`. **Cadastre `accept` sempre que a frase em
  português admitir mais de um inglês certo** — sobretudo nas despedidas do deck
  Immersion Time; sem isso a rodada reprova resposta boa.
- Se uma célula do CSV trouxer mais de uma resposta (`Peace! / Peace out!`,
  `Thanks a bunch / a ton / a million!`), separe: a primeira vira `en`, o resto
  entra em `accept`, e `note` avisa na interface. Mesma coisa com parte opcional
  (`I (really) appreciate it.`) e com reticências (`I can't thank you enough
  (for) ...`): o `en` vira uma frase completa e o resto vai para `note`.
- **`note` é interface, então em inglês** ("Also: Thanks a ton!").
- Fala de filme/série vem **envolta em aspas** no CSV (o diálogo do Pets, na
  Unit 3). Tire as aspas ao importar: a correção ignora pontuação, mas sem isso
  elas aparecem na resposta mostrada na tela. Cuidado com o caso em que a aspa
  fecha antes do ponto final (`"...every day".`).
- O enunciado em português usa **fala reduzida** (`tô`, `tá`, `pra`) em vários
  decks. No sentido PT → EN isso não atrapalha: o português é só o enunciado
  exibido, nunca comparado. **Se algum dia o módulo inverter o sentido** (mostrar
  o inglês e pedir o português), aí essas formas precisam ser normalizadas antes
  de comparar — junto de `você`/`vc`, `está`/`tá` e `para`/`pra`.
- Enunciado em português repetido entre cartões (acontece: `t-74`/`t-75`,
  `t-93`/`t-98`) **precisa de `accept` cruzado** — cada um aceitando a resposta
  do outro, senão uma resposta certa é reprovada. O autoteste detecta e cobra.
- Se o enunciado em português trouxer duas glosas (`Você não deveria. / Não
  precisava!`), deixe uma frase só no `pt` — o enunciado tem que ser traduzível
  — e mande a outra para `note`.
- A correção (`transNormalize`, `gradeTransAnswer`, `transDiffWords`) fica no
  próprio `js/data-translate.js`, porque são funções puras sobre os cartões.
  Ela ignora acento, caixa, pontuação, hífen e contração (inclusive `gonna` ==
  `going to` e `7 a.m.` == `7 AM` == `7am`), e distingue erro de digitação
  (`quase`) de erro de inglês (`diferente`).
- **`'s` e `'d` são ambíguos** e não saem por lista fixa: `my name's Seaburn` é
  "is", `my friend's child` é posse, `he's gone` é "has", `I'd like` é "would" e
  `I'd been` é "had". `transNormalizeVariants()` gera **todas as leituras dos dois
  lados** da comparação e basta uma bater — a forma contraída e a longa valem
  igual, sem reprovar quem escreve a posse sem apóstrofo. Por isso esses dois
  **não** entram em `TRANS_CONTRACTIONS`; as demais contrações (`'re`, `'ve`,
  `'ll`, `'m`, `n't`) entram, porque têm leitura única.
- Guardas para não passar a aceitar inglês inexistente, em `transReadings()`:
  nada de `'s` valendo verbo depois de `this/these/those` ou de pronome de
  sujeito (`you's`), nem depois de sibilante (`Friends's`); e `TRANS_S_NEVER_POSSESSIVE`
  impede `its` de valer por `it's`.
- **Contração nova numa unidade futura o teste acusa sozinho.** Toda palavra com
  apóstrofo nos cartões é conferida: se termina em `'re`, `'ve`, `'ll`, `'m` ou
  `n't` e não está em `TRANS_CONTRACTIONS`, o autoteste falha nomeando o cartão.
  O conserto é uma linha na lista. `'s` e `'d` não precisam de nada. Ao importar uma unidade nova, veja
  se ela trouxe contração ou gíria ainda não coberta e acrescente em
  `TRANS_CONTRACTIONS` — vale para o banco inteiro, então rode o autoteste
  depois para conferir que nenhuma unidade antiga quebrou.
- `TRANS_STORAGE_KEY` guarda **histórico por deck**, não o resultado de uma
  rodada: `{ date, decks: { deckKey: { pct, correct, total, date } } }`. Cada
  rodada **mescla** — só os decks praticados são atualizados, os outros mantêm a
  nota da última vez. Suba a chave (`_r3` → `_r4` → …) se o formato mudar de novo.
  `loadTransDeckStats()` tem uma migração única do `_r2` (chaves sem prefixo de
  unidade) para o formato atual; pode sair quando não valer mais a pena.
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
  **Isso precisa ficar explícito na tela**, senão parece que a gravação quebrou:
  a tela de resultado da correção mostra a porcentagem que **fica valendo** em
  cada deck e deixa "Redo the whole deck" como ação principal. Um aviso genérico
  não basta — foi exatamente assim que a dúvida apareceu na prática.
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
- Teste das unidades: 15 na grade, só as carregadas com link, toda chave de deck
  começando com a chave da sua unidade, nenhum deck vazando de uma unidade para
  outra, e o histórico gravado no formato antigo migrando para a chave com prefixo
- Cruzamento dos enunciados repetidos: dois cartões com o mesmo `pt` precisam
  aceitar a resposta um do outro
- Contração nos dois sentidos: para toda resposta do banco, a versão contraída e
  a expandida precisam dar `certo` — e `This's`, `Friends's`, `you's`, `its` por
  `it's` e `they're` por `their` precisam continuar sendo reprovadas
- Rede das unidades futuras: nenhum apóstrofo dos cartões pode ficar sem
  cobertura, e as frases sintéticas (`he's gone` == `he has gone`, `I'd like` ==
  `I would like`, `I'd been` == `I had been`, `could've`) precisam dar `certo`
  mesmo não existindo ainda no banco
- Smoke test no Chromium (Playwright, `executablePath: '/opt/pw-browsers/chromium'`):
  abrir `index.html` por `file://`, responder o teste inteiro, chegar no resultado
  e rodar a prática dirigida; no módulo de tradução, escolher um deck e passar por
  um acerto, um erro de digitação, uma resposta diferente (com a autoavaliação) e
  um "Não lembro", conferindo que não há erro de JS
  (o erro de certificado do Google Fonts é do proxy do ambiente, pode ignorar)
