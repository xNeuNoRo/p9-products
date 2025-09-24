import {
  useNavigate,
  Form,
  redirect,
  type ActionFunctionArgs,
  useFetcher,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  if (!params.id) throw new Error("ID de producto no valido");
  await deleteProduct(+params.id);
  return redirect("/");
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { Form: FetcherForm } = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <FetcherForm method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable
                ? "text-black border-black-100 hover:bg-black"
                : "text-red-600 border-red-600 hover:bg-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full hover:cursor-pointer hover:text-white border transition duration-300`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
          {/* Otra forma de hacerlo es con un input hidden */}
          {/* <input type="hidden" name="id" value={product.id} /> */}
        </FetcherForm>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              navigate(
                `/productos/${product.id}/editar` /*{ state: { product }, }*/
              )
            }
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs hover:cursor-pointer hover:bg-indigo-700 transition"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`/productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Deseas eliminar este producto?")) {
                e.preventDefault(); // el action no se ejecuta aunque se le de a cancelar el mensaje gracias al preventDefault
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs hover:cursor-pointer hover:bg-red-700 transition"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
