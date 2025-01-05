import { FormField } from "@repo/ui/components/form";
import SignUpInputWithLabel from "@/features/auth/components/SignUpInputWithLabel.tsx";
import { useFormContext } from "react-hook-form";

const SignUpBusinessField = () => {
  const form = useFormContext();
  return (
    <section>
      <h3 className="text-lg font-bold border-b border-b-black py-2">
        사업자 정보 입력
      </h3>
      <FormField
        control={form.control}
        name="brandNameKo"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="한글 상호명"
            placeholder="한글 상호명"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="brandNameEn"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="영문 상호명"
            placeholder="영문 상호명"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="ceoName"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="대표자명"
            placeholder="대표자명"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="businessNumber"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="사업자 번호"
            placeholder="사업자 번호 10자리(숫자)"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="businessAddress"
        render={({ field }) => (
          <SignUpInputWithLabel
            label="사업자 주소"
            placeholder="사업자 주소"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </section>
  );
};

export default SignUpBusinessField;
