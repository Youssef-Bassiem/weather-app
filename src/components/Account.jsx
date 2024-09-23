import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "./ui/skeleton";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useLogout } from "@/hooks/useLogout";

export default function Account() {
  const { user, isPending: isUserPending } = useUser();
  const { pathname } = useLocation();
  const {
    logout,
    isPending: isLogoutPending,
    isSuccess: isLogoutSuccess,
  } = useLogout();
  const navigate = useNavigate();
  if (isUserPending || (isLogoutPending && !isLogoutSuccess))
    return (
      <Skeleton className="fixed right-10 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4d5bad]">
        <LoadingSpinner className="h-5 w-5" />
      </Skeleton>
    );
  if (!user) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed right-10 top-2" asChild>
        <Avatar>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <AvatarImage
                  className="h-10 w-10 select-none rounded-full"
                  src={user?.photoURL}
                />
                <AvatarFallback className="h-10 w-10 bg-[#a10bb5c4] text-lg font-medium text-white">
                  {user?.displayName
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
              </TooltipTrigger>
              <TooltipContent>Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 border-none bg-[#3a4b97e4] p-2 text-white">
        <DropdownMenuItem
          disabled={pathname == "/weather"}
          onClick={() => {
            navigate("/weather");
          }}
          className="py-4"
        >
          Weather
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={pathname == "/sign"}
          onClick={() => {
            navigate("/sign");
          }}
          className="py-4"
        >
          Create a new Account
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={pathname == "/login"}
          onClick={() => {
            navigate("/login");
          }}
          className="py-4"
        >
          Login to another Account
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isLogoutPending}
          onClick={logout}
          className="py-4"
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
