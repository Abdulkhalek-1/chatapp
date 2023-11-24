import { Button } from "@/components/ui/button";
import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/store";
import { Bell } from "lucide-react";
import FriendRequestNotification from "./components/FriendRequestNotification/FriendRequestNotification";

export default function NotificationBtn() {
    const friendRequestNotifications = useNotifications(
        (store) => store.friendRequests,
    );
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-10 h-10 p-0 px-[0.68rem]">
                    <Bell />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none w-96">
                {friendRequestNotifications.map((friendRequest) => (
                    <FriendRequestNotification
                        key={crypto.randomUUID()}
                        {...friendRequest}
                    />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
