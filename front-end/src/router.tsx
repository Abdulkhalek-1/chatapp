import { Navigate, RouteObject } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import ErrorPage from "./pages/ErrorPage"
import Chats from "./pages/Chats"
import Login from "./pages/Login/Login"
import Signup from "./pages/Login/Signup"
import ResetPassword from "./pages/Login/ResetPassword"
import ConfirmEmail from "./pages/Login/ConfirmEmail"
import Reauthenticate from "./pages/Login/Reauthenticate"

const router: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Chats /> },
					{
						path: "accounts",
						children: [
							{
								index: true,
								element: <Navigate to="login" />,
							},
							{
								path: "login",
								children: [
									{
										index: true,
										element: <Login />,
									},
									{
										path: "reset",
										element: <ResetPassword />,
									},
								],
							},
							{ path: "signup", element: <Signup /> },
							{
								path: "confirm-email",
								element: <ConfirmEmail />,
							},
							{
								path: "reauthenticate",
								element: <Reauthenticate />,
							},
						],
					},
					{
						path: ":friend",
						element: (
							<h1 className="md:block hidden">friend</h1>
						),
					},
				],
			},
		],
	},
]

export default router
