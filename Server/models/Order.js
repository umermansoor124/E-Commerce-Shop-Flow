import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    orderItems : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true
            },
            name : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],

    shippingAddress : {
        street : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        }
    },

    totalPrice : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        enum : ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default : 'pending'
    },

    isPaid : {
        type : Boolean,
        required : true
    }

}, {timestamps : true})

const Order = mongoose.model("Order" , orderschema)

export default Order