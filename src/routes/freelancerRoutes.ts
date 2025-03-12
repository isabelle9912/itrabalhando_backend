import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import {
    createFreelancerController,
    deleteFreelancerController,
    getAllFreelancerIdController,
    getFreelancerIdController,
    updateFreelancerController,
} from "../controllers/freelancerController";
import Freelancer from "../models/Freelancer";
import {
    freelancerCreateSchema,
    freelancerUpdateSchema,
} from "../schemas/freelancer.schema";

const freelancerRoutes = Router();

/**
 * Rota para obter todos os freelancers
 *
 * @name GET /freelancer/all/
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getAllFreelancerIdController - Retorna os freelancers.
 */
freelancerRoutes.get(
    "/",
    ensureTokenIsValidMiddleware,
    getAllFreelancerIdController
);

/**
 * Rota para obter um freelancer pelo seu ID.
 *
 * @name GET /freelancer/:id
 * @middleware ensureExistsMiddleware - Verifica se o freelancer existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller getFreelancerIdController - Retorna o freelancer solicitado.
 */
freelancerRoutes.get(
    "/:id",
    ensureExistsMiddleware(Freelancer, "Freelancer"),
    ensureTokenIsValidMiddleware,
    getFreelancerIdController
);

/**
 * Rota para criar um novo freelancer.
 *
 * @name POST /freelancer
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @controller createFreelancerController - Cria um novo freelancer.
 */
freelancerRoutes.post(
    "/",
    ensureDataIsValidMiddleware(freelancerCreateSchema),
    createFreelancerController
);

/**
 * Rota para atualizar um freelancer pelo seu ID.
 *
 * @name PATCH /freelancer/:id
 * @middleware ensureExistsMiddleware - Verifica se o freelancer existe.
 * @middleware ensureDataIsValidMiddleware - Valida o corpo da requisição conforme o schema.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller updateFreelancerController - Atualiza o freelancer solicitado.
 */
freelancerRoutes.patch(
    "/:id",
    ensureExistsMiddleware(Freelancer, "Freelancer"),
    ensureDataIsValidMiddleware(freelancerUpdateSchema),
    ensureTokenIsValidMiddleware,
    updateFreelancerController
);

/**
 * Rota para deletar um freelancer pelo seu ID.
 *
 * @name DELETE /freelancer/:id
 * @middleware ensureExistsMiddleware - Verifica se o freelancer existe.
 * @middleware ensureTokenIsValidMiddleware - Valida o token de autenticação.
 * @controller deleteFreelancerController - Deleta o freelancer solicitado.
 */
freelancerRoutes.delete(
    "/:id",
    ensureExistsMiddleware(Freelancer, "Freelancer"),
    ensureTokenIsValidMiddleware,
    deleteFreelancerController
);

export default freelancerRoutes;