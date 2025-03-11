import { z } from "zod";

const clientSchema = z.object({
    id: z.number(),
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    company: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    password: z
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .max(120, "Senha deve ter no máximo 120 caracteres"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const clientWithoutPassSchema = clientSchema.omit({ password: true });

const clientCreateSchema = clientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

const clientUpdateSchema = clientCreateSchema.partial();


export {
    clientSchema,
    clientWithoutPassSchema,
    clientCreateSchema,
    clientUpdateSchema,
};