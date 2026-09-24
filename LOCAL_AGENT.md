# Faceta AI local

Este projeto agora possui um agente local baseado em **TinyLlama 1.1B Chat** usando Transformers.js. O modelo é baixado para o diretório local da aplicação na primeira execução e não é enviado ao GitHub, porque os pesos ocupam centenas de MB.

## Executar

```bash
npm install
npm run download:model
npm start
```

Depois abra `http://localhost:8787/mascote.html`.

O navegador conversa somente com `http://localhost:8787/api/chat`; não há chave de API nem serviço externo necessário depois que o modelo foi baixado. Para trocar o modelo, altere `MODEL_ID` em `local-agent/server.mjs` e execute o download novamente.

> O GitHub Pages continua sendo apenas a interface estática. Para IA realmente local, execute este servidor Node.js no seu computador.
