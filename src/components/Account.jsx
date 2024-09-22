import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "./ui/skeleton";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useLogout } from "@/hooks/useLogout";

export default function Account() {
  const { user, isPending: isUserPending } = useUser();
  const {
    logout,
    isPending: isLogoutPending,
    isSuccess: isLogoutSuccess,
  } = useLogout();
  const navigate = useNavigate();
  console.log(isLogoutPending, isLogoutSuccess);
  if (isUserPending || (isLogoutPending && !isLogoutSuccess))
    return (
      <Skeleton className="fixed right-10 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4d5bad]">
        <LoadingSpinner className="h-5 w-5" />
      </Skeleton>
    );
  if (!user)
    return (
      <div className="fixed right-10 top-2 h-10 w-10 rounded-full bg-[#4d5bad] text-center text-sm">
        No User
      </div>
    );
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
        <DropdownMenuGroup className="">
          <DropdownMenuItem
            onClick={() => {
              navigate("/sign");
            }}
            className="py-4"
          >
            Create a new Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/login");
            }}
            className="py-4"
          >
            Login to another Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="py-4">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
