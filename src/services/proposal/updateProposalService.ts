import { AppError } from "../../errors";

import {
    iProposalUpdate, iProposal,
} from "../../interfaces/proposal.interface";
import Proposal from "../../models/Proposal";
import { proposalSchema} from "../../schemas/proposal.schema";

/**
 * Serviço para atualizar um proposal.
 *
 * @async
 * @function updateProposalService
 * @param {iProposalUpdate} payload - Os dados necessários para criar o proposal.
 * @param {number} id - Identificação do proposal atualizar seus dados.
 * @throws {AppError} Caso a atualização do proposal falhe.
 * @returns {Promise<iProposal>} O proposal atualizado e validado.
 *
 *
 * const updatedProposal = await updateProposalService(id, payload);
 */
const updateProposalService = async (
    id: number,
    payload: iProposalUpdate
): Promise<iProposal> => {
    const updatedProposal = await Proposal.update(payload, { where: { id } });

    if (!updatedProposal) {
        throw new AppError("Não foi possível atualizar o proposal", 409);
    }

    const retrivedProposal = await Proposal.findOne({ where: { id } });

    return proposalSchema.parse(retrivedProposal);
};

export default updateProposalService;