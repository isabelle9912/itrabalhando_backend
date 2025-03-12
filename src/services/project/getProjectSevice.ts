import { AppError } from "../../errors";
import { iProject} from "../../interfaces/project.interface";
import Project from "../../models/Project";
import { projectSchema} from "../../schemas/project.schema";

/**
 * Serviço para buscar um project pelo seu ID.
 \*
 * @async
 * @function getProjectIdService
 * @param {number} id - Identificação do project para retornar seus dados.
 * @throws {AppError} Caso não seja encontrado o project.
 * @returns {Promise<iProject>} O project encontrado e validado.
 \*
 */

const getProjectIdService = async (id: number): Promise<iProject> => {
    const retrivedProject = await Project.findOne({
        where: { id },
    });

    if (!retrivedProject) {
        throw new AppError("Não foi possível encontrar o project!", 404);
    }

    return projectSchema.parse(retrivedProject);
};

export default getProjectIdService;