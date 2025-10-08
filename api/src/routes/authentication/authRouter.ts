import { Router } from "express";
import { registerUSer } from "../../controllers/authController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createUserSchema, loginSchema } from "../../db/usersSchema";

const authRouter = Router();

authRouter.post("/register", validateData(createUserSchema), registerUSer);
authRouter.post("/login", validateData(loginSchema));

export default authRouter;
