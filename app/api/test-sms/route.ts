import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/sms";

export async function POST() {
  try {
    const result = await sendSMS(
      "+34626891986",
      "Prueba SMS clínica: si recibes esto, la integración funciona."
    );

    return NextResponse.json({ ok: true, result });
  } catch (error: any) {
    console.error("Error test SMS:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Error enviando SMS" },
      { status: 500 }
    );
  }
}