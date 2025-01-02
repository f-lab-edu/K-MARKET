"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInFormSchema } from "@/features/sign-in/schemas/sign-in";
import Link from "next/link";

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (value: z.infer<typeof signInFormSchema>) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2 w-80"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="이메일" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="비밀번호" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href="/forgot-password"
          className="block text-xs mt-1 font-medium text-gray-500"
        >
          비밀번호를 잊으셨나요?
        </Link>
        <Button type="submit" size="sm" className="w-full">
          로그인
        </Button>
        <p className="text-center text-sm py-2">
          계정이 없으신가요?
          <Link href="/sign-up" className="ml-1 text-blue-500">
            회원가입
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
