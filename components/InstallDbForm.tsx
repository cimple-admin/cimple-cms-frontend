import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InstallState } from '../pages/install';

interface Props {
  updateValue: (prop: keyof InstallState, value: string) => void;
  installValues: InstallState;
}

export default function InstallDbForm(props: Props) {
  const [showDbPassword, setShowDbPassword] = React.useState(false)
  const handleClickShowDbPassword = () => {
    setShowDbPassword(!showDbPassword);
  };

  const handleMouseDownDbPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDataChange  =
  (prop: keyof InstallState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    props.updateValue(prop, event.target.value);
  };
  return (
    <Box sx={{ width: '100%', my: 2 }}>
      {props.installValues.dbHost}
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-host">数据库地址</InputLabel>
        <OutlinedInput
          id="db-host"
          label="数据库地址"
          value={props.installValues.dbHost}
          onChange={handleDataChange('dbHost')}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-user">数据库用户名</InputLabel>
        <OutlinedInput
          id="db-user"
          label="数据库用户名"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-pass">数据库密码</InputLabel>
        <OutlinedInput
          id="db-pass"
          label="数据库密码"
          type={showDbPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowDbPassword}
                onMouseDown={handleMouseDownDbPassword}
                edge="end"
              >
                {showDbPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-database">数据库名称</InputLabel>
        <OutlinedInput
          id="db-database"
          label="数据库名称"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-tablename-prefix">数据库表前缀</InputLabel>
        <OutlinedInput
          id="db-tablename-prefix"
          label="数据库表前缀"
        />
      </FormControl>
    </Box>
  )
}