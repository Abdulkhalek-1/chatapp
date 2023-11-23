import { useState } from "react";
import Friend from "./components/Friend";
import { Input } from "../ui/input";
import { useUserData } from "@/store";

export default function Friends() {
	const friends = useUserData((store) => store.friends);
	const [filteredFriends, setFilteredFriends] = useState<null | ProfileType[]>(
		null,
	);
	return (
		<>
			<div className="search w-full h-fit px-4 pb-2">
				<div className="w-full flex gap-2 items-center">
					<Input
						onInput={(e) => {
							setFilteredFriends(
								friends.filter(
									(el) =>
										el.first_name
											.toLowerCase()
											.includes(e.currentTarget.value.toLowerCase()) ||
										el.last_name
											.toLowerCase()
											.includes(e.currentTarget.value.toLowerCase()),
								),
							);
						}}
						placeholder="search in your friends"
						type="search"
						className="w-full"
					/>
				</div>
			</div>
			<div className="friends-container flex flex-col gap-1 w-full h-full overflow-x-auto px-4">
				{(filteredFriends ? filteredFriends : friends).map((friend) => (
					<Friend key={crypto.randomUUID()} {...friend} id={friend.id} />
				))}
			</div>
		</>
	);
}
