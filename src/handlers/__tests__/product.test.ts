import request from "supertest";

import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(201);
  });

  it("should validate that the name of the product is valid", async () => {
    const testProduct = {
      name: "",
      price: 999,
    };

    const response = await request(server)
      .post("/api/products")
      .send(testProduct);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(201);
  });

  it("should validate that the price is greater than 0", async () => {
    const testProduct = {
      name: "Producto de prueba",
      price: -999,
    };

    const response = await request(server)
      .post("/api/products")
      .send(testProduct);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(201);
  });

  it("should validate that the price is a number and greater than 0", async () => {
    const testProduct = {
      name: "Producto de prueba",
      price: "Test",
    };

    const response = await request(server)
      .post("/api/products")
      .send(testProduct);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(201);
  });

  it("should create a new product", async () => {
    const testProduct = {
      name: "Producto de prueba",
      price: 999,
    };

    const response = await request(server)
      .post("/api/products")
      .send(testProduct);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    // Para que coincida solamente en esas dos propiedades
    expect(response.body.data).toMatchObject(testProduct);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("GET /api/products", () => {
  it("should check if api/products url exists", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).not.toBe(404);
  });

  it("GET a JSON Response with all products", async () => {
    const res = await request(server).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/i);
    expect(res.body).toHaveProperty("data");
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("should return a 404 response for a non exist product", async () => {
    const productId = 999;
    const res = await request(server).get(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.status).not.toBe(200);
  });

  it("should check a valid ID in the url", async () => {
    const productId = "test";
    const res = await request(server).get(`/api/products/${productId}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.status).not.toBe(200);
  });

  it("should get a JSON response for a single product", async () => {
    const productId = 1;
    const res = await request(server).get(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).not.toHaveProperty("errors");
    expect(res.status).not.toBe(404);
  });
});

describe("PUT /api/products/:id", () => {
  it("should check a valid ID in the url", async () => {
    const productId = "test";
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Producto de prueba - Actualizado",
      price: 777,
      availability: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.status).not.toBe(200);
  });

  it("should display validation error messages when updating a product", async () => {
    const productId = 1;
    const res = await request(server)
      .put(`/api/products/${productId}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should validate that the price is greater than 0", async () => {
    const productId = 1;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Producto de prueba - Actualizado",
      price: -999,
      availability: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(1);
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return a 404 response for a non-existent product", async () => {
    const productId = 999;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Producto de prueba - Actualizado",
      price: 888,
      availability: true,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should update an existing product with valid data", async () => {
    const productId = 1;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Producto de prueba - Actualizado",
      price: 888,
      availability: true,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeTruthy();
    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  it("should check a valid ID", async () => {
    const productId = "test";
    const res = await request(server).patch(`/api/products/${productId}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return a 404 response for a non-existing product", async () => {
    const productId = 999;
    const res = await request(server).patch(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should update product availability", async () => {
    const productId = 1;
    const res = await request(server).patch(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.status).not.toBe(400);
    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("DELETE /api/products/:id", () => {
  it("should check a valid ID", async () => {
    const productId = "test";
    const res = await request(server).delete(`/api/products/${productId}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.status).not.toBe(200);
  });

  it("should return a 404 response for a non-existent product", async () => {
    const productId = 999;
    const res = await request(server).delete(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.status).not.toBe(200);
  });

  it("should delete a product", async () => {
    const productId = 1;
    const res = await request(server).delete(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).not.toHaveProperty("error");
    expect(res.status).not.toBe(400);
    expect(res.status).not.toBe(404);
  });
});
