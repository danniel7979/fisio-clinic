import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio").max(100),
  phone: z
    .string()
    .min(9, "Teléfono inválido")
    .max(20, "Teléfono inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  service: z.string().min(2, "Servicio obligatorio").max(100),
  appointmentAt: z.string().min(1, "Fecha obligatoria"),
  notes: z.string().max(500, "Máximo 500 caracteres").optional().or(z.literal("")),
  whatsappOptIn: z.boolean().optional(),
});