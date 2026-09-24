# Faceta AI local — execução rápida

## Requisitos

- Node.js 18.18 ou superior
- aproximadamente 2 GB livres para dependências, cache e modelo
- internet apenas na primeira execução, para baixar os pesos

## Windows, macOS ou Linux

Na raiz do projeto:

```bash
npm install
npm start
```

Abra no navegador:

```text
http://127.0.0.1:8787/mascote.html
```

O servidor baixa o modelo automaticamente quando a primeira mensagem é enviada. Para baixar antes de abrir a interface:

```bash
npm run download:model
npm start
```

## Importante

- O modelo roda no processo Node.js local usando Transformers.js e WASM.
- Não existe chave de API e as mensagens não são enviadas para um provedor de IA.
- Os pesos ficam em `local-agent/.cache/`, ignorados pelo Git.
- O GitHub Pages não executa Node.js; use o comando acima no seu computador ou em um servidor próprio.
- Para verificar: `http://127.0.0.1:8787/api/health`.

Se o download for interrompido, execute `npm run download:model` novamente. O cache parcial será reutilizado.
