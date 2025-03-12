import { AppError } from "../../errors";
import { iProject} from "../../interfaces/project.interface";
import Project from "../../models/Project";
import { projectSchema} from "../../schemas/project.schema";

/**
 * Serviço para buscar todos projects.
 \*
 * @async
 * @function getAllProject
 * @throws {AppError} Caso não seja encontrado nenhum project.
 * @returns {Promise<iProject[]>}  Os projects encontrados e validados.
 \*
 * @example
 * // Exemplo de chamada
 * const retrivedProjects = await getAllProject(2);
 \*
 * }
 */

const getAllProject = async (): Promise<iProject[]> => {
    const retrivedProjects = await Project.findAll();

    if (!retrivedProjects) {
        throw new AppError("Não foi possível encontrar os projects!", 404);
    }

    return projectSchema.array().parse(retrivedProjects);
};

export default getAllProject;