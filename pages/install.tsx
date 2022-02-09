import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const steps = ['数据库连接设置', '管理员账号设置'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [showDbPassword, setShowDbPassword] = React.useState(false)
  const [showAdminPassword, setShowAdminPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowDbPassword(!showDbPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  let installForm;
  if(activeStep === 0) {
    installForm = (
      <Box sx={{ width: '100%', my: 2 }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="db-host">数据库地址</InputLabel>
          <OutlinedInput
            id="db-host"
            label="数据库地址"
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
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showDbPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="db-pass">数据库名称</InputLabel>
          <OutlinedInput
            id="db-database"
            label="数据库名称"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="db-pass">数据库表前缀</InputLabel>
          <OutlinedInput
            id="db-tablename-prefix"
            label="数据库表前缀"
          />
        </FormControl>
      </Box>
    )
  } else if (activeStep === 1) {
    installForm = (
      <Box sx={{ width: '100%', my: 2 }}>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </Box>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: '100%', my: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              安装完成
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button >进入系统</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {installForm}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                上一步
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? '完成' : '下一步'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>

  );
}