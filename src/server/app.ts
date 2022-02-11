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
  const url = normalize(req.body.url || "");
  if (!url || !validateURL(url)) {
    return res
      .status(400)
      .json({ message: "URL parameter is invalid and required" });
  }

  const alias = req.body.alias ? normalize(req.body.alias) : generateAlias();
  if (!validateAlias(alias)) {
    return res.status(400).json({
      message: "Alias parameter is invalid",
    });
  }
  const alreadyRegisteredUrl = await getUrlByAlias(alias);
  if (alreadyRegisteredUrl !== null) {
    return res.status(400).json({
      message: "Alias parameter has already been registered",
    });
  }

  try {
    await addNewAlias(alias, url);
    return res.status(201).json({ message: { url, alias } });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Unable to persist this alias. Details: ${err}` });
  }
});

app.get("/:alias", async (req, res) => {
  const { alias } = req.params;
  const url = await getUrlByAlias(alias);
  if (!url) {
    return res.status(404).send("Alias does not exist");
  }

  return res.redirect(url);
});

export { app };
