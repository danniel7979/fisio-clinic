/*import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSMS } from "@/lib/sms";

function getTomorrowRange() {
  const now = new Date();

  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

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
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { start, end } = getTomorrowRange();

    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentAt: {
          gte: start,
          lte: end,
        },
        reminderStatus: "PENDING",
      },
      orderBy: {
        appointmentAt: "asc",
      },
    });

    const results = [];

    for (const appointment of appointments) {
      try {
        const date = formatDate(appointment.appointmentAt);
        const time = formatTime(appointment.appointmentAt);

        await sendSMS(
          appointment.phone,
          `Recordatorio: tienes una cita en la clínica mañana ${date} a las ${time}.`
        );

        await prisma.appointment.update({
          where: { id: appointment.id },
          data: {
            reminderStatus: "SENT",
            reminderSentAt: new Date(),
          },
        });

        results.push({ id: appointment.id, status: "sent" });
      } catch (error) {
        console.error("Error enviando SMS", error);

        await prisma.appointment.update({
          where: { id: appointment.id },
          data: {
            reminderStatus: "FAILED",
          },
        });

        results.push({ id: appointment.id, status: "failed" });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Error general:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}*/

/*import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSMS } from "@/lib/sms";

  const auth = req.headers.get("authorization");
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";

  if (!isVercelCron && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // aquí empieza tu lógica de recordatorios

function getTomorrowRange() {
  const now = new Date();

  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

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
  const auth = req.headers.get("authorization");
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";

  if (!isVercelCron && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { start, end } = getTomorrowRange();

    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentAt: {
          gte: start,
          lte: end,
        },
        reminderStatus: "PENDING",
      },
      orderBy: {
        appointmentAt: "asc",
      },
    });

    const results = [];

    for (const appointment of appointments) {
      try {
        const date = formatDate(appointment.appointmentAt);
        const time = formatTime(appointment.appointmentAt);

        await sendSMS(
          appointment.phone,
          `Recordatorio: tienes una cita en la clínica mañana ${date} a las ${time}.`
        );

        await prisma.appointment.update({
          where: { id: appointment.id },
          data: {
            reminderStatus: "SENT",
            reminderSentAt: new Date(),
          },
        });

        results.push({ id: appointment.id, status: "sent" });
      } catch (error) {
        console.error("Error enviando SMS", error);

        await prisma.appointment.update({
          where: { id: appointment.id },
          data: {
            reminderStatus: "FAILED",
          },
        });

        results.push({ id: appointment.id, status: "failed" });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Error general:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }

}*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSMS } from "@/lib/sms";

export const dynamic = "force-dynamic";

function getTomorrowRange() {
  const now = new Date();

  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

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

async function handleReminders(req: Request) {
  const auth = req.headers.get("authorization");
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";

  if (!isVercelCron && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { start, end } = getTomorrowRange();

    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentAt: {
          gte: start,
          lte: end,
        },
        reminderStatus: "PENDING",
      },
      orderBy: {
        appointmentAt: "asc",
      },
    });

    const results = [];

    for (const appointment of appointments) {
      try {
        const date = formatDate(appointment.appointmentAt);
        const time = formatTime(appointment.appointmentAt);

        await sendSMS(
          appointment.phone,
          `Recordatorio: tienes una cita en la clínica mañana ${date} a las ${time}.`
        );

        await prisma.appointment.update({
          where: { id: appointment.id },
          data: {
            reminderStatus: "SENT",
            reminderSentAt: new Date(),
          },
        });

        results.push({ id: appointment.id, status: "sent" });
      } catch (error) {
        console.error("Error enviando SMS", error);

        await prisma.appointment.update({
          where: { id: appointment.id },
          data: {
            reminderStatus: "FAILED",
          },
        });

        results.push({ id: appointment.id, status: "failed" });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Error general:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return handleReminders(req);
}

export async function POST(req: Request) {
  return handleReminders(req);
}