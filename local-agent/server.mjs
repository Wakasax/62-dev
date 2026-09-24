import express from 'express';
import { pipeline, env } from '@huggingface/transformers';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const port = Number(process.env.PORT || 8787);
const model = process.env.MODEL_ID || 'Xenova/TinyLlama-1.1B-Chat-v1.0';
env.cacheDir = join(here, '.cache');
env.allowRemoteModels = true;
env.allowLocalModels = true;

let generator = null;
let loading = null;
let lastError = null;

async function loadModel() {
  if (generator) return generator;
  if (!loading) {
    console.log(`Preparando modelo local ${model}...`);
    loading = pipeline('text-generation', model, { dtype: 'q4' })
      .then((loaded) => { generator = loaded; lastError = null; return loaded; })
      .catch((error) => { lastError = error; loading = null; throw error; });
  }
  return loading;
}

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(root));

app.get('/api/health', (_req, res) => res.json({
  ok: true,
  local: true,
  model,
  ready: Boolean(generator),
  loading: Boolean(loading),
  error: lastError ? 'modelo ainda não foi baixado ou carregado' : null
}));

app.post('/api/model/load', async (_req, res) => {
  try {
    await loadModel();
    res.json({ ok: true, ready: true, model, local: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Não foi possível baixar/carregar o modelo local.' });
  }
});

app.post('/api/chat', async (req, res) => {
  const prompt = String(req.body?.prompt || '').trim();
  if (!prompt) return res.status(400).json({ error: 'prompt obrigatório' });
  if (prompt.length > 12000) return res.status(413).json({ error: 'prompt muito grande' });

  try {
    const generate = await loadModel();
    const result = await generate(
      `<|system|>Você é a Faceta, um agente local útil do Wakasa Hub. Responda sempre em português brasileiro, de forma objetiva.<|user|>${prompt}<|assistant|>`,
      { max_new_tokens: Number(req.body?.max_new_tokens || 256), temperature: 0.7, do_sample: true, return_full_text: false }
    );
    const response = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text;
    res.json({ ok: true, response: String(response || '').trim(), model, local: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'O modelo local não conseguiu responder. Verifique o terminal e rode npm run download:model.' });
  }
});

app.listen(port, '127.0.0.1', () => {
  console.log(`\nFaceta local funcionando em http://127.0.0.1:${port}`);
  console.log('Abra http://127.0.0.1:8787/mascote.html no navegador.');
  console.log('O primeiro carregamento baixa os pesos para local-agent/.cache.\n');
});
