import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { Outlet, useLocation } from "react-router-dom"
import { useDarkMode } from "usehooks-ts"
import { Input } from "@/components/ui/input"
import Friends from "@/components/friends/Friends"

export default function RootLayout() {
	const location = useLocation()
	const { toggle, isDarkMode } = useDarkMode()
	document.querySelector("html")?.classList.toggle("dark", isDarkMode)
	// check if the user authenticated
	if (location.pathname.startsWith("/accounts")) return <Outlet />
	return (
		<div className="w-full h-full flex flex-col md:flex-row">
			<aside className="fixed inset-0 h-full w-full md:w-96 shadow-lg dark:bg-slate-900">
				<header className="h-fit w-full p-3 px-4">
					<div className=" flex justify-between">
						<Avatar>
							<img src="/imgs/profile.jpeg" />
						</Avatar>
						<div>
							<Button
								variant={"outline"}
								className="w-10 h-10"
								onClick={toggle}
							>
								<FontAwesomeIcon
									className="text-md w-fit"
									icon={isDarkMode ? faSun : faMoon}
								/>
							</Button>
						</div>
					</div>
					<div className="search w-full h-fit py-2">
						<Input
							placeholder="search in your friends"
							type="search"
						/>
					</div>
				</header>
				<Friends />
			</aside>
			<Outlet />
		</div>
	)
}
