import { FormEvent, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ZodError, z } from "zod"
import { Toaster, toast } from "sonner"
import { Link } from "react-router-dom"
import Form from "@/components/ui/Form"

export default function Signup() {
	const [firstSubmit, setFirstSubmit] = useState(true)
	const [emailValue, setEmailValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [emailErrors, setEmailErrors] = useState<string[]>([])
	const [passwordErrors, setPasswordErrors] = useState<string[]>([])
	const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
	const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<
		string[]
	>([])
	const formValidators = z.object({
		email: z.string().email().includes("@gmail").optional(),
		password: z
			.string()
			.min(8)
			.refine(
				(value) =>
					value.split("").some((el) => isNaN(parseInt(el))),
				{
					message: "the password cannot be entirely numeric",
				},
			),
		confirmPassword: z.string()!.refine(
			(value) => {
				return value === passwordValue
			},
			{
				message: "the confirm password doesn't the same as password",
			},
		),
	})
	const validationObject: Record<string, string> = useMemo(
		() => ({
			password: passwordValue,
			confirmPassword: confirmPasswordValue,
		}),
		[confirmPasswordValue, passwordValue],
	)
	const errors = formValidators.safeParse(validationObject)
	useEffect(() => {
		if (emailValue.length > 0) validationObject.email = emailValue
	}, [emailValue, validationObject])
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
			const passwordErrors = issues
				.filter((el) => el.path[0] === "password")
				.map((el) => el.message)
			const confirmPasswordErrors = issues
				.filter((el) => el.path[0] === "confirmPassword")
				.map((el) => el.message)
			setEmailErrors(emailErrors)
			setPasswordErrors(passwordErrors)
			setConfirmPasswordErrors(confirmPasswordErrors)
		} else {
			if (errors.success) {
				setEmailErrors([])
				setPasswordErrors([])
				setConfirmPasswordErrors([])
			}
		}
	}, [errors, firstSubmit])
	return (
		<>
			<div className="w-full h-full grid place-items-center px-2 bg-white">
				<Form title="signup" onsubmit={formHandler}>
					<div className="flex flex-col gap-2 mb-4">
						<Input title="username" type="text" />
						<Input
							errors={
								emailValue.length > 0 ? emailErrors : []
							}
							value={emailValue}
							onChange={(e) =>
								setEmailValue(e.target.value)
							}
							title="email"
							type="email"
						/>
						<Input
							errors={passwordErrors}
							title="password"
							type="password"
							value={passwordValue}
							onChange={(e) =>
								setPasswordValue(e.target.value)
							}
						/>
						<Input
							errors={confirmPasswordErrors}
							title="confirm password"
							type="text"
							value={confirmPasswordValue}
							onChange={(e) =>
								setConfirmPasswordValue(e.target.value)
							}
						/>
					</div>
					<div className="w-full flex justify-between mb-2">
						<div className="w-full flex items-center gap-2">
							<Checkbox id="rememberMe" />
							<label htmlFor="rememberMe">
								remember me
							</label>
						</div>
					</div>
					<Form.submitBtn>signup</Form.submitBtn>
					<div className="flex justify-center items-center mt-auto w-full">
						already have an account?{" "}
						<Button
							asChild
							type="button"
							variant={"link"}
							className="w-fit h-fit p-0 pl-2"
						>
							<Link to="/accounts/login">login</Link>
						</Button>
					</div>
				</Form>
			</div>
			<Toaster richColors />
		</>
	)
}
