"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Corte de mujer",
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
      service: "Corte de mujer",
      appointmentAt: "",
      notes: "",
    });
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">
              Peluquería Bella Estilo
            </h1>
            <p className="mt-2 text-stone-600">
              Reserva tu cita online de forma rápida y sencilla.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm"
          >
            Panel admin
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-900">
              Tu estilo, nuestro cuidado
            </h2>
            <p className="mt-4 text-stone-600">
              Reserva tu cita en pocos pasos y recibe un recordatorio automático
              antes de tu servicio.
            </p>

            <ul className="mt-6 space-y-3 text-stone-700">
              <li>• Corte de mujer</li>
              <li>• Corte de hombre</li>
              <li>• Peinado</li>
              <li>• Color y mechas</li>
              <li>• Tratamientos capilares</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-stone-900">
              Reserva tu cita
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <input
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <select
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                <option>Corte de mujer</option>
                <option>Corte de hombre</option>
                <option>Peinado</option>
                <option>Tinte</option>
                <option>Mechas</option>
                <option>Tratamiento capilar</option>
                <option>Barba</option>
              </select>

              <input
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
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
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-stone-500"
                placeholder="Observaciones"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />

              <label className="block text-sm text-stone-700">
                <input type="checkbox" required className="mr-2" />
                He leído y acepto la{" "}
                <a href="/politica-privacidad" className="underline">
                  política de privacidad
                </a>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-stone-900 px-4 py-3 font-medium text-white transition hover:bg-stone-800"
              >
                Reservar cita
              </button>
            </form>

            {message && (
              <p className="mt-4 text-sm font-medium text-stone-700">{message}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}