import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InstallDbForm from '../components/InstallDbForm';
import InstallAdminForm from '../components/InstallAdminForm';
import Head from 'next/head'

const steps = ['数据库连接设置', '管理员账号设置'];
export interface InstallState {
  dbHost: string;
  dbUser: string;
  dbPass: string;
  dbDatabase: string;
  dbTablenamePrefix: string;
  adminUser: string;
  adminPass: string;
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [installValues, setInstallValues] = React.useState<InstallState>({
    dbHost: 'fdsafas',
    dbUser: '',
    dbPass: '',
    dbDatabase: '',
    dbTablenamePrefix: '',
    adminUser: '',
    adminPass: '',
  });

  const handleInstallStateChange =
    (prop: keyof InstallState, value: string) => {
      console.log(prop, value)
      setInstallValues({ ...installValues, [prop]: value });
    };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let installForm;
  if (activeStep === 0) {
    installForm = (<InstallDbForm updateValue={(prop: keyof InstallState, value: string) => {handleInstallStateChange(prop, value)}} installValues={installValues} />)
  } else if (activeStep === 1) {
    installForm = (<InstallAdminForm />)
  }

  return (
    <>
      <Head>
        <title>系统安装</title>
      </Head>
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
                <Button onClick={() => {console.log(installValues)}} >进入系统</Button>
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
    </>
  );
}