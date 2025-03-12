import { z } from "zod";

const freelancerSchema = z.object({
    id: z.number(),
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    skills: z.array(z.string()).nonempty('Selecione pelo menos uma habilidade'),
    bio: z.string().min(10, 'A bio deve ter pelo menos 10 caracteres'),
    image: z.string().nullable().optional(),
    password: z
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .max(120, "Senha deve ter no máximo 120 caracteres"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const freelancerWithoutPassSchema = freelancerSchema.omit({ password: true });

const freelancerCreateSchema = freelancerSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

const freelancerUpdateSchema = freelancerCreateSchema.partial();


export {
    freelancerSchema,
    freelancerWithoutPassSchema,
    freelancerCreateSchema,
    freelancerUpdateSchema,
};