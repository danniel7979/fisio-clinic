/*import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      service,
      appointmentAt,
      notes,
      whatsappOptIn,
    } = body;

    if (!name || !phone || !service || !appointmentAt) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(appointmentAt);

    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json(
        { error: "Fecha inválida" },
        { status: 400 }
      );
    }

    if (appointmentDate <= new Date()) {
      return NextResponse.json(
        { error: "La cita debe ser futura" },
        { status: 400 }
      );
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentAt: appointmentDate,
        reminderStatus: {
          not: "CANCELLED",
        },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "Esa fecha y hora ya están reservadas" },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        phone,
        email: email || null,
        service,
        appointmentAt: appointmentDate,
        notes: notes || null,
        whatsappOptIn: Boolean(whatsappOptIn),
      },
    });

    return NextResponse.json(
      {
        message: "Cita creada correctamente",
        appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la cita:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      name,
      phone,
      email,
      service,
      appointmentAt,
      notes,
    } = parsed.data;

    const appointmentDate = new Date(appointmentAt);

    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
    }

    if (appointmentDate <= new Date()) {
      return NextResponse.json(
        { error: "La cita debe ser futura" },
        { status: 400 }
      );
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentAt: appointmentDate,
        reminderStatus: {
          not: "CANCELADO",
        },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "Esa fecha y hora ya están reservadas" },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        phone,
        email: email || null,
        service,
        appointmentAt: appointmentDate,
        notes: notes || null,
      },
    });

    return NextResponse.json(
      { message: "Cita creada correctamente", appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la cita:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}