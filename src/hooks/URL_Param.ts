export const urlParam = ({
  category,
  sort,
  order,
  limit,
  skip,
}: {
  category?: string | null;
  sort?: string | undefined;
  order?: string | undefined;
  limit?: number | undefined;
  skip?: number | undefined;
}) => {
  const params: Record<string, string> = {};
  if (category) params.category = category;
  if (sort) params.sortBy = sort;
  if (order) params.order = order;
  if (limit) params.limit = limit.toString();
  if (skip) params.skip = skip.toString();
  return params;
};
