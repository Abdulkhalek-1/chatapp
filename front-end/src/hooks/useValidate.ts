import { z } from "zod"

export default function useValidate(validators: z.ZodRawShape, values: object) {
	const validate = z.object(validators).safeParse(values)
	function getErrorsFrom(path: string) {
		if (!validate.success) {
			try {
				return validate.error.issues
					.filter((el) => el.path.toString() === path)
					.map((el) => {
						return el.message
					})
			} catch {
				return []
			}
		} else {
			return []
		}
	}
	return { success: validate.success, getErrorsFrom }
}
