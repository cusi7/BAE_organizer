import React from "react";
import ResponsiveAppBar from '../Component/Navbar.js';
import './landing.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Register from "./Register.js";

const theme = createTheme();
theme.typography.h4 = {
    fontFamily: 'Anton',
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '60px',
    }};

theme.typography.subtitle1 = {
    fontSize: '20px'
};

const darkTheme = createTheme({
   palette: {
     mode: 'dark',
   },
 });


export default function Landing() {

   const [openR, setOpenR] = React.useState(false);
   const openRegister = () => setOpenR(true);
   const closeRegister = () => setOpenR(false);
 

    return (
        <div className="landing">
            <ResponsiveAppBar />
            <Box sx={{ maxWidth: 600, mt:10, ml:15 }}>
               <Grid item xs={3} sm container spacing={2} direction="column">
               <ThemeProvider theme={theme}>
                   <Grid item xs>
                      <Typography variant="h4" component="div">
                         Organiza tus postulaciones!!!
                      </Typography>
                   </Grid>
                   <Grid item xs>
                      <Typography variant="subtitle1" gutterBottom component="div">
                         En BAE Organizer organiza de manera dinámica y efectiva tus postulaciones laborales en un solo lugar.
                      </Typography>
                   </Grid>
                   <Grid item xs>
                      <Typography variant="subtitle1" gutterBottom component="div">
                         Registrate ya. Éxitos!!!
                      </Typography>
                   </Grid> 
                   </ThemeProvider>  
                   <Grid item xs>
                      <Button variant="contained" size="medium" 
                        sx={{
                          m: 1,
                          backgroundColor: '#150040',
                          color: "#FFFFFF",
                          textDecoration: 'none',
                          ':hover': {
                            bgcolor: '#C200AC', 
                            color: 'white',
                          }
                        }} onClick = {openRegister}>
                          CREA TU CUENTA
                      </Button>
                   </Grid>     
                </Grid>
          </Box>
          <Modal
              open={openR}
              onClose={closeRegister}
          >
             <ThemeProvider theme={darkTheme}>
         
                 <Register />
          
             </ThemeProvider>
          </Modal>

        </div>
    )
};