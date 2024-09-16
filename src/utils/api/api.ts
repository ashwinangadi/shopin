import { queryOptions } from "@tanstack/react-query";

export async function getSingleProduct({ id }: { id: string }) {
  const url = `https://dummyjson.com/products/${id}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getCategories() {
  const url = "https://dummyjson.com/products/categories";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const result = await response.json();
    // console.log("resultcateg", result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProducts({
  category,
  sortBy,
  orderBy,
}: {
  category?: string | null;
  sortBy?: string | null;
  orderBy?: string | null;
}) {
  const selectedCategory = category || null;
  const sort = sortBy || "rating";
  const order = orderBy || "desc";

  const catagoryProductsurl = `https://dummyjson.com/products/category/${selectedCategory}?sortBy=${sort}&order=${order}`;
  const allProductsurl = `https://dummyjson.com/products?limit=30&sortBy=${sort}&order=${order}`;
  try {
    const response = await fetch(
      selectedCategory == null ? allProductsurl : catagoryProductsurl
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const result = await response.json();
    // console.log("resultcateg", result);
    return result;
  } catch (error) {
    throw error;
  }
}

// export const singleProductOptions = queryOptions({
//   queryKey: ["singleProduct"],
//   queryFn: getSingleProduct,
// });
export const categoryListOptions = queryOptions({
  queryKey: ["categoryList"],
  queryFn: getCategories,
});
// export const productsByCategoryOptions = queryOptions({
//   queryKey: ["productsByCategory"],
//   queryFn: getProductsByCategory,
// });
