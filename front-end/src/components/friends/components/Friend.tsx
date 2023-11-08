import { useState, MouseEvent, useEffect, useRef } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { franc } from "franc";

export default function Friend({
  name,
  img,
  notifications = false,
  status,
  id,
}: FriendType) {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const friendRef = useRef<HTMLAnchorElement>(null);

  const handleContextMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Calculate the position of the custom context menu
    const top = e.clientY;
    const left = e.clientX;
    setContextMenuPosition({ top, left });

    setContextMenuVisible(true);
  };

  const handleLeftClick = () => {
    // Hide the context menu when left-clicking
    setContextMenuVisible(false);
  };

  const handleContextMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent clicks on the context menu from closing it
    e.stopPropagation();
  };

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      // Hide the context menu when clicking anywhere outside the Friend component
      if (friendRef.current && !friendRef.current.contains(e.target as Node)) {
        setContextMenuVisible(false);
      }
    };

    // Add a click event listener to the window
    window.addEventListener("click", handleWindowClick);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

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
      onContextMenu={handleContextMenu} // Show the custom context menu on right-click
      onClick={handleLeftClick} // Hide the context menu on left-click
    >
      <div className="w-fit h-fit relative">
        {typeof img === "string" ? (
          <img className="rounded-[50%] w-12" src={img} alt={name} />
        ) : (
          <div className="rounded-[50%] w-4 grid place-items-center pl-2">
            <FontAwesomeIcon icon={img} />
          </div>
        )}
        {status && (
          <div
            className={`status absolute bottom-0 left-0 w-3 h-3 rounded-[50%] ${status === "online"
                ? "bg-green"
                : status === "offline"
                  ? "dark:bg-slate-400 bg-gray-300"
                  : status === "do not disturb"
                    ? "bg-red"
                    : ""
              }`}
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

      {contextMenuVisible && (
        <div
          className="custom-context-menu"
          style={{
            top: contextMenuPosition.top + "px",
            left: contextMenuPosition.left + "px",
          }}
          onClick={handleContextMenuClick}
        >
          <div onClick={() => alert("Custom Action 1")}>Custom Action 1</div>
          <div onClick={() => alert("Custom Action 2")}>Custom Action 2</div>
        </div>
      )}
    </NavLink>
  );
}
