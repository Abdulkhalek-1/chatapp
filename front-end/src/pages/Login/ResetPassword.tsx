import { FormEvent, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { ZodError, z } from "zod"
import { Toaster, toast } from "sonner"
import Form from "@/components/ui/Form"

export default function ResetPassword() {
	const [firstSubmit, setFirstSubmit] = useState(true)
	const [emailValue, setEmailValue] = useState("")
	const [emailErrors, setEmailErrors] = useState<string[]>([])
	const formValidators = z.object({
		email: z.string().email().includes("@gmail"),
	})
	const errors = formValidators.safeParse({ email: emailValue })
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
			const emailErrors = issues
				.filter((el) => el.path[0] === "email")
				.map((el) => el.message)
			setEmailErrors(emailErrors)
		} else {
			if (errors.success) {
				setEmailErrors([])
			}
		}
	}, [errors, firstSubmit])
	return (
		<>
			<div className="w-full h-full grid place-items-center px-2 bg-white relative">
				<Form
					className="min-h-fit"
					title="reset password"
					description="forgotten your password? enter your email address below, and we'll send you an email allowing you to reset it"
					onsubmit={formHandler}
				>
					<div className="flex flex-col gap-2 mb-4">
						<Input
							errors={emailErrors}
							value={emailValue}
							onChange={(e) =>
								setEmailValue(e.target.value)
							}
							title="email"
							type="email"
						/>
					</div>
					<Form.submitBtn>reset password</Form.submitBtn>
					<div className="flex justify-center items-center mt-auto w-full">
						please contact us if you have any trouble
						resetting your password
					</div>
				</Form>
			</div>
			<Toaster richColors />
		</>
	)
}
