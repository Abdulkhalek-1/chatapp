import baseAPI from "@/api/base";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { dummyUserData } from "@/constants";
import { useUserData } from "@/store";
import { DoorOpen, Loader2, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AccountsGroup() {
    const navigate = useNavigate();
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
    const setUserData = useUserData(store => store.setUserData);

    async function logoutHandler() {
        try {
            setLogoutLoading(true);
            await baseAPI.get("/users/logout/");
            setUserData({ authenticated: false, ...dummyUserData });
            navigate("/accounts/login");
        } catch {
            toast.error("error - something went wrong");
        } finally {
            setLogoutLoading(false);
        }
    }

    return (
        <>
            <DropdownMenuLabel>account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/accounts/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                    {!logoutLoading ? (
                        <DoorOpen className="mr-2 h-4 w-4" />
                    ) : (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    logout
                    <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </>
    );
}

