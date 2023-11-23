import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Form from "@/components/ui/Form";

export default function ResetPassword() {
	function formHandler(e: FormEvent) {
		e.preventDefault();
		toast.success("authentication completed");
	}
	return (
		<>
			<div className="w-full h-full grid place-items-center px-2 bg-white relative dark:bg-slate-900">
				<Form
					className="min-h-fit"
					title="reset password"
					description="forgotten your password? enter your email address below, and we'll send you an email allowing you to reset it"
					onsubmit={formHandler}
				>
					<div className="flex flex-col gap-2 mb-4">
						<Input title="email" type="email" />
					</div>
					<Form.SubmitBtn>reset password</Form.SubmitBtn>
					<div className="flex justify-center items-center mt-auto w-full">
						please contact us if you have any trouble resetting your password
					</div>
				</Form>
			</div>
		</>
	);
}
