import { pipeline, env } from '@huggingface/transformers';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const modelId = process.env.MODEL_ID || 'Xenova/TinyLlama-1.1B-Chat-v1.0';
env.cacheDir = join(here, '.cache');
env.allowRemoteModels = true;
env.allowLocalModels = true;

console.log(`Baixando/preparando ${modelId} no cache local...`);
await pipeline('text-generation', modelId, { dtype: 'q4' });
console.log(`Modelo pronto em ${env.cacheDir}`);
