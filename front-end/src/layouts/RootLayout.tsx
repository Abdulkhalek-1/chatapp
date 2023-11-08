import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import Friends from "@/components/friends/Friends";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
  const location = useLocation();
  const friends = useLoaderData() as {
    friendsPromise: Promise<FriendType[]>;
  };
  const { toggle, isDarkMode } = useDarkMode();
  document.querySelector("html")?.classList.toggle("dark", isDarkMode);
  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);
  // check if the user authenticated
  if (location.pathname.startsWith("/accounts")) return <Outlet />;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex flex-col md:flex-row">
        <aside className="fixed inset-0 h-full w-full md:w-96 shadow-lg dark:bg-slate-900 bg-white">
          <header className="h-fit w-full p-3 px-4">
            <div className=" flex justify-between">
              <Avatar>
                <img src="/imgs/profile.jpeg" />
              </Avatar>
              <div className="flex gap-1">
                <Button className="w-10 h-10" variant={"outline"}>
                  <FontAwesomeIcon className="text-md w-fit" icon={faBell} />
                </Button>
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
          <Friends friends={friends} />
        </aside>
        <div className="w-full h-full flex">
          <div className="w-96 md:block hidden h-full"></div>
          <div className="w-[calc(100%-24rem)] bg-main-white dark:bg-slate-950 h-full relative md:block hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
