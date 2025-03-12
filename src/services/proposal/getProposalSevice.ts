import { AppError } from "../../errors";
import { iProposal} from "../../interfaces/proposal.interface";
import Proposal from "../../models/Proposal";
import { proposalSchema} from "../../schemas/proposal.schema";

/**
 * Serviço para buscar um proposal pelo seu ID.
 \*
 * @async
 * @function getProposalIdService
 * @param {number} id - Identificação do proposal para retornar seus dados.
 * @throws {AppError} Caso não seja encontrado o proposal.
 * @returns {Promise<iProposal>} O proposal encontrado e validado.
 \*
 */

const getProposalIdService = async (id: number): Promise<iProposal> => {
    const retrivedProposal = await Proposal.findOne({
        where: { id },
    });

    if (!retrivedProposal) {
        throw new AppError("Não foi possível encontrar o proposal!", 404);
    }

    return proposalSchema.parse(retrivedProposal);
};

export default getProposalIdService;