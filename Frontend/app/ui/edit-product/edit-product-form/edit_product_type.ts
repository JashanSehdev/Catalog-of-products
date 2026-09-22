import {  UseFormRegister } from "react-hook-form";

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