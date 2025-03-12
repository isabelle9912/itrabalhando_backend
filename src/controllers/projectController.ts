import { Request, Response } from "express";
import getProjectIdService from "../services/project/getProjectSevice";
import getAllProjectService from "../services/project/getAllProjectService";
import {createProjectService} from "../services/project/createProjectService";
import updateProjectService from "../services/project/updateProjectService";
import {iProjectUpdate} from "../interfaces/project.interface";
import deleteProjectIdService from "../services/project/deleteProjectService";

/**
 * Obtém um project pelo seu ID.
 *
 * @async
 * @function getProjectIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Project encontrado.
 * @throws {404} - Caso o project não seja encontrado.
 *
 * @example
 * // GET /api/project/1
 */
const getProjectIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);
    const retrivedProject = await getProjectIdService(id);

    return res.status(200).json(retrivedProject);
};

/**
 * Obtém todos projects pelo ID do APOIADOR.
 *
 * @async
 * @function getAllProjectIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Projects encontrados.
 * @throws {404} - Caso os projects não sejam encontrados.
 *
 * @example
 * // GET /api/project/
 */

const getAllProjectIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const allProjects = await getAllProjectService();

    return res.status(200).json(allProjects);
};

/**
 * Cria um novo project.
 *
 * @async
 * @function createProjectController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Project criado com sucesso.
 * @throws {409} - Caso o project não seja criado.
 *
 *
 * @example
 * // POST /api/project
 */
const createProjectController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload = req.body;

    const createdProject = await createProjectService(payload);

    return res.status(201).json(createdProject);
};

/**
 * Atualiza um project pelo seu ID.
 *
 * @async
 * @function updateProjectController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Project atualizado com sucesso.
 * @throws {409} - Caso o project não seja atualizado.
 *
 * @example
 * // PATCH /api/project/10
 */

const updateProjectController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload: iProjectUpdate = req.body,
        id = Number(req.params.id);

    const updatedProject = await updateProjectService(id, payload);

    return res.status(200).json(updatedProject);
};

/**
 * Deleta um project pelo seu ID.
 *
 * @async
 * @function deleteProjectController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Project deletado com sucesso.
 *
 * @example
 * // DELETE /api/project/10
 */

const deleteProjectController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);

    await deleteProjectIdService(id);

    return res.status(204).send();
};

export {
    getProjectIdController,
    getAllProjectIdController,
    createProjectController,
    updateProjectController,
    deleteProjectController,
};