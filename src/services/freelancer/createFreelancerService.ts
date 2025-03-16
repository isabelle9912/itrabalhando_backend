import {
    iFreelancerCreate,
    iFreelancerWithoutPass,
} from "../../interfaces/freelancer.interface";
import Freelancer from "../../models/Freelancer";
import { freelancerWithoutPassSchema } from "../../schemas/freelancer.schema";
import {checkEmailExists} from "../../utils/checkEmailExists";
import {AppError} from "../../errors";

/**
 * Serviço para criar um novo freelancer.
 *
 * @async
 * @function createFreelancerService
 * @param {iFreelancerCreate} payload - Os dados necessários para criar o freelancer.
 * @throws {AppError} Caso a criação do freelancer falhe.
 * @returns {Promise<iFreelancer>} O freelancer criado e validado.
 *
 * const novoFreelancer = await createFreelancerService(payload);
 *
 */
export const createFreelancerService = async (
    payload: iFreelancerCreate
): Promise<iFreelancerWithoutPass> => {
    if(await checkEmailExists(payload.email)) {
        throw new AppError("Email already exists!");
    }
    const createdFreelancer = await Freelancer.create(payload);

    const freelancerWithoutPass = freelancerWithoutPassSchema.parse(createdFreelancer);

    return freelancerWithoutPass;
};