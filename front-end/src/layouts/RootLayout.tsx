import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import Friends from "@/components/friends/Friends";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import baseAPI from "@/api/base";
import { useNotifications, useUserData } from "@/store";
import { dummyUserData } from "@/constants";
import ProfileImage from "./ProfileImage/ProfileImage";
import NotificationBtn from "./NotificationBtn/NotificationBtn";

const queryClient = new QueryClient();

export default function RootLayout() {
	const location = useLocation();
	const { setUserData, ...userData } = useUserData((store) => store);
	const setUserFriendRequests = useNotifications(
		(store) => store.setFriendRequests,
	);
	const profileImage = `${import.meta.env.VITE_API_URL}${userData.picture}`;
	const navigate = useNavigate();
	const { toggle, isDarkMode } = useDarkMode();
	document.querySelector("html")?.classList.toggle("dark", isDarkMode);
	useEffect(() => {
		window.addEventListener("contextmenu", (e) => {
			e.preventDefault();
		});
		async function getUserData() {
			try {
				const { data, status } = await baseAPI
					.get("/users/profile/")
					.then((res) => res);
				if (status !== 200) throw status;
				setUserData({
					...data,
					authenticated: true,
				});
			} catch {
				setUserData({ authenticated: false, ...dummyUserData });
				navigate("/accounts/login");
			}
		}
		getUserData();
		async function getUserFriendRequests() {
			try {
				const friendRequests = await baseAPI
					.get<FriendRequestType[]>("/users/friends/")
					.then((res) => res.data);
				setUserFriendRequests(friendRequests);
			} catch {
				toast.error("error something went wrong");
			}
		}
		getUserFriendRequests();
	}, [setUserData, navigate, setUserFriendRequests]);
	if (location.pathname.startsWith("/accounts"))
		return (
			<>
				<Outlet />
				<Toaster richColors position="top-right" />
			</>
		);
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<div className="w-full h-full flex flex-col md:flex-row">
					<aside className="fixed inset-0 h-full w-full md:w-96 shadow-lg dark:bg-slate-900 bg-white">
						<header className="h-fit w-full p-3 px-4">
							<div className=" flex justify-between">
								<div className="flex items-center gap-2.5">
									<ProfileImage picture={profileImage} />
									<h2 className="text-lg font-bold">
										{userData.first_name} {userData.last_name}
									</h2>
								</div>
								<div className="flex gap-1">
									<NotificationBtn />
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
						</header>
						<Friends />
					</aside>
					<div className="w-full h-full flex">
						<div className="w-96 md:block hidden h-full" />
						<div className="w-[calc(100%-24rem)]  h-full relative md:block hidden">
							<Outlet />
						</div>
					</div>
				</div>
			</QueryClientProvider>
			<Toaster position="top-right" richColors />
		</>
	);
}
