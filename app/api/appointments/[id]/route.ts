import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const appointmentId = Number(id);

    if (Number.isNaN(appointmentId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const existing = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!existing) {
      return NextResponse.json({ error: "La cita no existe" }, { status: 404 });
    }

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return NextResponse.json({ ok: true, message: "Cita borrada" });
  } catch (error) {
    console.error("Error borrando cita:", error);
    return NextResponse.json(
      { error: "Error interno al borrar la cita" },
      { status: 500 }
    );
  }
}