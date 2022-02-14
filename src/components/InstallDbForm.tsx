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
    props.submit.current.abc = () => {
      console.log('aaaaaaaa');
      return "abc";
    }
  })
  const [showDbPassword, setShowDbPassword] = React.useState(false)
  const handleClickShowDbPassword = () => {
    setShowDbPassword(!showDbPassword);
  };

  const handleMouseDownDbPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDataChange  =
  (prop: keyof InstallState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateValue(prop, event.target.value);
  };
  return (
    <Box sx={{ width: '100%', my: 2 }}>
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
          value={props.installValues.dbUser}
          onChange={handleDataChange('dbUser')}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-pass">数据库密码</InputLabel>
        <OutlinedInput
          id="db-pass"
          label="数据库密码"
          type={showDbPassword ? 'text' : 'password'}
          value={props.installValues.dbPass}
          onChange={handleDataChange('dbPass')}
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
          value={props.installValues.dbDatabase}
          onChange={handleDataChange('dbDatabase')}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="db-tablename-prefix">数据库表前缀</InputLabel>
        <OutlinedInput
          id="db-tablename-prefix"
          label="数据库表前缀"
          value={props.installValues.dbTablenamePrefix}
          onChange={handleDataChange('dbTablenamePrefix')}
        />
      </FormControl>
    </Box>
  )
}
