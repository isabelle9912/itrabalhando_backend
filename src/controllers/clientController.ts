import { Request, Response } from "express";
import getClientIdService from "../services/client/getClientSevice";
import getAllClientService from "../services/client/getAllClientService";
import {createClientService} from "../services/client/createClientService";
import updateClientService from "../services/client/updateClientService";
import {iClientUpdate} from "../interfaces/client.interface";
import deleteClientIdService from "../services/client/deleteClientService";

/**
 * Obtém um client pelo seu ID.
 *
 * @async
 * @function getClientIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Client encontrado.
 * @throws {404} - Caso o client não seja encontrado.
 *
 * @example
 * // GET /api/client/1
 */
const getClientIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);
    const retrivedClient = await getClientIdService(id);

    return res.status(200).json(retrivedClient);
};

/**
 * Obtém todos clients pelo ID do APOIADOR.
 *
 * @async
 * @function getAllClientIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Clients encontrados.
 * @throws {404} - Caso os clients não sejam encontrados.
 *
 * @example
 * // GET /api/client/
 */

const getAllClientIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const allClients = await getAllClientService();

    return res.status(200).json(allClients);
};

/**
 * Cria um novo client.
 *
 * @async
 * @function createClientController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Client criado com sucesso.
 * @throws {409} - Caso o client não seja criado.
 *
 *
 * @example
 * // POST /api/client
 */
const createClientController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload = req.body;

    const createdClient = await createClientService(payload);

    return res.status(201).json(createdClient);
};

/**
 * Atualiza um client pelo seu ID.
 *
 * @async
 * @function updateClientController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Client atualizado com sucesso.
 * @throws {409} - Caso o client não seja atualizado.
 *
 * @example
 * // PATCH /api/client/10
 */

const updateClientController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload: iClientUpdate = req.body,
        id = Number(req.params.id);

    const updatedClient = await updateClientService(id, payload);

    return res.status(200).json(updatedClient);
};

/**
 * Deleta um client pelo seu ID.
 *
 * @async
 * @function deleteClientController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Client deletado com sucesso.
 *
 * @example
 * // DELETE /api/client/10
 */

const deleteClientController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);

    await deleteClientIdService(id);

    return res.status(204).send();
};

export {
    getClientIdController,
    getAllClientIdController,
    createClientController,
    updateClientController,
    deleteClientController,
};