#!/bin/sh
# A bateria inteira de "Antes de publicar". Para no primeiro teste que falhar.
#
#   sh testes/rodar.sh            roda tudo, com o smoke da última unidade
#   sh testes/rodar.sh 13         roda tudo, com o smoke da Unit 13
set -e
cd "$(dirname "$0")/.."

echo "== node --check nos quatro arquivos de js/"
for f in js/data.js js/data-conversation.js js/data-translate.js js/app.js; do
  node --check "$f"
done
echo "   ok"

# O "| tail" engoliria o código de saída do node (o do pipe é o do tail), e a
# bateria diria "tudo passou" com teste falhando. Então o resumo sai de um
# arquivo, e o código de saída conferido é o do node.
roda() {
  nome="$1"; shift
  if node "$nome" "$@" > /tmp/bateria.out 2>&1; then
    tail -2 /tmp/bateria.out
  else
    cat /tmp/bateria.out
    echo
    echo "BATERIA INTERROMPIDA em $nome"
    exit 1
  fi
}

echo "== testes de dado (rápidos)"
roda testes/validar.js
roda testes/corretor.js
roda testes/conversa.js
roda testes/traducao.js

echo "== testes de navegador (Chromium)"
roda testes/unidades.js
roda testes/smoke.js
roda testes/smoke_unidade.js "$1"

echo
echo "BATERIA COMPLETA: tudo passou"
