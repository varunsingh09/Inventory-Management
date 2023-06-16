const express = require('express')
const {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')

const router = express.Router()

//GET all products
router.get('/', getAllProducts)

//GET single product
router.get('/:id', getProduct)

//POST a new product
router.post('/', createProduct)

//DELETE a product
router.delete('/:id', deleteProduct)

//UPDATE a product
router.patch('/:id', updateProduct)


module.exports = router;