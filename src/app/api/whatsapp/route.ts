import { NextRequest, NextResponse } from "next/server";
import { sendCategoryMenu, sendCategoryLink } from "@/lib/whatsapp-bot";

// Meta calls this once, when you register the webhook URL, to prove you
// control this endpoint — it must echo back the "hub.challenge" value.
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// Meta POSTs here for every incoming message, delivery receipt, and read
// receipt on the connected number.
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const value = body?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];

    // Ignore delivery/read receipts and anything that isn't a real message.
    if (message) {
      const from = message.from as string;

      if (message.type === "interactive" && message.interactive?.type === "list_reply") {
        const selectedId = message.interactive.list_reply.id as string; // "cat_<id>"
        const categoryId = selectedId.replace(/^cat_/, "");
        await sendCategoryLink(from, categoryId);
      } else {
        // Any other incoming text (first contact, "hi", a question, etc.)
        // — greet them with the category menu.
        await sendCategoryMenu(from);
      }
    }
  } catch (err) {
    console.error("WhatsApp webhook processing error:", err);
  }

  // Always acknowledge quickly so Meta doesn't retry/mark the webhook unhealthy.
  return NextResponse.json({ status: "ok" });
}
