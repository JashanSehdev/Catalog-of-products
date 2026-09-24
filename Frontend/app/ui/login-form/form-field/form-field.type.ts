import { FieldError, UseFormRegister } from "react-hook-form";
import {z} from "zod";


export type FormData = z.infer<typeof signUpSchema>
export const signUpSchema = z.object({
    email : z.string().min(1, {message : "Email required"}).email(),
    password : z.string().min(6, { message : "Password should be atleast 6 words"}).max(20),
})

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

  export type ValidFieldNames =
  | "email"
  | "name"
  | "password"
  | "confirmPassword"
  | "role";


