import type { InferAttributes } from "sequelize";

import type Product from "../models/Product.model";

export type ProductType = InferAttributes<Product>;
export type ProductCreationType = Pick<ProductType, "name" | "price">;
export type ProductUpdateType = Pick<
  ProductType,
  "name" | "price" | "availability"
>;
