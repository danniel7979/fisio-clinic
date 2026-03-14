
/*
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
}*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validators";
import { sendSMS } from "@/lib/sms";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Madrid",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Madrid",
  }).format(date);
}

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

    const { name, phone, email, service, appointmentAt, notes } = parsed.data;

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
      },
    });

    try {
      const date = formatDate(appointmentDate);
      const time = formatTime(appointmentDate);

      await sendSMS(
        phone,
        `Confirmación: tu cita en la clínica ha sido reservada para el ${date} a las ${time}.`
      );
    } catch (smsError) {
      console.error("Error enviando SMS de confirmación:", smsError);
    }

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
}