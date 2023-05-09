import * as fs from "fs";
import { createSchema } from "./createClass";
import { addImages } from "./addImages";
import { getResult } from "./testImage";
import { deletechema } from "./deleteClass";
import { showClasses } from "./showClasses";

const className = "Test1";
await createSchema(className);
await addImages(className);
await getResult(className);

// await deletechema(className);

// await showClasses();
