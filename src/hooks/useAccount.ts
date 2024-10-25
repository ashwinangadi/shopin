import { useQuery } from "@tanstack/react-query";

export const fetchAccount = async () => {
  const response = await fetch("/api/account");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useAccount(userId: string | undefined) {
  return useQuery({
    queryKey: ["account"],
    queryFn: fetchAccount,
  });
}
