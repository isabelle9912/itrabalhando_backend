import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
    createClientController,
    deleteClientController,
    getAllClientIdController,
    getClientIdController,
    updateClientController,
} from "../controllers/clientController";
import Client from "../models/Client";
import {
    clientCreateSchema,
    clientUpdateSchema,
} from "../schemas/client.schema";

const clientRoutes = Router();

/**
 * Rota para obter todos os clients
 *
 * @name GET /client/all/
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllClientIdController - Retorna os clients.
 */
clientRoutes.get(
    "/",
    ensureTokenIsValidMiddleware,
    getAllClientIdController
);

/**
 * Rota para obter um client pelo seu ID.
 *
 * @name GET /client/:id
 * @middleware ensureExistsMiddleware - Verifica se o client existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getClientIdController - Retorna o client solicitado.
 */
clientRoutes.get(
    "/:id",
    ensureExistsMiddleware(Client, "Client"),
    ensureTokenIsValidMiddleware,
    getClientIdController
);

/**
 * Rota para criar um novo client.
 *
 * @name POST /client
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @controller createClientController - Cria um novo client.
 */
clientRoutes.post(
    "/",
    ensureDataIsValidMiddleware(clientCreateSchema),
    createClientController
);

/**
 * Rota para atualizar um client pelo seu ID.
 *
 * @name PATCH /client/:id
 * @middleware ensureExistsMiddleware - Verifica se o client existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller updateClientController - Atualiza o client solicitado.
 */
clientRoutes.patch(
    "/:id",
    ensureExistsMiddleware(Client, "Client"),
    ensureDataIsValidMiddleware(clientUpdateSchema),
    ensureTokenIsValidMiddleware,
    updateClientController
);

/**
 * Rota para deletar um client pelo seu ID.
 *
 * @name DELETE /client/:id
 * @middleware ensureExistsMiddleware - Verifica se o client existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller deleteClientController - Deleta o client solicitado.
 */
clientRoutes.delete(
    "/:id",
    ensureExistsMiddleware(Client, "Client"),
    ensureTokenIsValidMiddleware,
    deleteClientController
);

export default clientRoutes;