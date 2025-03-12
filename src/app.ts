import "express-async-errors";

import express, { Application } from "express";
import { handleError } from "./errors";
import sequelize from "./db/conn";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes";
import loginRoutes from "./routes/loginRoutes";
import freelancerRoutes from "./routes/freelancerRoutes";

const app: Application = express();
const port = 8000;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(cors());

// Rotas
app.use("/api/login", loginRoutes)
app.use("/api/client", clientRoutes);
app.use("/api/freelancer", freelancerRoutes);

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