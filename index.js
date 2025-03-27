import express from "express";
import routes from "./router/rUsers.js";


const app = express();
const PORT = 3001;

app.use(routes)


// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
