import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import NavbarBox from '../../components/Navbar/NavbarBox';
import { Link } from 'react-router-dom';
import { loginUserAction } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
import SpringModal from '../../components/modal/modal';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Driving School
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Register',
    price: '0',
    description: [
      'Gear Up for Your Registration Driving Test Success!'
    ],
    buttonText: 'register',
    buttonVariant: 'outlined',
  },
  {
    title: 'Start Test',
    subheader: 'Time 10 min',
    price: '0',
    description: [
      'Ready, Set, Drive: Begin Your Test Journey Now!',
    ],
    buttonText: 'test',
    buttonVariant: 'contained',
  },
  {
    title: 'Learn',
    price: '50',
    description: [
      ' Start Your Journey to Driving Mastery Today!',
    ],
    buttonText: 'learn',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const modalData={
  title:" Are you ready for the test ! ",
  message:"You  have to complete the test with in 10 minutes",
  time:"10",
  link:"/test",
  buttonTitle:"Start Test",
  confirmButton:"Start Test"
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home({loginuser}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store.auth);
  const { loading, appErr, serverErr, } = storeData;
 
  const  user=localStorage.getItem('userData');

const userHandler=()=>{
  toast.error("You need to login first!")
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Toaster position='top-right'/>
      <CssBaseline />
   <NavbarBox loginUser={loginuser}/>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Driving school 
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          
Driving is a privilege that comes with great responsibility.
Your journey starts here, at our driving school.
Learn to navigate the road with confidence and skill.
Empowering drivers for a safer tomorrow.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      Rs.{tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
              
                <CardActions>
  {user && tier.buttonText === "test" ? (
    <Link to="" variant="body2" style={{ display: "flex", alignSelf: "center", textDecoration: "none", margin: "0px auto" }}>
      <Button style={{ margin: "0px auto", border: "1px solid grey", alignSelf: "center" }} fullWidth variant={tier.buttonVariant}><SpringModal modal={modalData} /></Button>
    </Link>
  ) : null}
  {user ? (
    <Link to={`/${tier.buttonText}`} variant="body2" style={{ display: "flex", alignSelf: "center", textDecoration: "none", margin: "0px auto" }}>
      {tier.buttonText === "test" ? null : <Button style={{ margin: "0px auto", border: "1px solid grey", alignSelf: "center" }} fullWidth variant={tier.buttonVariant}>{tier.buttonText}</Button>}
    </Link>
  ) : (
    <Button style={{ margin: "0px auto", border: "1px solid grey", alignSelf: "center",color:"" }} fullWidth variant={tier.buttonVariant} onClick={userHandler}>   {tier.buttonText === "test" ? "Start Test" : tier.buttonText}</Button>
  )}
</CardActions>


              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}