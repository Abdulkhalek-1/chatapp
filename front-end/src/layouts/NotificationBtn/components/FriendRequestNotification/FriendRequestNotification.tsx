import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import AcceptFriendRequest from "./components/AcceptFriendRequest";

export default function FriendRequestNotification({
	sender_data: { picture, username, bio },
	id,
}: FriendRequestType) {
	return (
		<div className="bg-red-600 w-full h-24 flex flex-col justify-between">
			<div className="flex">
				<picture className="mr-2">
					<img
						className="w-12 rounded-half"
						alt="profile"
						src={`${import.meta.env.VITE_API_URL}${picture}`}
					/>
				</picture>
				<div className="pt-1 flex flex-col">
					<h3 className="font-semibold text-lg">{username}</h3>
					<p className="text-sm">{bio}</p>
				</div>
			</div>
			<div className="mb-1 ml-auto flex gap-1">
				<AcceptFriendRequest id={id} />
				<Button variant="outline" className="px-[0.6rem]">
					<X size="1.4rem" />
				</Button>
			</div>
		</div>
	);
}
