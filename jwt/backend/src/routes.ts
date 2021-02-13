import { Router } from "express";
import UserController from "./controllers/UserController";
import authentication from "./middleware/authentication";

const routes = Router();

routes.post("/login", UserController.login);
routes.get("/users", authentication.validate, UserController.index);

export default routes;
