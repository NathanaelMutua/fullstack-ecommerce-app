import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/ordersSchema";
import { verifyToken } from "../../middlewares/authMiddleware";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../../controllers/ordersController";

const ordersRouter = Router();

ordersRouter.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

ordersRouter.get("/", verifyToken, listOrders);

ordersRouter.get("/:id", verifyToken, getOrder);

ordersRouter.put(
  "/:id",
  verifyToken,
  validateData(updateOrderSchema),
  updateOrder
);

export default ordersRouter;
