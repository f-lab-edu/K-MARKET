'use client'

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SignUpInputWithLabel from "@/features/auth/components/SignUpInputWithLabel.tsx";
import { Input } from "@repo/ui/components/input";
import { Camera } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import { signUpFormSchema } from "@/features/auth/schemas";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const handleSubmit = (value: z.infer<typeof signUpFormSchema>) => {
    console.log(value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col gap-8'>
        <section>
          <h3 className='text-lg font-bold border-b border-b-black py-2'>회원 정보 입력</h3>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <SignUpInputWithLabel type='email' label='이메일' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <SignUpInputWithLabel type='password' label='비밀번호' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({field}) => (
              <SignUpInputWithLabel type='password' label='비밀번호 확인' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <SignUpInputWithLabel label='이름' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <SignUpInputWithLabel label='휴대전화번호' value={field.value} onChange={field.onChange}/>
            )}
          />
        </section>
        <section>
          <h3 className='text-lg font-bold border-b border-b-black py-2'>사업자 정보 입력</h3>
          <FormField
            control={form.control}
            name="brandNameKo"
            render={({field}) => (
              <SignUpInputWithLabel label='한글 상호명' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="brandNameEn"
            render={({field}) => (
              <SignUpInputWithLabel label='영문 상호명' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="brandNameEn"
            render={({field}) => (
              <SignUpInputWithLabel label='대표자명' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="businessNumber"
            render={({field}) => (
              <SignUpInputWithLabel label='사업자 번호' value={field.value} onChange={field.onChange}/>
            )}
          />
          <FormField
            control={form.control}
            name="businessAddress"
            render={({field}) => (
              <SignUpInputWithLabel label='사업자 주소' value={field.value} onChange={field.onChange}/>
            )}
          />
        </section>
        <section>
          <h3 className='text-lg font-bold border-b border-b-black py-2'>증빙 서류 제출</h3>
          <div className="p-4 mt-5 rounded bg-yellow-50">
            <strong>
              서류 제출 전 꼭 확인해주세요!
            </strong>
            <p className="mt-2 text-gray-600">사장님의 소중한 개인정보 보호를 위해 이름, 생년월일을 제외한 모든 개인정보는 가려주세요!<br/>서류 제출 시, 개인정보를 가리지
              않으면 매장 승인이 거절될 수 있어요.
            </p>
          </div>
          <div className=" flex items-center gap-2 text-gray-600 p-4 mt-2 mb-5 rounded bg-yellow-100">
            <Badge>TIP!</Badge>주민등록번호 뒷자리를 보이지 않게 서류를 발급하면 증빙 서류 제출이 더욱 쉬워져요.
          </div>
          <div className='flex py-3'>
            <div className='w-40 px-4'>증빙 서류</div>
            <div className='flex gap-8'>
              <FormField
                control={form.control}
                name="businessRegCert"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      <Badge variant='destructive'>첨부1</Badge> 사업자 등록증
                      <div
                        className="flex flex-col gap-2 items-center justify-center mt-2 w-32 h-32 bg-gray-200 rounded">
                        <Camera size={24}/>
                        <span className="text-gray-500">파일 첨부</span>
                      </div>
                    </FormLabel>
                    <FormControl className='hidden'>
                      <Input type='file' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idCard"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      <Badge variant='destructive'>첨부2</Badge> 신분증
                      <div
                        className="flex flex-col gap-2 items-center justify-center mt-2 w-32 h-32 bg-gray-200 rounded">
                        <Camera size={24}/>
                        <span className="text-gray-500">파일 첨부</span>
                      </div>
                    </FormLabel>
                    <FormControl className='hidden'>
                      <Input type='file' {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>

        <Button type="submit" size='sm' className='w-full'>가입하기</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
