import baseAPI from "@/api/base";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import UserCard from "./components/UserCard";
export default function SendFriendRequests() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [foundedUserData, setFoundedUserData] = useState<ProfileType | null>(
        null,
    );
    async function formHandler(e: FormEvent) {
        e.preventDefault();
        try {
            setFormLoading(true);
            if (usernameRef.current) {
                if (usernameRef.current?.value.length > 0) {
                    if (usernameRef.current.value.includes(" "))
                        throw "username cannot contain spaces";
                    const userFoundedData = await baseAPI
                        .get<ProfileType>(`/users/profile/?un=${usernameRef.current.value}`)
                        .then((res) => res.data);
                    setFoundedUserData(userFoundedData);
                } else throw "please fill in the field";
            }
        } catch (err) {
            setFoundedUserData(null);
            type errorType = AxiosError<{ detail: string }> | string;
            const error = err as errorType;
            if (typeof error === "string") {
                return toast.error(`error - ${error}`);
            } else {
                toast.error(`error - ${error.response?.data.detail}`);
            }
        } finally {
            setFormLoading(false);
        }
    }
    return (
        <div className="container text-white flex flex-col w-full h-[80%] mt-12 justify-center">
            <h1 className="text-center font-bold text-2xl text-black dark:text-white">
                Send a Friend Request
            </h1>
            <form className="flex h-[4.2rem] gap-2" onSubmit={formHandler}>
                <Input
                    ref={usernameRef}
                    title="username"
                    desc="enter the username of the user you want to be a friend with"
                />
                <Button className="mt-auto" disabled={formLoading} type="submit">
                    {!formLoading ? "submit" : "sending..."}
                </Button>
            </form>
            <div className="w-full h-full flex pt-14 items-center justify-center">
                {foundedUserData ? <UserCard {...foundedUserData} /> : null}
            </div>
        </div>
    );
}
