import { SelectCheckout } from "../db/schema";
import { formatPriceToString } from "../lib/utils";


export async function checkoutHTML(dbCheckout: SelectCheckout) {
    const html = `
    <!-- <script src="https://js.stripe.com/v3/"></script> -->
    <section>
        <form id="payment-form" class="checkout-form">
            <!-- Product Information -->
            <div>
                <h2 id="product-name">${dbCheckout.productName}</h2>
                <p id="product-price">$${formatPriceToString(dbCheckout.productPrice)}</p>
                ${dbCheckout.thumbnail ? `<img src="https://eewvmilsxsdrbeekjzwn.supabase.co/storage/v1/object/public/scaloor-bucket/${dbCheckout.thumbnail}"
                    alt="Product Name" width="200" height="200" class="product-image">` : ''}
            </div>

            <!-- Product Description -->
            <div class="description">
                <p id="product-description">${dbCheckout.productDescription}</p>
            </div>

            <!-- Customer Information -->
            <div class="input-group">
                ${dbCheckout.customerName ? `<input type="text" placeholder="Name" class="input">` : ''}
                ${dbCheckout.customerEmail ? `<input type="email" placeholder="Email" class="input">` : ''}
                ${dbCheckout.customerPhone ? `<input type="tel" placeholder="Phone" class="input">` : ''}
                ${dbCheckout.customerAddress ? `<input type="text" placeholder="Address" class="input">` : ''}
            </div>

            <!-- Placeholder for payment element -->
            <div id="payment-element">
                <!-- Stripe Payment Element would be inserted here -->
            </div>

            <!-- Submit Button -->
            <button type="submit" class="button">Submit</button>
        </form>
    </section>
    <style>
        /* Load font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        /* Define CSS variables inline */
        :root {
            --font-sans: 'Inter', system-ui, sans-serif;
            --background: 250 100% 99%;
            --foreground: 250 50% 10%;
            --primary: 250 95% 65%;
            --primary-foreground: 250 100% 100%;
            --muted-foreground: 250 20% 40%;
            --input: 250 30% 90%;
            --ring: 250 95% 65%;
            --border: 250 30% 90%;
            --radius: 0.5rem;
        }

        /* Apply font only to checkout form */
        .checkout-form {
            font-family: var(--font-sans);
        }

        .checkout-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            max-width: 28rem;
            margin: 0 auto;
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .input {
            display: flex;
            height: 2rem;
            width: 100%;
            border-radius: var(--radius);
            border: 1px solid hsl(var(--border));
            background-color: hsl(var(--background));
            padding: 0.5rem 0.75rem;
            font-size: 1rem;
            line-height: 1;
            color: hsl(var(--foreground));
            transition: all 0.2s ease;
        }

        

        .input::placeholder {
            color: hsl(var(--muted-foreground));
        }

        .input:focus-visible {
            outline: none;
            ring-offset: 2px;
            box-shadow: 0 0 0 2px hsl(var(--ring)),
                       0 0 0 4px hsl(var(--background));
        }

        .input:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        @media (min-width: 768px) {
            .input {
                font-size: 0.875rem;
            }
        }

        .product-image {
            width: 80%;
            height: auto;
            object-fit: cover;
        }

        /* Base button styles */
        .button {
            display: inline-flex;
            text-color: hsl(var(--primary-foreground));
            cursor: pointer;
            pointer-events: auto;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border-radius: var(--radius);
            border: none;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            height: 2.5rem;
            padding: 0.5rem 1rem;
            transition-property: color, background-color;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }

        .button:hover {
            background-color: hsl(var(--primary) / 0.9);
        }

        /* Focus styles */
        .button:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px hsl(var(--background)),
                0 0 0 4px hsl(var(--ring));
        }

        /* Disabled state */
        .button:disabled {
            pointer-events: none;
            opacity: 0.5;
        }
        

        .description {
            width: fit-content;
            word-wrap: break-word;
        }
    </style>
    `
    return html
}