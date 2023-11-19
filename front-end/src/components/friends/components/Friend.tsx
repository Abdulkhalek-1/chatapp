import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { franc } from "franc";

export default function Friend({
  first_name,
  last_name,
  picture,
  id,
}: ProfileType) {
  const friendRef = useRef<HTMLAnchorElement>(null);
  const profileImage = `${import.meta.env.VITE_API_URL}${picture}`;
  return (
    <NavLink
      to={`/chats/${id}`}
      ref={friendRef}
      className={({ isActive }) =>
        `${isActive
          ? "bg-blue text-white dark:bg-dark-blue"
          : "dark:hover:bg-slate-800 hover:bg-gray-100"
        } w-full flex items-center gap-3 transition rounded-lg px-2 h-14`
      }
    >
      <div className="w-fit h-fit relative">
        <img
          className="rounded-[50%] w-12"
          src={profileImage}
          alt={`${first_name} ${last_name}`}
        />
      </div>
      <div className="w-full flex justify-between px-2">
        <p
          className={
            franc(first_name) === "arb" || franc(last_name) === "arb"
              ? "arabic-font"
              : ""
          }
        >
          {first_name} {last_name}
        </p>
      </div>
    </NavLink>
  );
}
