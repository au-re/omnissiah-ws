import * as dotenv from "dotenv";
import fs from "fs";
import { createFileEmbedding } from "../utils/openai";
import parseArgs from "minimist";

const resultDir = "data/embeddings";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("No API key found. Please add an OPENAI_API_KEY to your .env file.");

const args = parseArgs(process.argv.slice(2));
const filePath = args.f;

if (!filePath) {
  console.log("Please provide a path to a PDF file");
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

const run = async (filePath: string) => {
  console.log("Reading file...");
  const fileBuffer = fs.readFileSync(filePath, "utf8");
  const fileName = filePath
    .replace(/\.[^/.]+$/, "")
    .split("/")
    .pop();
  console.log("Generating Embedding...");
  const embedding = await generateEmbedding(fileBuffer);
  console.log("Saving Embedding...", embedding);
  if (!fs.existsSync(resultDir)) fs.mkdirSync(resultDir);
  fs.writeFileSync(`${resultDir}/${fileName}.json`, JSON.stringify(embedding));
  console.log("Done!");
};

run(filePath);
