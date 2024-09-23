import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="no-scrollbar mt-14 flex h-2/3 w-[35rem] flex-col items-center justify-evenly rounded-xl bg-[#161a2b] px-7 py-2 text-white shadow-[0px_0px_8px_black] max-sm:h-3/4 max-sm:w-96">
      <p className="text-2xl font-bold">Page Not Found</p>
      <Button
        variant="outline"
        className="text-xl"
        onClick={() => navigate("/weather")}
      >
        start searching...
        <span className="ml-2"> 🌥️</span>
      </Button>
    </div>
  );
}
