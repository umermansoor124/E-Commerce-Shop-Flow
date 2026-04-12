import Product from '../models/Product.js'


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}


export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock } = req.body

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        })

        res.status(201).json({ message: "Product Created Successfully", product })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'Product Updated Successfully', product })

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'Product Deleted Successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

