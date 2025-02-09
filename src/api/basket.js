import axios from "axios";

const basketApi = axios.create({
  baseURL: "https://67a8d1746e9548e44fc22206.mockapi.io/basket",
});

// Add Product 🚩
export async function postProduct(productData) {
  const response = await basketApi.post("/", productData);
  if (response.status !== 201)
    throw new Error("Failed to post product to basket");

  return response.data;
}

// Get Products 🚩
export async function getBasketProducts() {
  const response = await basketApi.get("/");
  if (!response.data) throw new Error("Failed to fetch basket");

  return response.data;
}

// Update Product 🚩
export async function updateProduct(updatedProduct) {
  if (!updatedProduct.id) {
    throw new Error("Product ID is missing in update request");
  }

  const response = await basketApi.put(`/${updatedProduct.id}`, updatedProduct);

  if (response.status !== 200) {
    throw new Error("Failed to update product in basket");
  }

  return response.data;
}

// Get Product by ID 🚩
export async function getBasktetProductById(productId) {
  const response = await basketApi.get(`/${productId}`);
  if (!response.data) throw new Error("Failed to get product by id");

  return response.data;
}

// Delete Product 🚩
export async function deleteProduct(productId) {
  const response = await basketApi.delete(`/${productId}`);
  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete product from basket");
  }

  return response.data;
}
