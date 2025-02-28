import { z } from 'zod';

export const registerProductFormSchema = z.object({
  category: z.string().min(1, { message: '카테고리를 선택해주세요.' }),
  name: z.string().min(1, { message: '상품명을 입력해주세요.' }),
  useOptions: z.boolean().optional(),
  price: z
    .string()
    .regex(/^\d+$/, { message: '숫자만 입력해주세요.' })
    .min(1, { message: '가격을 입력해주세요.' }),
  discount_price: z
    .string()
    .regex(/^\d+$/, { message: '숫자만 입력해주세요.' })
    .optional()
    .or(z.literal('')),
  min_qty: z.string().regex(/^\d+$/, { message: '숫자만 입력해주세요.' }),
  options: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
    }),
  ),
  images: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        previewUrl: z.string().url().optional(),
        type: z.enum(['main', 'normal']),
      }),
    )
    .min(1, { message: '최소 1개 이상의 이미지를 업로드해주세요.' })
    .max(10, { message: '최대 10개까지 업로드할 수 있습니다.' }),
  details: z
    .array(
      z.object({
        file: z.instanceof(File),
        previewUrl: z.string().url(),
        type: z.enum(['detail']),
      }),
    )
    .min(1, { message: '최소 1개 이상의 이미지를 업로드해주세요.' })
    .max(20, { message: '최대 20개까지 업로드할 수 있습니다.' }),
  brandId: z.number(),
});
