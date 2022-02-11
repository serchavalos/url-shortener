import { app } from "./app";

const port = process.env.PORT;
const domain = process.env.DOMAIN;

app.listen(port, async () => {
  return console.log(`Server is listening at http://${domain}:${port}`);
});
