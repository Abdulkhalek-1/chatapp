import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type SendIconType = {
	icon: IconProp
}
export default function SendIcon({ icon }: SendIconType) {
	return (
		<button className="w-10 h-10 grid place-items-center dark:bg-slate-800 rounded-[50%] shadow-lg">
			<FontAwesomeIcon icon={icon} />
		</button>
	)
}
