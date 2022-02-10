import "dotenv/config";
import express from "express";

import { addNewAlias, getUrlByAlias } from "./db";
import { generateAlias, validateAlias } from "./utils/alias";
import { normalize } from "./utils/string";
import { validateURL } from "./utils/url";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.set("view engine", "html");

app.get("/", (_, res) => {
  res.render("index.html");
});

app.post("/api/url", async (req, res) => {
  /**
-[x] Accepts values URL(required), Alias(optional)
-[x] If Alias is not provided, a short unique name should be generated
-[x] Normalizes URL and Alias by trimming spaces and changing case to lower
-[x] Checks URL & Alias for correctness
-[x] Saves URL & Alias to a database
-[x] Returns JSON object with URL & Alias
-[x] If operation was not successful, respond with appropriate HTTP status code and message
-[ ] Checks that Alias is unique
-[ ] Add an integration test
*/
  const url = normalize(req.body.url || "");
  if (!url || !validateURL(url)) {
    res.status(400).json({ message: "URL parameter is invalid and required" });
  }

  const alias = req.body.alias ? normalize(req.body.alias) : generateAlias();
  if (!validateAlias(alias)) {
    res.status(400).json({
      status: "error",
      message: "Alias parameter is invalid",
    });
  }

  try {
    await addNewAlias(alias, url);
    res.status(201).json({ message: { url, alias } });
  } catch (err) {
    // REVIEW: In production you don't want to return the error details
    res
      .status(500)
      .json({ message: `Unable to persist this alias. Detals: ${err}` });
  }
});

app.get("/:alias", async (req, res) => {
  const { alias } = req.params;
  try {
    const url = await getUrlByAlias(alias);
    return res.redirect(url);
  } catch (_) {
    return res.status(404).send("Alias does not exist");
  }
});

export { app };
