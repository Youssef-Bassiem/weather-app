import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/lib/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ user }) => {
      if (user.emailVerified === false) {
        toast({
          variant: "destructive",
          title: "Please verify your email",
          description: "We have sent you an email to verify your account",
        });
      } else {
        queryClient.invalidateQueries(["user"]);
        toast({
          title: "Login Success",
          description: `Hello ${user.displayName} 👋`,
        });
        navigate("/weather");
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Invalid Email or Password",
        description: "Please try again",
      });
    },
  });
  return { login, isPending };
}
