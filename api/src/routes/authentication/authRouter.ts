import { Router } from "express";
import { registerUSer } from "../../controllers/authController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createUserSchema } from "../../db/usersSchema";

const authRouter = Router();

authRouter.post("/register", validateData(createUserSchema), registerUSer);
authRouter.post("/login", () => {});

export default authRouter;
