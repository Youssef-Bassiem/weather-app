import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@/lib/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast({
        title: "Logout Success",
        description: "You have been logged out",
      });
      navigate("/login");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Please try again",
      });
    },
  });

  return { logout, isPending };
}
