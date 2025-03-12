import Freelancer from "../../models/Freelancer";

/**
 * [Descrição do serviço]
 \*
 * @async
 * @function deleteFreelancerIdService
 * @param {[number]} id - Número que identifica o freelancer que será deletado.
 * @throws {AppError} Caso a exclusão do freelancer falhe.
 * @returns {Promise<void>} Não há retorno.
 \*
 * @example
 * // Exemplo de chamada
 * await deleteFreelancerIdService(2);
 */

const deleteFreelancerIdService = async (id: number): Promise<void> => {
    await Freelancer.destroy({
        where: { id },
    });

    return;
};

export default deleteFreelancerIdService;