import fs from "fs";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import parseArgs from "minimist";
import { DataType } from "@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus";

const args = parseArgs(process.argv.slice(2));
const filePath = args.f;

if (!filePath) {
  console.log("Please provide a path to a file containing the query embedding");
  process.exit(1);
}

const COLLECTION_NAME = "omnissiah";

const milvusClient = new MilvusClient("localhost:19530");
const collectionManager = milvusClient.collectionManager;

const run = async () => {
  console.log("loading collection...");
  await collectionManager.loadCollectionSync({
    collection_name: COLLECTION_NAME,
  });

  console.log("loading openAI embedding...");
  const fileData = fs.readFileSync(filePath, "utf8");
  const embedding = JSON.parse(fileData).data[0].embedding;

  console.log("searching similar items...");
  const result = await milvusClient.dataManager.search({
    collection_name: COLLECTION_NAME,
    vectors: [embedding],
    search_params: {
      anns_field: "embedding",
      topk: "4",
      metric_type: "IP",
      params: JSON.stringify({ nprobe: 1024 }),
      round_decimal: 4,
    },
    output_fields: ["text"],
    vector_type: DataType.FloatVector,
  });

  console.log("result:", result);
};

run();
