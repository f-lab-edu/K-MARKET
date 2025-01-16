"use client";

import { Form, FormField, FormLabel } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { Input } from "@repo/ui/components/input";
import { Checkbox } from "@repo/ui/components/checkbox.tsx";
import { Edit, Plus, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select.tsx";

type RegisterProductFormSchema = {
  category: string;
  name: string;
  useOptions: boolean;
  price: string;
  options: { name: string; price: string }[];
  images: { file: File; previewUrl: string; isMain: boolean }[];
  details: { file: File; previewUrl: string }[];
};

const RegisterProductForm = () => {
  const form = useForm<RegisterProductFormSchema>({
    defaultValues: {
      category: "",
      name: "",
      useOptions: false,
      price: "",
      options: [{ name: "", price: "" }],
      images: [],
    },
  });

  const handleSubmit = async (value: any) => {
    console.log("상품 데이터:", value);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4 mt-4"
      >
        <Group title="카테고리" isRequired>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="goods">잡화</SelectItem>
                  <SelectItem value="cosmetics">화장품</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Group>
        <Group title="상품명" isRequired>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="상품명을 입력하세요"
                className="bg-white"
              />
            )}
          />
        </Group>
        <ImagesField />
        <Group title="상품 가격" isRequired>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="상품 가격을 입력하세요"
                className="bg-white"
              />
            )}
          />
        </Group>

        <Group title="옵션 사용 여부">
          <FormField
            control={form.control}
            name="useOptions"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                <span>옵션 사용</span>
              </div>
            )}
          />
        </Group>
        <OptionField />
        <DetailField />
        <div className="flex justify-end">
          <Button type="submit" className="w-full">
            상품 등록
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterProductForm;

const ImagesField = () => {
  const MAX_IMAGES = 10;

  const form = useFormContext<RegisterProductFormSchema>();
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
    update: updateImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newImages = Array.from(event.target.files);

    if (imageFields.length + newImages.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    newImages.forEach((file: File, index) => {
      const isMain = imageFields.length < 1 && index === 0;
      const imageUrl = URL.createObjectURL(file);
      appendImage({
        file,
        previewUrl: imageUrl,
        isMain,
      });
    });
  };

  const handleSetMainImage = (index: number) => {
    imageFields.forEach((image, imageIndex) => {
      if (imageIndex === index) {
        return updateImage(index, {
          ...image,
          isMain: true,
        });
      }
      updateImage(imageIndex, {
        ...image,
        isMain: false,
      });
    });
  };

  const handleEditImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    updateImage(index, {
      ...imageFields[index],
      file,
      previewUrl: imageUrl,
    });
  };
  const handleDeleteImage = (index: number) => {
    const isCurrentMain = imageFields[index].isMain;
    const isFirstImage = index === 0;
    if (isCurrentMain) {
      updateImage(0, {
        ...imageFields[0],
        isMain: true,
      });
    }

    if (isFirstImage && imageFields.length > 1) {
      updateImage(index + 1, {
        ...imageFields[index + 1],
        isMain: true,
      });
    }

    removeImage(index);
  };

  return (
    <Group title="상품 이미지" isRequired>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          <span className="text-blue-500">이미지 업로드</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <p className="text-sm text-gray-500 mt-2">
          최대 {MAX_IMAGES}개의 이미지를 업로드할 수 있습니다.
        </p>
      </div>

      {imageFields.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mt-4">
          {imageFields.map((field, index) => {
            if (!field.previewUrl) {
              return null;
            }

            return (
              <div
                key={field.id}
                className={cn(
                  "relative p-2 border rounded-lg",
                  field.isMain ? "border-blue-500" : "border-gray-300",
                )}
              >
                <Image
                  src={field.previewUrl}
                  alt={`상품 이미지 ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-40 rounded"
                />
                {field.isMain && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    대표 이미지
                  </div>
                )}
                {!field.isMain && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white text-blue-500 text-xs px-2 py-1 rounded shadow-md"
                    onClick={() => handleSetMainImage(index)}
                  >
                    대표 설정
                  </button>
                )}
                <div className="flex gap-2 absolute bottom-2 right-2">
                  <label className="bg-white text-xs px-2 py-1 rounded shadow-md cursor-pointer">
                    <Edit className="w-4 h-4 inline-block mr-1" />
                    수정
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) => handleEditImage(event, index)}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    className=" bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <Trash className="w-4 h-4 inline-block mr-1" />
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Group>
  );
};

const OptionField = () => {
  const form = useFormContext<RegisterProductFormSchema>();
  const useOptions = form.watch("useOptions");
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });
  if (!useOptions) {
    return null;
  }
  return (
    <Group title="상품 옵션">
      {optionFields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4 mb-2">
          <FormField
            control={form.control}
            name={`options.${index}.name`}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="옵션명 (예: 색상, 사이즈)"
                className="bg-white"
              />
            )}
          />
          <FormField
            control={form.control}
            name={`options.${index}.price`}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="옵션 가격"
                className="bg-white"
              />
            )}
          />
          <Button
            variant="outline"
            type="button"
            onClick={() => removeOption(index)}
            disabled={index === 0}
            className="p-2"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        onClick={() => appendOption({ name: "", price: "" })}
        className="w-28 flex items-center gap-2 ml-auto"
      >
        <Plus className="w-4 h-4" />
        옵션 추가
      </Button>
    </Group>
  );
};

const DetailField = () => {
  const MAX_IMAGES = 20;

  const form = useFormContext<RegisterProductFormSchema>();
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
    update: updateImage,
  } = useFieldArray({
    control: form.control,
    name: "details",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newImages = Array.from(event.target.files);

    if (imageFields.length + newImages.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    newImages.forEach((file: File, index) => {
      const imageUrl = URL.createObjectURL(file);
      appendImage({
        file,
        previewUrl: imageUrl,
      });
    });
  };

  const handleEditImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    updateImage(index, {
      ...imageFields[index],
      file,
      previewUrl: imageUrl,
    });
  };
  const handleDeleteImage = (index: number) => {
    removeImage(index);
  };

  return (
    <Group title="상품 설명" isRequired>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          <span className="text-blue-500">이미지 업로드</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <p className="text-sm text-gray-500 mt-2">
          최대 {MAX_IMAGES}개의 이미지를 업로드할 수 있습니다.
        </p>
      </div>

      {imageFields.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mt-4">
          {imageFields.map((field, index) => {
            if (!field.previewUrl) {
              return null;
            }

            return (
              <div
                key={field.id}
                className={cn("relative p-2 border rounded-lg")}
              >
                <Image
                  src={field.previewUrl}
                  alt={`상품 이미지 ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-40 rounded"
                />

                <div className="flex gap-2 absolute bottom-2 right-2">
                  <label className="bg-white text-xs px-2 py-1 rounded shadow-md cursor-pointer">
                    <Edit className="w-4 h-4 inline-block mr-1" />
                    수정
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) => handleEditImage(event, index)}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    className=" bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <Trash className="w-4 h-4 inline-block mr-1" />
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Group>
  );
};

const Group = ({
  title,
  isRequired,
  children,
}: {
  title: string;
  isRequired?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-1">
      <FormLabel>{title}</FormLabel>
      {isRequired && <span className="text-red-500">*</span>}
    </div>
    {children}
  </div>
);
