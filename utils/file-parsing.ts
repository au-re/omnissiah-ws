const CHUNK_LENGTH_LIMIT = 1500;

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
export const splitText = (text: string) => {
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

  // remove duplicate sections - some parts of the input text might be repeated
  // we want to avoid presenting the same information twice to the language model
  const duplicateIndexes: number[] = [];
  split
    .map((value) => value.toLowerCase().replace(/ |\n|\.|-|,/g, ""))
    .forEach((values, index, self) => {
      if (self.indexOf(values) !== index) {
        duplicateIndexes.push(index);
      }
    });

  const dedup = split.filter((_, index) => !duplicateIndexes.includes(index));
  return dedup;
};
