const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Profile = require("./modals/Profile");

router.post("/", async (_req, _res) => {
    try {
        let payload;
        const schema = Joi.object({
            businessName: Joi.string().min(3).max(30).required(),
            businessEmail: Joi.string().email().required(),
            businessPhone: Joi.string().min(10).max(10).required(),
            businessLogo: Joi.string().optional(),
            signature: Joi.string().required(),
            address: Joi.object({
                line1: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                country: Joi.string().required(),
                pincode: Joi.string().required()
            }).optional()
        });
        const schemaObj = schema.validate(_req.body);
        if (schemaObj.error) {
            _res.status(400).json({
                message: schemaObj.error.details[0].message
            });
        } else {
            payload = schemaObj.value;
        }
        // checking for duplicate
        const profile = await Profile.findOne({
            businessPhone: payload.businessPhone
        });
        if (profile) {
            return _res.status(400).json({
                message: "Profile already exists!"
            });
        }
        const newProfile = await Profile.create(payload);
        return _res.status(200).json({
            message: "Profile created successfully!",
            data: newProfile
        });
    } catch (error) {
        console.error("console error: ", error);
        return _res.status(500).send({
            message: error.message || "Internal Server Error!",
            code: 500
        });
    }
});

router.get("/", async (_req, _res) => {
    const phone = _req.query?.businessPhone;
    try {
        const profile = await Profile.findOne({
            businessPhone: phone
        });
        if (!profile) {
            return _res.status(400).json({
                message: "Profile does not exists!"
            });
        }
        return _res.status(200).json({
            message: "Profile fetched successfully!",
            data: profile
        });
    } catch (error) {
        console.error("console error: ", error);
        return _res.status(500).send({
            message: error.message || "Internal Server Error!",
            code: 500
        });
    }
});
module.exports = router;
