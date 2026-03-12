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
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const existing = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "La cita no existe" },
        { status: 404 }
      );
    }

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        reminderStatus: "CANCELLED",
      },
    });

    return NextResponse.json({
      message: "Cita cancelada correctamente",
      appointment: updated,
    });
  } catch (error) {
    console.error("Error cancelando cita:", error);

    return NextResponse.json(
      { error: "Error interno al cancelar la cita" },
      { status: 500 }
    );
  }
}