import fs from "fs";
import pdfParse from "pdf-parse";
import parseArgs from "minimist";

const resultDir = "data/raw_text";

const args = parseArgs(process.argv.slice(2));
const pdfPath = args.f;

if (!pdfPath) {
  console.log("Please provide a path to a PDF file");
  process.exit(1);
}

const getPDF = async (fileBuffer: Buffer) => {
  const pdfExtract = await pdfParse(fileBuffer);
  return {
    text: pdfExtract.text,
    metadata: pdfExtract.info,
  };
};

const run = async (filePath: string) => {
  console.log("Reading file...");
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = filePath
    .replace(/\.[^/.]+$/, "")
    .split("/")
    .pop();

  console.log("Extracting text from PDF...");
  const { text } = await getPDF(fileBuffer);

  console.log("PDF content extracted successfully");
  if (!fs.existsSync(resultDir)) fs.mkdirSync(resultDir);
  await fs.writeFileSync(`${resultDir}/${fileName}.txt`, text);

  console.log("Text content written successfully");
};

run(pdfPath);
