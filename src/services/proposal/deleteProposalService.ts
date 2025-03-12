import Proposal from "../../models/Proposal";

/**
 * [Descrição do serviço]
 \*
 * @async
 * @function deleteProposalIdService
 * @param {[number]} id - Número que identifica o proposal que será deletado.
 * @throws {AppError} Caso a exclusão do proposal falhe.
 * @returns {Promise<void>} Não há retorno.
 \*
 * @example
 * // Exemplo de chamada
 * await deleteProposalIdService(2);
 */

const deleteProposalIdService = async (id: number): Promise<void> => {
    await Proposal.destroy({
        where: { id },
    });

    return;
};

export default deleteProposalIdService;