const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, customerName, customerEmail, address } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            payment_method_types: ["card"],
            description: "E-commerce Product Purchase",
            shipping: {
                name: customerName,
                address: {
                    line1: address.line1,
                    city: address.city,
                    postal_code: address.postal_code,
                    country: "IN",
                },
            },
            metadata: {
                customer_email: customerEmail,
                transaction_purpose: "P0108"
            }
        });

        // Send paymentIntent details to the frontend
        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
