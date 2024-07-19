const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51OB8JlIPoM7JHRT2Dz4UeKOU5Snexc9lFpmu2Hp6d0PfCZKCwqWE4NanolwHC5fSd5hbLwsnpHAEJphTByN5c93w00pEpp1vJt'); // Replace with your Stripe secret key
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const crypto = require('crypto');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session');
    console.log('api called');
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
  // await createFirstPageSignupAPiData();
});

// Webhook for Checkout Session Completion
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_your_webhook_secret'); // Replace with your webhook secret
    console.log('Webhook event constructed:', event);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment was successful! Session:', session);

    try {
      await createFirstPageSignupAPiData();
      console.log('API call after payment success was successful');
    } catch (error) {
      console.error('Error in API call after payment success:', error);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// API link 
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/customer';
const cid = uuidv4(); // Use uuidv4 to generate a UUID

const firstSignupPageapiUrlBase = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/company`;

async function createFirstPageSignupAPiData() {
  const firstSignupPageapiUrl = `${firstSignupPageapiUrlBase}/create`;
  const cname = localStorage.getItem('companyName');
  const clogo = localStorage.getItem('companyLogo');
  const caddress = localStorage.getItem('companyAddress');
  const username = localStorage.getItem('username');

  const passwordEncrypted = await checkPassword();

  const userData = {
    CID: cid,
    CName: cname,
    CLogo: clogo,
    CAddress: caddress,
    UserName: username,
    Password: passwordEncrypted,
  };
  console.log(userData);

  console.log('Sending user data to first signup page API:', userData);

  try {
    const response = await fetch(firstSignupPageapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${data.error}`);
    } else {
      console.log('Response from first signup page API:', data);

      if (!data.error) {
        await createApiData();
      } else {
        console.error('API Error:', data.error);
      }
    }
  } catch (error) {
    console.error('Error in createFirstPageSignupAPiData:', error);
  }
}

async function encrypt(data, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');

  const encryptedDataWithIV = `${iv.toString('hex')}:${encrypted}:${tag}`;
  return encryptedDataWithIV;
}

const key = crypto.randomBytes(32);
localStorage.setItem('key', key.toString('hex'));

async function checkPassword() {
  const password = localStorage.getItem('password');
  try {
    const encryptedPassword = await encrypt(password, key);
    return encryptedPassword;
  } catch (error) {
    console.error('Error in checkPassword:', error);
  }
}

async function createApiData() {
  const customerId = uuidv4();
  const apiUrl = `${apiUrlBase}/create`;
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const address = localStorage.getItem("address");
  const phone = localStorage.getItem("phoneNumber");
  const email = localStorage.getItem("email");

  const userData = {
    CustomerID: customerId.toString(),
    CID: cid,
    FName: firstName,
    LName: lastName,
    Address: address,
    PhoneNumber: phone,
    Email: email,
    IsActive: true
  };

  console.log('Sending user data to customer API:', userData);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${data.error}`);
    }

    console.log('Response from customer API:', data);
  } catch (error) {
    console.error('Error in createApiData:', error);
  }
}