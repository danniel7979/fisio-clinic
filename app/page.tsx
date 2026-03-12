"use client";

import { useState } from "react";

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Fisioterapia general",
    appointmentAt: "",
    notes: "",
    whatsappOptIn: true,
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Guardando cita...");

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Error al guardar la cita");
      return;
    }

    setMessage("Cita reservada correctamente");
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Clínica de Fisioterapia</h1>
      <p>Reserva tu cita online</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        >
          <option>Fisioterapia general</option>
          <option>Rehabilitación</option>
          <option>Masaje terapéutico</option>
        </select>

        <input
          type="datetime-local"
          onChange={(e) =>
            setForm({
              ...form,
              appointmentAt: new Date(e.target.value).toISOString(),
            })
          }
          required
        />

        <textarea
          placeholder="Observaciones"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <label>
          <input
            type="checkbox"
            checked={form.whatsappOptIn}
            onChange={(e) =>
              setForm({ ...form, whatsappOptIn: e.target.checked })
            }
          />
          Acepto recibir recordatorios por WhatsApp
        </label>

        <button type="submit">Reservar cita</button>
      </form>

      <p>{message}</p>
    </main>
  );
}