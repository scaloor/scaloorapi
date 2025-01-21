import type { HonoContext } from '../types'
import { CheckoutController } from "../controllers/checkout-controller";
import { SelectCheckout } from "../db/schema";
import { checkoutHTML } from './checkout-html'

export async function checkoutView(c: HonoContext) {
    const dbCheckout = await CheckoutController.getCheckout(c) as SelectCheckout
    if (!dbCheckout) return '<h1>Checkout not found</h1>'

    // Get the checkout view HTML
    const html = await checkoutHTML(dbCheckout)

    // Create the payment intent and get stripe key
    const stripe = c.get('stripe')
    const stripeKey = c.env.STRIPE_PUBLIC_KEY
    if (!stripe) return '<h1>Stripe not connected.</h1>'
    const paymentIntent = await stripe.paymentIntents.create({
        amount: dbCheckout.productPrice,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
    })

    // Inject the checkout view HTML into the page
    const script = `
     (function() {
      // Store the parent element reference immediately
      const scriptParent = document.currentScript.parentElement;

      // First, load Stripe
      const loadStripe = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

      async function initializeContent() {
        await loadStripe;

        // Initialize Stripe
        const stripe = Stripe('${stripeKey}');

        // Create a container and append the HTML
        const container = document.createElement('div');
        container.innerHTML = ${JSON.stringify(html)};
        while (container.firstChild) {
          scriptParent.appendChild(container.firstChild);
        }

        // Initialize Stripe Elements
        const elements = stripe.elements({clientSecret: '${paymentIntent.client_secret}'});
        //const cardElement = elements.create('card');
        //cardElement.mount('#payment-element'); // Mount Stripe's Card Element
        
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element'); // Mount Stripe's Payment Element

        // Add submit event listener
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
          event.preventDefault();

          console.log('Form submitted!'); // Placeholder log

          // You can handle payment processing here

          const {error: submitError} = await elements.submit();
          if (submitError) {
            //handleError(submitError);
            return;
          }
          
          const { error } = await stripe.confirmPayment({
            clientSecret: '${paymentIntent.client_secret}',
            elements,
            confirmParams: {
              return_url: 'https://scaloor.com/test/success',
            },
          })


          if (error) {
            console.error('Error creating payment method:', error.message);
          } else {
            console.log('Payment method created successfully:', paymentMethod);
          }
          
        });
      }

      initializeContent();
    })();
    `;

    return script
}