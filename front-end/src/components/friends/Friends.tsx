import { Suspense, useState } from "react";
import Friend from "./components/Friend";
import SkeletonList from "../ui/SkeletonList";
import SkeletonFriend from "./components/SkeletonFriend";
import { Await } from "react-router-dom";
import { Input } from "../ui/input";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Friends({
  friends: { friendsPromise },
}: {
  friends: { friendsPromise: Promise<FriendType[]> };
}) {
  const [filteredFriends, setFilteredFriends] = useState<null | FriendType[]>(
    null,
  );
  const [filterArchiveStatus, setFilterArchiveStatus] = useState(false);
  return (
    <>
      <div className="search w-full h-fit px-4 pb-2">
        <Suspense
          fallback={
            <>
              <Input
                disabled
                placeholder="loading..."
                className="w-full h-12"
              />
            </>
          }
        >
          <Await resolve={friendsPromise}>
            {(friends: FriendType[]) => (
              <div className="flex w-full justify-between">
                <Input
                  onInput={(e) => {
                    setFilteredFriends(
                      friends.filter((el) =>
                        el.name
                          .toLowerCase()
                          .includes(e.currentTarget.value.toLowerCase()),
                      ),
                    );
                  }}
                  placeholder="search in your friends"
                  type="search"
                  className="w-[18.9rem]"
                />
                <button
                  onClick={() => setFilterArchiveStatus((c) => !c)}
                  className={`bg-red-600 w-10 h-10 bg-gray-500 bg-opacity-0 grid place-items-center transition hover:bg-opacity-20 rounded-[50%] ${filterArchiveStatus
                      ? "!bg-blue text-white dark:bg-dark-blue"
                      : ""
                    }`}
                >
                  <FontAwesomeIcon icon={faArchive} />
                </button>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
      <div className="friends-container flex flex-col gap-1 w-full h-full overflow-x-auto px-4">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <SkeletonFriend />
            </SkeletonList>
          }
        >
          <Await resolve={friendsPromise}>
            {(friends: FriendType[]) =>
              (filteredFriends ? filteredFriends : friends)
                .filter((friend) =>
                  filterArchiveStatus ? friend.archive : !friend.archive,
                )
                .sort((a) => {
                  return a.status === "online" ? -1 : 1;
                })
                .sort((a) => {
                  return a.notifications ? -1 : 1;
                })
                .map((friend) => (
                  <Friend
                    key={crypto.randomUUID()}
                    {...friend}
                    id={friend.id}
                  />
                ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
}
