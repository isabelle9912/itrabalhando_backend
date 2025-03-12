import { AppError } from "../../errors";
import { iFreelancerWithoutPass} from "../../interfaces/freelancer.interface";
import Freelancer from "../../models/Freelancer";
import { freelancerWithoutPassSchema} from "../../schemas/freelancer.schema";

/**
 * Serviço para buscar todos freelancers.
 \*
 * @async
 * @function getAllFreelancer
 * @throws {AppError} Caso não seja encontrado nenhum freelancer.
 * @returns {Promise<iFreelancer[]>}  Os freelancers encontrados e validados.
 \*
 * @example
 * // Exemplo de chamada
 * const retrivedFreelancers = await getAllFreelancer(2);
 \*
 * }
 */

const getAllFreelancer = async (): Promise<iFreelancerWithoutPass[]> => {
    const retrivedFreelancers = await Freelancer.findAll();

    if (!retrivedFreelancers) {
        throw new AppError("Não foi possível encontrar os freelancers!", 404);
    }

    return freelancerWithoutPassSchema.array().parse(retrivedFreelancers);
};

export default getAllFreelancer;