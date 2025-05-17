import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // For testing, you can put your webhook URL here directly.
    const webhookUrl = "https://discord.com/api/webhooks/1373195413531656292/ZLNoshJdFjRFZbOqZqawTG_LlEKn1cKNM60QCPBnLsrQtG3Z9KEve7KMl6QCS3CQWQ6h";

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text();
      return NextResponse.json({ error: `Discord webhook error: ${text}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
