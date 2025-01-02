import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/i;
const imageRegex = /\.(jpg|jpeg|png|pdf)$/i;
export const signInFormSchema = z.object({
  email: z.string().regex(emailRegex, {
    message: "유효하지 않은 이메일 주소입니다.",
  }),
  password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/i, {
    message: "비밀번호는 영문, 숫자, 특수기호 조합으로 6자리 이상이어야 합니다.",
  }),
})


export const signUpFormSchema = z.object({
  email: z.string().regex(emailRegex, {
    message: "유효하지 않은 이메일 주소입니다.",
  }),
  password: z.string().regex(passwordRegex, {
    message: "비밀번호는 영문, 숫자, 특수기호 조합으로 6자리 이상이어야 합니다.",
  }),
  passwordConfirm: z.string().regex(passwordRegex, {
    message: "비밀번호는 영문, 숫자, 특수기호 조합으로 6자리 이상이어야 합니다.",
  }),
  name: z
    .string()
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: "이름은 한글 또는 영어만 입력 가능합니다.",
    }),
  phone: z
    .string()
    .regex(/^\d{2,3}\d{3,4}\d{4}$/, {
      message: "올바른 전화번호 형식이 아닙니다. (예: 01012345678)",
    }),
  brandNameKo: z
    .string()
    .regex(/^[가-힣\s]+$/, {
      message: "한글 상호명은 한글과 공백만 입력 가능합니다.",
    }),
  brandNameEn: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, {
      message: "영어 상호명은 영어와 공백만 입력 가능합니다.",
    }),
  ceoName: z
    .string()
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: "대표자 명은 한글 또는 영어만 입력 가능합니다.",
    }),
  businessNumber: z.string()
    .regex(/^\d{10}$/, {
      message: "사업자 번호는 10자리 숫자로 입력해주세요.",
    }),
  businessAddress: z.string().min(1, {message: "사업장 주소를 입력해 주세요."}),
  businessRegCert: z
    .string()
    .regex(imageRegex, {
      message: "사업자 등록증 파일은 JPG, JPEG, PNG 또는 PDF 형식이어야 합니다.",
    }),
  idCard: z
    .string()
    .regex(imageRegex, {
      message: "신분증 파일은 JPG, JPEG, PNG 또는 PDF 형식이어야 합니다.",
    }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "비밀번호가 일치하지 않습니다.",
});