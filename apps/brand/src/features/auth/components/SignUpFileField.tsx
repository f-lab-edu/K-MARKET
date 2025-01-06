import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { useFormContext } from "react-hook-form";
import { Badge } from "@repo/ui/components/badge";
import { Camera } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import React from "react";
import { useToast } from "@repo/ui/hooks/use-toast";
import Image from "next/image";

const SignUpFileField = () => {
  const form = useFormContext();
  const { toast } = useToast();
  const convertFileObject = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.files?.[0];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedFormats = ["image/jpeg", "image/png"];

    const file = convertFileObject(event);
    if (file && !allowedFormats.includes(file.type)) {
      return toast({
        title: "JPG 또는 PNG 형식의 파일만 업로드 가능합니다.",
        variant: "destructive",
        duration: 1000,
      });
    }
    return convertFileObject(event);
  };
  return (
    <section>
      <h3 className="text-lg font-bold border-b border-b-black py-2">
        증빙 서류 제출
      </h3>
      <div className="p-4 mt-5 rounded bg-yellow-50">
        <strong>서류 제출 전 꼭 확인해주세요!</strong>
        <p className="mt-2 text-gray-600">
          사장님의 소중한 개인정보 보호를 위해 이름, 생년월일을 제외한 모든
          개인정보는 가려주세요!
          <br />
          서류 제출 시, 개인정보를 가리지 않으면 매장 승인이 거절될 수 있어요.
        </p>
      </div>
      <div className=" flex items-center gap-2 text-gray-600 p-4 mt-2 mb-5 rounded bg-yellow-100">
        <Badge>TIP!</Badge>주민등록번호 뒷자리를 보이지 않게 서류를 발급하면
        증빙 서류 제출이 더욱 쉬워져요.
      </div>
      <div className="flex py-3">
        <div className="w-40 px-4">증빙 서류</div>
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="businessRegCert"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Badge variant="destructive">첨부1</Badge> 사업자 등록증
                  <div className="relative flex flex-col gap-2 items-center justify-center mt-2 w-32 h-32 bg-gray-200 rounded overflow-hidden">
                    <BusinessFile file={field.value} alt="사업자 등록증" />
                  </div>
                </FormLabel>
                <FormControl className="hidden">
                  <Input
                    type="file"
                    accept={".jpg, .jpeg, .png"}
                    onChange={(event) =>
                      field.onChange(handleImageUpload(event))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Badge variant="destructive">첨부2</Badge> 신분증
                  <div className="relative flex flex-col gap-2 items-center justify-center mt-2 w-32 h-32 bg-gray-200 rounded overflow-hidden">
                    <BusinessFile file={field.value} alt="신분증" />
                  </div>
                </FormLabel>
                <FormControl className="hidden">
                  <Input
                    type="file"
                    accept={".jpg, .jpeg, .png"}
                    onChange={(event) =>
                      field.onChange(handleImageUpload(event))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default SignUpFileField;

const BusinessFile = ({ file, alt }: { file: File; alt: string }) => {
  if (!file)
    return (
      <>
        <Camera size={24} />
        <span className="text-gray-500">파일 첨부</span>
      </>
    );
  const url = URL.createObjectURL(file);
  return <Image src={url} alt={alt} fill />;
};
