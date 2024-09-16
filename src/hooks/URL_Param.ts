export const urlParam = ({
  category,
  sort,
  order,
}: {
  category: string | null;
  sort: string | undefined;
  order: string | undefined;
}) => {
  const params: Record<string, string> = {};
  if (category) params.category = category;
  if (sort) params.sortBy = sort;
  if (order) params.order = order;
  return params;
};
