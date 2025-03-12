import { z } from "zod";
import {
    proposalSchema,
    proposalCreateSchema,
} from "../schemas/proposal.schema";

type iProposal = z.infer<typeof proposalSchema>;
type iProposalCreate = z.infer<typeof proposalCreateSchema>;
type iProposalUpdate = Partial<Pick<iProposalCreate, keyof iProposalCreate>>;

export {
    iProposal,
    iProposalCreate,
    iProposalUpdate,
};