import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq, and } from "drizzle-orm";

// Creating a Product:  Adding it to the Database
export const createProduct = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: "Error: It must be the spaghetti code" });
  }
};

// Listing all available non-deleted products
export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.isDeleted, false));

    res.status(200).json(products);
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: "Error: It must be the spaghetti code" });
  }
};

// Displaying a specific product if product is non-deleted or present
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [product] = await db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.id, Number(id)),
          eq(productsTable.isDeleted, false)
        )
      );

    if (!product) {
      res.status(404).json({ message: "Product Not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: "Error: It must be the spaghetti code" });
  }
};

// soft delete
export const softDeleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [deletedProduct] = await db
      .update(productsTable)
      .set({ isDeleted: true })
      .where(eq(productsTable.id, id))
      .returning();

    if (deletedProduct) {
      res.status(204).json({ message: `Product deleted` });
    } else {
      res.status(404).json({ message: "Product Not found" });
    }
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: "Error: It must be the spaghetti code" });
  }
};

// hard delete
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [erasedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (erasedProduct) {
      res.status(204).json({ message: `Product deleted from database` });
    } else {
      res.status(404).json({ message: "Product Not found" });
    }
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: "Error: It must be the spaghetti code" });
  }
};

// Update Product based on body request
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    const [updatedProduct] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(and(eq(productsTable.id, id), eq(productsTable.isDeleted, false)))
      .returning();

    if (updatedProduct) {
      res.status(200).json({ message: "Product updated", updatedProduct });
    } else {
      res.status(404).json({ message: "Product Not found" });
    }
  } catch (e) {
    // console.log(e)
    res.status(500).json({ message: "Error: It must be the spaghetti code" });
  }
};
