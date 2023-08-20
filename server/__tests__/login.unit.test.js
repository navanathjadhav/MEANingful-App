const request = require("supertest"); // Supertest library for making requests
const app = require("../src/index"); // Import your Express app

describe("Test the /api route", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/api");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test authentication", () => {
  test("It should respond with a 200 status code after successful authentication", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@domain.com", password: "password" }); // Add your real email & password here
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with a 401 status code after unsuccessful authentication", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid", password: "invalid" });
    expect(response.statusCode).toBe(401);
  });
});
