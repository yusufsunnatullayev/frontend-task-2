import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://67a8d1746e9548e44fc22206.mockapi.io/products",
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
