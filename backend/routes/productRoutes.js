const express = require('express')
const { getProducts, newProducts, getProductsID, updateproduct, deleteproduct } = require('../controllers/productController')
const router = express.Router()

// routes for Products
router.post("/product/new", newProducts);
router.get("/products",getProducts)
router.get("/product/:id", getProductsID);
router.put("/product/:id", updateproduct);
router.delete("/product/:id", deleteproduct);







module.exports = router

