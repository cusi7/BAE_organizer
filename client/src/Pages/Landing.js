import React from "react";
import TheAppBar from '../Component/NavbarLanding.js';
import './landing.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { BaeButton2 } from "../Component/Styled.js";
import Register from "./Register.js";
import { Stack } from "@mui/material";

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

            <TheAppBar />

            <ThemeProvider theme={theme}>
               
               <Stack direction='column'>
                <Box sx={{ width: {xs:'80%', md:'40%'}, maxWidth: 600, mt:10, m:{xs:6, md:15} }}>
                   <Typography variant="h4" component="p" 
                      sx={{fontSize: {xs:'40px', sm:'60px'}}}>
                         Organiza tus postulaciones!!!
                   </Typography>

                   <Typography variant="subtitle1" gutterBottom component="div">
                         En BAE Organizer organiza de manera dinámica y efectiva tus postulaciones laborales en un solo lugar.
                   </Typography>

                   <Typography variant="subtitle1" gutterBottom component="div">
                         Registrate ya. Éxitos!!!
                   </Typography>

                   <BaeButton2 variant="contained" size="medium" onClick = {openRegister}>
                          CREA TU CUENTA
                   </BaeButton2>
                </Box>
               </Stack>
              
            </ThemeProvider>
              
              
               {/* <ThemeProvider theme={theme}>
                   <Grid item xs={12} sm={5}>
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
                      <Button variant="outlined" size="medium" 
                        sx={{
                           m:1,
                           fontWeight: 700,
                           color: 'inherit',
                           backgroundColor: '#150040',
                           color: "#FFFFFF",
                           textDecoration: 'none',
                           ':hover': {
                                 backgroundColor: '#41A1DB',
                                }
                         }} onClick = {openRegister}>
                          CREA TU CUENTA
                      </Button>
                   </Grid>      */}
              
         
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