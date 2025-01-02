import SignUpInputWithLabel from "@/features/auth/components/SignUpInputWithLabel.tsx";
import { useFormContext } from "react-hook-form";
import { FormField } from "@repo/ui/components/form";

const SignUpUserField = () => {
  const form = useFormContext();
  return (
    <section>
      <h3 className="text-lg font-bold border-b border-b-black py-2">
        회원 정보 입력
      </h3>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <SignUpInputWithLabel
            type="email"
            placeholder="이메일"
            label="이메일"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <SignUpInputWithLabel
            type="password"
            placeholder="비밀번호는 영문, 숫자, 특수기호 조합으로 6자리 이상"
            label="비밀번호"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="passwordConfirm"
        render={({ field }) => (
          <SignUpInputWithLabel
            type="password"
            placeholder="비밀번호 확인"
            label="비밀번호 확인"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="이름"
            placeholder="이름"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="휴대전화번호"
            placeholder="휴대전화번호(-없이 입력)"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </section>
  );
};

export default SignUpUserField;
