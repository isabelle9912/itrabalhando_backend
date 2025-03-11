import "dotenv/config";

const POSTGRES_HOST = process.env.POSTGRES_HOST!;
const POSTGRES_DB = process.env.POSTGRES_DB!;
const POSTGRES_USER = process.env.POSTGRES_USER!;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD!;


import { Sequelize } from "sequelize";

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: "postgres",
    ssl: true,
    /*
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Para resolver erros de certificado SSL
        }
    },

     */
});

// Sincronizar os modelos
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado com o banco!");
    } catch (error) {
        console.error(`Não foi possível conectar: ${error}`);
    }
})();

export default sequelize;