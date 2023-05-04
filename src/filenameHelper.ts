import * as fs from "fs";
import * as path from "path";

const folderPath = "./img";
const files = fs.readdirSync(folderPath);
let counter = 1;

// console.log(path);
for (const fileName of files) {
  const filePath = path.join(folderPath, fileName);
  const ext = path.extname(fileName);

  const newFileName = `image_${counter}${ext}`;
  counter++;

  const newFilePath = path.join(folderPath, newFileName);

  fs.renameSync(filePath, newFilePath);
  console.log(`${newFileName}"`);
}
