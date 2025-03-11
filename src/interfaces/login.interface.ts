import { z } from "zod";
import { loginResponseSchema, loginSchema } from "../schemas/login.schema";

type iLogin = z.infer<typeof loginSchema>;
type iLoginResponse = z.infer<typeof loginResponseSchema>;

export { iLogin, iLoginResponse };