import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InstallProps } from '../interface/install';
import { object, string, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormHelperText, Input, TextField } from '@mui/material';
import { PasswordInputCustom } from './PasswordInput';

// 定义验证逻辑
const validationSchema = object({
  adminUser: string().required("请输入管理员账号"),
  adminPass: string().required("请输入管理员密码"),
  adminRepass: string()
    .required('请再次输入管理员密码')
    .oneOf([ref('adminPass'), null], '两次密码不一致'),
})

interface installAdminFormFields extends InferType<typeof validationSchema> { }

export default function InstallDbForm(props: InstallProps) {
  let validatePassData: object | null = null;

  React.useEffect(() => {
    props.submit.current.validate = async () => {
      await handleSubmit(onSubmit, (errors: any) => {
        console.log("errors", errors);
        validatePassData = null;
      })();
      return validatePassData;
    }
  })
  const [showAdminPassword, setShowAdminPassword] = React.useState(false)

  const handleClickShowAdminPassword = () => {
    setShowAdminPassword(!showAdminPassword);
  };

  const handleMouseDownAdminPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 表单验证部分
  const { register, control, handleSubmit, formState: { errors } } = useForm<installAdminFormFields>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<installAdminFormFields> = data => {
    console.log(data)
    console.log(typeof data)
    validatePassData = data;
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Box sx={{ width: '100%' }}>
        <TextField sx={{ m: 1 }} id="admin-user" fullWidth label="管理员用户名" variant="standard"
          defaultValue={props.installValues.adminUser}
          {...register('adminUser')}
          error={errors.adminUser ? true : false}
          helperText={errors.adminUser ? errors.adminUser.message : ""} />
      </Box>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="admin-pass" error={errors.adminPass ? true : false}>管理员密码</InputLabel>
        <PasswordInputCustom id="admin-pass" {...register('adminPass')}
          error={errors.adminPass ? true : false} />
        <FormHelperText error={errors.adminPass ? true : false}>
          {errors.adminPass?.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="admin-repass" error={errors.adminPass ? true : false}>重复密码</InputLabel>
        <PasswordInputCustom id="admin-repass" {...register('adminRepass')}
          error={errors.adminRepass ? true : false} />
        <FormHelperText error={errors.adminRepass ? true : false}>
          {errors.adminRepass?.message}
        </FormHelperText>
      </FormControl>
    </Box>
  )
}
