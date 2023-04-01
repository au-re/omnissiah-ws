import { Configuration, OpenAIApi } from "openai";

const defaultCompletionOptions = {
  model: "text-davinci-003",
  maxTokens: 360,
  temperature: 0,
};

export async function createCompletionWithKey(apiKey: string, prompt: string, options = defaultCompletionOptions) {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: options.model || defaultCompletionOptions.model,
    max_tokens: options.maxTokens || defaultCompletionOptions.maxTokens,
    prompt,
    temperature: options.temperature || defaultCompletionOptions.temperature,
  });

  return completion.data.choices[0].text || "";
}

const defaultEmbeddingOptions = {
  model: "text-embedding-ada-002",
};

export async function createFileEmbedding(apiKey: string, text: string, options = defaultEmbeddingOptions) {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createEmbedding({
    ...options,
    input: text,
  });

  return response.data;
}
