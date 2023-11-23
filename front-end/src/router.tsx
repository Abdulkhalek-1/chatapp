import { Navigate, RouteObject } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import ResetPassword from "./pages/Login/ResetPassword";
import ConfirmEmail from "./pages/Login/ConfirmEmail";
import Reauthenticate from "./pages/Login/Reauthenticate";
import Chat from "./pages/chats/components/chat/Chat";
import Profile from "./pages/chats/Profile/Profile";
import SendFriendRequests from "./pages/chats/SendFriendRequest/SendFriendRequests";

const router: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Navigate to="/chats" /> },
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
							{ path: "profile", element: <Profile /> },
						],
					},
					{
						path: "chats",
						children: [
							{ index: true, element: <h1>hi</h1> },
							{
								path: "friends",
								children: [
									{ index: true, element: <h1>Friends</h1> },
									{
										path: ":friendId",
										element: <Chat />,
										loader: ({ params: { friendId } }) => {
											if (friendId) return friendId;
											return "";
										},
									},
								],
							},
							{
								path: "send-friend-requests",
								element: <SendFriendRequests />,
							},
						],
					},
				],
			},
		],
	},
];

export default router;
