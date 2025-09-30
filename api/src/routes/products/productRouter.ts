import { Router, Response, Request } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productController";

const productRouter = Router();

productRouter.get("/", listProducts);

productRouter.post("/", createProduct);

productRouter.get("/:id", getProductById);

productRouter.put("/:id", updateProduct);

productRouter.patch("/:id", deleteProduct); // this will be a soft delete

export default productRouter;
