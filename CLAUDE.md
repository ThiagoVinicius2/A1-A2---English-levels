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

### Importar uma unidade nova — procedimento combinado, não precisa perguntar

Quando chegar um CSV de unidade, faça **tudo isto** sem pedir confirmação. O
critério já está combinado; o dono quer o resultado e a lista do que saiu, para
vetar alguma coisa se discordar.

1. **Ler com `encoding="utf-8-sig"`** e conferir o total e a contagem por deck
   contra o que o CSV traz.
2. **Rodar a checagem de repetição antes de importar** — literal e semântica:
   - resposta em inglês igual à de um cartão que já existe;
   - resposta nova que já é aceita por um cartão antigo (`gradeTransAnswer`);
   - enunciado em português repetido, dentro da unidade e contra o banco;
   - **enunciados parecidos demais** (Jaccard ≥ 0,5 sobre o português
     normalizado). É o que a comparação literal não pega: na Unit 6,
     "Estou dentro!", "Estou dentro com isso!" e "Tô dentro!" eram três
     cartões com três respostas diferentes e nenhum teste literal acusava.
3. **Podar**, pelos critérios já firmados (o comentário no topo de
   `js/data-translate.js` guarda a lista com o motivo de cada cartão):
   - **repetição** — fica um cartão só. Se o enunciado repetido tem respostas
     diferentes e todas certas, **junte num cartão** com as outras em `accept`
     e a `note` mostrando quais são;
   - **não há o que traduzir** — a resposta é a própria pergunta (`Whoo!`) ou
     é uma palavra solta (`Number Three.`, `Name?`);
   - **pedaço de fala, não frase** — começa em minúscula ou termina em
     vírgula. Os decks de Comprehension Practice são transcrição e costumam
     perder metade assim: a Unit 6 perdeu 5 de 10;
   - **o enunciado não leva à resposta** — `Mantenha tudo em ordem!` →
     `Keep it real!`; `Picasso começou a pintar` → `Picasso could draw`;
   - **vocabulário que não se usa fora da cena** — `subcamada quadrifônica
     sensível a pressão`.
   **Unidade sem nada para podar acontece** — a Unit 7 entrou inteira. Não
   force corte para cumprir tabela.
4. **Testar o enunciado contra a tradução literal.** Para cada cartão
   idiomático, escreva a tradução mais óbvia do português e passe pelo
   `gradeTransAnswer`: se der `diferente`, o cartão reprova quem acertou. Aí
   decida pela regra das duas situações — `accept` se as duas frases servem na
   mesma hora, `ctx` se o enunciado não tem como escolher. O Immersion Time é
   o deck que mais precisa: na varredura que achou o problema, **17 de 17
   literais reprovadas estavam nele**.
5. **Cadastrar `accept` com generosidade** onde o português admite mais de um
   inglês certo, e `note` (em inglês) quando o deck estiver treinando uma forma
   que o enunciado não tem como pedir. Caso típico: deck de modais, em que
   `poder` é `can` e `may` ao mesmo tempo — aceite os dois e deixe a forma do
   curso aparecer em **Card answer**, que é onde ela é aprendida. Sinônimo que
   vale para o banco inteiro vai em `TRANS_SYNONYMS`, não aqui.
6. **Conferir gíria e fala reduzida nova** e acrescentar em
   `TRANS_CONTRACTIONS` — a Unit 6 trouxe `lemme`, `gimme` e `Imma`.
7. Rodar a bateria inteira de "Antes de publicar", subir o cache-busting e
   publicar pelo fluxo padrão (branch → commit → PR → merge na `main`).
8. **Relatar o que saiu**, agrupado por motivo, para o dono poder pedir algum
   cartão de volta.

- **O CSV vem em UTF-8 com BOM.** Ao reimportar, ler com `encoding="utf-8-sig"`:
  com `utf-8` puro o cabeçalho da primeira coluna vira `\ufeffid` e a coluna `id`
  some sem dar erro.
- **O CSV não é consistente nem dentro da mesma unidade.** A Unit 6 chama um
  deck de "Grammar Hacks (Part I)" e o outro de "Grammar Hacks 02". Mantenha
  como veio: é o nome que o app do curso mostra.
- `TRANS_DECKS`: um deck por bloco do curso, com `label` e `tag` (`Deck 1`, …).
  Todo cartão precisa apontar para um deck existente — a rodada filtra por deck.
  **O conjunto de decks muda de unidade para unidade** (a Unit 4 trouxe "Study
  Tips", que não existia antes, e chama o segundo Grammar de "Grammar Hacks
  (part II)"; a Unit 5 numera os dois como "(part I)" e "(part II)"). Use sempre
  o nome como o app do curso mostra, e numere as `tag` na ordem daquela unidade.
- **O banco não é o CSV inteiro.** 32 cartões foram podados de propósito, e o
  comentário no topo de `js/data-translate.js` lista todos com o motivo. Ao
  reimportar uma unidade já carregada, confira essa lista antes de recolocar
  tudo — senão os cartões voltam sozinhos. Os motivos que valeram corte:
  - **repetição** — o curso repete a frase entre unidades e às vezes dentro da
    mesma (`What does it mean?` estava em `t-122` e `t-231`; `What do you do
    for fun?` em `t-314` e `t-347`). Fica um só;
  - **não há o que traduzir** — `Whoo!` → `Whoo!`, `Número Três.` →
    `Number Three.`, ou o cartão é um pedaço de fala cortado no meio
    (`but in The Circle I'll be playing the character Rebecca,`);
  - **o enunciado não leva à resposta** — `Mantenha tudo em ordem!` →
    `Keep it real!` é impossível de acertar sem já saber, e o corretor reprova
    a tradução que o português pede;
  - **vocabulário que não se usa fora da cena** (`subcamada quadrifônica
    sensível a pressão`): o deck é para produzir inglês, não decorar legenda.
- **Nenhuma resposta pode valer em dois cartões.** Era o caso das despedidas da
  Unit 1: `Later!` passava em `t-25`, `t-30`, `t-31` e `t-32` ao mesmo tempo, e
  os `accept` de cada um cobriam os outros — decorar uma frase fechava quatro
  cartões e a prática virava a mesma pergunta repetida. Ao cadastrar `accept`,
  cuidado para não invadir o enunciado do vizinho. O autoteste trava isso:
  indexa variante → cartão e falha nomeando os dois donos.
- Cada cartão: `pt`, `en` e, quando couber, `accept` (traduções alternativas
  igualmente corretas) e `note`. **Cadastre `accept` sempre que a frase em
  português admitir mais de um inglês certo** — sobretudo nas despedidas do deck
  Immersion Time; sem isso a rodada reprova resposta boa.
- **Duas respostas certas ou duas situações? A pergunta decide o conserto.**
  Quando uma resposta boa é reprovada, veja se as duas frases em inglês servem
  na **mesma** situação ou em situações **diferentes**:
  - **Mesma situação** → aceite as duas. `eu acho que` é `I think` e
    `I guess` na mesma hora, e nada no enunciado escolhe. Vai em
    `TRANS_SYNONYMS` (se vale para o banco) ou em `accept` (se é reformulação
    daquele cartão).
  - **Situações diferentes** → o enunciado é que está incompleto, e aceitar as
    duas não conserta, só apaga o exercício. `Você quer?` é
    `Do you want some?` oferecendo comida e `Do you want it?` apontando uma
    coisa. Aí o cartão ganha **`ctx`**.
- **`ctx` é a situação do cartão**, uma linha curta mostrada abaixo do
  enunciado **antes** de responder (a `note` só aparece depois, então não serve
  para isso). É conteúdo pedagógico, então vem **em português**, em minúscula e
  sem ponto final: `ctx:"oferecendo comida ou bebida a alguém"`.
  - **Nunca entra na comparação** — quem corrige lê só `en` e `accept`. O
    autoteste trava isso: digitar a própria situação não pode dar `certo`.
  - Use com parcimônia, só onde o enunciado realmente não tem como levar à
    resposta. O deck **Immersion Time** é o freguês: ele ensina expressão
    idiomática, e a tradução literal do enunciado quase nunca é a resposta
    (`Como é?` → `What's that?`, `A qualquer momento.` → `Anytime.`).
  - `ctx` e `accept` não competem: o normal é o cartão ganhar os dois — a
    situação para a pessoa conseguir acertar, e o `accept` para não reprovar
    quem respondeu outra coisa defensável.
- **Sinônimo que vale para o banco inteiro vai em `TRANS_SYNONYMS`, não em
  `accept`.** Palavra que o português não tem como desambiguar (`eu acho que` é
  `I think` e `I guess`; `loja` é `store` e `shop`; `filhos` é `kids` e
  `children`; `obrigado` é `thanks` e `thank you`) entra na tabela e passa a
  valer em toda unidade, inclusive nas que ainda vão entrar. **Grafia
  britânica entra pelo mesmo motivo** (`favourite`, `coloured`, `realise`,
  `practise`, `theatre`): é variação pura, e o banco só tinha cobertura onde
  alguém lembrou — o `t-278` aceitava "favourite" e o `t-452` ("colored") não
  aceitava nada. `accept` continua sendo para reformulação do cartão
  ("Let me try." por "Let me have a go at it."), que é específica dele.
  A prova de que a curadoria manual não escala está no próprio banco: o `t-69`
  aceitava "bathroom" porque alguém lembrou, e o `t-312` reprovava "children"
  porque ninguém lembrou.
  - **Prefira o par de uma palavra ao de duas.** `transDiffWords` normaliza
    palavra por palavra, então `["i guess", "i think"]` conserta a nota mas
    deixa `think` riscado em vermelho na tela — a pessoa lê que acertou e vê a
    palavra marcada como erro. `["guess", "think"]` acerta as duas telas.
  - Só entram pares **sem diferença de sentido nestes decks**. Verbo com sentido
    próprio fica de fora: `comprar` é `buy`, e aceitar `get` deixaria passar quem
    fugiu da palavra que o deck ensina.
  - **O risco é a tabela apagar uma lição.** Se um deck futuro ensinar justamente
    a diferença entre duas dessas palavras, tire o par da tabela e resolva aquele
    cartão com `accept`. Colisão entre cartões o autoteste pega sozinho, na trava
    de resposta intercambiável.
- Se uma célula do CSV trouxer mais de uma resposta (`Peace! / Peace out!`,
  `Thanks a bunch / a ton / a million!`), separe: a primeira vira `en`, o resto
  entra em `accept`, e `note` avisa na interface. Mesma coisa com parte opcional
  (`I (really) appreciate it.`) e com reticências (`I can't thank you enough
  (for) ...`): o `en` vira uma frase completa e o resto vai para `note`.
  Abreviação entre parênteses é o mesmo caso (`XLarge (XL) pants`, no `t-301`):
  `en` fica com a forma por extenso, a curta entra em `accept` e `note` avisa —
  os parênteses viram espaço na normalização, então sem isso quem escrever só
  "XL pants" é reprovado.
- **`note` é interface, então em inglês** ("Also: Thanks a ton!").
- Fala de filme/série vem **envolta em aspas** no CSV (o diálogo do Pets, na
  Unit 3). Tire as aspas ao importar: a correção ignora pontuação, mas sem isso
  elas aparecem na resposta mostrada na tela. Cuidado com o caso em que a aspa
  fecha antes do ponto final (`"...every day".`).
- **Travessão, aspas curvas e reticências (`–`, `—`, `“ ”`, `’`, `…`) já saem na
  normalização** e podem ficar no cartão como vieram do CSV (o `t-359` traz
  `Put yourself out there – on or offline.` com travessão). Travessão e hífen
  viram espaço, os apóstrofos tipográficos viram `'` e o resto cai no filtro de
  pontuação — quem digita com hífen e teclado sem acento acerta igual. O
  autoteste confere isso sozinho: para todo cartão, a versão só-ASCII **e** a
  versão tipográfica da resposta precisam dar `certo`, nos dois sentidos.
- O enunciado em português usa **fala reduzida** (`tô`, `tá`, `pra`) em vários
  decks. No sentido PT → EN isso não atrapalha: o português é só o enunciado
  exibido, nunca comparado. **Se algum dia o módulo inverter o sentido** (mostrar
  o inglês e pedir o português), aí essas formas precisam ser normalizadas antes
  de comparar — junto de `você`/`vc`, `está`/`tá` e `para`/`pra`.
- Enunciado em português repetido entre cartões **precisa de `accept` cruzado**
  — cada um aceitando a resposta do outro, senão uma resposta certa é reprovada.
  Hoje não há nenhum par assim (a poda tirou `t-75`, `t-98`, `t-231` e `t-347`),
  mas o autoteste continua detectando e cobrando quando aparecer. Atenção: esse
  cruzamento e a trava de resposta intercambiável puxam para lados opostos — se
  um enunciado repetido voltar, o certo é **juntar os dois cartões em um**, com
  as duas respostas em `accept`, não manter dois cartões gêmeos.
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
- **Uma nota só: `state.transGrades`.** Ela serve ao placar da rodada e à
  porcentagem por deck, e `transIsHit()` é a régua das duas.
  - **Contam como acerto:** `certo`; `quase` (o inglês produzido estava certo,
    só a digitação escorregou); e `aceitoManual` — a pessoa apertou "My answer
    is also correct".
  - **Não contam:** `diferente` e `naoLembro`.
  - **Por que a autoavaliação conta.** Ela não é uma segunda tentativa: é a
    pessoa corrigindo *o corretor* sobre a primeira resposta, quando a tradução
    dela estava boa e não estava em `accept`. Foi o caso do `t-382`, que
    aceitava "Sure! Thanks!", "Sure! Thank you!" e "Of course! Thanks!" mas
    reprovava justamente "Of course! Thank you!". Excluir esse cartão da
    porcentagem punia a pessoa por uma falha nossa.
  - **O que garante que continua sendo "de primeira"** é `state.transRevealed`:
    `submitTransAnswer()` e `skipTransCard()` recusam cartão já revelado, então
    cada cartão tem exatamente um veredito submetido. Não é preciso um segundo
    mapa para congelar nada — e é por isso que o antigo `transFirstGrades`,
    que existia só para excluir o `aceitoManual`, foi removido. **Se algum dia
    o "Back" passar a permitir responder de novo, aí sim volta a ser preciso
    congelar o primeiro veredito** — o `transRevealed` é a peça que segura tudo.
  - Quando a autoavaliação é usada muito num mesmo cartão, o conserto certo não
    é mexer na régua: é cadastrar a variação em `accept` ou em
    `TRANS_SYNONYMS`, para a pessoa não precisar do botão.
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
  existente e a contagem por deck igual à do CSV **menos os cartões da lista de
  poda** (o comentário no topo de `js/data-translate.js`)
- Autoteste do corretor de tradução: para todo cartão, a própria resposta (`en`) e
  cada string de `accept` precisam ser corrigidas como `certo`
- Teste da porcentagem por deck: numa rodada com um acerto, um typo, uma resposta
  diferente aceita na autoavaliação e um "Não lembro", **a tela de resultado e o
  histórico do deck têm de mostrar os mesmos 75% (3/4)** — é uma régua só. Se
  der 50%, o `aceitoManual` voltou a ser excluído; se der 100%, o "Não lembro"
  passou a contar. O teste também confere que `transFirstGrades` não voltou ao
  `state`
- Teste da rodada de correção: errando 4 de 9 cartões e depois acertando os 4 na
  correção, o histórico do deck precisa continuar em 56% (5/9) — se virar 100%,
  a correção voltou a gravar por cima
- Teste das unidades: 15 na grade, só as carregadas com link, toda chave de deck
  começando com a chave da sua unidade, nenhum deck vazando de uma unidade para
  outra, e o histórico gravado no formato antigo migrando para a chave com prefixo
- Cruzamento dos enunciados repetidos: dois cartões com o mesmo `pt` precisam
  aceitar a resposta um do outro
- Nenhuma resposta intercambiável: nenhuma string de `en` ou de `accept` pode
  ser corrigida como `certo` em mais de um cartão
- Campo `ctx`: só string curta e não vazia, e **nenhuma** delas pode ser
  corrigida como `certo` nem aparecer em `transExpectedAnswers` — a situação é
  enunciado, nunca resposta
- Sinônimos nos dois sentidos: para todo cartão, trocar na resposta uma palavra
  de `TRANS_SYNONYMS` pela equivalente precisa dar `certo` — e os pares
  documentados têm caso dirigido próprio (`t-306`, `t-312`, `t-36`, `t-21`,
  `t-16`), porque a rede só percorre o que está na tabela e não acusa a remoção
  de um par
- Fala reduzida sem apóstrofo: `lemme`, `gimme`, `Imma`, `gotcha` e companhia
  não têm apóstrofo, então a rede das contrações não as enxerga — há uma lista
  própria no autoteste que falha nomeando o cartão quando uma delas aparece sem
  estar em `TRANS_CONTRACTIONS`. Foi ela que achou o `gotcha` do `t-233`, que
  reprovava "Got you!" desde a Unit 4
- Contração nos dois sentidos: para toda resposta do banco, a versão contraída e
  a expandida precisam dar `certo` — e `This's`, `Friends's`, `you's`, `its` por
  `it's` e `they're` por `their` precisam continuar sendo reprovadas
- Tipografia nos dois sentidos: para toda resposta do banco, a versão só-ASCII
  (`–`/`—` → `-`, `’` → `'`, `”` → `"`, `…` → `...`) e a versão tipográfica
  precisam dar `certo`
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
