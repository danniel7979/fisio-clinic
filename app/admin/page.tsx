import { prisma } from "@/lib/prisma";
import type { CSSProperties } from "react";
import CancelButton from "./CancelButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      appointmentAt: "asc",
    },
  });

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Panel de administración</h1>
      <p>Citas registradas</p>

      {appointments.length === 0 ? (
        <p>No hay citas todavía.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Servicio</th>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}>WhatsApp</th>
              <th style={thStyle}>Recordatorio</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={tdStyle}>{appointment.name}</td>
                <td style={tdStyle}>{appointment.phone}</td>
                <td style={tdStyle}>{appointment.email || "-"}</td>
                <td style={tdStyle}>{appointment.service}</td>
                <td style={tdStyle}>
                  {new Date(appointment.appointmentAt).toLocaleString("es-ES")}
                </td>
                <td style={tdStyle}>
                  {appointment.whatsappOptIn ? "Sí" : "No"}
                </td>
                <td style={tdStyle}>{appointment.reminderStatus}</td>
                <td style={tdStyle}>
                  {appointment.reminderStatus === "CANCELLED" ? (
                    "Ya cancelada"
                  ) : (
                    <CancelButton id={appointment.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

const thStyle: CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
};

const tdStyle: CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
};