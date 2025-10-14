import { Request, Response } from "express";
import db from "../../src/db";
import { ordersTable } from "../db/ordersSchema";

export const createOrder = async (req: Request, res: Response) => {
  try {
    console.log(req.cleanBody);
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "Invalid order data" });
      return;
    }

    const [order] = await db
      .insert(ordersTable)
      .values({ userId: userId })
      .returning();
  } catch (e) {
    // console.log(e)
    res.status(500).json({ error: "Whoops! Must be that spaghetti code." });
  }
};
