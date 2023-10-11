import { FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Toaster, toast } from "sonner"
import Form from "@/components/ui/Form"

export default function Reauthenticate() {
	function formHandler(e: FormEvent) {
		e.preventDefault()
		toast.success("authentication")
	}
	return (
		<>
			<div className="w-full h-full grid place-items-center px-2 bg-white">
				<Form
					className="min-h-fit"
					title="confirm access"
					description="for safeguard the security of your account, please
                    enter your password:"
					onsubmit={formHandler}
				>
					<div className="flex flex-col gap-2 mb-4">
						<Input title="password" type="password" />
					</div>
					<Form.submitBtn>confirm</Form.submitBtn>
				</Form>
			</div>
			<Toaster richColors position="top-right" />
		</>
	)
}
