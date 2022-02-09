import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function InstallDbForm() {
  const [showAdminPassword, setShowAdminPassword] = React.useState(false)

  const handleClickShowAdminPassword = () => {
    setShowAdminPassword(!showAdminPassword);
  };

  const handleMouseDownAdminPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="admin-user">管理员用户名</InputLabel>
          <OutlinedInput
            id="admin-user"
            label="管理员用户名"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="admin-pass">管理员密码</InputLabel>
          <OutlinedInput
            id="admin-pass"
            label="管理员密码"
            type={showAdminPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowAdminPassword}
                  onMouseDown={handleMouseDownAdminPassword}
                  edge="end"
                >
                  {showAdminPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
  )
}