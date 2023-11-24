import baseAPI from "@/api/base";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AcceptFriendRequest({ id }: { id: number }) {
	const [loading, setLoading] = useState(false);
	async function handleAcceptFriendRequest() {
		try {
			setLoading(true);
			await baseAPI.put(`/users/friends/?id=${id}`);
		} catch (error) {
			toast.error("error - something went wrong");
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<Button
			disabled={loading}
			onClick={handleAcceptFriendRequest}
			variant="outline"
			className="px-[0.6rem]"
		>
			{!loading ? (
				<Check size="1.4rem" />
			) : (
				<Loader2 className="animate-spin" size="1.4rem" />
			)}
		</Button>
	);
}
