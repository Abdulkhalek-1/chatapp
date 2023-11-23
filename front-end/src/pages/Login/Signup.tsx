import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/ui/Form";
import useValidate from "@/hooks/useValidate";
import { AxiosError, AxiosResponse } from "axios";
import baseAPI from "@/api/base";
import { useUserData } from "@/store";
export default function Signup() {
	const [firstSubmit, setFirstSubmit] = useState(true);
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");
	const [firstNameValue, setFirstNameValue] = useState("");
	const [lastNameValue, setLastNameValue] = useState("");
	const [formLoading, setFormLoading] = useState(false);
	const navigate = useNavigate();
	const setUserData = useUserData((store) => store.setUserData);
	const { success, getErrorsFrom } = useValidate(
		{
			email: z.string().email().includes("@gmail"),
			password: z
				.string()
				.min(8)

				.refine(
					(value) => {
						try {
							const includes = !value.includes(emailValue.split("@")[0]);
							return emailValue.length > 0 ? includes : true;
						} catch {
							return true;
						}
					},
					{
						message: "the password shouldn't be similar to other info",
					},
				)
				.refine(
					(value) => {
						if (value === "") return true;
						return value.split("").some((el) => Number.isNaN(parseInt(el)));
					},
					{
						message: "the password cannot be entirely numeric",
					},
				),
			confirmPassword: z.string().refine(
				(value) => {
					return value === passwordValue;
				},
				{
					message: "the confirm password doesn't match the password",
				},
			),
			username: z
				.string()
				.min(3)
				.refine((value) => !value.includes(" "), {
					message: "the user name shouldn't contain spaces",
				}),
			firstName: z.string().min(1),
			lastName: z.string().min(1),
		},
		{
			email: emailValue,
			password: passwordValue,
			confirmPassword: confirmPasswordValue,
			username: usernameValue,
			firstName: firstNameValue,
			lastName: lastNameValue,
		},
	);
	const emailErrors = !firstSubmit ? getErrorsFrom("email") : [];
	const passwordErrors = !firstSubmit ? getErrorsFrom("password") : [];
	const confirmPasswordErrors = !firstSubmit
		? getErrorsFrom("confirmPassword")
		: [];
	const usernameErrors = !firstSubmit ? getErrorsFrom("username") : [];
	const firstNameErrors = !firstSubmit ? getErrorsFrom("firstName") : [];
	const lastNameErrors = !firstSubmit ? getErrorsFrom("lastName") : [];

	async function formHandler(e: FormEvent) {
		e.preventDefault();

		setFirstSubmit(false);
		if (success) {
			setFormLoading(true);
			try {
				await baseAPI.post("/users/register/", {
					username: usernameValue,
					email: emailValue,
					password: passwordValue,
					password_confirm: confirmPasswordValue,
					first_name: firstNameValue,
					last_name: lastNameValue,
				});
				const userData: AxiosResponse<ProfileType> =
					await baseAPI.get("/users/profile/");
				setUserData({ authenticated: true, ...userData.data });
				setFormLoading(false);
				navigate("/accounts/profile");
			} catch (error) {
				setFormLoading(false);
				toast.error((error as AxiosError).message);
			}
		} else {
			toast.error("authentication failed");
		}
	}
	return (
		<>
			<div className="w-full min-h-full py-4 grid place-items-center px-2 bg-white dark:bg-slate-900">
				<Form
					title="signup"
					onsubmit={formHandler}
					className="w-[min(35rem,100%)]"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 w-full">
						<Input
							errors={firstNameErrors}
							value={firstNameValue}
							onChange={(e) => setFirstNameValue(e.target.value)}
							type="text"
							title="first name"
						/>
						<Input
							errors={lastNameErrors}
							value={lastNameValue}
							onChange={(e) => setLastNameValue(e.target.value)}
							type="text"
							title="last name"
						/>
						<Input
							errors={usernameErrors}
							title="username"
							type="text"
							value={usernameValue}
							onChange={(e) => setUsernameValue(e.target.value)}
						/>
						<Input
							errors={emailErrors}
							value={emailValue}
							onChange={(e) => setEmailValue(e.target.value)}
							title="email"
							type="email"
						/>
						<Input
							errors={passwordErrors}
							title="password"
							type="password"
							value={passwordValue}
							onChange={(e) => setPasswordValue(e.target.value)}
						/>
						<Input
							errors={confirmPasswordErrors}
							title="confirm password"
							type="text"
							value={confirmPasswordValue}
							onChange={(e) => setConfirmPasswordValue(e.target.value)}
						/>
					</div>

					<Form.SubmitBtn disabled={formLoading}>
						{formLoading ? "loading..." : "signup"}{" "}
					</Form.SubmitBtn>

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
		</>
	);
}
