import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InstallProps } from '../interface/install';
import { object, string, InferType } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, Input, TextField } from '@mui/material';

// 定义验证逻辑
const validationSchema = object({
  dbHost: string().required("请输入数据库地址"),
  dbUser: string().required("请输入数据库用户名"),
  dbPass: string().required("请输入数据库密码"),
  dbDatabase: string().required("请输入数据库名称"),
  dbTablenamePrefix: string().required("请输入数据库表名前缀"),
})

interface installDbFormFields extends InferType<typeof validationSchema> {}

export default function InstallDbForm(props: InstallProps) {
  // 是否验证通过的标识
  let validatePassData: object | null = null;
  // 对外暴露的方法
  React.useEffect(() => {
    props.submit.current.validate = async () => {
      await handleSubmit(onSubmit, (errors) => {
        console.log("errors", errors);
        validatePassData = null;
      })();
      return validatePassData;
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
  // 表单验证部分
  const { register, control, handleSubmit, formState: { errors } } = useForm<installDbFormFields>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<installDbFormFields> = data => {
    console.log(data)
    console.log(typeof data)
    validatePassData = data;
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Box sx={{ width: '100%' }}>
        <TextField sx={{ m: 1 }} id="db-host" fullWidth label="数据库地址" variant="standard"
          defaultValue={props.installValues.dbHost}
          {...register('dbHost')}
          error={errors.dbHost ? true : false}
          helperText={errors.dbHost ? errors.dbHost.message : ""} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <TextField sx={{ m: 1 }} id="db-user" fullWidth label="数据库用户名" variant="standard"
          defaultValue={props.installValues.dbUser}
          {...register('dbUser')}
          error={errors.dbUser ? true : false}
          helperText={errors.dbUser ? errors.dbUser.message : ""} />
      </Box>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="db-pass" error={errors.dbPass ? true : false}>数据库密码</InputLabel>
        <Input
          id="db-pass"
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
          {...register('dbPass')}
          error={errors.dbPass ? true : false}
        />
        <FormHelperText error={errors.dbPass ? true : false}>
          {errors.dbPass?.message}
        </FormHelperText>
      </FormControl>
      <Box sx={{ width: '100%' }}>
        <TextField sx={{ m: 1 }} id="db-database" fullWidth label="数据库名称" variant="standard"
          defaultValue={props.installValues.dbDatabase}
          {...register('dbDatabase')}
          error={errors.dbDatabase ? true : false}
          helperText={errors.dbDatabase ? errors.dbDatabase.message : ""} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <TextField sx={{ m: 1 }} id="db-tablename-prefix" fullWidth label="数据库表名前缀" variant="standard"
          defaultValue={props.installValues.dbTablenamePrefix}
          {...register('dbTablenamePrefix')}
          error={errors.dbTablenamePrefix ? true : false}
          helperText={errors.dbTablenamePrefix ? errors.dbTablenamePrefix.message : ""} />
      </Box>
    </Box>
  )
}
