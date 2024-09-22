import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "@/lib/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { db } from "@/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ email, password, username }) =>
      signUpApi({ email, password, username }),
    onSuccess: ({ displayName, emailVerified, email }) => {
      setDoc(doc(db, "users", email), {
        name: displayName,
        emailVerified,
      });
      navigate("/login");
      queryClient.invalidateQueries(["user"]);
      toast({
        title: "Sign up Success",
        description: `Welcome ${displayName} 👋 \nWe have sent you an email to verify your account`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: `${error.message.split("/")[1].replaceAll("-", " ").replace(")", "")}`,
      });
    },
  });
  return { signUp, isPending };
}
