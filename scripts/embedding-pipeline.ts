import * as dotenv from "dotenv";
import fs from "fs";
import { createFileEmbedding } from "../utils/openai";
import parseArgs from "minimist";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { splitText } from "../utils/file-parsing";

dotenv.config();

const COLLECTION_NAME = "omnissiah";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("No API key found. Please add an OPENAI_API_KEY to your .env file.");

const args = parseArgs(process.argv.slice(2));
const folderPath = args.f;

if (!folderPath) throw new Error("Please provide a folder path with the -f flag.");

const milvusClient = new MilvusClient(
  process.env.MILVUS_HOST || "localhost:19530",
  false,
  process.env.MILVUS_USERNAME || "Milvus",
  process.env.MILVUS_PASSWORD || "12345"
);

const generateEmbedding = async (textChunk: string) => {
  const embedding = await createFileEmbedding(apiKey, textChunk);
  return embedding;
};

const saveEmbeddings = async (text: string, chunkId: string, sourceFile: string) => {
  const openAIEmbedding = await generateEmbedding(text);

  return {
    text,
    chunkId,
    sourceFile,
    embedding: openAIEmbedding.data[0].embedding,
  };
};

const run = async () => {
  const promises: Promise<any>[] = [];
  const files = fs.readdirSync(folderPath);

  console.log("Found files: ", files);

  files.forEach((file) => {
    console.log("Reading file... ", file);
    const fileBuffer = fs.readFileSync(`${folderPath}/${file}`, "utf8");

    console.log("Splitting file into chunks...");
    const chunks = splitText(fileBuffer);
    chunks.forEach((chunk, index) => {
      promises.push(saveEmbeddings(chunk, index.toString(), file));
    });
  });

  console.log("Generating Embeddings...");
  const embeddings = await Promise.all(promises);

  console.log("Saving Embedding...");
  await milvusClient.dataManager.insert({
    collection_name: COLLECTION_NAME,
    fields_data: embeddings,
    partition_name: "main",
  });

  console.log("All done!");
};

run();
