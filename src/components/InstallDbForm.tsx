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
import { object, string, number, date, InferType } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, TextField, Typography } from '@mui/material';

// 定义验证逻辑
const validationSchema = object({
  dbHost: string().required("请输入数据库地址"),
})

export default function InstallDbForm(props: InstallProps) {
  // 对外暴露的方法
  React.useEffect(() => {
    props.submit.current.validate = () => {
      console.log('aaaaaaaa1');
      handleSubmit(onSubmit);
      console.log('aaaaaaaa2');
      return "abc";
    }
  })
  // 显示隐藏密码的操作
  const [showDbPassword, setShowDbPassword] = React.useState(false)
  const handleClickShowDbPassword = () => {
    setShowDbPassword(!showDbPassword);
  };

  const handleMouseDownDbPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // 向父级传递数据的方法 可能加入 validate 后就可以不用这个了，而是采用其他方法
  const handleDataChange  =
  (prop: keyof InstallState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateValue(prop, event.target.value);
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: any) => {
    console.log('onSubmit', data);
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <TextField sx={{ m: 1 }} id="db-host" fullWidth label="数据库地址" variant="outlined"
      {...register('dbHost')}
      error={errors.dbHost ? true : false}/>
      <Typography sx={{ m: 1 }} variant="inherit" color="textSecondary">
        {errors.dbHost?.message}
      </Typography>
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
      <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
    </Box>
  )
}
