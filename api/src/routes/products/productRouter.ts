import { Router, Response, Request } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  softDeleteProduct,
  updateProduct,
} from "../../controllers/productController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import {
  verifyAdmin,
  verifySeller,
  verifyToken,
} from "../../middlewares/authMiddleware.js";

const productRouter = Router();

productRouter.get("/", listProducts);
productRouter.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
productRouter.get("/:id", getProductById);
productRouter.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
productRouter.patch("/:id", verifyToken, verifySeller, softDeleteProduct); // this will be a soft delete
productRouter.patch("/:id", verifyAdmin, deleteProduct);

export default productRouter;
