import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return await getProducts();
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  return await updateProductAvailability(+data.id);
}

export default function Products() {
  const products = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to={"/productos/nuevo"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((p) => <ProductDetails key={p.id} product={p} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
