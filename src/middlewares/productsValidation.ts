import { check, param } from "express-validator";

export const createValidation = [
  check("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),
  check("price")
    .isNumeric()
    .withMessage("El precio del producto debe ser un valor numerico valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((val) => val > 0)
    .withMessage("El precio debe ser un numero mayor a 0"),
];

export const idValidation = [param("id").isInt().withMessage("ID no valido")];

// export const updateValidation = [
//   ...createValidation,
//   check("availability")
//     .isBoolean()
//     .withMessage("La disponibilidad debe ser un booleano valido"),
// ];
