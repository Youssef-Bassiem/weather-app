import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../lib/apiAuth";

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    gcTime: Infinity,
    staleTime: Infinity,
  });
  return { user, isPending };
}
