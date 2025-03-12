import { AppError } from "../../errors";
import { iFreelancerWithoutPass} from "../../interfaces/freelancer.interface";
import Freelancer from "../../models/Freelancer";
import { freelancerWithoutPassSchema} from "../../schemas/freelancer.schema";

/**
 * Serviço para buscar um freelancer pelo seu ID.
 \*
 * @async
 * @function getFreelancerIdService
 * @param {number} id - Identificação do freelancer para retornar seus dados.
 * @throws {AppError} Caso não seja encontrado o freelancer.
 * @returns {Promise<iFreelancer>} O freelancer encontrado e validado.
 \*
 */

const getFreelancerIdService = async (id: number): Promise<iFreelancerWithoutPass> => {
    const retrivedFreelancer = await Freelancer.findOne({
        where: { id },
    });

    if (!retrivedFreelancer) {
        throw new AppError("Não foi possível encontrar o freelancer!", 404);
    }

    return freelancerWithoutPassSchema.parse(retrivedFreelancer);
};

export default getFreelancerIdService;