import { app } from "./app";
import { addNewAlias } from "./db";

const port = process.env.PORT;
const domain = process.env.DOMAIN;

app.listen(port, async () => {
  await addNewAlias("fb", "https://www.facebook.com");
  return console.log(`Server is listening at http://${domain}:${port}`);
});
