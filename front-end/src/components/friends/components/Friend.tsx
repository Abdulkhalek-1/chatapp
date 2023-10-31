import { cn } from "@/lib/utils";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { franc } from "franc";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Friend({
  name,
  img,
  id,
  notifications = false,
  status,
}: Omit<FriendType, "id" | "img" | "status" | "notifications"> & {
  id?: string;
  img: FriendType["img"] | IconProp;
  status?: FriendType["status"];
  notifications?: FriendType["notifications"];
}) {
  return id ? (
    <NavLink
      to={`/chats/${id}`}
      className={({ isActive }) =>
        `${isActive
          ? "bg-blue text-white dark:bg-dark-blue"
          : "dark:hover:bg-slate-800 hover:bg-gray-100"
        } w-full flex items-center gap-3 transition  rounded-lg px-2 h-14`
      }
    >
      <Children
        img={img}
        name={name}
        status={status}
        notifications={notifications}
      />
    </NavLink>
  ) : (
    <button
      className={`w-full flex items-center gap-3 transition  rounded-lg px-2 h-14`}
    >
      <Children
        img={img}
        name={name}
        status={status}
        notifications={notifications}
      />
    </button>
  );
}

function Children({
  img,
  status,
  notifications,
  name,
}: {
  name: FriendType["name"];
  img: FriendType["img"] | IconProp;
  status?: FriendType["status"];
  notifications?: FriendType["notifications"];
}) {
  return (
    <>
      <div className="w-fit h-fit relative">
        {typeof img === "string" ? (
          <img className="rounded-[50%] w-12" src={img} />
        ) : (
          <div className="rounded-[50%] w-10 grid place-items-center pl-0.5">
            <FontAwesomeIcon className="text-2xl" icon={img} />
          </div>
        )}
        {status && (
          <div
            className={`status absolute bottom-0 left-0 w-3 h-3 rounded-[50%] ${cn(
              status === "online"
                ? "bg-green"
                : status === "offline"
                  ? "dark:bg-slate-400 bg-gray-300"
                  : status === "do not disturb"
                    ? "bg-red"
                    : "",
            )}`}
          />
        )}
      </div>
      <div className="w-full flex justify-between px-2">
        <p className={franc(name) === "arb" ? "arabic-font" : ""}>{name}</p>
        {notifications && (
          <p className="w-6 h-6 grid place-items-center bg-green rounded-[50%] text-white">
            <FontAwesomeIcon className="text-sm" icon={faBell} />
          </p>
        )}
      </div>
    </>
  );
}
