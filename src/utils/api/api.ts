import { queryOptions } from "@tanstack/react-query";

export async function getdeals() {
  const url =
    "https://real-time-amazon-data.p.rapidapi.com/deals-v2?country=US&min_product_star_rating=ALL&price_range=ALL&discount_range=ALL";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);

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

export const dealsOptions = queryOptions({
  queryKey: ["deals"],
  queryFn: getdeals,
});
