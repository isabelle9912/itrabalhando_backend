import { AppError } from "../../errors";
import { iClientWithoutPass} from "../../interfaces/client.interface";
import Client from "../../models/Client";
import { clientWithoutPassSchema} from "../../schemas/client.schema";

/**
 * Serviço para buscar todos clients.
 \*
 * @async
 * @function getAllClient
 * @throws {AppError} Caso não seja encontrado nenhum client.
 * @returns {Promise<iClient[]>}  Os clients encontrados e validados.
 \*
 * @example
 * // Exemplo de chamada
 * const retrivedClients = await getAllClient(2);
 \*
 * }
 */

const getAllClient = async (): Promise<iClientWithoutPass[]> => {
    const retrivedClients = await Client.findAll();

    if (!retrivedClients) {
        throw new AppError("Não foi possível encontrar os clients!", 404);
    }

    return clientWithoutPassSchema.array().parse(retrivedClients);
};

export default getAllClient;