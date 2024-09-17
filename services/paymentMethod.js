import config from "./../config.js"

const stripe = require("stripe")(config.stripeConfig.secretKeyStripe)
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
//SECRET_KEY_STRIPE

// app.post("/payment-sheet", async (req, res) => {

export const getPublicKeyStripe = async (req, res) => {
	const publicKey = config.stripeConfig.publicKeyStripe

	try {
		return res.status(200).json(publicKey)
	} catch (error) {
		return res.status(500).json({ general: "Something went wrong, unable to get public key" })
	}
}

export const createPaymentSheet = async (req, res) => {
	// Use an existing Customer ID if this is a returning customer.

	try {
		const amount = req.body.amount
		const customer = await stripe.customers.create()
		const ephemeralKey = await stripe.ephemeralKeys.create(
			{ customer: customer.id },
			{ apiVersion: "2024-06-20" }
		)
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: "eur",
			customer: customer.id,
			// In the latest version of the API, specifying the `automatic_payment_methods` parameter
			// is optional because Stripe enables its functionality by default.
			automatic_payment_methods: {
				enabled: true,
			},
		})

		return res.json({
			paymentIntent: paymentIntent.client_secret,
			ephemeralKey: ephemeralKey.secret,
			customer: customer.id,
			publishableKey: config.stripeConfig.publicKeyStripe,
		})
	} catch (error) {
		return res.status(500).json({ general: "Something went wrong, unable to get PaymentSheet" })
	}
}
