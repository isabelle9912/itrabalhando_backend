import { DataTypes, Model } from "sequelize";

import sequelize from "../db/conn";
import { iProject, iProjectCreate } from "../interfaces/project.interface";
import Client from "./Client";

class Project extends Model<iProject, iProjectCreate> {
    declare id: number;
    declare description: string;
    declare budget: number;
    declare deadline: Date;
    declare skillsRequired: string[];
    declare client_id: number;
}

Project.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 55],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 120],
            },
        },
        budget: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true, // Validação de data
            },
        },
        skillsRequired: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Array de strings
            allowNull: false,
            validate: {
                notEmpty: true, // Validação de array não vazio
            },
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client, // Nome da tabela de cliente
                key: "id", // Chave primária da tabela de cliente
            },
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: { type: DataTypes.DATE },
    },
    { sequelize, modelName: "Project" }
);

// Relacionamento um para muitos
Project.belongsTo(Client, {onDelete: "cascade", foreignKey: "client_id"});
Client.hasMany(Project, {foreignKey: "client_id"});

export default Project;