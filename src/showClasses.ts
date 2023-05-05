import { client } from "./client";

export const showClasses = async (): Promise<void> => {
  try {
    const resSchema = await client.schema.getter().do();
    if (!resSchema?.classes?.length) {
      console.log("No classes found");
      return;
    }
    resSchema.classes.forEach((classes) =>
      console.log("List of classes:", classes.class)
    );
  } catch (error: any) {
    console.log("Error:", error.message);
  }
};
