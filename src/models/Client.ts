import { DataTypes, Model } from "sequelize";

import sequelize from "../db/conn";
import { hashSync } from "bcrypt";
import { iClient, iClientCreate } from "../interfaces/client.interface";

class Client extends Model<iClient, iClientCreate> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare company: string;
    declare image: string;
    declare password: string;
}

Client.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255],
            },
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(55),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 120],
            },
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: { type: DataTypes.DATE },
    },
    { sequelize, modelName: "Client" }
);

Client.beforeCreate(async (aluno) => {
    const hashedSenha = hashSync(aluno.password, 10);
    aluno.password = hashedSenha;
});

Client.beforeUpdate(async (aluno) => {
    if (aluno.changed("password")) {
        const hashedSenha = hashSync(aluno.password, 10);
        aluno.password = hashedSenha;
    }
});

export default Client;