import request from "supertest";
import { app } from "../../src/server/app";
import { addNewAlias, deleteByAlias } from "../../src/server/db";

describe("Server routes", () => {
  // Dummy values used for testing
  const alias = "fb";
  const expectedLocation = "https://www.facebook.com";

  beforeAll(async () => {
    await addNewAlias(alias, expectedLocation);
  });
  afterAll(async () => {
    await deleteByAlias(alias);
  });

  describe("GET /:alias", () => {
    it("responds with a redirect", (done) => {
      request(app)
        .get(`/fb`)
        .expect("Location", expectedLocation)
        .expect(301, done);
    });

    it("responds with a 404 when an unexistent alias is provided", (done) => {
      request(app).get("/notfound").expect(404, done);
    });
  });

  describe("POST /api/url", () => {
    it("returns a 400 when `url` parameter is invalid and missing", (done) => {
      request(app)
        .post(`/api/url`)
        .send({ url: "inavlid-url" })
        .expect(400, done);
    });

    it("returns a 400 when `alias` parameter is invalid", (done) => {
      request(app)
        .post(`/api/url`)
        .send({ url: "https://petli.app", alias: "invalid*alias" })
        .expect(400, done);
    });

    it("returns a 400 when `alias` is not unique", (done) => {
      // The alias `fb` was registered in the `beforeAll function
      request(app)
        .post(`/api/url`)
        .send({ url: "https://petli.app", alias: "fb" })
        .expect(400, done);
    });

    it("returns a 201 with a valid payload", (done) => {
      request(app)
        .post(`/api/url`)
        .send({ url: "https://petli.app", alias: "petli-app" })
        .expect(201, done);
    });
  });
});
