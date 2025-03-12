import Project from "../../models/Project";

/**
 * [Descrição do serviço]
 \*
 * @async
 * @function deleteProjectIdService
 * @param {[number]} id - Número que identifica o project que será deletado.
 * @throws {AppError} Caso a exclusão do project falhe.
 * @returns {Promise<void>} Não há retorno.
 \*
 * @example
 * // Exemplo de chamada
 * await deleteProjectIdService(2);
 */

const deleteProjectIdService = async (id: number): Promise<void> => {
    await Project.destroy({
        where: { id },
    });

    return;
};

export default deleteProjectIdService;