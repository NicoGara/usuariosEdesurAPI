import express from "express";
import routes from "./router/rUsers.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(routes)


// Iniciar el servidor en el puerto 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});