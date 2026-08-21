import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

function getStripe() {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('Missing Stripe secret key');
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
}

export const stripe = {
  get subscriptions() {
    return getStripe().subscriptions;
  },
  get customers() {
    return getStripe().customers;
  },
};

// Create a subscription for $9/month
export async function createSubscription(customerId: string) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price_data: {
          currency: 'cad',
          unit_amount: 900, // $9.00 in cents
          recurring: {
            interval: 'month',
          },
          product: 'prod_OX8HwQgJ8EBqHR', // Placeholder product ID
        },
      },
    ],
    payment_behavior: 'default_incomplete',
  });
}

// Create a customer
export async function createCustomer(email: string, name: string) {
  return stripe.customers.create({
    email,
    name,
  });
}
