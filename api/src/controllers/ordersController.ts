import { Request, Response } from "express";
import db from "../db";
import { ordersTable, orderItemsTable } from "../db/ordersSchema";
import { productsTable } from "../db/productsSchema";
import { and, eq, inArray } from "drizzle-orm";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = (req as any).cleanBody ?? req.body;
    const userId = (req as any).userId;

    console.log("createOrder payload:", JSON.stringify(payload));
    console.log("createOrder userId:", userId);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { order: orderData = {}, items = [] } = payload;

    // Validate product existence first
    const productIds = items.map((i: any) => i.productId);
    if (productIds.length > 0) {
      const existingProducts = await db
        .select({ id: productsTable.id })
        .from(productsTable)
        .where(inArray(productsTable.id, productIds));
      const foundIds = new Set(existingProducts.map((p: any) => p.id));
      const missing = productIds.filter((id: number) => !foundIds.has(id));
      if (missing.length > 0) {
        return res.status(400).json({
          error: "Invalid items",
          details: { missingProductIds: missing },
        });
      }
    }

    // TODO: Add validation for the product id and actual price of the product
    // Use a transaction to ensure atomicity
    const result = await (db as any).transaction(async (tx: any) => {
      const [orderRow] = await tx
        .insert(ordersTable)
        .values({ ...orderData, userId })
        .returning();

      if (!orderRow) {
        throw new Error("Order insertion failed");
      }

      let itemRows: any[] = [];
      if (Array.isArray(items) && items.length > 0) {
        const itemsToInsert = items.map((item: any) => ({
          ...item,
          orderId: orderRow.id,
        }));
        itemRows = await tx
          .insert(orderItemsTable)
          .values(itemsToInsert)
          .returning();
      }

      return { orderRow, itemRows };
    });

    return res
      .status(201)
      .json({ order: result.orderRow, items: result.itemRows });
  } catch (e: any) {
    // console.log(e);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: e?.message });
  }
};
