import * as fs from "fs";
import { client } from "./client";

const toBase64 = async (filePath: string): Promise<string> => {
  const buffer = await fs.promises.readFile(filePath);
  return buffer.toString("base64");
};

export const addImages = async (className: string) => {
  const imgFiles = fs.readdirSync("./img");
  const promises = imgFiles.map(async (imgFile) => {
    const b64 = await toBase64(`./img/${imgFile}`);
    await client.data
      .creator()
      .withClassName(className)
      .withProperties({
        image: b64,
        text: imgFile,
      })
      .do();
  });

  await Promise.all(promises);
  console.log("Images added!!!");
  console.log("*************************", "\n");
};
