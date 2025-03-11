import { z } from "zod";
import { freelancerWithoutPassSchema } from "./freelancer.schema";
import { clientWithoutPassSchema } from "./client.schema";

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
    role: z.string(),
    User: z.union([
        freelancerWithoutPassSchema,
        clientWithoutPassSchema,
    ]),
});

export { loginSchema, loginResponseSchema };