import * as dotenv from "dotenv";
import fs from "fs";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import parseArgs from "minimist";

dotenv.config();

const COLLECTION_NAME = "omnissiah";

const milvusClient = new MilvusClient(
  process.env.MILVUS_HOST || "localhost:19530",
  false,
  process.env.MILVUS_USERNAME || "Milvus",
  process.env.MILVUS_PASSWORD || "12345"
);

const args = parseArgs(process.argv.slice(2));
const filePath = args.f;

if (!filePath) {
  console.log("Please provide a path to a file containing the embeddings");
  process.exit(1);
}

const run = async () => {
  console.log("Load embedding data...");
  const fileBuffer = fs.readFileSync(filePath, "utf8");
  const fileName = filePath
    .replace(/\.[^/.]+$/, "")
    .split("/")
    .pop();
  const openAIEmbedding = JSON.parse(fileBuffer);
  const data = {
    sourceFile: fileName,
    chunkId: "test",
    text: openAIEmbedding.text,
    embedding: openAIEmbedding.data[0].embedding,
  };

  console.log("Inserting Data...");
  const res = await milvusClient.dataManager.insert({
    collection_name: COLLECTION_NAME,
    fields_data: [data],
    partition_name: "main",
  });

  console.log(res);

  console.log("Done!");
};

run();
