import { Button } from "@/components/ui/button"
type LoginProviderType = {
	icon: string
	title?: string
}
export default function LoginProvider({ icon, title }: LoginProviderType) {
	return (
		<Button
			type="button"
			className={`w-full h-fit py-2.5 ${title ? "flex gap-2" : ""}`}
		>
			<img src={icon} />
			{title}
		</Button>
	)
}
