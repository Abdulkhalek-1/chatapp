import { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/ui/Form";
import { AxiosError } from "axios";
import baseAPI from "@/api/base";
import { useUserData } from "@/store";

export default function Login() {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setUserData = useUserData((store) => store.setUserData);
  const navigate = useNavigate();
  async function formHandler(e: FormEvent) {
    e.preventDefault();
    try {
      setFormLoading(true);
      await baseAPI.post("/users/login/", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      const userData: { data: ProfileType } =
        await baseAPI.get("/users/profile/");
      setUserData({ authenticated: true, ...userData.data });
      navigate("/chats");
    } catch (error) {
      toast.error(`error - ${(error as AxiosError).message}`);
    } finally {
      setFormLoading(false);
    }
  }
  return (
    <>
      <div className="w-full h-full grid place-items-center px-2 bg-white dark:bg-slate-900 shadow-lg">
        <Form title="login" onsubmit={formHandler} providers={["google"]}>
          <div className="flex flex-col gap-2 mb-4">
            <Input ref={usernameRef} title="username" type="email" />
            <Input ref={passwordRef} title="password" type="password" />
          </div>
          <div className="w-full flex justify-between mb-2">
            <div className="w-full flex items-center gap-2">
              <Checkbox id="rememberMe" />
              <label htmlFor="rememberMe">remember me</label>
            </div>
            <Button
              asChild
              type="button"
              variant={"link"}
              className="whitespace-nowrap"
            >
              <Link to={"reset"}>forget password?</Link>
            </Button>
          </div>
          <Form.SubmitBtn disabled={formLoading}>
            {formLoading ? "loading..." : "login"}
          </Form.SubmitBtn>
          <div className="flex justify-center items-center mt-auto w-full">
            don't have account?{" "}
            <Button
              asChild
              type="button"
              variant={"link"}
              className="w-fit h-fit p-0 pl-2"
            >
              <Link to="/accounts/signup">sign up</Link>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
