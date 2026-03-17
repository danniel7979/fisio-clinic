"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = window.confirm("¿Seguro que quieres borrar esta cita?");
    if (!ok) return;

    const res = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "No se pudo borrar la cita");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        background: "#111",
        color: "white",
        border: "none",
        padding: "6px 10px",
        cursor: "pointer",
        borderRadius: "6px",
      }}
    >
      Borrar
    </button>
  );
}