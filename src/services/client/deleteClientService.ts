import Client from "../../models/Client";

/**
 * [Descrição do serviço]
 \*
 * @async
 * @function deleteClientIdService
 * @param {[number]} id - Número que identifica o client que será deletado.
 * @throws {AppError} Caso a exclusão do client falhe.
 * @returns {Promise<void>} Não há retorno.
 \*
 * @example
 * // Exemplo de chamada
 * await deleteClientIdService(2);
 */

const deleteClientIdService = async (id: number): Promise<void> => {
    await Client.destroy({
        where: { id },
    });

    return;
};

export default deleteClientIdService;