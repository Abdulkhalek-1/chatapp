import Form from "@/components/ui/Form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

export default function Profile() {
	return (
		<div className="w-full h-full grid place-items-center px-2 bg-white dark:bg-slate-900">
			<Form>
				<div className="flex flex-col gap-2 mb-4">
					<Skeleton className="w-[8rem] h-[8rem] rounded-[50%] mx-auto mb-4" />
					<Button disabled type="button">
						upload new image
					</Button>
					<Input disabled title="first name" type="text" />
					<Input disabled title="last name" type="text" />
					<Textarea
						disabled
						className="resize-none"
						placeholder="write your bio here"
					/>
				</div>
				<Form.SubmitBtn disabled className="mb-0">
					loading...
				</Form.SubmitBtn>
			</Form>
		</div>
	)
}
