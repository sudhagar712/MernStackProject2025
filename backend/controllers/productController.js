const Products = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandling")
const APIFeatures = require("../utils/apiFeatures")


// get all products
exports.getProducts = async(req,res, next)=> {
  let resPerPage = 2;
 const apiFeatures = new APIFeatures(Products.find(), req.query)
   .search()
   .filter()
   .paginate(resPerPage);

const products= await apiFeatures.query
res.status(200).json({
    success: true,
    count:products.length,
    products
})
}

// get single products by ID 

exports.getProductsID = async(req,res,next)=>{
    const products = await Products.findById(req.params.id)
    if(!products){
       return  next(new ErrorHandler("Product Not Found error", 404));
      
    }
    res.status(201).json({
         success:true, 
         products
        })
}


// update products

exports.updateproduct = async(req,res)=>{
    let products = await Products.findById(req.params.id)
    if(!products){
        return res.status(404).json({message:"Product Not Found"})
    }
    products = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        message:"Product Update Successfully",
        products
    })
}


// deleteproduct

exports.deleteproduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    await product.deleteOne(); 
    res.status(200).json({
      success: true,
      message: "Product is deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};






// create Products

exports.newProducts = async(req,res) => {
    try {
         const product = await Products.create(req.body)
    res.status(201).json({
        success:true,
        message:"Product created Successfully",
        product
    })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server Error",
            error
        })
    }
   
}