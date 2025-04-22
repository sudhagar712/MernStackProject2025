const Products = require("../models/productModel");
const product = require("../data/product.json")
const dotenv = require("dotenv")
const connectDB = require("./config/db");



dotenv.config({path: 'backend/config/config.env'})

connectDB()

const seedProducts = async() => {
  try {
    await Products.deleteMany();
    console.log("Products deleted");

    await Products.insertMany(product);
    console.log("Products Added");

    process.exit(); // ✅ Exit process after seeding
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit with failure
  }
};


seedProducts()