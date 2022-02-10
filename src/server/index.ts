import "dotenv/config";
import express from "express";

const port = process.env.PORT;
const domain = process.env.DOMAIN;
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

app.get("/alias", (_, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  return console.log(`Server is listening at http://${domain}:${port}`);
});
