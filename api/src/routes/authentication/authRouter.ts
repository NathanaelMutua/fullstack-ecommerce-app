import { Router } from "express";
import { registerUSer } from "../../controllers/authController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createUserSchema, loginSchema } from "../../db/usersSchema.js";

const authRouter = Router();

authRouter.post("/register", validateData(createUserSchema), registerUSer);
authRouter.post("/login", validateData(loginSchema));

export default authRouter;
