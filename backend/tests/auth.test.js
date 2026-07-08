import request from "supertest";
import app from "../app.js";

describe("Auth APIs", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "123456",
            });

        console.log(res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe("test@example.com");
    });

    it("should not register user with duplicate email", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "123456",
            });

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Another User",
                email: "test@example.com",
                password: "123456",
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it("should login registered user", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "123456",
            });

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "123456",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe("test@example.com");
    });

    it("should reject login with wrong password", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "123456",
            });

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "12345678", // wrong password
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });

    it("should reject protected route without login", async () => {
        const res = await request(app).get("/api/auth/me");

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });
});