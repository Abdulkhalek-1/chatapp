import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AccountsGroup from "./components/AccountsGroup";
import FriendsGroup from "./components/FriendsGroup";

export default function ProfileImage({ picture }: { picture: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar asChild className="cursor-pointer w-10 h-10">
                    <img alt="profile" src={picture} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:border-none w-40">
                <AccountsGroup />
                <DropdownMenuSeparator />
                <FriendsGroup />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
