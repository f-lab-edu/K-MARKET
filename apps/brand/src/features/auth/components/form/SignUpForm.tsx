"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpFormSchema } from "@/features/auth/schemas";
import SignUpUserField from "@/features/auth/components/SignUpUserField.tsx";
import SignUpBusinessField from "@/features/auth/components/SignUpBusinessField.tsx";
import SignUpFileField from "@/features/auth/components/SignUpFileField.tsx";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      brandNameKo: "",
      brandNameEn: "",
      ceoName: "",
      businessNumber: "",
      businessAddress: "",
      businessRegCert: "",
      idCard: "",
    },
  });

  const handleSubmit = (value: z.infer<typeof signUpFormSchema>) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-8"
      >
        <SignUpUserField />
        <SignUpBusinessField />
        <SignUpFileField />
        <Button type="submit" size="sm" className="w-full">
          가입하기
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
