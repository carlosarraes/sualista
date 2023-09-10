import { sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  unique,
  real,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    name: text("name"),
    hashedPassword: text("hashed_password").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at"),
  },
  (t) => ({
    unq: unique().on(t.email),
  }),
);

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export const shoppingLists = sqliteTable("shopping_lists", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export type ShoppingList = typeof shoppingLists.$inferSelect;
export type ShoppingListInsert = typeof shoppingLists.$inferInsert;

export const products = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
});

export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;

export const variants = sqliteTable("variants", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  latestPrice: real("latest_price").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
});

export type Variant = typeof variants.$inferSelect;
export type VariantInsert = typeof variants.$inferInsert;

export const listProducts = sqliteTable("list_products", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  quantity: integer("quantity").notNull(),
  variantId: integer("variant_id")
    .references(() => variants.id)
    .notNull(),
  shoppingListId: integer("shopping_list_id")
    .references(() => shoppingLists.id)
    .notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
});

export type ListProduct = typeof listProducts.$inferSelect;
export type ListProductInsert = typeof listProducts.$inferInsert;

export const priceHistory = sqliteTable("price_history", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  price: real("price").notNull(),
  variantId: integer("variant_id")
    .references(() => variants.id)
    .notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
});

export type PriceHistory = typeof priceHistory.$inferSelect;
export type PriceHistoryInsert = typeof priceHistory.$inferInsert;
