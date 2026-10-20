# Testes

A bateria de "Antes de publicar" do `CLAUDE.md`. Roda tudo com:

```sh
sh testes/rodar.sh          # smoke na última unidade carregada
sh testes/rodar.sh 13       # smoke na Unit 13
```

Não há dependência a instalar: os testes de dado rodam só com o `node`, e os de
navegador usam o Playwright/Chromium já instalado no ambiente
(`/opt/pw-browsers/chromium`).

**Estes arquivos moram no repositório de propósito.** A bateria viveu um tempo
numa pasta temporária de sessão e foi perdida junto com o contêiner — a rede
que pega bug é o ativo mais caro do projeto, e ela precisa sobreviver à máquina
que a escreveu.

## Testes de dado (um segundo, sem navegador)

| Arquivo | O que defende |
|---|---|
| `validar.js` | forma dos três bancos: categoria com teste e prática, 4 opções e 4 explicações, `correct` no intervalo, ids únicos, deck existente, `ctx` curto — e que o `getConvPracticeForCategory()` existe e devolve a mesma contagem do banco |
| `corretor.js` | o corretor da resposta digitada: nenhum cartão reprova a própria resposta, nenhuma resposta vale em dois cartões, `ctx` nunca é resposta, contração e tipografia nos dois sentidos, apóstrofo sem cobertura, redução sem apóstrofo, `ain't` com as cinco leituras, sinônimos nos dois sentidos, número por extenso, e a contagem por deck contra `contagens.json` |
| `conversa.js` | a trava da resposta curta e a régua da porcentagem **nas duas telas** do módulo da conversa (foi o bug dos 11%) |
| `traducao.js` | a régua do "de primeira" (certo + quase + autoavaliação = acerto), a mescla do histórico entre rodadas, a rodada de correção que **não** grava por cima, e a migração do formato antigo |

O `comum.js` carrega os quatro arquivos de `js/` fora do navegador. O `app.js`
precisa de DOM, então ele roda com um esqueleto mínimo — é o que permite
conferir em node a **porcentagem que a tela mostra**, e não só a régua que a
calcula. Era exatamente essa diferença que escondia o bug dos 11%.

## Testes de navegador (Chromium, por `file://`)

| Arquivo | O que defende |
|---|---|
| `unidades.js` | a grade das 15 unidades, só as carregadas com link, e a tela de decks de **cada** unidade carregada, uma por uma, sem deck vazando |
| `smoke.js` | os três módulos de ponta a ponta, incluindo a prática dirigida da conversa — a tela que já quebrou por o banco novo ter perdido uma função — e **zero erro de JS** |
| `smoke_unidade.js NN` | a rodada completa de uma unidade: os quatro vereditos e a porcentagem gravada por deck. É o teste da importação |

O erro de certificado do Google Fonts é do proxy do ambiente e os testes o
ignoram.

## `contagens.json`

Linha de base da contagem por deck e por unidade, conferida contra o CSV no dia
de cada importação. Uma unidade nova atualiza o arquivo de propósito; um cartão
que desaparece sem querer falha no `corretor.js`.
