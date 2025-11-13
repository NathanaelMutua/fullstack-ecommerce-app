import { Request, Response } from "express";
import db from "../db/index.js";
import { ordersTable, orderItemsTable } from "../db/ordersSchema.js";
import { productsTable } from "../db/productsSchema.js";
import { eq, inArray } from "drizzle-orm";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = (req as any).cleanBody ?? req.body;
    const userId = (req as any).userId;

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
    return res.status(500).json({
      error: "Whoops! Must be that spaghetti code",
      message: e?.message,
    });
  }
};

// if req.role is admin, list all orders
// if req.role is seller, list all orders for the seller
// if req.role is user, list all orders for the user based on the userId
export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    return res.status(200).json(orders);
  } catch (e: any) {
    return res.status(500).json({
      error: "Whoops! Must be that spaghetti code",
      message: e?.message,
    });
  }
}

export async function getOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    if (orderWithItems.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    } else {
      const mergedOrder = {
        ...orderWithItems[0],
        items: orderWithItems.map((item) => item.order_items),
      };
      return res.status(200).json(mergedOrder);
    }
  } catch (e: any) {
    // console.log(e);
    return res.status(500).json({
      error: "Whoops! Must be that spaghetti code",
      message: e?.message,
    });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const [updateOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updateOrder) {
      return res.status(404).json({ error: "Order not found" });
    } else {
      return res.status(200).json({ message: "Order updated", updateOrder });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Whoops! Must be that spaghetti code",
      message: e?.message,
    });
  }
}
