# EN•Check — Teste de Inglês A1-A2 para Dados

Site estático (HTML + CSS + JS puro, sem build e sem dependências) publicado
pelo GitHub Pages a partir da branch `main`. São duas avaliações independentes:

- **Teste A1-A2** — `js/data.js` (`TEST_QUESTIONS`, `PRACTICE_QUESTIONS`, `CATEGORIES`)
- **Erros da Conversa Real** — `js/data-conversation.js`, um módulo refeito a cada
  rodada de feedback da aula de conversação, com os erros reais daquela conversa

`js/app.js` tem todo o estado e a renderização das duas; `index.html` só carrega
os três scripts na ordem data → data-conversation → app.

## Fluxo de trabalho (padrão combinado — não precisa perguntar)

Para **toda** alteração, leve até o site estar no ar:

1. Branch a partir da `main` atualizada
2. Commit com a identidade do dono do repositório:
   `Thiago Vinicius dos Santos Alexandre <226152649+ThiagoVinicius2@users.noreply.github.com>`
3. Push, PR e **merge na `main`** — é o merge que publica no Pages (leva 1-2 min)
4. Confirmar que a `main` ficou com o conteúdo novo

Mensagens de commit, PR e textos da interface em português.

Ao mudar qualquer arquivo em `css/` ou `js/`, suba o cache-busting dos três
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

## Antes de publicar

- `node --check` nos três arquivos de `js/`
- Validar o banco: toda categoria com teste e prática, 4 opções e 4 explicações,
  `correct` dentro do intervalo, ids únicos
- Smoke test no Chromium (Playwright, `executablePath: '/opt/pw-browsers/chromium'`):
  abrir `index.html` por `file://`, responder o teste inteiro, chegar no resultado
  e rodar a prática dirigida, conferindo que não há erro de JS
  (o erro de certificado do Google Fonts é do proxy do ambiente, pode ignorar)
