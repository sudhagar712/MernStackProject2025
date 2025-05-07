const express = require('express')
const { getProducts, newProducts, getProductsID, updateproduct, deleteproduct } = require('../controllers/productController');
const { isAuthenicate, authorizeRole } = require('../Middleware/authenicate');
const router = express.Router()

// routes for Products
router.post("/product/new", isAuthenicate ,authorizeRole("admin"), newProducts);
router.get("/products", isAuthenicate , getProducts);
router.get("/product/:id", getProductsID);
router.put("/product/:id", updateproduct);
router.delete("/product/:id", deleteproduct);







module.exports = router

