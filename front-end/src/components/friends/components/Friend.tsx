import { faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

type FriendType = {
	name: string
	img: string
	to: string
	notifications?: boolean
}
export default function Friend({
	name,
	img,
	to,
	notifications = false,
}: FriendType) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`${
					isActive
						? "bg-blue text-white dark:bg-dark-blue"
						: "dark:hover:bg-slate-800 hover:bg-gray-100"
				} w-full flex items-center gap-3 transition  rounded-lg px-2 py-2`
			}
		>
			<img className="rounded-[50%] w-12" src={img} />
			<div className="w-full flex justify-between px-2">
				<p>{name}</p>
				{notifications && (
					<p className="w-6 h-6 grid place-items-center bg-green rounded-[50%] text-white">
						<FontAwesomeIcon
							className="text-sm"
							icon={faBell}
						/>
					</p>
				)}
			</div>
		</NavLink>
	)
}
