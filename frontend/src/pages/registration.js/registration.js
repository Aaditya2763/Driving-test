import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';
import RegistartaionForm from '../../components/form/registeration/registration';
import PaymentForm from '../../components/form/registeration/payment';
import Review from '../../components/form/registeration/review';
import NavbarBox from '../../components/Navbar/NavbarBox';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { drivingTestRegistration } from '../../redux/actions/userAction';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Personal Details', 'Upload Documents', 'Documents Confirmation'];



export default function Registartion() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [profileData, setprofileData] = React.useState(false)
  const [adharData, setadharData] = React.useState(false)
  const [profileImg, setprofileImg] = React.useState(false)
  const [adharImg, setadharImg] = React.useState(false)
  const [formdata, setFormData] = React.useState(false);
  const dispatch = useDispatch();

  const validateFormData=()=>{
setFormData(true);
toast.success("Personal details submited successfully")
setActiveStep(activeStep+1)


  }

  useEffect(() => {
   
  }, [formdata])
  
  const validateDocumentData=()=>{
    // setdocumentData(true);
    if(formdata && adharData &&adharData)
    // toast.success("Documents details submited successfully")
    setActiveStep(activeStep+1)
      }


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <RegistartaionForm validateFormData={validateFormData}  />;
      case 1:
        return <PaymentForm profileDataData={profieDataHandler} adharDataHandler={adharDataHandler} />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = async(event) => {
    event.preventDefault();
    if(activeStep==0 && formdata){
      
    }
    return
  };

  const profieDataHandler=(profileimg)=>{
    if(profileimg){
      setprofileImg(profileImg)
      setprofileData(true);
    }
    return;
    
  }
  const adharDataHandler=(adharImg)=>{
    if(adharImg){
      setadharImg(adharImg)
      setadharData(true);
    }
    return;
    
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
   
  }, [formdata])
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Toaster position='top-right'/>
    <NavbarBox/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Registeration
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Link href="/dashboard" variant="body2" style={{display:"flex",alignSelf:"center",textDecoration:"none"}} >
                   <Button style={{margin:"10px auto",border:"1px solid grey "}}> {"Back to Dashboard"}</Button>
                  </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

               {formdata ?  <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                { (activeStep === steps.length - 1) ? 'Confirm' : 'Next'}
                </Button>:""}
              </Box>
            </React.Fragment>
          )}
        </Paper>
   
      </Container>
    </React.Fragment>
  );
}