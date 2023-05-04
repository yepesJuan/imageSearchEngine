import { readFileSync, readdirSync, writeFileSync } from "fs";
import { promises as fs } from "fs";
import weaviate, { WeaviateClient } from "weaviate-ts-client";

async function toBase64(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath);
  return buffer.toString("base64");
}

const schemaConfig = {
  class: "Test2",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};

const client: WeaviateClient = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const resSchema = await client.schema.getter().do();

console.log(resSchema);

await client.schema.classCreator().withClass(schemaConfig).do();

const imgFiles = readdirSync("./img");
const promises = imgFiles.map(async (imgFile) => {
  const b64 = await toBase64(`./img/${imgFile}`);
  await client.data
    .creator()
    .withClassName("Test2")
    .withProperties({
      image: b64,
      text: imgFile,
    })
    .do();
});

await Promise.all(promises);

const test = Buffer.from(readFileSync("./test.png")).toString("base64");

const resImage = await client.graphql
  .get()
  .withClassName("Test2")
  .withFields(["image"] as any)
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

// Write result to filesystem
const result = resImage.data.Get.Test2[0].image;
writeFileSync("./result.png", result, "base64");
