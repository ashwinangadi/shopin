import { queryOptions } from "@tanstack/react-query";

export const LIMIT = 20;

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
  limit,
  skip,
}: {
  category?: string | null;
  sortBy?: string | null;
  orderBy?: string | null;
  limit?: string | null;
  skip?: string | null;
}) {
  const selectedCategory = category || null;
  const sort = sortBy || "title";
  const order = orderBy || "asc";
  const setLimit = limit || LIMIT;
  const setSkip = skip || 0;

  const options = `?limit=${setLimit}&skip=${setSkip}&sortBy=${sort}&order=${order}`;

  const catagoryProductsurl = `https://dummyjson.com/products/category/${selectedCategory}${options}`;
  const allProductsurl = `https://dummyjson.com/products${options}`;

  console.log("api triggered", skip);
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
