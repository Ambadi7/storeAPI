import axios from "axios";

const BASE_URL = "https://dummyjson.com";

/**
 * Validates that the API response has the expected structure.
 * Throws if the response is missing required fields.
 */
function validateProductsResponse(data) {
  if (!data || !Array.isArray(data.products)) {
    throw new Error("Invalid API response: expected a products array.");
  }
}

/**
 * Validates a single product object has the fields needed for rendering.
 */
function isValidProduct(product) {
  return (
    product.id != null &&
    typeof product.title === "string" &&
    typeof product.price === "number" &&
    typeof product.category === "string" &&
    product.rating != null &&
    Array.isArray(product.images) &&
    product.images.length > 0
  );
}

export async function fetchProducts() {
  const response = await axios.get(`${BASE_URL}/products?limit=30`);
  validateProductsResponse(response.data);

  const validProducts = response.data.products.filter(isValidProduct);

  if (validProducts.length === 0) {
    throw new Error("No valid products found in the API response.");
  }

  return validProducts;
}

export async function fetchCategories() {
  const response = await axios.get(`${BASE_URL}/products/categories`);
  // DummyJSON returns an array of category objects: [{ slug, name, url }]
  if (!Array.isArray(response.data)) {
    return [];
  }
  return response.data;
}
