import { Request, Response } from "express";

export const createProduct = (req: Request, res: Response) => {
  res.send("created");
  console.log(req.body);
};

export const listProducts = (req: Request, res: Response) => {
  res.send("the list of products 123");
};

export const getProductById = (req: Request, res: Response) => {
  res.send("specific product");
};

// soft delete
export const deleteProduct = (req: Request, res: Response) => {
  res.send("deleted product");
};

export const updateProduct = (req: Request, res: Response) => {
  res.send("specific product");
};
