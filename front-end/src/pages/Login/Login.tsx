import { FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"
import { Link } from "react-router-dom"
import Form from "@/components/ui/Form"

export default function Login() {
	function formHandler(e: FormEvent) {
		e.preventDefault()
		toast.success("authentication completed")
	}
	return (
		<>
			<div className="w-full h-full grid place-items-center px-2 bg-white">
				<Form
					title="login"
					onsubmit={formHandler}
					providers={["google"]}
				>
					<div className="flex flex-col gap-2 mb-4">
						<Input title="email" type="email" />
						<Input title="password" type="password" />
					</div>
					<div className="w-full flex justify-between mb-2">
						<div className="w-full flex items-center gap-2">
							<Checkbox id="rememberMe" />
							<label htmlFor="rememberMe">
								remember me
							</label>
						</div>
						<Button
							asChild
							type="button"
							variant={"link"}
							className="whitespace-nowrap"
						>
							<Link to={"reset"}>forget password?</Link>
						</Button>
					</div>
					<Form.submitBtn>login</Form.submitBtn>
					<div className="flex justify-center items-center mt-auto w-full">
						don't have account?{" "}
						<Button
							asChild
							type="button"
							variant={"link"}
							className="w-fit h-fit p-0 pl-2"
						>
							<Link to="/accounts/signup">sign up</Link>
						</Button>
					</div>
				</Form>
			</div>
			<Toaster richColors position="top-right" />
		</>
	)
}
