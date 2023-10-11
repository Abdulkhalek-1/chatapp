import { cn } from "@/lib/utils"
import LoginProvider from "@/pages/Login/components/LoginProvider"
import type { FormEventHandler, ReactNode } from "react"
import { Button } from "./button"

type FormType = {
	title: string
	description?: string
	children: ReactNode
	providers?: string[]
	onsubmit?: FormEventHandler
	className?: string
}
export default function Form({
	title,
	description,
	children,
	providers,
	onsubmit,
	className,
}: FormType) {
	return (
		<>
			<form
				noValidate
				onSubmit={onsubmit}
				className={cn(
					"w-[min(100%,24rem)] min-h-[25rem] shadow-lg rounded-lg p-4 bg-slate-950",
					className,
				)}
			>
				<h1 className="w-full text-4xl font-bold mb-4">{title}</h1>
				{description && (
					<p className="text-gray-500 mb-2">{description}</p>
				)}
				{providers && (
					<div className="providers flex flex-col gap-1 mb-5">
						{providers.map((provider, index) => {
							return (
								<LoginProvider
									key={index}
									title={`login with ${provider}`}
									icon={`/imgs/logos/${provider}.png`}
								/>
							)
						})}
					</div>
				)}
				{providers && (
					<div className="border-t-2 relative mb-4 dark:border-slate-800">
						<span className="absolute bg-white dark:bg-slate-950 left-1/2 px-4 -translate-x-1/2 top-1/2 -translate-y-1/2">
							or
						</span>
					</div>
				)}
				{children}
			</form>
		</>
	)
}

Form.submitBtn = SubmitBtn

function SubmitBtn({ children }: { children: ReactNode }) {
	return <Button className="w-full mb-3.5">{children}</Button>
}
