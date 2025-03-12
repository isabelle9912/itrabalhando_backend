import { AppError } from "../../errors";

import {
    iFreelancerUpdate, iFreelancerWithoutPass,
} from "../../interfaces/freelancer.interface";
import Freelancer from "../../models/Freelancer";
import { freelancerWithoutPassSchema} from "../../schemas/freelancer.schema";

/**
 * Serviço para atualizar um freelancer.
 *
 * @async
 * @function updateFreelancerService
 * @param {iFreelancerUpdate} payload - Os dados necessários para criar o freelancer.
 * @param {number} id - Identificação do freelancer atualizar seus dados.
 * @throws {AppError} Caso a atualização do freelancer falhe.
 * @returns {Promise<iFreelancerWithoutPass>} O freelancer atualizado e validado.
 *
 *
 * const updatedFreelancer = await updateFreelancerService(id, payload);
 */
const updateFreelancerService = async (
    id: number,
    payload: iFreelancerUpdate
): Promise<iFreelancerWithoutPass> => {
    const updatedFreelancer = await Freelancer.update(payload, { where: { id } });

    if (!updatedFreelancer) {
        throw new AppError("Não foi possível atualizar o freelancer", 409);
    }

    const retrivedFreelancer = await Freelancer.findOne({ where: { id } });

    return freelancerWithoutPassSchema.parse(retrivedFreelancer);
};

export default updateFreelancerService;