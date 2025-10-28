import { Router } from "express";
import { loginUser, registerUSer } from "../../controllers/authController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createUserSchema, loginSchema } from "../../db/usersSchema";

const authRouter = Router();

authRouter.post("/register", validateData(createUserSchema), registerUSer);

authRouter.post("/login", validateData(loginSchema), loginUser);

export default authRouter;
