import express from 'express';
import { pipeline, env } from '@huggingface/transformers';

const app = express();
const port = Number(process.env.PORT || 8787);
const modelId = process.env.MODEL_ID || 'Xenova/TinyLlama-1.1B-Chat-v1.0';
env.cacheDir = new URL('./.cache/', import.meta.url).pathname;
let generator;
let loading;

async function getGenerator() {
  if (!generator) {
    loading ||= pipeline('text-generation', modelId, { dtype: 'q4' });
    generator = await loading;
  }
  return generator;
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(new URL('../', import.meta.url).pathname));
app.get('/api/health', (_req, res) => res.json({ ok: true, model: modelId, local: true }));
app.post('/api/chat', async (req, res) => {
  try {
    const prompt = String(req.body?.prompt || '').trim();
    if (!prompt) return res.status(400).json({ error: 'prompt obrigatório' });
    const generate = await getGenerator();
    const result = await generate(`<|system|>Você é a Faceta, um agente útil do Wakasa Hub. Responda em português.<|user|>${prompt}<|assistant|>`, {
      max_new_tokens: Number(req.body?.max_new_tokens || 256),
      temperature: 0.7,
      do_sample: true,
      return_full_text: false
    });
    const response = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text;
    res.json({ response: String(response || '').trim(), model: modelId, local: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao executar o modelo local. Rode npm run download:model primeiro.' });
  }
});
app.listen(port, () => console.log(`Faceta local em http://localhost:${port}`));
