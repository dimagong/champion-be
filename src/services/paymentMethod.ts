import config from '../config'
import Stripe from 'stripe'
import { Request, Response, NextFunction } from 'express'

const stripe = new Stripe(config.stripeConfig.secretKeyStripe!)
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
//SECRET_KEY_STRIPE

export const getPublicKeyStripe = async (req: Request, res: Response) => {
    const publicKey = config.stripeConfig.publicKeyStripe

    try {
        return res.status(200).json({ publicKey })
    } catch (error) {
        return res
            .status(500)
            .json({ general: 'Something went wrong, unable to get public key' })
    }
}

export const createPaymentSheet = async (req: Request, res: Response) => {
    // Use an existing Customer ID if this is a returning customer.

    try {
        const amount = req.body.amount
        // const params = {
        // 	description: 'test customer',
        // };
        // const customer = await stripe.customers.create(params)
        const customer = await stripe.customers.create()
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2024-06-20' }
        )
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
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
        return res.status(500).json({
            general: 'Something went wrong, unable to get PaymentSheet',
        })
    }
}

//https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet

//https://www.youtube.com/watch?v=rPR2aJ6XnAc

//https://www.google.com/search?q=react-native+setup+payments+stripe&sca_esv=72aaa3890415b76e&sca_upv=1&biw=1920&bih=953&tbs=qdr%3Ay&tbm=vid&sxsrf=ADLYWIJTqwtocEQiwOIYMvHl7dp2IVI2TQ%3A1726580490715&ei=CofpZqS1K5eI7NYPv4iawAI&ved=0ahUKEwik4szGjcqIAxUXBNsEHT-EBigQ4dUDCA0&uact=5&oq=react-native+setup+payments+stripe&gs_lp=Eg1nd3Mtd2l6LXZpZGVvIiJyZWFjdC1uYXRpdmUgc2V0dXAgcGF5bWVudHMgc3RyaXBlMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIkBtQqghY4BZwAHgAkAEAmAGHAaABnwWqAQMyLjS4AQPIAQD4AQGYAgagArEFwgIEECMYJ5gDAIgGAZIHAzIuNKAH3xo&sclient=gws-wiz-video#fpstate=ive&vld=cid:c80b826c,vid:Tmcxm1xDVMU,st:0

//https://dashboard.stripe.com/test/apikeys

//https://medium.com/simform-engineering/stripe-payment-integration-in-react-native-9dcf46dd5da4
//https://medium.com/@tarun.j_30452/stripe-payment-gateway-integration-in-react-native-7-3b9cc057786b

//https://docs.stripe.com/payments/card-element?platform=react-native
