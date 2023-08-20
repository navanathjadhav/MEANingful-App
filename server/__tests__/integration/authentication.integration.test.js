const request = require("supertest"); // Supertest library for making requests
const app = require("../../src/index"); // Import your Express app

describe("Integration Tests for Authentication", () => {
  let authToken; // Store the received token for later use

  test("POST /api/auth/login should return 200 status code and a token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "email@domain.com", password: "password" }); // Add your real email & password here

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();

    authToken = response.body.token; // Store the received token
  });

  test("GET /api/auth/self should return 200 status code with valid user details", async () => {
    const response = await request(app)
      .get("/api/auth/self")
      .set("Authorization", `Bearer ${authToken}`); // Use the stored token

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe("email@domain.com");
  });

  test("GET /api/auth/self should return 401 status code with invalid token", async () => {
    const response = await request(app)
      .get("/api/auth/self")
      .set("Authorization", "Bearer invalid-token");

    expect(response.statusCode).toBe(401);
  });
});
