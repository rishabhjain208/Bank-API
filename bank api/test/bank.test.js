const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Bank = require("../models/Bank");

const app = express();
app.use(express.json());
const bankRoutes = require("../routes/banks");
app.use("/api/banks", bankRoutes);

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/bankDB_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("GET /api/banks", () => {
  it("should get all banks", async () => {
    const bank = new Bank({ name: "Test Bank", branches: [] });
    await bank.save();
    const res = await request(app).get("/api/banks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
});

describe("GET /api/banks/:bankName/branches/:branchName", () => {
  it("should get a specific branch of a bank", async () => {
    const bank = new Bank({
      name: "Test Bank",
      branches: [
        { branchName: "Main", address: "123 Street", ifsc: "TEST123" },
      ],
    });
    await bank.save();
    const res = await request(app).get("/api/banks/Test Bank/branches/Main");
    expect(res.statusCode).toEqual(200);
    expect(res.body.branchName).toEqual("Main");
  });
});
