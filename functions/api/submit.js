const RECIPIENTS = ["justin@aryocg.com", "sdas@aryocg.com"];

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { name, email, phone, treatment, quote, destination, notes } = body;

    if (!name?.trim() || !email?.trim()) {
      return json({ ok: false, error: "Name and email are required." }, 400);
    }

    const html = `
<div style="font-family:sans-serif;max-width:600px;color:#2c2a26">
  <h2 style="margin-bottom:24px;font-size:22px">New Quote Request — Nira Dental Abroad</h2>
  <table style="width:100%;border-collapse:collapse;font-size:15px">
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600;width:38%">Name</td><td style="padding:10px 14px;border-bottom:1px solid #e8dfd3">${esc(name)}</td></tr>
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600">Email</td><td style="padding:10px 14px;border-bottom:1px solid #e8dfd3"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #e8dfd3">${esc(phone) || "—"}</td></tr>
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600">Treatment</td><td style="padding:10px 14px;border-bottom:1px solid #e8dfd3">${esc(treatment) || "—"}</td></tr>
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600">U.S./Canada Quote</td><td style="padding:10px 14px;border-bottom:1px solid #e8dfd3">${esc(quote) || "—"}</td></tr>
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600">Destination</td><td style="padding:10px 14px;border-bottom:1px solid #e8dfd3">${esc(destination) || "—"}</td></tr>
    <tr><td style="padding:10px 14px;background:#f3eee8;font-weight:600;vertical-align:top">Notes</td><td style="padding:10px 14px">${esc(notes) || "—"}</td></tr>
  </table>
  <p style="margin-top:24px;font-size:13px;color:#8f8e8e">Submitted via nira-dental.pages.dev/quote</p>
</div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nira Dental <onboarding@resend.dev>",
        to: RECIPIENTS,
        reply_to: email,
        subject: `New quote request from ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }

    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: "Submission failed. Please try again." }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
