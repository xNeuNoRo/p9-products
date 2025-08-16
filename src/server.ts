import type { Express } from "express";
import colors from "colors";
import express from "express";
import productsRouter from "./router";
import db from "./config/db";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync(); // Va a sincronizar cualquier cambio de la db
    console.log(colors.green.bold("Conexion exitosa a la DB"));
  } catch (err) {
    console.log(colors.red.bold("Hubo un error al conectar a la DB"));
    console.log(err);
  }
}

connectDB();

// Instancia de express
const server: Express = express();

// Leer datos de formularios JSON
server.use(express.json());

// todas las request pasan por .use() y luego por el metodo ya sea GET,POST,etc...
// El handler serian las rutas
// Si cambio el "/" se aplicaran a todas las rutas,
// Si pongo "/api" aplicara a cada ruta especificada en el handler
// Y tambien si cambio cada una de las rutas a por ej: /getinfo
// seria /api/productos/getinfo para esa ruta especifica
server.use("/api/products", productsRouter);

export default server;
