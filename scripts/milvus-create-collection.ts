import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { DataType } from "@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus";

const COLLECTION_NAME = "omnissiah";
const EMBEDDING_DIMENTION = "1536";

const milvusClient = new MilvusClient("localhost:19530");
const collectionManager = milvusClient.collectionManager;

const run = async () => {
  console.log("Creating collection...");
  // CAREFUL: This fails silently
  await collectionManager.createCollection({
    collection_name: COLLECTION_NAME,
    fields: [
      {
        name: "id",
        description: "identifier",
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
      },
      {
        name: "text",
        description: "chunk of text",
        data_type: DataType.VarChar,
        type_params: {
          max_length: "1500",
        },
      },
      {
        name: "embedding",
        data_type: DataType.FloatVector,
        description: "embedding of the chunk of text",
        type_params: {
          dim: EMBEDDING_DIMENTION,
        },
      },
    ],
  });

  console.log("Creating index...");
  await milvusClient.indexManager.createIndex({
    collection_name: COLLECTION_NAME,
    field_name: "embedding",
    extra_params: {
      index_type: "IVF_FLAT",
      metric_type: "IP",
      params: JSON.stringify({ nlist: 10 }),
    },
  });

  console.log("Done!");
};

run();
