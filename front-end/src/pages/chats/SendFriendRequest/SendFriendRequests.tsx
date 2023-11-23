import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
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
                    toast.success("success");
                } else throw "please fill in the field";
            }
        } catch (error) {
            toast.error(`error - ${error}`);
        } finally {
            setFormLoading(false);
        }
    }
    return (
        <div className="container text-white flex flex-col w-full mt-12 justify-center">
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
            {foundedUserData ? <h1>Founded User</h1> : null}
        </div>
    );
}
