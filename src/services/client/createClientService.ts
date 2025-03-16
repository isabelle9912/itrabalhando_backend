import {
    iClientCreate,
    iClientWithoutPass,
} from "../../interfaces/client.interface";
import Client from "../../models/Client";
import { clientWithoutPassSchema } from "../../schemas/client.schema";
import {checkEmailExists} from "../../utils/checkEmailExists";
import {AppError} from "../../errors";

/**
 * Serviço para criar um novo client.
 *
 * @async
 * @function createClientService
 * @param {iClientCreate} payload - Os dados necessários para criar o client.
 * @throws {AppError} Caso a criação do client falhe.
 * @returns {Promise<iClient>} O client criado e validado.
 *
 * const novoClient = await createClientService(payload);
 *
 */
export const createClientService = async (
    payload: iClientCreate
): Promise<iClientWithoutPass> => {
    if(await checkEmailExists(payload.email)) {
        throw new AppError("Email already exists!");
    }
    const createdClient = await Client.create(payload);

    const clientWithoutPass = clientWithoutPassSchema.parse(createdClient);

    return clientWithoutPass;
};