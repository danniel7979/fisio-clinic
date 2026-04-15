"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("¿Seguro que quieres borrar esta cita?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();   // ← esto hace que desaparezca la cita
    } else {
      alert("Error al borrar la cita");
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Borrar
    </button>
  );
}