import { FormFieldProps } from "./form-field.type";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";

const PasswordField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  const outlinedPasswordId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={`${outlinedPasswordId}-input`}>
        {name === "password" ? "password" : "confirm password"}
      </InputLabel>
      <OutlinedInput
        fullWidth
        {...register(name)}
        placeholder={placeholder}
        error={!!error}
        id={`${outlinedPasswordId}-input`}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide the password" : "display the password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {error?.message && <FormHelperText error={false}>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordField;
