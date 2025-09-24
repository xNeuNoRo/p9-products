import colors from "colors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import setupOas from "./config/openapi";
import express, { Request, Response, type Express } from "express";
import cors, { type CorsOptions } from "cors";

import db from "./config/db";
import productsRouter from "./router";

export async function connectDB() {
  try {
    await db.authenticate();
    void db.sync(); // Va a sincronizar cualquier cambio de la db
    // console.log(colors.green.bold("Conexion exitosa a la DB"));
  } catch (err) {
    console.log(
      colors.red.bold(
        `Hubo un error al conectar a la DB:\n${err instanceof Error && err.message}`,
      ),
    );
  }
}

void connectDB();

// Instancia de express
const server: Express = express();
const isTesting = process.env.NODE_ENV === "test";

server.get("/test", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (
      ((process.env.NODE_ENV === "development" || isTesting) && !origin) ||
      origin === process.env.FRONTEND_URL
    ) {
      // El primero parametro es si hay un error para no permitir la conexion, le pasamos null para evitarlo
      // El segundo parametro es si se permite o no la conexion
      callback(null, true);
    } else {
      // Tirar error de que no se permite esa conexion
      // Por defecto se bloquean peticiones asi que no es necesario poner "false" manual
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));

// Leer datos de formularios JSON
server.use(express.json());

// HTTP requests logger
if (!isTesting) server.use(morgan("dev"));

// todas las request pasan por .use() y luego por el metodo ya sea GET,POST,etc...
// El handler serian las rutas
// Si cambio el "/" se aplicaran a todas las rutas,
// Si pongo "/api" aplicara a cada ruta especificada en el handler
// Y tambien si cambio cada una de las rutas a por ej: /getinfo
// seria /api/productos/getinfo para esa ruta especifica
server.use("/api/products", productsRouter);

// Documentacion
// IIFE para esperar a que carguen los docs
if (process.env.NODE_ENV !== "test" || process.env.NODE_ENV === undefined) {
  (async () => {
    const OAS_Spec = await setupOas();

    server.use("/docs", swaggerUi.serve, swaggerUi.setup(OAS_Spec));
  })();
}

export default server;
