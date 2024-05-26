import express from "express";
import * as UserController from "../controllers/UserController";
import { ensureAuth } from "../middlewares/authenticator";

// Router-level middleware
const UserRoutes = express.Router(); //para poder crear rutas para el API

// Routes
UserRoutes.get("/User", UserController.getUsers);
UserRoutes.get("/User/:id", ensureAuth, UserController.getUser);

export default UserRoutes;
