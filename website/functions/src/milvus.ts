import { MilvusClient } from "@zilliz/milvus2-sdk-node";

export const COLLECTION_NAME = "omnissiah";

export const milvusClient = new MilvusClient(
  process.env.MILVUS_HOST || "-",
  false,
  process.env.MILVUS_USERNAME || "Milvus",
  process.env.MILVUS_PASSWORD || "12345"
);

export const collectionManager = milvusClient.collectionManager;
