const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all products
const getAllProducts = async (req, res) => {
    const products = await Product.find({}).sort({ SKU: 1 })
    res.status(200).json(products)
}

// get single products
const getProduct = async (req, res) => {
    const { id } = req.params

    //checks of id is in valid format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({ error: 'Cannot find product' })
    }

    res.status(200).json(product)
}

// create new products
const createProduct = async (req, res) => {
    const { name, SKU, category, condition, quantity } = req.body
    try {
        const product = await Product.create({ name, SKU, category, condition, quantity })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    //checks of id is in valid format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        return res.status(404).json({ error: 'Cannot find product' })
    }

    res.status(200).json(product)
}

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    //checks of id is in valid format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const product = await Product.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!product) {
        return res.status(404).json({ error: 'Cannot find product' })
    }

    const updatedProduct = await Product.findById(id)

    res.status(200).json(updatedProduct)
}


module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}