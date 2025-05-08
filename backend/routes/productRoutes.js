const express = require('express')
const { getProducts, newProducts, getProductsID, updateproduct, deleteproduct } = require('../controllers/productController');
const { isAuthenicate, authorizeRole } = require('../Middleware/authenicate');
const router = express.Router()

// routes for Products

router.get("/products", isAuthenicate , getProducts);
router.get("/product/:id", getProductsID);
router.put("/product/:id", updateproduct);
router.delete("/product/:id", deleteproduct);

//admin can be acces to post products

router.post("/admin/product/new", isAuthenicate, authorizeRole("admin"), newProducts);




module.exports = router

