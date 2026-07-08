import request from "supertest";
import app from "../app.js";

describe("Health API", () => {
  it("should return backend running message", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Backend is running");
  });
});