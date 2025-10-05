import { Router, Response, Request } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../../controllers/productController";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";

const productRouter = Router();

productRouter.get("/", listProducts);
productRouter.post("/", validateData(createProductSchema), createProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", validateData(updateProductSchema), updateProduct);
productRouter.patch("/:id", deleteProduct); // this will be a soft delete

export default productRouter;
