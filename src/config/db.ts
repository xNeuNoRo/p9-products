import { Sequelize } from "sequelize-typescript";

// Cargar variables de entorno
process.loadEnvFile(".env");

const db = new Sequelize(process.env.DB_URI as string, {
  models: [__dirname + "/../models/**/*.ts"],
});

export default db;
