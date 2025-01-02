"use client";

import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";

interface SignUpInputWithLabelProps {
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpInputWithLabel = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
}: SignUpInputWithLabelProps) => {
  return (
    <FormItem className="border-b py-3">
      <div className="flex items-center">
        <FormLabel className="w-40 px-4">
          {label}
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        </FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default SignUpInputWithLabel;
