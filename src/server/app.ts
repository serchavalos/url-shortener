import "dotenv/config";
import express from "express";

import { getUrlByAlias } from "./db";

const app = express();

app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.set("view engine", "html");

// API Skeleton
app.get("/", (_, res) => {
  res.render("index.html");
});

app.post("/", (_, res) => {
  res.json({ message: "invalid form" });
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
