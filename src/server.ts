import app from "./app";
import connect from "./db/conn";

// Servidor e conexão com banco
app.listen(3000);
connect
    // .sync({ force: true }) // Drop nas tabelas
    .sync()
    .then()
    .catch((error: any) => {
        console.log(error);
    });