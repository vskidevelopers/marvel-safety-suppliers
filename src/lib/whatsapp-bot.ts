// Server-only WhatsApp Cloud API bot logic — sends the category menu and
// replies with a catalog link once someone picks one. No "use client" here;
// this only ever runs in the webhook route handler.
import { CATEGORIES } from "@/lib/categories";

const SITE_URL = "https://marvelsafetysuppliers.co.ke";
const GRAPH_API_VERSION = "v21.0";

function graphUrl(path: string) {
  return `https://graph.facebook.com/${GRAPH_API_VERSION}/${path}`;
}

async function callGraphApi(body: Record<string, unknown>) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  const res = await fetch(graphUrl(`${phoneNumberId}/messages`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messaging_product: "whatsapp", ...body }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("WhatsApp API error:", res.status, errText);
  }
}

export async function sendTextMessage(to: string, text: string) {
  await callGraphApi({
    to,
    type: "text",
    text: { body: text },
  });
}

// The tappable list a user sees on first contact (or any unrecognized message).
export async function sendCategoryMenu(to: string) {
  const rows = [
    ...CATEGORIES.map((cat) => ({ id: `cat_${cat.id}`, title: cat.name })),
    { id: "cat_corporate", title: "Corporate / Bulk Orders" },
  ];

  await callGraphApi({
    to,
    type: "interactive",
    interactive: {
      type: "list",
      header: { type: "text", text: "Marvel Safety Suppliers" },
      body: {
        text: "Hi! 👋 Thanks for reaching out. What are you looking for today? Tap a category below.",
      },
      footer: { text: "Quality. Protection. Professionalism." },
      action: {
        button: "View Categories",
        sections: [{ title: "Product Categories", rows }],
      },
    },
  });
}

// Sent after someone taps a category from the menu — a direct link into the
// live catalog, already filtered to what they asked for.
export async function sendCategoryLink(to: string, categoryId: string) {
  if (categoryId === "corporate") {
    await sendTextMessage(
      to,
      `Great — for corporate or bulk orders (PPE for 10, 100, 500+ employees, custom branding, uniforms), request a quote here and our team will get back to you within 24 hours:\n${SITE_URL}/corporate`
    );
    return;
  }

  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  if (!category) {
    await sendTextMessage(
      to,
      `Sorry, I couldn't find that category. Here's our full catalog instead: ${SITE_URL}/products`
    );
    return;
  }

  await sendTextMessage(
    to,
    `Here's our ${category.name} catalog — browse and order directly:\n${SITE_URL}${category.link}`
  );
}
