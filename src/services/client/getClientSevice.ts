import { AppError } from "../../errors";
import { iClientWithoutPass} from "../../interfaces/client.interface";
import Client from "../../models/Client";
import { clientWithoutPassSchema} from "../../schemas/client.schema";

/**
 * Serviço para buscar um client pelo seu ID.
 \*
 * @async
 * @function getClientIdService
 * @param {number} id - Identificação do client para retornar seus dados.
 * @throws {AppError} Caso não seja encontrado o client.
 * @returns {Promise<iClient>} O client encontrado e validado.
 \*
 */

const getClientIdService = async (id: number): Promise<iClientWithoutPass> => {
    const retrivedClient = await Client.findOne({
        where: { id },
    });

    if (!retrivedClient) {
        throw new AppError("Não foi possível encontrar o client!", 404);
    }

    return clientWithoutPassSchema.parse(retrivedClient);
};

export default getClientIdService;