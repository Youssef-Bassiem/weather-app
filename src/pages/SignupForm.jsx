import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Link } from "react-router-dom";

import { useSignUp } from "@/hooks/useSignUp";

import BackDrop from "@/components/ui/BackDrop";
const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
    username: z.string().min(3, "Username must be at least 3 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export default function SignupForm() {
  const { signUp, isPending } = useSignUp();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
  });

  const { handleSubmit, reset } = form;

  function onSubmit({ email, password, username }) {
    signUp({ email, password, username });
    reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="no-scrollbar mt-14 flex h-2/3 w-[35rem] flex-col items-center justify-around overflow-y-scroll rounded-xl bg-[#161a2b] px-7 py-4 text-white shadow-[0px_0px_8px_black] max-sm:h-3/4 max-sm:w-96"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="bg-neutral-100 text-black"
                  placeholder="Entet Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input
                  className="bg-neutral-100 text-black"
                  type="password"
                  placeholder="Entet Your Password Again"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit" className="w-full">
          Submit
        </Button>
        <Link
          to="/login"
          className="mt-1 cursor-pointer self-start text-xs text-blue-500"
        >
          Already has Account?
        </Link>
      </form>
      {isPending && <BackDrop />}
    </Form>
  );
}
