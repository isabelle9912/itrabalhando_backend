import {
    iProject,
    iProjectCreate,
} from "../../interfaces/project.interface";
import Project from "../../models/Project";
import { projectSchema } from "../../schemas/project.schema";

/**
 * Serviço para criar um novo project.
 *
 * @async
 * @function createProjectService
 * @param {iProjectCreate} payload - Os dados necessários para criar o project.
 * @throws {AppError} Caso a criação do project falhe.
 * @returns {Promise<iProject>} O project criado e validado.
 *
 * const novoProject = await createProjectService(payload);
 *
 */
export const createProjectService = async (
    payload: iProjectCreate
): Promise<iProject> => {
    const createdProject = await Project.create(payload);

    const projectWithoutPass = projectSchema.parse(createdProject);

    return projectWithoutPass;
};