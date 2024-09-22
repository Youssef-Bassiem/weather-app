import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "@/lib/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { db } from "@/Firebase";
import { doc, setDoc } from "firebase/firestore";

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signIn } = useMutation({
    mutationFn: (provider) => signInApi(provider),
    onSuccess: ({ user }) => {
      setDoc(doc(db, "users", user.email), {
        name: user.displayName,
        emailVerified: user.emailVerified,
      });
      queryClient.invalidateQueries(["user"]);
      toast({
        title: "Login Success",
        description: `Hello ${user.displayName} 👋`,
      });
      navigate("/weather");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: `${error.message.split("/")[1].replaceAll("-", " ").replace(")", "")}`,
      });
    },
  });
  return { signIn };
}
