// const express = require('express');
// const cors = require('cors');
// const app = express();
// const stripe = require('stripe')('sk_test_51OB8JlIPoM7JHRT2Dz4UeKOU5Snexc9lFpmu2Hp6d0PfCZKCwqWE4NanolwHC5fSd5hbLwsnpHAEJphTByN5c93w00pEpp1vJt'); // Replace with your Stripe secret key
// const path = require('path');

// app.use(cors());
// app.use(express.static('public'));
// app.use(express.json());

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     console.log('Creating checkout session');
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'T-shirt',
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${req.headers.origin}/table.html`,
//       cancel_url: `${req.headers.origin}/cancel.html`,
//     });
//     console.log('Checkout session created:', session.id);
//     res.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });



const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51OB8JlIPoM7JHRT2Dz4UeKOU5Snexc9lFpmu2Hp6d0PfCZKCwqWE4NanolwHC5fSd5hbLwsnpHAEJphTByN5c93w00pEpp1vJt'); // Replace with your Stripe secret key
const app = express();
const path = require('path');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Product',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/index.html`,
      cancel_url: `${req.headers.origin}/signup.html`,
    });
    console.log('Checkout session created:', session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Webhook for Checkout Session Completion
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_your_webhook_secret'); // Replace with your webhook secret
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment was successful!', session);
    // Call your JS function or perform any action here
    // For example, update your database or notify your frontend
    craeteFirstPageSignupAPiData();
  }

  res.json({ received: true });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
