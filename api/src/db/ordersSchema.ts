import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { productsTable } from "./productsSchema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("Now"),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(), // fixed price at time of the order
});

export const InsertOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

export const insertOrderItemsSchema = createInsertSchema(orderItemsTable)
  .omit({
    orderId: true,
  })
  .extend({
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  });

export const insertOrderWithItemsSchema = z.object({
  order: InsertOrderSchema,
  items: z.array(insertOrderItemsSchema).min(1),
});
