import * as dotenv from "dotenv";
import fs from "fs";
import { createFileEmbedding } from "../utils/openai";
import parseArgs from "minimist";

const resultDir = "data/embeddings";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("No API key found. Please add an OPENAI_API_KEY to your .env file.");

const args = parseArgs(process.argv.slice(2));
const text = args.t;

if (!text) {
  console.log("Please provide text to generate embedding for.");
  process.exit(1);
}

/**
 * generates an embedding for a given text chunk
 * @param textChunk
 */
const generateEmbedding = async (textChunk: string) => {
  const embedding = await createFileEmbedding(apiKey, textChunk);
  return embedding;
};

const run = async () => {
  console.log("Generating Embedding...");
  const embedding = await generateEmbedding(text);
  console.log("Saving Embedding...", embedding);
  if (!fs.existsSync(resultDir)) fs.mkdirSync(resultDir);
  fs.writeFileSync(`res.json`, JSON.stringify({ ...embedding, text }));
  console.log("Done!");
};

run();
