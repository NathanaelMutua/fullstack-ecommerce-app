const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  const data = await res.json;
  if (!res.ok) {
    throw new Error("Error");
  }
  return data;
}
