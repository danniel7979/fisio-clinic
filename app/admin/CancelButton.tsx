"use client";

import { useRouter } from "next/navigation";

export default function CancelButton({ id }: { id: number }) {
  const router = useRouter();

  async function cancelAppointment() {
    const ok = window.confirm("¿Cancelar esta cita?");
    if (!ok) return;

    const res = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "No se pudo cancelar la cita");
      return;
    }

    alert("Cita cancelada correctamente");
    router.refresh();
  }

  return (
    <button
      onClick={cancelAppointment}
      style={{
        background: "red",
        color: "white",
        border: "none",
        padding: "6px 10px",
        cursor: "pointer",
      }}
    >
      Cancelar
    </button>
  );
}