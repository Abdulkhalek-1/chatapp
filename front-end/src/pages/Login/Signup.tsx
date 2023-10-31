import { FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { Toaster, toast } from "sonner"
import { Link } from "react-router-dom"
import Form from "@/components/ui/Form"
import useValidate from "@/hooks/useValidate"

export default function Signup() {
  const [firstSubmit, setFirstSubmit] = useState(true)
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")
  const [usernameValue, setUserNameValue] = useState("")
  const { success, getErrorsFrom } = useValidate(
    {
      email: z.string().email().includes("@gmail").optional(),
      password: z
        .string()
        .min(8)

        .refine(
          (value) => {
            try {
              const includes = !value.includes(
                emailValue.split("@")[0],
              )
              return emailValue.length > 0
                ? includes
                : true
            } catch {
              return true
            }
          },
          {
            message: "the password shouldn't be similar to other info",
          },
        )
        .refine(
          (value) => {
            if (value === "") return true
            return value
              .split("")
              .some((el) => isNaN(parseInt(el)))
          },
          {
            message: "the password cannot be entirely numeric",
          },
        ),
      confirmPassword: z.string().refine(
        (value) => {
          return value === passwordValue
        },
        {
          message: "the confirm password doesn't match the password",
        },
      ),
      username: z.string().refine(value => !value.includes(" "), { message: "the user name shouldn't contain spaces" })
    },
    {
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
      username: usernameValue
    }
    ,
  )
  const emailErrors = !firstSubmit ? getErrorsFrom("email") : []
  const passwordErrors = !firstSubmit ? getErrorsFrom("password") : []
  const confirmPasswordErrors = !firstSubmit
    ? getErrorsFrom("confirmPassword")
    : []
  function formHandler(e: FormEvent) {
    e.preventDefault()
    setFirstSubmit(false)
    if (success) {
      toast.success("authentication completed")
      // when the form success code
    } else {
      toast.error("authentication failed")
    }
  }
  return (
    <>
      <div className="w-full h-full grid place-items-center px-2 bg-white dark:bg-slate-900">
        <Form title="signup" onsubmit={formHandler}>
          <div className="flex flex-col gap-2 mb-4">
            <Input title="username" type="text" value={usernameValue} onChange={e => setUserNameValue(e.currentTarget.value)} />
            <Input
              errors={emailErrors}
              value={emailValue}
              onChange={(e) =>
                setEmailValue(e.target.value)
              }
              title="email"
              type="email"
            />
            <Input
              errors={passwordErrors}
              title="password"
              type="password"
              value={passwordValue}
              onChange={(e) =>
                setPasswordValue(e.target.value)
              }
            />
            <Input
              errors={confirmPasswordErrors}
              title="confirm password"
              type="text"
              value={confirmPasswordValue}
              onChange={(e) =>
                setConfirmPasswordValue(e.target.value)
              }
            />
          </div>
          <Form.submitBtn>signup</Form.submitBtn>
          <div className="flex justify-center items-center mt-auto w-full">
            already have an account?{" "}
            <Button
              asChild
              type="button"
              variant={"link"}
              className="w-fit h-fit p-0 pl-2"
            >
              <Link to="/accounts/login">login</Link>
            </Button>
          </div>
        </Form>
      </div>
      <Toaster richColors position="top-right" />
    </>
  )
}
