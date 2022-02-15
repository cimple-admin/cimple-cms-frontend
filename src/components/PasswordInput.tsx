import { Input, InputProps } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';

export const PasswordInputCustom = React.forwardRef<HTMLElement, InputProps>(
  function TextMaskCustom(props, ref) {
    const {  ...other } = props;

    // 显示隐藏密码的操作
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowDbPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownDbPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowDbPassword}
              onMouseDown={handleMouseDownDbPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
        inputRef={ref}
      />
    );
  },
);
