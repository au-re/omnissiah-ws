# omnissiah.ws

A pipeline to extract information from Warhammer rule books and providing it through a Q&A chatbot.

The original data is not stored as part of this repo.

## Setup

You will need Node and yarn installed.

Run `yarn` at the root of the project.

## 1. Data Preprocessing

First we parse the pdfs into text.

```
npx ts-node scripts/extract-pdf-text.ts -f path/to/file.pdf
```

This will create a file in `raw_text` with the same filename as the pdf.

Then we split the text into chunks. We keep the chunks small enough to be able to create an embedding using OpenAI apis.

```
npx ts-node scripts/split-chunks.ts -f path/to/file.txt
```

This will create a folder under `chunks` with the same filename as the original file. We try to be smart about how our
chunks are created and keep text together that has a common context.

## 2. Generating Embeddings

To transform a file into an embedding you can use:

```
npx ts-node scripts/generate-file-embedding.ts -f path/to/file.txt
```

You can also use this script to generate an embedding from text:

```
npx ts-node scripts/generate-embedding.ts -t "What units can I shoot at?"
```

## 3. Storing the Embeddings

You can store the embeddings on a database, in our case Milvus.

To start Milvus run `docker compose up -p`.

You can access the Milvus GUI at `http://localhost:8000`.

Run this script once to create a collection and index:

```
npx ts-node scripts/milvus-create-collection.ts
```

> NOTE: this does not create a partition, you will need to add it manually in the Milvus GUI.

You can insert an embedding using:

```
npx ts-node scripts/milvus-insert.ts -f path/to/file.json
```

## 4. Fetching the Closest matches

You can find the closest matching text chunks from Milvus by running the following command. You will need to pass the file containing the query embedding.

```
npx ts-node scripts/fetch-closest -f path/to/file.json
```
