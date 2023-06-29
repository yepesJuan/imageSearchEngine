import express from "express";
import * as fs from "fs";
import { createSchema } from "./createClass";
import { addImages } from "./addImages";
import { getResult } from "./testImage";
import { deletechema } from "./deleteClass";
import { showClasses } from "./showClasses";
import router from "./route";

const className = "Test1";
// await createSchema(className);
// await addImages(className);
// await getResult(className);

// await deletechema(className);

await showClasses();

const app = express();

// Mount the API routers
app.use("/", router); // Adjust the route path as needed for other routers

// Start the server
app.listen(4000, () => {
  console.log("Backend server is running on port 4000");
});
