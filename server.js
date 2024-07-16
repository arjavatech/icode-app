const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here'); // Replace with your own secret key from Stripe

const app = express();
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const { firstName, lastName, address, phoneNumber, email } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Signup Fee',
                            description: `Signup for ${firstName} ${lastName}`,
                        },
                        unit_amount: 5000, // Amount in cents (e.g., $50.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'index.html',
            cancel_url: 'signup.html',
            metadata: {
                firstName,
                lastName,
                address,
                phoneNumber,
                email,
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
