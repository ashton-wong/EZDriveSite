import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[POST /api/preorder] received");

  const { name, email, plan, phone } = await req.json();

  if (!name?.trim() || !email?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !plan) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const sql = neon(process.env.POSTGRES_URL!);

  await sql`
    CREATE TABLE IF NOT EXISTS preorders (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      email     VARCHAR(255) NOT NULL,
      plan      VARCHAR(50)  NOT NULL,
      phone     VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO preorders (name, email, plan, phone)
    VALUES (${name.trim()}, ${email.trim()}, ${plan}, ${phone?.trim() || null})
  `;

  console.log("[POST /api/preorder] saved:", email);
  return NextResponse.json({ success: true });
}
