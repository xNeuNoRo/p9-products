import { OpenApiBuilder } from "openapi3-ts/oas31";
import fg from "fast-glob";

export default async function buildOasConfig() {
  const builder = OpenApiBuilder.create();

  builder.addOpenApiVersion("3.1.1").addInfo({
    title: "REST API Node.js / Express / TypeScript",
    version: "1.0.0",
    description: "API Docs for Products",
  });

  const isProd = process.env.NODE_ENV === "production";

  // Buscar todas las rutas de cada archivo .docs
  const files = await fg(`src/**/*.docs.${isProd ? "js" : "ts"}`, {
    absolute: true,
  });

  // Iterar por cada ruta
  for (const file of files) {
    const module = await import(file);
    const register = module.default;
    register(builder);
  }

  return builder.getSpec();
}
