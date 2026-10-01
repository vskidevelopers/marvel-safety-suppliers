import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface NotifyItem {
  name: string;
  quantity: number;
  price?: number;
}

interface NotifyBody {
  type: "order" | "quote";
  id: string;
  customerName: string;
  phone: string;
  items: NotifyItem[];
  total?: number;
  notes?: string;
}

function buildHtml(body: NotifyBody) {
  const itemsRows = body.items
    .map(
      (item) =>
        `<tr><td style="padding:4px 8px;border-bottom:1px solid #eee;">${item.name}</td><td style="padding:4px 8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>${item.price !== undefined ? `<td style="padding:4px 8px;border-bottom:1px solid #eee;text-align:right;">KES ${item.price.toLocaleString()}</td>` : ""}</tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
      <h2 style="color:#ea580c;">${body.type === "order" ? "New Order Received" : "New Quote Request"}</h2>
      <p><strong>Customer:</strong> ${body.customerName}<br/>
      <strong>Phone:</strong> ${body.phone}</p>
      <table style="width:100%;border-collapse:collapse;margin:12px 0;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="padding:4px 8px;text-align:left;">Item</th>
            <th style="padding:4px 8px;">Qty</th>
            ${body.items[0]?.price !== undefined ? '<th style="padding:4px 8px;text-align:right;">Price</th>' : ""}
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>
      ${body.total !== undefined ? `<p><strong>Total: KES ${body.total.toLocaleString()}</strong></p>` : ""}
      ${body.notes ? `<p><strong>Notes:</strong> ${body.notes}</p>` : ""}
      <p style="margin-top:16px;">
        <a href="https://marvelsafetysuppliers.co.ke/admin/${body.type === "order" ? "orders" : "quotes"}/${body.id}"
           style="background:#ea580c;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;">
          View in Admin
        </a>
      </p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body: NotifyBody = await request.json();

    if (!body.type || !body.customerName || !body.items) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const recipients = process.env.NOTIFY_EMAIL!.split(",").map((e) => e.trim());

    // The Resend SDK returns API-level failures inside `result.error` rather
    // than throwing — a silent-failure trap if that field isn't checked.
    const result = await resend.emails.send({
      from: "Marvel Safety Suppliers <onboarding@resend.dev>",
      to: recipients,
      subject:
        body.type === "order"
          ? `New Order from ${body.customerName} — KES ${body.total?.toLocaleString() ?? ""}`
          : `New Quote Request from ${body.customerName}`,
      html: buildHtml(body),
    });

    if (result.error) {
      console.error("❌ [Notify] Resend rejected the email:", result.error);
      return Response.json({ error: result.error.message }, { status: 502 });
    }

    return Response.json({ sent: true });
  } catch (error: any) {
    // Deliberately non-fatal to the caller's flow — a failed notification
    // email should never block an order/quote from completing.
    console.error("❌ [Notify] Failed to send email:", error);
    return Response.json({ error: error.message || "Notification failed" }, { status: 500 });
  }
}
