import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { githubProvider, googleProvider } from "../Firebase";
import { useLogin } from "@/hooks/useLogin";
import { useSignIn } from "@/hooks/useSignIn";

import { Link } from "react-router-dom";
import BackDrop from "../components/ui/BackDrop";
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export default function LoginForm() {
  const { login, isPending: isPendingLogin } = useLogin();
  const { signIn } = useSignIn();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, reset } = form;

  function onSubmit({ email, password }) {
    login({ email, password });
    reset();
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="no-scrollbar mt-14 flex h-2/3 w-[35rem] flex-col items-center justify-around overflow-y-scroll rounded-xl bg-[#161a2b] px-7 py-2 text-white shadow-[0px_0px_8px_black] max-sm:h-3/4 max-sm:w-96"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-100 text-black"
                    placeholder="Entet Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-100 text-black"
                    type="password"
                    placeholder="Entet Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit" className="w-full p-5">
            Login
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <p>Don&apos;t have an account?</p>
            <Link
              to="/sign"
              className="font-medium tracking-tighter text-blue-500"
            >
              Create New Account
            </Link>
          </div>

          <div className="flex w-full items-center justify-center gap-2 text-center">
            <hr className="inline-block w-2/5 opacity-30" />
            or
            <hr className="inline-block w-2/5 opacity-30" />
          </div>
          <div className="flex w-full gap-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                signIn(googleProvider);
              }}
              variant="secondary"
              className="flex w-full items-center justify-center gap-1"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-base">Google</span>
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                signIn(githubProvider);
              }}
              variant="secondary"
              className="flex w-full items-center justify-center gap-1"
            >
              <IoLogoGithub className="h-5 w-5" />
              <span className="text-base">Github</span>
            </Button>
          </div>
        </form>
        {isPendingLogin && <BackDrop />}
      </Form>
    </>
  );
}
