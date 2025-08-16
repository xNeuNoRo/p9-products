import { Router } from "express";
import { param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/products";
import { handleInputErrors } from "./middlewares/handleInputErrors";
import {
  idValidation,
  createValidation,
} from "./middlewares/productsValidation";

const router: Router = Router();

router.get("/", getProducts);
// :id automaticamente crea un param con el nombre "id"
// Que capturara el valor ingresado despues de /api/products/AQUI VENDRIA EL ID
router.get("/:id", idValidation, handleInputErrors, getProductById);

router.post(
  "/",
  // Si hiciera la validacion directamente desde el router
  // body("name")
  //   .notEmpty()
  //   .withMessage("El nombre del producto no puede ir vacio"),

  // body("price")
  //   .isNumeric()
  //   .withMessage("El precio del producto debe ser un valor numerico valido")
  //   .notEmpty()
  //   .withMessage("El precio del producto no puede ir vacio")
  //   .custom((val) => val > 0)
  //   .withMessage("El precio debe ser un numero mayor a 0"),
  createValidation,
  handleInputErrors,
  createProduct,
);

router.put("/:id", idValidation, handleInputErrors, updateProduct);

router.patch("/:id", idValidation, handleInputErrors, updateAvailability);

router.delete("/:id", idValidation, handleInputErrors, deleteProduct);

export default router;
