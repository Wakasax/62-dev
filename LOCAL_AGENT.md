# Lua AI

O hub agora chama o assistente de **Lua AI** e usa a API compatível da Groq diretamente pela interface.

Por segurança, nenhuma chave de API foi incluída no repositório. A chave informada na conversa ficou exposta e deve ser revogada/rotacionada no painel da Groq. No site, use **Configurar API** e cole uma nova chave; ela será armazenada apenas no `localStorage` do seu navegador.

A chamada usa `https://api.groq.com/openai/v1/chat/completions` e o modelo padrão `llama-3.1-8b-instant`.

Para produção, não coloque uma chave Groq no HTML: GitHub Pages é público e qualquer visitante poderia extraí-la. Use um backend/proxy com segredo protegido.
