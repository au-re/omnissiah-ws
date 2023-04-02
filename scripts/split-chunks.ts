import fs from "fs";
import parseArgs from "minimist";
import { splitText } from "../utils/file-parsing";

const resultDir = "data/chunks";

const args = parseArgs(process.argv.slice(2));
const filePath = args.f;

if (!filePath) {
  console.log("Please provide a path to a file to split into chunks");
  process.exit(1);
}

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
