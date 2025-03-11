import { z } from "zod";
import {
    freelancerSchema,
    freelancerCreateSchema,
    freelancerWithoutPassSchema,
} from "../schemas/freelancer.schema";

type iFreelancer = z.infer<typeof freelancerSchema>;
type iFreelancerCreate = z.infer<typeof freelancerCreateSchema>;
type iFreelancerWithoutPass = z.infer<typeof freelancerWithoutPassSchema>;
type iFreelancerUpdate = Partial<Pick<iFreelancerCreate, keyof iFreelancerCreate>>;

export {
    iFreelancer,
    iFreelancerCreate,
    iFreelancerWithoutPass,
    iFreelancerUpdate,
};