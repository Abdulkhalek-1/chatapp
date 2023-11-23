import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FriendsGroup() {
	const navigate = useNavigate();
	return (
		<DropdownMenuGroup>
			<DropdownMenuItem onClick={() => navigate("/chats/send-friend-requests")}>
				<Users className="mr-2 h-4 w-4" />
				friends
				<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	);
}
