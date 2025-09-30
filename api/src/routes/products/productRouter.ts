import { Router, Response, Request } from "express";

export const productRouter = Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.send("List of products");
});

productRouter.post("/", (req: Request, res: Response) => {
  res.send("Create New product");
});

productRouter.get("/:id", (req: Request, res: Response) => {
  res.send("Specific product");
});
