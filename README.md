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
