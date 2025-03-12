import { Request, Response } from "express";
import getProposalIdService from "../services/proposal/getProposalSevice";
import getAllProposalService from "../services/proposal/getAllProposalService";
import {createProposalService} from "../services/proposal/createProposalService";
import updateProposalService from "../services/proposal/updateProposalService";
import {iProposalUpdate} from "../interfaces/proposal.interface";
import deleteProposalIdService from "../services/proposal/deleteProposalService";

/**
 * Obtém um proposal pelo seu ID.
 *
 * @async
 * @function getProposalIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Proposal encontrado.
 * @throws {404} - Caso o proposal não seja encontrado.
 *
 * @example
 * // GET /api/proposal/1
 */
const getProposalIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);
    const retrivedProposal = await getProposalIdService(id);

    return res.status(200).json(retrivedProposal);
};

/**
 * Obtém todos proposals pelo ID do PROJETO.
 *
 * @async
 * @function getAllProposalIdController
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Proposals encontrados.
 * @throws {404} - Caso os proposals não sejam encontrados.
 *
 * @example
 * // GET /api/proposal/all/1
 */

const getAllProposalIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);
    const allProposals = await getAllProposalService(id);

    return res.status(200).json(allProposals);
};

/**
 * Cria um novo proposal.
 *
 * @async
 * @function createProposalController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 201 - Proposal criado com sucesso.
 * @throws {409} - Caso o proposal não seja criado.
 *
 *
 * @example
 * // POST /api/proposal
 */
const createProposalController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload = req.body;

    const createdProposal = await createProposalService(payload);

    return res.status(201).json(createdProposal);
};

/**
 * Atualiza um proposal pelo seu ID.
 *
 * @async
 * @function updateProposalController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 200 - Proposal atualizado com sucesso.
 * @throws {409} - Caso o proposal não seja atualizado.
 *
 * @example
 * // PATCH /api/proposal/10
 */

const updateProposalController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const payload: iProposalUpdate = req.body,
        id = Number(req.params.id);

    const updatedProposal = await updateProposalService(id, payload);

    return res.status(200).json(updatedProposal);
};

/**
 * Deleta um proposal pelo seu ID.
 *
 * @async
 * @function deleteProposalController
 * @param {Request} req - Objeto de requisição do Express contendo o payload.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<Response>} 204 - Proposal deletado com sucesso.
 *
 * @example
 * // DELETE /api/proposal/10
 */

const deleteProposalController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const id = Number(req.params.id);

    await deleteProposalIdService(id);

    return res.status(204).send();
};

export {
    getProposalIdController,
    getAllProposalIdController,
    createProposalController,
    updateProposalController,
    deleteProposalController,
};