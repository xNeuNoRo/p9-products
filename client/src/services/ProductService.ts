import { safeParse, string, number, parse, pipe, transform } from "valibot";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
  type Product,
} from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (!result.success) throw new Error("Invalid data");

    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    await axios.post(url, result.output);
  } catch (err) {
    console.log(err);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);
    if (!result.success) throw new Error("Data de la API malformada");
    return result.output;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if (!result.success) throw new Error("Data de la API malformada");
    return result.output;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });

    if (!result.success) throw new Error("Invalid data");

    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.put(url, result.output);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (err) {
    console.log(err);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (err) {
    console.log(err);
  }
}
