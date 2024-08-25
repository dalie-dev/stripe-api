const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Stripe');
});

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Création d'un PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        // Retourne le client secret au client Flutter
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});

// Définir le port pour le serveur local
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
