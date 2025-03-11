import {NextFunction, Request, Response} from "express";
import { iLogin, iLoginResponse } from "../interfaces/login.interface";
import {loginService} from "../services/loginService";

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload: iLogin = req.body;

        // Chama o serviço de login
        const loginResponse: iLoginResponse = await loginService(payload);

        // Retorna a resposta com o token e os dados do usuário
        res.status(200).json(loginResponse);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

export { loginController };