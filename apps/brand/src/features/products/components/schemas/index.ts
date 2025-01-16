import { z } from "zod";

export const registerProductFormSchema = z.object({
  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
  name: z.string().min(1, { message: "상품명을 입력해주세요." }),
  useOptions: z.boolean().optional(),
  price: z.string().min(1, { message: "가격을 입력해주세요." }),
  options: z
    .array(z.object({ name: z.string(), price: z.string() }))
    .optional(),
  images: z.array(
    z.object({
      file: z.instanceof(File),
      previewUrl: z.string().url(),
      isMain: z.boolean(),
    }),
  ),
  details: z.array(
    z.object({
      file: z.instanceof(File),
      previewUrl: z.string().url(),
    }),
  ),
});
