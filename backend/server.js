const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const products = require("./routes/productRoutes")
const errorMiddleWare = require("./Middleware/errorMiddleWare")
const path = require("path")
const app = express()

dotenv.config({path: path.join(__dirname,"config/config.env")})
app.use(express.json())
app.use(cors())

// sample code 
app.get('/',(req,res)=>{
    res.json({message:"hello backend lol"})
})

// Api calls 
app.use("/api/v1", products);

// middlewares
app.use(errorMiddleWare);


const PORT = process.env.PORT || 8000


// server start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();


