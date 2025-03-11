import { DataTypes, Model } from "sequelize";

import sequelize from "../db/conn";
import { hashSync } from "bcrypt";
import { iFreelancer, iFreelancerCreate } from "../interfaces/freelancer.interface";

class Freelancer extends Model<iFreelancer, iFreelancerCreate> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare skills: string[];
    declare bio: string;
    declare image: string;
    declare password: string;
}

Freelancer.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255],
            },
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: false,
            validate: {
              len: [10, 255],
            }
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
    { sequelize, modelName: "Freelancer" }
);

Freelancer.beforeCreate(async (aluno) => {
    const hashedSenha = hashSync(aluno.password, 10);
    aluno.password = hashedSenha;
});

Freelancer.beforeUpdate(async (aluno) => {
    if (aluno.changed("password")) {
        const hashedSenha = hashSync(aluno.password, 10);
        aluno.password = hashedSenha;
    }
});

export default Freelancer;