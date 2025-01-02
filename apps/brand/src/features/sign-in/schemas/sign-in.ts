import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, {
    message: "유효하지 않은 이메일 주소입니다.",
  }),
  password: z
    .string()
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/i, {
      message:
        "비밀번호는 영문, 숫자, 특수기호 조합으로 6자리 이상이어야 합니다.",
    }),
});
