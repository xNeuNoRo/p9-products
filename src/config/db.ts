import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";

// Cargar variables de entorno
dotenv.config({ quiet: true });

const db = new Sequelize(process.env.DB_URI as string, {
  models: [__dirname + "/../models/**/*.ts"],
  logging: false,
});

export default db;
