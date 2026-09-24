import { FormFieldProps } from "./form-field.type";
import React from "react";
import { TextField } from "@mui/material";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <TextField
    id="outlined-basic"
    label={name}
    variant="outlined"
    placeholder={placeholder}
    type={type}
    {...register(name)}
    error={!!error}
    helperText={error?.message}
  />
);

export default FormField;
