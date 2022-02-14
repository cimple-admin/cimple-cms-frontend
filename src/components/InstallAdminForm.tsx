import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InstallProps, InstallState } from '../interface/install';

export default function InstallDbForm(props: InstallProps) {
  React.useEffect(() => {
    props.submit.current.validate = () => {
      console.log('bbbbbbbb');
      return 'bcd';
    }
  })
  const [showAdminPassword, setShowAdminPassword] = React.useState(false)

  const handleClickShowAdminPassword = () => {
    setShowAdminPassword(!showAdminPassword);
  };

  const handleMouseDownAdminPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDataChange  =
  (prop: keyof InstallState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateValue(prop, event.target.value);
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="admin-user">管理员用户名</InputLabel>
          <OutlinedInput
            id="admin-user"
            label="管理员用户名"
            value={props.installValues.adminUser}
            onChange={handleDataChange('adminUser')}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="admin-pass">管理员密码</InputLabel>
          <OutlinedInput
            id="admin-pass"
            label="管理员密码"
            type={showAdminPassword ? 'text' : 'password'}
            value={props.installValues.adminPass}
            onChange={handleDataChange('adminPass')}
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
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="admin-repass">重复密码</InputLabel>
          <OutlinedInput
            id="admin-repass"
            label="重复密码"
            type={showAdminPassword ? 'text' : 'password'}
            value={props.installValues.adminRepass}
            onChange={handleDataChange('adminRepass')}
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
