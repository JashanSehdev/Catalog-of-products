import { FieldError, UseFormRegister } from "react-hook-form";
import z from "zod";

export type FormData = {
    product_name : string,
    Image: string,
    description : string,
    price : string,
    product_category : string,
  };

  export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    valueAsNumber?: boolean;
  };


  export type ValidFieldNames =
  | 'product_name'
  | 'product_category'
  | 'Image'
  | 'description'
  | 'price'


    export const Product_Schema = z.object({
      product_name : z.string().min(1, "ProductName required"),
      Image: z.string().url("Invalid URL"),
      description :z.string().min(1, "Description Required"),
     price : z.string().min(1, 'price should be a number'),
      product_category : z.string().min(1, 'product category required'),
    })