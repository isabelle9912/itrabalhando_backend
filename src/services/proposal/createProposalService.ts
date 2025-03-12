import {
    iProposal,
    iProposalCreate,
} from "../../interfaces/proposal.interface";
import Proposal from "../../models/Proposal";
import { proposalSchema } from "../../schemas/proposal.schema";

/**
 * Serviço para criar um novo proposal.
 *
 * @async
 * @function createProposalService
 * @param {iProposalCreate} payload - Os dados necessários para criar o proposal.
 * @throws {AppError} Caso a criação do proposal falhe.
 * @returns {Promise<iProposal>} O proposal criado e validado.
 *
 * const novoProposal = await createProposalService(payload);
 *
 */
export const createProposalService = async (
    payload: iProposalCreate
): Promise<iProposal> => {
    const createdProposal = await Proposal.create(payload);

    return proposalSchema.parse(createdProposal);
};