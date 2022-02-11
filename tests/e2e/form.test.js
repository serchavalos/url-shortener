const { app } = require("../../dist/app.js");

const port = process.env.PORT || 3000;
const server = app.listen(port);

function sleepFor(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

describe("URL Shortener / Form", () => {
  beforeAll(async () => {});

  beforeEach(async () => {
    await page.goto(`http://localhost:${port}`);
  });

  afterAll(async () => await server.close());

  it("renders the form correctly", async () => {
    const formLegendText = await page.evaluate(() =>
      document.querySelector("form legend").textContent.trim()
    );
    expect(formLegendText).toBe(
      "Provide an alias for a URL you wouldl like to be redirected"
    );
  });

  it("submit the form with the right values", async () => {
    await page.evaluate(
      () =>
        (document.querySelector('form input[name="url"]').value =
          "https://petli.app")
    );
    await page.evaluate(
      () => (document.querySelector('form input[name="alias"]').value = "petli")
    );
    await page.click('form input[type="submit"]');
    await sleepFor(1);

    const resultContainerText = await page.evaluate(
      () => document.getElementById("result-container").textContent
    );

    expect(/New alias has been registered!/.test(resultContainerText)).toBe(
      true
    );
  });
});
