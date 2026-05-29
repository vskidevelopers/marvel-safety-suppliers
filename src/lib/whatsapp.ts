/**
 * WhatsApp Integration Utility
 * Generates WhatsApp click-to-chat URLs with personalized messages
 */

const WHATSAPP_PHONE = "+254702399350";
const WHATSAPP_API_URL = "https://wa.me";

/**
 * Encodes text for URL parameters
 */
function encodeMessage(text: string): string {
  return encodeURIComponent(text);
}

/**
 * Generates WhatsApp URL for general enquiries
 */
export function getWhatsAppEnquiryUrl(message: string): string {
  return `${WHATSAPP_API_URL}/${WHATSAPP_PHONE.replace("+", "")}?text=${encodeMessage(message)}`;
}

/**
 * Generates WhatsApp URL for product enquiry
 */
export function getWhatsAppProductUrl(productName: string, productId: string): string {
  const message = `Hi, I'm interested in ${productName}. Could you provide more details? (Product ID: ${productId})`;
  return getWhatsAppEnquiryUrl(message);
}

/**
 * Generates WhatsApp URL for cart enquiry
 */
export function getWhatsAppCartUrl(
  cartItems: Array<{ name: string; quantity: number }>,
  totalPrice: number
): string {
  const itemLines = cartItems.map(
    (item) => `• ${item.quantity} x ${item.name}`
  ).join("\n");

  const message = `Hello Marvel Safety Suppliers,\n\n─────── Cart Enquiry ───────\n\n${itemLines}\n\n────────────────────────\nEstimated Total: KES ${totalPrice.toLocaleString()}\n────────────────────────\n\nI would like to check availability, delivery options, and payment terms before I proceed to checkout.\n\nThank you.`;
  return getWhatsAppEnquiryUrl(message);
}

/**
 * Generates WhatsApp URL for order tracking
 */
export function getWhatsAppOrderUrl(orderId: string): string {
  const message = `Hi, I'd like to track my order. Order ID: ${orderId}`;
  return getWhatsAppEnquiryUrl(message);
}

/**
 * Generates WhatsApp URL for checkout enquiry
 */
export function getWhatsAppCheckoutUrl(): string {
  const message = `Hi, I'm interested in discussing my order before checkout. Could you assist me?`;
  return getWhatsAppEnquiryUrl(message);
}

/**
 * Generates WhatsApp URL for general contact
 */
export function getWhatsAppContactUrl(): string {
  const message = `Hi Marvel Safety Suppliers, I have an enquiry and would like to get in touch.`;
  return getWhatsAppEnquiryUrl(message);
}

/**
 * Generates WhatsApp URL for bulk order
 */
export function getWhatsAppBulkOrderUrl(productNames: string[]): string {
  const products = productNames.join(", ");
  const message = `Hi, I'm interested in placing a bulk order for the following products: ${products}. Could you provide bulk pricing?`;
  return getWhatsAppEnquiryUrl(message);
}

export const WHATSAPP_PHONE_NUMBER = WHATSAPP_PHONE;
