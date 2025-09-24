//import color from "colors";
import { exit } from "node:process";

import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    //console.log(color.green.bold("Se ha limpiado exitosamente la BD."));
    exit(0);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    exit(1);
  }
};

if (process.argv[2] == "--clear") void clearDB();
// process.argv arroja todos los comandos ejecutados 1x1
// y normalmente de la posicion [2] en adelante es donde empezamos a agregar nuevos
