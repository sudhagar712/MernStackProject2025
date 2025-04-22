const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("MongoDB is not connected:", error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
