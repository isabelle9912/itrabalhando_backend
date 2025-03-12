import { z } from "zod";

const deadlineSchema = z.union([
    z.string().refine((val) => !isNaN(Date.parse(val))), // Aceita strings ISO
    z.date(), // Aceita objetos Date
]).transform((val) => new Date(val)); // Converte para Date

const projectSchema = z.object({
    id: z.number(),
    title: z.string()
        .min(5, 'O título deve ter pelo menos 5 caracteres')
        .max(55, 'O título deve ter no máximo 55 caracteres'),
    description: z.string()
        .min(10, 'A descrição deve ter pelo menos 10 caracteres')
        .max(120, 'A descrição deve ter no máximo 120 caracteres'),
    budget: z.number().min(1, 'O orçamento deve ser maior que 0'),
    deadline: deadlineSchema, // Usa o schema flexível
    skillsRequired: z.array(z.string()).nonempty('Selecione pelo menos uma habilidade'),
    client_id: z.number(), // ID do cliente que publicou o projeto
    createdAt: z.date(),
    updatedAt: z.date(),
});

const projectCreateSchema = projectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

const projectUpdateSchema = projectCreateSchema.partial();

export {
    projectSchema,
    projectCreateSchema,
    projectUpdateSchema,
};