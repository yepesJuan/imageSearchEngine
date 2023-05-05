import { client } from "./client";

export const createSchema = async (className: string) => {
  try {
    const schemaConfig = {
      class: className,
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
    await client.schema.classCreator().withClass(schemaConfig).do();
  } catch (error: any) {
    console.log("Error creating schema:", error.message);
  }
};

console.log("Schema created!!!");
console.log("*************************", "\n");
