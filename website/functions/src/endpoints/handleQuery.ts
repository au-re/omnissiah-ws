import { Request, Response } from "express";
import { createCompletionWithKey, createFileEmbedding } from "../openai";
import { COLLECTION_NAME, milvusClient } from "../milvus";
import { DataType } from "@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus";
import { queryPrompt } from "../prompts/queryPrompt";

export const handleQuery = async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    res.status(500).send({ error: "server error" });
    return;
  }

  // 1. generate an embedding for the query
  console.log("create embedding...");
  const openAIEmbedding = await createFileEmbedding(process.env.OPENAI_API_KEY, query);
  const embedding = openAIEmbedding.data[0].embedding;

  // 2. search the vector database for the closest vector
  console.log("search database...");
  const { results } = await milvusClient.dataManager.search({
    collection_name: COLLECTION_NAME,
    vectors: [embedding],
    search_params: {
      anns_field: "embedding",
      topk: "3",
      metric_type: "IP",
      params: JSON.stringify({ nprobe: 1024 }),
      round_decimal: 4,
    },
    output_fields: ["text", "sourceFile"],
    vector_type: DataType.FloatVector,
  });

  // 3. create a prompt
  console.log("create prompt...");
  const context = results.map((result) => result.text);
  const prompt = queryPrompt(context, query);

  // 4. generate a response
  const response = await createCompletionWithKey(process.env.OPENAI_API_KEY, prompt);

  res.status(200).send({ response, results, prompt });
};
