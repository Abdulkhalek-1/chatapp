import baseAPI from "@/api/base";
import Form from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SkeletonProfile from "./components/SkeletonProfile";
import { useUserData } from "@/store";
import ImageSelect from "./components/ImageSelect";
import getCookie from "@/utils/getCookie";
import { Button } from "@/components/ui/button";
import { CornerUpLeft } from "lucide-react";

export default function Profile() {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLTextAreaElement>(null);
  const { setUserData, authenticated, ...userData } = useUserData(
    (store) => store,
  );

  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      try {
        const profile: { data: ProfileType } = await baseAPI
          .get("/users/profile/")
          .then((res) => res.data);
        setUserData({ authenticated: true, ...profile.data });
      } catch {
        navigate("/accounts/login");
      }
    }
    getData();
  }, [navigate, setUserData]);
  async function formHandler(e: FormEvent) {
    e.preventDefault();
    if (
      firstNameInputRef.current &&
      lastNameInputRef.current &&
      bioInputRef.current
    ) {
      try {
        if (
          firstNameInputRef.current?.value.length > 0 &&
          lastNameInputRef.current.value.length > 0
        ) {
          setFormLoading(true);
          const csrftoken = getCookie("csrftoken");
          const {
            data: patchedUserData,
          }: {
            data: {
              bio: string;
              picture: string;
              user: { first_name: string; last_name: string };
            };
          } = await baseAPI.patch(
            "/users/profile/",
            {
              user: {
                first_name: firstNameInputRef.current.value,
                last_name: lastNameInputRef.current.value,
              },
              bio: bioInputRef.current.value,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
              },
            },
          );
          setUserData({
            authenticated: true,
            ...userData,
            picture: patchedUserData.picture,
            bio: patchedUserData.bio,
            first_name: patchedUserData.user.first_name,
            last_name: patchedUserData.user.last_name,
          });
          navigate("/chats");
        } else throw "please fill in the planks";
      } catch (error) {
        toast.error(`error - ${error}`);
      } finally {
        setFormLoading(false);
      }
    }
  }
  return (
    <>
      {authenticated ? (
        <>
          <div className="relative w-full h-full grid place-items-center px-2 bg-white dark:bg-slate-900">
            <Button
              asChild
              className="w-fit cursor-pointer h-fit absolute top-4 left-4"
              onClick={() => navigate("/")}
            >
              <CornerUpLeft />
            </Button>
            <Form onsubmit={formHandler}>
              <div className="flex flex-col gap-2 mb-4">
                <picture>
                  <img
                    alt="profile"
                    draggable="false"
                    className="w-[8rem] h-[8rem] rounded-[50%] mx-auto mb-4"
                    src={`${import.meta.env.VITE_API_URL}${userData?.picture}`}
                  />
                </picture>
                <ImageSelect />
                <Input
                  defaultValue={userData?.first_name}
                  title="first name"
                  type="text"
                  ref={firstNameInputRef}
                />
                <Input
                  ref={lastNameInputRef}
                  defaultValue={userData?.last_name}
                  title="last name"
                  type="text"
                />
                <Textarea
                  ref={bioInputRef}
                  className="resize-none"
                  defaultValue={userData?.bio}
                  placeholder="write your bio here"
                />
              </div>
              <Form.SubmitBtn disabled={formLoading} className="mb-0">
                {formLoading ? "loading..." : "save"}
              </Form.SubmitBtn>
            </Form>
          </div>
        </>
      ) : (
        <SkeletonProfile />
      )}
    </>
  );
}
