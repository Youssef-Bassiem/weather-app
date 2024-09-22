import BackDrop from "@/components/ui/BackDrop";
import { toast } from "@/hooks/use-toast";

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { user, isPending } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.emailVerified && !isPending) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Please verify your email first",
      });
      navigate("/login");
    }
  }, [user, isPending, navigate]);

  return (
    <>
      {isPending && <BackDrop />}
      {children}
    </>
  );
}
