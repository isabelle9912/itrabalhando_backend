import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
    createProjectController,
    deleteProjectController,
    getAllProjectIdController,
    getProjectIdController,
    updateProjectController,
} from "../controllers/projectController";
import Project from "../models/Project";
import {
    projectCreateSchema,
    projectUpdateSchema,
} from "../schemas/project.schema";

const projectRoutes = Router();

/**
 * Rota para obter todos os projects
 *
 * @name GET /project/all/
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllProjectIdController - Retorna os projects.
 */
projectRoutes.get(
    "/",
    ensureTokenIsValidMiddleware,
    getAllProjectIdController
);

/**
 * Rota para obter um project pelo seu ID.
 *
 * @name GET /project/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o project existe.
 * @controller getProjectIdController - Retorna o project solicitado.
 */
projectRoutes.get(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Project, "Project"),
    getProjectIdController
);

/**
 * Rota para criar um novo project.
 *
 * @name POST /project
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @controller createProjectController - Cria um novo project.
 */
projectRoutes.post(
    "/",
    ensureTokenIsValidMiddleware,
    ensureDataIsValidMiddleware(projectCreateSchema),
    createProjectController
);

/**
 * Rota para atualizar um project pelo seu ID.
 *
 * @name PATCH /project/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o project existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @controller updateProjectController - Atualiza o project solicitado.
 */
projectRoutes.patch(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Project, "Project"),
    ensureDataIsValidMiddleware(projectUpdateSchema),
    updateProjectController
);

/**
 * Rota para deletar um project pelo seu ID.
 *
 * @name DELETE /project/:id
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @middleware ensureExistsMiddleware - Verifica se o project existe.
 * @controller deleteProjectController - Deleta o project solicitado.
 */
projectRoutes.delete(
    "/:id",
    ensureTokenIsValidMiddleware,
    ensureExistsMiddleware(Project, "Project"),
    deleteProjectController
);

export default projectRoutes;