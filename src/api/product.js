import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:8000/products",
});

export async function getProducts() {
  const response = await productsApi.get("/");
  if (!response.data) throw new Error("Failed to fetch products");

  return response.data;
}

export async function getProductById(productId) {
  const response = await productsApi.get(`/${productId}`);
  if (!response.data) throw new Error("Failed to get product by id");

  return response.data;
}
