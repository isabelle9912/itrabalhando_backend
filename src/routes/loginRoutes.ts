import { Router } from "express";
import { loginController } from "../controllers/loginController";

const loginRoutes: Router = Router();

loginRoutes.post("/user", loginController);

export default loginRoutes;