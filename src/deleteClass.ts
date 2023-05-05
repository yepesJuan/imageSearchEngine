import { client } from "./client";

export const deletechema = async (className: string) => {
  const currentSchema = await client.schema.getter().do();

  console.log("Before deletion:", currentSchema.classes?.length);

  await client.schema.classDeleter().withClassName(className).do();

  const updatedSchema = await client.schema.getter().do();

  console.log("After deletion:", updatedSchema.classes?.length);
};

// await deletechema("Test12");
