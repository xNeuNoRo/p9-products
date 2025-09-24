import type { OpenApiBuilder } from "openapi3-ts/oas31";

export default function registerProducts(builder: OpenApiBuilder) {
  builder.addTag({
    name: "Products",
    description: "API operations related to products",
  });

  builder.addSchema("Product", {
    type: "object",
    properties: {
      id: { type: "string", example: "1", description: "The Product ID" },
      name: {
        type: "string",
        example: "Monitor Gaming de 27 pulgadas",
        description: "The Product name",
      },
      price: { type: "number", example: 300, description: "The Product price" },
      availability: {
        type: "boolean",
        example: true,
        description: "The Product availability",
      },
    },
  });

  builder
    .addPath("/api/products", {
      get: {
        tags: ["Products"],
        summary: "Get a list of products",
        description: "Return a list of products",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Creates new product",
        tags: ["Products"],
        description: "Returns a new record in the database",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Monitor Curvo 49 Pulgadas",
                  },
                  price: {
                    type: "number",
                    example: 799,
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created sucessfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Bad Request - invalid input data",
          },
        },
      },
    })
    .addPath("/api/products/{id}", {
      get: {
        summary: "Get a product by id",
        tags: ["Products"],
        description: "Return a product based on its unique ID",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The ID of the product to retrieve",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  items: { $ref: "#/components/schemas/Product" },
                },
              },
            },
          },
          "404": {
            description: "Not Found",
          },
          "400": {
            description: "Bad Request - invalid ID",
          },
        },
      },
      put: {
        summary: "Updates a product with user input",
        tags: ["Products"],
        description: "Returns the updated product",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The ID of the product to update",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Monitor Curvo 49 Pulgadas",
                  },
                  price: {
                    type: "number",
                    example: 799,
                  },
                  availability: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Bad Request - invalid ID or invalid input data",
          },
          "404": {
            description: "Product Not Found",
          },
        },
      },
      patch: {
        summary: "Updates product availability",
        tags: ["Products"],
        description: "Returns the updated availability",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The ID of the product to update",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Bad Request - invalid ID",
          },
          "404": {
            description: "Product Not Found",
          },
        },
      },
      delete: {
        summary: "Delete a product",
        tags: ["Products"],
        description: "Returns a confirmation message",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The ID of the product to delete",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
          },
          "400": {
            description: "Bad Request - invalid ID",
          },
          "404": {
            description: "Product Not Found",
          },
        },
      }
    })
}
