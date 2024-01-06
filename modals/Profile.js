const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    businessName: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    businessPhone: {
        type: String,
        required: true
    },
    businessLogo: {
        type: String,
        required: false
    },
    signature: {
        type: String,
        required: true
    },
    address: {
        line1: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        pincode: {
            type: String,
            required: false
        }
    }
});

module.exports = model("Profile", profileSchema);
