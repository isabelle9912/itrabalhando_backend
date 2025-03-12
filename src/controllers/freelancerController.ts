import { Request, Response } from "express";
import getFreelancerIdService from "../services/freelancer/getFreelancerSevice";
import getAllFreelancerService from "../services/freelancer/getAllFreelancerService";
import {createFreelancerService} from "../services/freelancer/createFreelancerService";
import updateFreelancerService from "../services/freelancer/updateFreelancerService";
import {iFreelancerUpdate} from "../interfaces/freelancer.interface";
import deleteFreelancerIdService from "../services/freelancer/deleteFreelancerService";

/**
 * Obtém um freelancer pelo seu ID.
 *
 * @async
 * @function getFreelancerIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Freelancer encontrado.
 * @throws {404} - Caso o freelancer não seja encontrado.
 *
 * @example
 * // GET /api/freelancer/1
 */
const getFreelancerIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);
    const retrivedFreelancer = await getFreelancerIdService(id);

    return res.status(200).json(retrivedFreelancer);
};

/**
 * Obtém todos freelancers pelo ID do APOIADOR.
 *
 * @async
 * @function getAllFreelancerIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Freelancers encontrados.
 * @throws {404} - Caso os freelancers não sejam encontrados.
 *
 * @example
 * // GET /api/freelancer/
 */

const getAllFreelancerIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const allFreelancers = await getAllFreelancerService();

    return res.status(200).json(allFreelancers);
};

/**
 * Cria um novo freelancer.
 *
 * @async
 * @function createFreelancerController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Freelancer criado com sucesso.
 * @throws {409} - Caso o freelancer não seja criado.
 *
 *
 * @example
 * // POST /api/freelancer
 */
const createFreelancerController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload = req.body;

    const createdFreelancer = await createFreelancerService(payload);

    return res.status(201).json(createdFreelancer);
};

/**
 * Atualiza um freelancer pelo seu ID.
 *
 * @async
 * @function updateFreelancerController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Freelancer atualizado com sucesso.
 * @throws {409} - Caso o freelancer não seja atualizado.
 *
 * @example
 * // PATCH /api/freelancer/10
 */

const updateFreelancerController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload: iFreelancerUpdate = req.body,
        id = Number(req.params.id);

    const updatedFreelancer = await updateFreelancerService(id, payload);

    return res.status(200).json(updatedFreelancer);
};

/**
 * Deleta um freelancer pelo seu ID.
 *
 * @async
 * @function deleteFreelancerController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Freelancer deletado com sucesso.
 *
 * @example
 * // DELETE /api/freelancer/10
 */

const deleteFreelancerController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);

    await deleteFreelancerIdService(id);

    return res.status(204).send();
};

export {
    getFreelancerIdController,
    getAllFreelancerIdController,
    createFreelancerController,
    updateFreelancerController,
    deleteFreelancerController,
};