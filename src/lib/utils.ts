// Format the price to a string
export function formatPriceToString(price: number) {
    // Convert cents to dollars and format with 2 decimal places
    const dollars = (price / 100).toFixed(2);
    // Add dollar sign and commas for thousands
    return `${dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  