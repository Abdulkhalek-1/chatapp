import baseAPI from "@/api/base";
import { Button } from "@/components/ui/button";
import getCookie from "@/utils/getCookie";
import { useState } from "react";
import { toast } from "sonner";

export default function UserCard({
	username,
	first_name,
	last_name,
	picture,
	bio,
	id,
}: ProfileType) {
	const [addFriendLoading, setAddFriendLoading] = useState(false);
	async function addFriendHandler() {
		try {
			setAddFriendLoading(true);
			await baseAPI.post(
				"/users/friends/add/",
				{ receiver: id },
				{
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": getCookie("csrftoken"),
					},
				},
			);
			toast.success("friend request send");
		} catch (err) {
			toast.error(`error - ${err}`);
		} finally {
			setAddFriendLoading(false);
		}
	}
	return (
		<div className="flex flex-col justify-between w-96 h-96 dark:bg-slate-900 p-4  shadow-lg rounded-lg">
			<div className="flex flex-col items-center">
				<picture>
					<img
						alt="profile"
						draggable="false"
						className="w-[8rem] h-[8rem] rounded-[50%] mx-auto mb-2"
						src={`${import.meta.env.VITE_API_URL}${picture}`}
					/>
				</picture>
				<h1 className="text-2xl dark:text-white text-black  font-bold">
					{first_name} {last_name}
				</h1>
				<h3 className="text-md text-slate-700 dark:text-gray-300 mb-4">
					{username}
				</h3>
				<p className="w-full text-start dark:text-white text-black">{bio}</p>
			</div>
			<Button disabled={addFriendLoading} onClick={addFriendHandler}>
				{!addFriendLoading ? "add friend" : "loading..."}
			</Button>
		</div>
	);
}
