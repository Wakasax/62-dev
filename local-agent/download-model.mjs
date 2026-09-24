import { pipeline, env } from '@huggingface/transformers';

const MODEL_ID = process.env.MODEL_ID || 'Xenova/TinyLlama-1.1B-Chat-v1.0';
env.cacheDir = new URL('./.cache/', import.meta.url).pathname;
env.allowRemoteModels = true;
console.log(`Baixando/preparando ${MODEL_ID} no cache local...`);
await pipeline('text-generation', MODEL_ID, { dtype: 'q4' });
console.log('Modelo pronto. Os arquivos ficam em local-agent/.cache.');
