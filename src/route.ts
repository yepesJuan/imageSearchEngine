import { Router } from "express";
import { showClasses } from "./showClasses";
import { getResult } from "./testImage";
import { createSchema } from "./createClass";

const router = Router();

router.get("/showClasses", async (req, res) => {
  try {
    const classes = await showClasses(); // Call the appropriate backend function to retrieve the classes
    res.json(classes);
  } catch (error) {
    console.error("Error retrieving classes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving classes" });
  }
});

router.get("/:className", async (req, res) => {
  try {
    const { className } = req.params;
    await getResult(className);
    res.json({ message: "Result fetched successfully" });
  } catch (error) {
    console.error("Error getting result:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the result" });
  }
});

router.post("/:className", async (req, res) => {
  try {
    const { className } = req.body;
    await createSchema(className);
    res.json({ message: "Schema created successfully" });
  } catch (error) {
    console.error("Error creating schema:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the schema" });
  }
});

export default router;
