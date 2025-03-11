import { z } from "zod";
import {
    clientSchema,
    clientCreateSchema,
    clientWithoutPassSchema,
} from "../schemas/client.schema";

type iClient = z.infer<typeof clientSchema>;
type iClientCreate = z.infer<typeof clientCreateSchema>;
type iClientWithoutPass = z.infer<typeof clientWithoutPassSchema>;
type iClientUpdate = Partial<Pick<iClientCreate, keyof iClientCreate>>;

export {
    iClient,
    iClientCreate,
    iClientWithoutPass,
    iClientUpdate,
};