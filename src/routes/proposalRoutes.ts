import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
    createProposalController,
    deleteProposalController,
    getAllProposalIdController,
    getProposalIdController,
    updateProposalController,
} from "../controllers/proposalController";
import Proposal from "../models/Proposal";
import {
    proposalCreateSchema,
    proposalUpdateSchema,
} from "../schemas/proposal.schema";
import Project from "../models/Project";

const proposalRoutes = Router();

/**
 * Rota para obter todas as proposals de um projeto
 *
 * @name GET /proposal/all/1
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o projeto das propostas que estão sendo buscadas existe.
 * @controller getAllProposalIdController - Retorna os proposals.
 */
proposalRoutes.get(
    "/all/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Project, "Project"),
    getAllProposalIdController
);

/**
 * Rota para obter um proposal pelo seu ID.
 *
 * @name GET /proposal/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o proposal existe.
 * @controller getProposalIdController - Retorna o proposal solicitado.
 */
proposalRoutes.get(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Proposal, "Proposal"),
    getProposalIdController
);

/**
 * Rota para criar um novo proposal.
 *
 * @name POST /proposal
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @controller createProposalController - Cria um novo proposal.
 */
proposalRoutes.post(
    "/",
    ensureTokenIsValidMiddleware,
    ensureDataIsValidMiddleware(proposalCreateSchema),
    createProposalController
);

/**
 * Rota para atualizar um proposal pelo seu ID.
 *
 * @name PATCH /proposal/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o proposal existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @controller updateProposalController - Atualiza o proposal solicitado.
 */
proposalRoutes.patch(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Proposal, "Proposal"),
    ensureDataIsValidMiddleware(proposalUpdateSchema),
    updateProposalController
);

/**
 * Rota para deletar um proposal pelo seu ID.
 *
 * @name DELETE /proposal/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o proposal existe.
 * @controller deleteProposalController - Deleta o proposal solicitado.
 */
proposalRoutes.delete(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Proposal, "Proposal"),
    deleteProposalController
);

export default proposalRoutes;