# Lua AI via Groq

O site usa exclusivamente a API da Groq no navegador com o modelo `openai/gpt-oss-20b`. O modelo local/TinyLlama não é carregado pela página.

A chave não é incluída no repositório. No site, clique em **Configurar API**, cole sua chave Groq e salve. Ela fica apenas no armazenamento local deste navegador.

Como este repositório é público, nunca coloque uma chave Groq diretamente no HTML. Se a chave aparecer em commits, imagens ou mensagens públicas, revogue-a e crie outra. Para produção, use um proxy/backend com a chave em variável de ambiente.
