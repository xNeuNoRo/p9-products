import db from "../config/db";
import { connectDB } from "../server";

// le dice a Jest: “cuando alguien importe ../config/db, dales un mock en vez del módulo real.”
jest.mock("../config/db"); // Justamente como lo importe

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    // Interceptamos el método "authenticate" de db con jest.spyOn
    // Esto reemplaza temporalmente la función real por un mock controlado.
    // Aquí simulamos que la promesa de "authenticate" falla con un Error.
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Error de conexion inesperado"));

    // Espiamos console.log
    // Queremos verificar que connectDB escribe un log cuando falla la conexión.
    const consoleSpy = jest.spyOn(console, "log");

    // Ejecutamos la función que queremos probar
    // Como authenticate ahora "falla" (mockRejectedValueOnce), connectDB
    // debería capturar ese error y hacer console.log de un mensaje.
    await connectDB();

    // verificamos que console.log fue llamado con el mensaje esperado
    // "expect.stringContaining" nos permite no chequear el string exacto completo,
    // solo asegurarnos de que contenga la parte relevante del mensaje de error.
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la DB"),
    );
  });
});
