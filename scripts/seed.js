require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../src/models/User");
const Record = require("../src/models/Record");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fintech";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany();
    await Record.deleteMany();

    // Create users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@fintech.com",
      password: "password123",
      role: "admin",
    });

    const analyst = await User.create({
      name: "Analyst User",
      email: "analyst@fintech.com",
      password: "password123",
      role: "analyst",
    });

    const viewer = await User.create({
      name: "Viewer User",
      email: "viewer@fintech.com",
      password: "password123",
      role: "viewer",
    });

    // Create dummy records created by admin
    const records = [
      {
        amount: 5000,
        type: "income",
        category: "Salary",
        notes: "Monthly Salary",
        date: new Date("2023-10-01"),
        createdBy: admin._id,
      },
      {
        amount: 1200,
        type: "expense",
        category: "Rent",
        notes: "Apartment Rent",
        date: new Date("2023-10-02"),
        createdBy: admin._id,
      },
      {
        amount: 300,
        type: "expense",
        category: "Groceries",
        notes: "",
        date: new Date("2023-10-05"),
        createdBy: admin._id,
      },
      {
        amount: 400,
        type: "income",
        category: "Freelance",
        notes: "Web project",
        date: new Date("2023-10-10"),
        createdBy: admin._id,
      },
    ];

    await Record.insertMany(records);

    console.log("Database seeded successfully!");
    console.log("----------------------------");
    console.log("Sample Users created with password: password123");
    console.log("- admin@fintech.com");
    console.log("- analyst@fintech.com");
    console.log("- viewer@fintech.com");
    console.log("----------------------------");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
