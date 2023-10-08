import { Outlet, useLocation } from "react-router-dom"

export default function RootLayout() {
	const location = useLocation()
	// check if the user authenticated
	if (location.pathname.startsWith("/accounts")) return <Outlet />
	return (
		<div>
			<h1>hi</h1>
			<Outlet />
		</div>
	)
}
