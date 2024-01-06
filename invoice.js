const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Invoice = require("./modals/Invoice");

router.post("/", async (_req, _res) => {
    try {
        let payload = {};
        const schema = Joi.object({
            customerName: Joi.string().optional(),
            customerPhone: Joi.string().optional(),
            customerEmail: Joi.string().optional(),
            tax: Joi.number().optional().default(0),
            totalAmount: Joi.number().required(),
            businessPhone: Joi.string().required(),
            invoiceLink: Joi.string().optional().default(""),
            items: Joi.array()
                .items(
                    Joi.object({
                        name: Joi.string().required(),
                        quantity: Joi.number().optional(),
                        price: Joi.number().optional(),
                        amount: Joi.number().required()
                    })
                )
                .required()
        });

        const schemaObj = schema.validate(_req.body);
        if (schemaObj.error) {
            _res.status(400).json({
                message: schemaObj.error.details[0].message
            });
        } else {
            payload = schemaObj.value;
        }
        const invoiceNumber = await Invoice.countDocuments();
        payload.invoiceNumber = invoiceNumber + 1;
        payload.invoiceDate = new Date();
        const newInvoice = await Invoice.create(payload);
        return _res.status(200).json({
            message: "Invoice created successfully!",
            data: newInvoice
        });
    } catch (error) {
        console.error("error", error);
        return _res.status(500).send({
            message: error.message || "Internal Server Error!",
            code: 500
        });
    }
});

router.get("/", async (_req, _res) => {
    const phone = _req.query?.businessPhone;
    try {
        const invoice = await Invoice.find({
            businessPhone: phone
        }).sort({
            invoiceDate: -1
        });
        const totalCount = await Invoice.find({
            businessPhone: phone
        }).countDocuments();
        if (!invoice) {
            return _res.status(400).json({
                message: "Invoice not found!"
            });
        }
        return _res.status(200).json({
            message: "Invoice fetched successfully!",
            data: invoice,
            totalCount: totalCount
        });
    } catch (error) {
        console.error("error", error);
        return _res.status(500).send({
            message: error.message || "Internal Server Error!",
            code: 500
        });
    }
});

module.exports = router;
