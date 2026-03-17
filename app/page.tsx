/*"use client";

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
}*/

"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Fisioterapia general",
    appointmentAt: "",
    notes: "",
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
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "Fisioterapia general",
      appointmentAt: "",
      notes: "",
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Clínica de Fisioterapia
            </h1>
            <p className="mt-2 text-slate-600">
              Reserva tu cita online de forma rápida y sencilla.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          >
            Panel admin
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Tu bienestar, nuestra prioridad
            </h2>
            <p className="mt-4 text-slate-600">
              Reserva tu sesión en pocos pasos y recibe un recordatorio automático
              antes de tu cita.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>• Fisioterapia general</li>
              <li>• Rehabilitación</li>
              <li>• Lesiones deportivas</li>
              <li>• Masaje terapéutico</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
              Reserva tu cita
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <select
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                <option>Fisioterapia general</option>
                <option>Rehabilitación</option>
                <option>Masaje terapéutico</option>
                <option>Lesiones deportivas</option>
              </select>

              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                type="datetime-local"
                value={form.appointmentAt}
                onChange={(e) =>
                  setForm({
                    ...form,
                    appointmentAt: e.target.value,
                  })
                }
                required
              />

              <textarea
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                placeholder="Observaciones"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />

              <label style={{ fontSize: "14px", display: "block", marginTop: "10px" }}>
                <input type="checkbox" required /> He leído y acepto la{" "}
                <a href="/politica-privacidad">política de privacidad</a>
              </label>


              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Reservar cita
              </button>
            </form>

            {message && (
              <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}