const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name Field"],
    trim: true,
    maxLength: [100, "Product name does'not exceed 100 character"]
  },
  price: {
    type: Number,
    required: [true, "Please Enter Price Field"],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, "Please Enter Description Field"]
  },
  rating: {
    type: String,
    default: 0
  },
  images: [
    {
      image: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please Enter a Product Category"],
    enum: {
      values: [
        "Electronics",
        "MobilePhone",
        "Laptops",
        "Accessories",
        "Headphone",
        "Books",
        "Food",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "outdoor"
      ],
      message: "Please select Correct Category"
    }
  },

  seller: {
    type: String,
    required: [true, "Please Enter a product seller"]
  },

  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [20, "Product stock cannot exceed 20"]
  },

  numofReviews: {
    type: String,
    default: 0
  },

  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: String, required: true },
      comments: { type: String, required: true }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Products", productSchema);