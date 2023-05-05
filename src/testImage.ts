import * as fs from "fs";
import { client } from "./client.js";

export const getResult = async (className: string) => {
  console.log("Comparing test image with db!!!");
  console.log("*************************", "\n");
  const test = Buffer.from(fs.readFileSync("./test.png")).toString("base64");

  const resImage = await client.graphql
    .get()
    .withClassName(className)
    .withFields(["image"] as any)
    .withNearImage({ image: test })
    .withLimit(1)
    .do();

  // Write result to filesystem
  const result = resImage.data.Get[className][0].image;
  fs.writeFileSync("./result.png", result, "base64");
  console.log("Result written to filesystem!!!", "\n");
};
