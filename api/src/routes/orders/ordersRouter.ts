import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../../controllers/ordersController.js";

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
