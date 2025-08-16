import type { Request, Response } from "express";

import Product from "../models/Product.model";
import type { ProductCreationType, ProductUpdateType } from "../types";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["price", "ASC"]],
    // Para excluir
    //  attributes: {
    //    exclude: ["createdAt", "updatedAt", "availability"],
    //  },
  });
  res.status(200).json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product)
    return res
      .status(404)
      .json({ error: `El producto con el id ${id} no existe` });
  res.status(200).json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  // Validacion si fuera en el controlador

  //   await check("name")
  //     .notEmpty()
  //     .withMessage("El nombre del producto no puede ir vacio")
  //     .run(req);
  //   await check("price")
  //     .isNumeric()
  //     .withMessage("El precio del producto debe ser un valor numerico valido")
  //     .notEmpty()
  //     .withMessage("El precio del producto no puede ir vacio")
  //     .custom((val) => val > 0)
  //     .withMessage("El precio debe ser un numero mayor a 0")
  //     .run(req);

  // Inyeccion SQL del producto
  ////////////////////////////////////////////
  // Metodo 1: Instanciando la clase del modelo
  // const product = new Product(req.body);
  // const savedProduct = await product.save();

  // Metodo 2: Creandolo y guardandolo directamente con el metodo de sequelize
  const product = await Product.create(req.body as ProductCreationType);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product)
    return res
      .status(404)
      .json({ error: `El producto con el id ${id} no existe` });

  // Actualizar todo - PUT
  await product.update(req.body as ProductUpdateType);
  await product.save();
  res.status(200).json({
    data: product,
  });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product)
    return res
      .status(404)
      .json({ error: `El producto con el id ${id} no existe` });

  // Modificar un solo campo especifico - PATCH
  product.availability = !product.availability;
  await product.save();
  res.status(200).json({
    data: product,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product)
    return res
      .status(404)
      .json({ error: `El producto con el id ${id} no existe` });

  await product.destroy();
  res.status(200).json({
    data: "Producto eliminado exitosamente",
  });
};
