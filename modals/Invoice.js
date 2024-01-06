const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    invoiceLink:{
        type: String,
        required: false
    },

    items: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: false
            },
            price: {
                type: Number,
                required: false
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    businessPhone: {
        type: String,
        required: true
    }
});

module.exports = model("Invoice", invoiceSchema);