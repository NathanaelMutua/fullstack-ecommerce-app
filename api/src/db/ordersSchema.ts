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
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export const insertOrderWithItemsSchema = createInsertSchema(
  ordersTable
).extend({
  items: createInsertSchema(orderItemsTable).array(),
});
