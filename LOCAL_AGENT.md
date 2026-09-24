# Faceta no GitHub Pages

A página `mascote.html` agora executa o modelo no navegador usando Transformers.js. Não é necessário instalar Node.js, npm ou qualquer programa no computador.

Basta abrir o site publicado pelo GitHub Pages. Na primeira conversa, o navegador baixa os pesos do TinyLlama e guarda-os no cache local. As mensagens são processadas no navegador; depois do primeiro download, o modelo pode funcionar sem conexão enquanto o cache estiver disponível.

O primeiro carregamento pode demorar e usa memória do dispositivo. Chrome ou Edge atualizado oferecem a melhor chance de usar WebGPU; a página faz fallback para WASM quando necessário.

Observação: os pesos do modelo não ficam versionados dentro do Git porque são grandes. Eles são baixados pelo navegador a partir do repositório público do modelo apenas na primeira execução.
