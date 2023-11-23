import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUserData } from "@/store";
import { ChangeEvent, useRef, useState } from "react";
import baseAPI from "@/api/base";
import { toast } from "sonner";
import getCookie from "@/utils/getCookie";

export default function ImageSelect() {
	const [formLoading, setFormLoading] = useState(false);
	const setUserData = useUserData((store) => store.setUserData);
	const profileImage = useUserData((store) => {
		if (store.authenticated) return store.picture;
		return null;
	});
	const uploadImageRef = useRef<HTMLInputElement>(null);
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	function uploadImageHandler(event: ChangeEvent<HTMLInputElement>) {
		if (event.currentTarget.files) {
			const uploadedImage = event.currentTarget.files[0];
			setUploadedImage(uploadedImage);
		}
	}
	async function formHandler() {
		const formData = new FormData();
		if (uploadedImage) formData.append("picture", uploadedImage);
		try {
			setFormLoading(true);
			const csrf = getCookie("csrftoken");
			const data: { data: ProfileType } = await baseAPI.patch(
				"/users/profile/",
				formData,
				{
					headers: {
						"X-CSRFToken": csrf,
						"Content-Type": "multipart/form-data",
					},
				},
			);
			setUserData({ authenticated: true, ...data.data });
			toast.success("success!");
		} catch (error) {
			toast.error(`error - ${error}`);
		} finally {
			setFormLoading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>upload image</Button>
			</DialogTrigger>
			<DialogContent className="border-none">
				<div className="flex gap-6 flex-col">
					<picture>
						<img
							alt="profile"
							draggable="false"
							className="w-[12rem] h-[12rem] rounded-[50%] mx-auto mb-4"
							src={
								uploadedImage
									? URL.createObjectURL(uploadedImage)
									: `${import.meta.env.VITE_API_URL}${profileImage}`
							}
						/>
					</picture>
					<div className="w-full flex gap-2">
						<Button
							onClick={formHandler}
							disabled={formLoading}
							className="flex-1"
						>
							{formLoading ? "loading..." : "save"}{" "}
						</Button>
						<Button
							type="button"
							disabled={formLoading}
							onClick={() => uploadImageRef.current?.click()}
							variant="secondary"
							className="w-full flex-1"
						>
							upload
						</Button>
						<input
							size={5242880}
							maxLength={5}
							accept="image/*"
							ref={uploadImageRef}
							onChange={uploadImageHandler}
							className="hidden"
							type="file"
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
