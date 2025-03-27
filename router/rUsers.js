import { Router } from "express";
import cUsers from "../controllers/cUsers.js";



const routes = Router();

routes.get("/",cUsers.getUsers)


export default routes;