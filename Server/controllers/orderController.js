import Order from '../models/Order.js'
import Product from '../models/Product.js'

export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress } = req.body

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No items in order' })
        }
        
        const formattedOrderItems = orderItems.map(item => ({
            product: item._id || item.product, 
            name: item.name,
            quantity: item.qty || item.quantity, 
            price: item.price
        }))

        let totalPrice = 0
        for (let item of formattedOrderItems) {
            totalPrice += item.price * item.quantity
        }
        const finalAddress = shippingAddress || { 
            street: "Pending Street",
            address: "Pending", 
            city: "Pending", 
            postalCode: "00000", 
            country: "PK" 
        }

        const order = await Order.create({
            user: req.user.id,
            orderItems: formattedOrderItems, 
            shippingAddress: finalAddress,
            totalPrice,
            isPaid: false 
        })

        res.status(201).json({ message: 'Order Created Successfully', order })

    } catch (error) {
        console.log("CREATE ORDER ERROR:", error)
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

export const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params

        const order = await Order.findById(id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name image')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

export const getAllOrders = async (req , res) => {
    try {
        const order = await Order.find()
        .populate('user' , 'name email')

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

export const updateOrderStatus = async (req , res) => {
    try {
        const {id} = req.params
        const {status} = req.body

        const order = await Order.findByIdAndUpdate(
            id,
            {status},
            {new : true}
        )

        if(!order) {
             return res.status(404).json({ message: 'Order not found' })
        }

        res.status(200).json({ message: 'Order Status Updated', order })

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}


export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'You can only delete your own orders' });
        }
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};