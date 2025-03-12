import { z } from "zod";
import {
    projectSchema,
    projectCreateSchema,
} from "../schemas/project.schema";

type iProject = z.infer<typeof projectSchema>;
type iProjectCreate = z.infer<typeof projectCreateSchema>;
type iProjectUpdate = Partial<Pick<iProjectCreate, keyof iProjectCreate>>;

export {
    iProject,
    iProjectCreate,
    iProjectUpdate,
};