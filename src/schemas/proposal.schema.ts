import { z } from "zod";

const deadlineSchema = z.union([
    z.string().refine((val) => !isNaN(Date.parse(val))), // Aceita strings ISO
    z.date(), // Aceita objetos Date
]).transform((val) => new Date(val)); // Converte para Date

const proposalSchema = z.object({
    id: z.number(),
    message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres')
        .max(255, 'A mensagem deve ter no máximo 255 caracteres'),
    budget: z.number().min(1, 'O orçamento deve ser maior que 0'),
    deadline: deadlineSchema, // Usa o schema flexível
    freelancer_id: z.number(), // ID do freelancer que enviou a proposta
    project_id: z.number(), // ID do projeto
    createdAt: z.date(),
    updatedAt: z.date(),
});

const proposalCreateSchema = proposalSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

const proposalUpdateSchema = proposalCreateSchema.partial();

export {
    proposalSchema,
    proposalCreateSchema,
    proposalUpdateSchema,
};