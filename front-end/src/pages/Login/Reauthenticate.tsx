import { FormEvent, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { ZodError, z } from "zod"
import { Toaster, toast } from "sonner"
import Form from "@/components/ui/Form"

export default function Reauthenticate() {
	const [firstSubmit, setFirstSubmit] = useState(true)
	const [passwordValue, setPasswordValue] = useState("")
	const [passwordErrors, setPasswordErrors] = useState<string[]>([])
	const formValidators = z.object({
		password: z
			.string()
			.min(8)
			.refine(
				(value) =>
					value.split("").filter((el) => !isNaN(parseInt(el)))
						.length <= 5,
				{
					message: "the password cannot be entirely numeric",
				},
			),
	})
	const errors = formValidators.safeParse({ password: passwordValue })
	function formHandler(e: FormEvent) {
		e.preventDefault()
		setFirstSubmit(false)
		if (errors.success) {
			toast.success("authentication completed")
			// when the form success code
		} else {
			toast.error("authentication failed")
		}
	}
	useEffect(() => {
		if (!errors.success && !firstSubmit) {
			const issues = (errors as { error: ZodError<FormData> }).error
				.issues
			const passwordErrors = issues
				.filter((el) => el.path[0] === "password")
				.map((el) => el.message)
			setPasswordErrors(passwordErrors)
		} else {
			if (errors.success) {
				setPasswordErrors([])
			}
		}
	}, [errors, firstSubmit])
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
						<Input
							errors={passwordErrors}
							title="password"
							type="password"
							value={passwordValue}
							onChange={(e) =>
								setPasswordValue(e.target.value)
							}
						/>
					</div>
					<Form.submitBtn>confirm</Form.submitBtn>
				</Form>
			</div>
			<Toaster richColors />
		</>
	)
}
