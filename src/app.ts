import "express-async-errors";

import express, { Application } from "express";
import { handleError } from "./errors";
import sequelize from "./db/conn";
import cors from "cors";

const app: Application = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(cors());

// Rotas


// Errors
app.use(handleError);


// Servidor e conexão com banco
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);

    sequelize
        // .sync({ force: true })
        .sync()
        .then()
        .catch((error) => {
            console.log(error);
        });
});

export default app;