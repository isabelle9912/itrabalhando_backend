import { AppError } from "../../errors";

import {
    iClientUpdate, iClientWithoutPass,
} from "../../interfaces/client.interface";
import Client from "../../models/Client";
import { clientWithoutPassSchema} from "../../schemas/client.schema";

/**
 * Serviço para atualizar um client.
 *
 * @async
 * @function updateClientService
 * @param {iClientUpdate} payload - Os dados necessários para criar o client.
 * @param {number} id - Identificação do client atualizar seus dados.
 * @throws {AppError} Caso a atualização do client falhe.
 * @returns {Promise<iClientWithoutPass>} O client atualizado e validado.
 *
 *
 * const updatedClient = await updateClientService(id, payload);
 */
const updateClientService = async (
    id: number,
    payload: iClientUpdate
): Promise<iClientWithoutPass> => {
    const updatedClient = await Client.update(payload, { where: { id } });

    if (!updatedClient) {
        throw new AppError("Não foi possível atualizar o client", 409);
    }

    const retrivedClient = await Client.findOne({ where: { id } });

    return clientWithoutPassSchema.parse(retrivedClient);
};

export default updateClientService;