import { OpenApiBuilder } from "openapi3-ts/oas31";
import fg from "fast-glob";
import path from "path";

export default async function buildOasConfig() {
  const builder = OpenApiBuilder.create();

  builder.addOpenApiVersion("3.1.1").addInfo({
    title: "REST API Node.js / Express / TypeScript",
    version: "1.0.0",
    description: "API Docs for Products",
  });

  const isProd = process.env.NODE_ENV === "production";
  const docsPattern = isProd ? "**/*.docs.js" : "src/**/*.docs.ts";

  // Buscar todas las rutas de cada archivo .docs
  const files = await fg(docsPattern, {
    absolute: true,
  });

  // Iterar por cada ruta
  for (const file of files) {
    const module = await import(path.resolve(file));
    const register = module.default?.default ?? module.default ?? module;
    register(builder);
  }

  return builder.getSpec();
}
