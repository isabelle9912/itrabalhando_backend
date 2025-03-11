import { AppError } from "../errors";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";
import Client from "../models/Client";
import Freelancer from "../models/Freelancer";
import { iLogin, iLoginResponse } from "../interfaces/login.interface";
import { clientWithoutPassSchema } from "../schemas/client.schema";
import { freelancerWithoutPassSchema } from "../schemas/freelancer.schema";

const compareCredentials = async (
    password: string,
    user: Freelancer | Client,
    role: string
): Promise<string> => {
    const matchPass = await compare(password, user.dataValues.password);

    if (!matchPass) {
        throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign({ role }, process.env.SECRET_KEY!, {
        expiresIn: "72h",
        subject: user.dataValues.id.toString(),
    });

    return token;
};

export const loginService = async (
    payload: iLogin
): Promise<iLoginResponse> => {
    const client = await Client.findOne({ where: { email: payload.email } });
    const freelancer = await Freelancer.findOne({ where: { email: payload.email } });

    if (client) {
        const token = await compareCredentials(payload.password, client, "client");
        return {
            accessToken: token,
            role: "client",
            User: clientWithoutPassSchema.parse(client),
        };
    } else if (freelancer) {
        const token = await compareCredentials(payload.password, freelancer, "freelancer");
        return {
            accessToken: token,
            role: "freelancer",
            User: freelancerWithoutPassSchema.parse(freelancer),
        };
    }

    throw new AppError("Credenciais inválidas", 401);
};