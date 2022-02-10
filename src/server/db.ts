import { Database } from "sqlite3";

const db = new Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS urls ( \
        url TEXT UNIQUE NOT NULL, \
        alias TEXT \
      )"
  );
});

function getUrlByAlias(alias: string): Promise<string> {
  return new Promise((resolve, reject) => {
    db.get("SELECT url FROM urls WHERE alias = ?", [alias], (err, row) => {
      if (err || !row) {
        return reject("url not found");
      }
      return resolve(row.url);
    });
  });
}

function addNewAlias(alias: string, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO urls (url, alias) VALUES (?, ?)",
      [url, alias],
      (_, err) => (err ? reject(err) : resolve())
    );
  });
}

function deleteByAlias(alias: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM urls WHERE alias = ?", [alias], (err) =>
      err ? reject(err) : resolve()
    );
  });
}
export { getUrlByAlias, addNewAlias, deleteByAlias };
