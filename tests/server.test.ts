import assert from "assert";
import request from "supertest";
import { app } from "../src/server/app";
import { addNewAlias, deleteByAlias } from "../src/server/db";

describe("GET /:alias", () => {
  // Dummy values used for testing
  const alias = "fb";
  const expectedLocation = "https://www.facebook.com";

  beforeAll(async () => {
    await addNewAlias(alias, expectedLocation);
  });
  afterAll(async () => {
    await deleteByAlias(alias);
  });

  it("responds with a redirect", (done) => {
    request(app)
      .get(`/fb`)
      .expect("Location", expectedLocation)
      .expect(302, done);
  });

  it("responds with a 404 when an unexistent alias is provided", (done) => {
    request(app).get("/notfound").expect(404, done);
  });
});
