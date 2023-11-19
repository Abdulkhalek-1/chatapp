import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	title?: string
	errors?: string[]
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, title, errors = [], ...props }, ref) => {
		const isContainErrors = errors.length > 0
		const id = React.useMemo(() => crypto.randomUUID(), [])
		const [show, setShow] = React.useState(false)
		return (
			<div className="flex flex-col h-fit w-full">
				{title && (
					<label
						htmlFor={id}
						className={`input-label mb-0.5 ${
							isContainErrors ? "text-red-600" : ""
						}`}
					>
						{title}
					</label>
				)}
				<div className="h-fit relative mb-1 w-full">
					<input
						id={id}
						ref={ref}
						type={
							type === "password"
								? show
									? "text"
									: "password"
								: type
						}
						className={cn(
							`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
						${isContainErrors ? "border-2 border-red-600" : ""} ${
								type === "password" ? "pr-12" : ""
							}`,
							className,
						)}
						{...props}
					/>
					{type === "password" && (
						<button
							type="button"
							className="absolute right-4 top-1/2 -translate-y-1/2"
							onClick={() => setShow((c) => !c)}
						>
							{show ? (
								<Eye size={"1.3rem"} />
							) : (
								<EyeOff size={"1.3rem"} />
							)}
						</button>
					)}
				</div>
				<p className="text-red-600">{errors.join(", ")}</p>
			</div>
		)
	},
)

Input.displayName = "Input"
