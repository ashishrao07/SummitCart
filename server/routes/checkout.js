

    const express = require('express');
    const router = express.Router();
    const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    const { Orders } = require('../models/orders');

    router.post('/', async (req, res) => {
      const { products, userId } = req.body;
      const lineItems = products.map((product) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.productTitle?.substr(0, 30) + '...',
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));

      const customer = await stripe.customers.create({
        metadata: {
          userId,
          cart: JSON.stringify(lineItems),
        },
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id,
        line_items: lineItems,
        mode: 'payment',
        shipping_address_collection: { allowed_countries: ['IN', 'US'] },
        success_url: 'http://localhost:3000/payment/complete/{CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
      });

      res.json({ id: session.id });
    });

    router.get('/payment/complete', async (req, res) => {
      const [sessionInfo, lineItems] = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id),
      ]);

      res.status(200).send(JSON.stringify([sessionInfo, lineItems]));
    });

    router.get('/cancel', async (req, res) => {
      res.redirect('/');
    });

    const endpointSecret = "";

    router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
          console.log('Webhook Error:', err.message);
          return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        
        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
          const session = event.data.object;
          
          // Retrieve customer details
          const customer = await stripe.customers.retrieve(session.customer);
          
          // Create a new order in your database
          const newOrder = new Orders({
            userId: customer.metadata.userId,
            customerId: session.customer,
            paymentIntentId: session.payment_intent,
            products: JSON.parse(customer.metadata.cart),
            subtotal: session.amount_subtotal / 100,
            total: session.amount_total / 100,
            shipping: session.shipping,
            payment_status: session.payment_status,
          });
          
          try {
            await newOrder.save();
            console.log("Order saved successfully");
          } catch (err) {
            console.error("Error saving order:", err.message);
          }
        }
        
        res.json({ received: true });
      });

    module.exports = router;
// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
// const { Orders } = require('../models/orders');

// // Create Checkout Session
// router.post('/', async (req, res) => {
//   const { products, userId } = req.body;
//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: 'inr',
//       product_data: {
//         name: product.productTitle?.substr(0, 30) + '...',
//       },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.quantity,
//   }));

//   const customer = await stripe.customers.create({
//     metadata: {
//       userId,
//       cart: JSON.stringify(lineItems),
//     },
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     customer: customer.id,
//     line_items: lineItems,
//     mode: 'payment',
//     shipping_address_collection: { allowed_countries: ['IN', 'US'] },
//     success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}', // ✅ fixed here
//     cancel_url: 'http://localhost:3000/cancel',
//   });

//   res.json({ id: session.id });
// });

// // Success endpoint
// router.get('/payment/complete', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {
//       expand: ['payment_intent.payment_method'],
//     });
//     const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);

//     res.status(200).json({ session, lineItems }); // ✅ better structured JSON
//   } catch (err) {
//     console.error('Payment fetch error:', err.message);
//     res.status(500).json({ error: 'Failed to fetch payment session' });
//   }
// });

// // Cancel endpoint
// router.get('/cancel', async (req, res) => {
//   res.redirect('/');
// });

// // Function to create an order
// const createOrder = async (customer, data) => {
//   const items = JSON.parse(customer.metadata.cart);

//   const newOrder = new Orders({
//     userId: customer.metadata.userId,
//     customerId: data.customer,
//     paymentIntentId: data.payment_intent,
//     products: items,
//     subtotal: parseInt(data.amount_subtotal / 100),
//     total: parseInt(data.amount_total / 100),
//     shipping: data.customer_details,
//     payment_status: data.payment_status,
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     console.log('Order saved:', savedOrder._id);
//   } catch (err) {
//     console.error('Order save error:', err.message);
//   }
// };

// // Stripe webhook
// const endpointSecret = ''; // ✅ fill this with your Stripe Webhook Secret

// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     console.log('Webhook verified:', event.type);
//   } catch (err) {
//     console.log('Webhook Error:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const customer = await stripe.customers.retrieve(session.customer);
//     await createOrder(customer, session); // ✅ added
//   }

//   res.json({ received: true });
// });

// module.exports = router;
