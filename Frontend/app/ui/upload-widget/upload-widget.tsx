"use client";
import { Button, Fab } from "@mui/material";
import { CldUploadWidget } from "next-cloudinary";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "../add-product/add-product-type";

type Prop = {
  readonly setValue: UseFormSetValue<FormData>;
};
export default function CloudinaryUploader({ setValue } : Prop) {
  const handleSuccess = (result) => {
    console.log("Uploaded:", result.info.secure_url);
    setValue("Image", result.info.secure_url, { shouldValidate: true });
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={handleSuccess}
    >
      {({ open }) => (
        // <button onClick={() => open()} type='button'>Upload Image</button>
        <Button type="button" onClick={() => open()}>
          Upload Image
        </Button>
      )}
    </CldUploadWidget>
  );
}
