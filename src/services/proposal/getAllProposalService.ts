import { AppError } from "../../errors";
import { iProposal} from "../../interfaces/proposal.interface";
import Proposal from "../../models/Proposal";
import { proposalSchema} from "../../schemas/proposal.schema";

/**
 * Serviço para buscar todos proposals de um projeto.
 \*
 * @async
 * @function getAllProposal
 * @param {number} project_id - Identificação do projeto para retornar os proposals.
 * @throws {AppError} Caso não seja encontrado nenhum proposal.
 * @returns {Promise<iProposal[]>}  Os proposals encontrados e validados.
 \*
 * @example
 * // Exemplo de chamada
 * const retrivedProposals = await getAllProposal(2);
 \*
 * }
 */

const getAllProposal = async (project_id: number): Promise<iProposal[]> => {
    const retrivedProposals = await Proposal.findAll({where: { project_id }});

    if (!retrivedProposals) {
        throw new AppError("Não foi possível encontrar os proposals desse projeto!", 404);
    }

    return proposalSchema.array().parse(retrivedProposals);
};

export default getAllProposal;