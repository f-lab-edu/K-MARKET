import { z } from "zod";
import { registerProductFormSchema } from "@/features/products/components/schemas";
import { supabase } from "@/utils/supabase/client";
import { uploadFileAndGetUrl } from "@/utils/file";

/**
 * 상품 등록
 * **/
export const registerProduct = async (
  productData: z.infer<typeof registerProductFormSchema>,
) => {
  if (!productData) return;

  const { data, error } = await supabase.rpc("insert_product_with_details", {
    category_id: Number(productData.category), // 카테고리 ID
    product_name: productData.name,
    product_price: Number(productData.price), // 상품 가격
    main_image_url: await uploadFileAndGetUrl(
      findMainImage(productData.images) as File,
      "products",
    ),
    options: productData.useOptions && mapOptions(productData.options),
    images: [
      ...mapImages(productData.images, "main"),
      ...mapImages(productData.details, "detail"),
    ],
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const findMainImage = (
  images: z.infer<typeof registerProductFormSchema>["images"],
) => {
  return images.find((image) => image.isMain)?.file;
};

const mapOptions = (
  options: z.infer<typeof registerProductFormSchema>["options"],
) => {
  return options.map((option) => {
    return {
      ...option,
      additional_price: Number(option.price),
    };
  });
};

const mapImages = (
  images: z.infer<typeof registerProductFormSchema>["details" | "images"],
  type: string,
) => {
  return images.map(async (image, index) => {
    if (!image.file) return;

    return {
      image_url: await uploadFileAndGetUrl(image.file, "products"),
      sort_order: index,
      type,
    };
  });
};

/**
 * 상품 조회
 * **/

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
