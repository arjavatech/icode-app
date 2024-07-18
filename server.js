const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51OB8JlIPoM7JHRT2Dz4UeKOU5Snexc9lFpmu2Hp6d0PfCZKCwqWE4NanolwHC5fSd5hbLwsnpHAEJphTByN5c93w00pEpp1vJt'); // Replace with your Stripe secret key
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const crypto = require('crypto'); // Add crypto module
const fetch = require('node-fetch'); // Add fetch module

const app = express();

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
    await createFirstPageSignupAPiData();
  }

  res.json({ received: true });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// API link 
// Signup second page link
const apiUrlBase = 'https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/customer';
// UUID => cid
const cid = uuidv4(); // Use uuidv4 to generate a UUID

// Signup first page link
const firstSignupPageapiUrlBase = `https://397vncv6uh.execute-api.us-west-2.amazonaws.com/test/company`;

async function createFirstPageSignupAPiData() {
  const firstSignupPageapiUrl = `${firstSignupPageapiUrlBase}/create`;
  const cname = localStorage.getItem('companyName');
  const clogo = localStorage.getItem('companyLogo');
  const caddress = localStorage.getItem('companyAddress');
  const username = localStorage.getItem('username');

  // Call the asynchronous checkPassword function to get the encrypted password
  const passwordEncrypted = await checkPassword();

  const userData = {
    CID: cid,
    CName: cname,
    CLogo: clogo,
    CAddress: caddress,
    UserName: username,
    Password: passwordEncrypted,
  };

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
        // Call Customer api
        await createApiData();
      } else {
        console.error('API Error:', data.error);
        setTimeout(() => {
          window.location.href = "signup.html";
        }, 100);
      }
    }
  } catch (error) {
    console.error('Error in createFirstPageSignupAPiData:', error);
  }
}

// Create encrypt data
async function encrypt(data, key) {
  const iv = crypto.randomBytes(12); // Generate random IV
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');

  // Combine IV, encrypted data, and tag
  const encryptedDataWithIV = `${iv.toString('hex')}:${encrypted}:${tag}`;
  return encryptedDataWithIV;
}

// Generate a random key for encryption/decryption (should be stored securely)
const key = crypto.randomBytes(32); // 32 bytes for AES-256
localStorage.setItem('key', key.toString('hex'));

// Create encrypt data in password
async function checkPassword() {
  const password = localStorage.getItem('password');
  try {
    // Encrypt the password
    const encryptedPassword = await encrypt(password, key);
    return encryptedPassword;
  } catch (error) {
    console.error('Error in checkPassword:', error);
  }
}

// CUSTOMER
// Push the Data in database
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
    setTimeout(() => {
      window.location.href = "index.html";
    }, 100);
  } catch (error) {
    console.error('Error in createApiData:', error);
  }
}
