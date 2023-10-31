import { ReactNode } from "react"

export default function SkeletonList({
	children,
	amount,
}: {
	children: ReactNode
	amount: number
}) {
	// fix the array
	return (
		<>
			{Array(amount)
				.fill(children)
				.map((el) => {
					return el
				})}
		</>
	)
}
