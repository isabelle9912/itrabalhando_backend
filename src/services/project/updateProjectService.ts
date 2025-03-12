import { AppError } from "../../errors";

import {
    iProjectUpdate, iProject,
} from "../../interfaces/project.interface";
import Project from "../../models/Project";
import { projectSchema} from "../../schemas/project.schema";

/**
 * Serviço para atualizar um project.
 *
 * @async
 * @function updateProjectService
 * @param {iProjectUpdate} payload - Os dados necessários para criar o project.
 * @param {number} id - Identificação do project atualizar seus dados.
 * @throws {AppError} Caso a atualização do project falhe.
 * @returns {Promise<iProject>} O project atualizado e validado.
 *
 *
 * const updatedProject = await updateProjectService(id, payload);
 */
const updateProjectService = async (
    id: number,
    payload: iProjectUpdate
): Promise<iProject> => {
    const updatedProject = await Project.update(payload, { where: { id } });

    if (!updatedProject) {
        throw new AppError("Não foi possível atualizar o project", 409);
    }

    const retrivedProject = await Project.findOne({ where: { id } });

    return projectSchema.parse(retrivedProject);
};

export default updateProjectService;