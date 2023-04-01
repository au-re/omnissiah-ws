import fs from "fs";
import parseArgs from "minimist";

const CHUNK_LENGTH_LIMIT = 1500;
const resultDir = "data/chunks";

const args = parseArgs(process.argv.slice(2));
const filePath = args.f;

if (!filePath) {
  console.log("Please provide a path to a file to split into chunks");
  process.exit(1);
}

const cleanupText = (text: string) => {
  return text.replace(/[^\x00-\x7F]/g, ".");
};

const filterSmallSections = (section: string) => section.length > 5;

const joinSmallChunks = (chunks: string[]) => {
  let joinedChunks: string[] = [];
  let currentChunk = "";
  chunks.forEach((chunk) => {
    if ((currentChunk + chunk).length < CHUNK_LENGTH_LIMIT) {
      currentChunk += " " + chunk;
    } else {
      joinedChunks.push(currentChunk);
      currentChunk = chunk;
    }
  });
  return [...joinedChunks, currentChunk];
};

const splitBySections = (text: string) => {
  if (text.length < CHUNK_LENGTH_LIMIT) return [text];
  const sections = text.split(/(\n\s*\n)/);
  return joinSmallChunks(sections);
};

const splitByParagraph = (text: string) => {
  if (text.length < CHUNK_LENGTH_LIMIT) return [text];
  const paragraphs = text.split(/\.\n/);
  return joinSmallChunks(paragraphs);
};

// this might not be a good idea
const splitByEnumeration = (text: string) => {
  if (text.length < CHUNK_LENGTH_LIMIT) return [text];
  const enumerationSteps = text.split(/(\n[0-9].)/);
  return joinSmallChunks(enumerationSteps);
};

const splitBySentence = (text: string) => {
  if (text.length < CHUNK_LENGTH_LIMIT) return [text];
  const sentences = text.split(/(\.)/);
  return joinSmallChunks(sentences);
};

const catchAllSplit = (text: string) => {
  if (text.length < CHUNK_LENGTH_LIMIT) return [text];
  const sentences = text.split(/ /);
  return joinSmallChunks(sentences);
};

/**
 * Split text into chunks of 1500 characters trying to preserve in order:
 * - sections
 * - paragraphs
 * - sentences
 * - words
 */
const splitText = (text: string) => {
  const cleanedText = cleanupText(text);
  const split = splitBySections(cleanedText)
    .map(splitByParagraph)
    .flat()
    .map(splitByEnumeration)
    .flat()
    .map(splitBySentence)
    .flat()
    .map(catchAllSplit)
    .flat()
    .map((chunk) => chunk.trim())
    .filter(filterSmallSections);
  return split;
};

const run = async (filePath: string) => {
  console.log("Reading file...");
  const fileData = fs.readFileSync(filePath, "utf8");
  console.log("Splitting file...");
  const split = splitText(fileData);
  console.log("Saving chunks...");

  const fileName = filePath
    .replace(/\.[^/.]+$/, "")
    .split("/")
    .pop();

  const targetFilePath = `${resultDir}/${fileName}`;
  if (!fs.existsSync(resultDir)) fs.mkdirSync(resultDir);
  if (!fs.existsSync(targetFilePath)) fs.mkdirSync(targetFilePath);

  split.forEach((chunk, index) => {
    fs.writeFileSync(`${targetFilePath}/${index}.txt`, chunk);
  });

  console.log("Chunks saved successfully");
};

run(filePath);
