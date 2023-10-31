import { Suspense, useState } from "react";
import Friend from "./components/Friend";
import SkeletonList from "../ui/SkeletonList";
import SkeletonFriend from "./components/SkeletonFriend";
import { Await } from "react-router-dom";
import { Input } from "../ui/input";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

export default function Friends({
  friends: { friendsPromise },
}: {
  friends: { friendsPromise: Promise<FriendType[]> };
}) {
  const [filteredFriends, setFilteredFriends] = useState<null | FriendType[]>(
    null,
  );
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
              />
            )}
          </Await>
        </Suspense>
      </div>
      <div className="friends-container flex flex-col gap-1 w-full h-full overflow-x-auto px-4">
        <Friend archive={false} img={faBoxArchive} name="archive" />
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
                .filter((friend) => !friend.archive)
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
