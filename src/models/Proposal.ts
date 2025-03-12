import { DataTypes, Model } from "sequelize";

import sequelize from "../db/conn";
import { iProposal, iProposalCreate } from "../interfaces/proposal.interface";
import Project from "./Project";
import Freelancer from "./Freelancer";

class Proposal extends Model<iProposal, iProposalCreate> {
    declare id: number;
    declare message: string;
    declare budget: number;
    declare deadline: Date;
    declare freelancer_id: number;
    declare proposal_id: number;
}

Proposal.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 255],
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
        freelancer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Freelancer, // Nome da tabela de freelancer
                key: "id", // Chave primária da tabela de freelancer
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Project, // Nome da tabela de projeto
                key: "id", // Chave primária da tabela de projeto
            },
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: { type: DataTypes.DATE },
    },
    { sequelize, modelName: "Proposal" }
);

// Relacionamento um para muitos
Proposal.belongsTo(Project, {onDelete: "cascade", foreignKey: "project_id"});
Project.hasMany(Proposal, {foreignKey: "project_id"});

Proposal.belongsTo(Freelancer, {onDelete: "cascade", foreignKey: "freelancer_id"});
Freelancer.hasMany(Proposal, {foreignKey: "freelancer_id"});

export default Proposal;