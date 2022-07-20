import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { BaeButton1 } from './Styled.js';
import Register from "../Pages/Register.js";
import Login from '../Pages/Login.js';
import { Box } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function TheAppBar() {

 

  const [openR, setOpenR] = React.useState(false);
  const openRegister = () => setOpenR(true);
  const closeRegister = () => setOpenR(false);

  const [openL, setOpenL] = React.useState(false);
  const openLogin = () => setOpenL(true);
  const closeLogin = () => setOpenL(false);


  return (
    <>
    <AppBar position="stick" style={{ background: '#150040' }}>
     
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            
            <Box sx={{display:'flex', alignContent:'center'}}>
                <img src="https://res.cloudinary.com/cusi/image/upload/v1657242934/BAE_app/logo_lineal_BAE_bqwov8.png" alt= 'logo img'
                    style={{ width:"35px", height:"35px", marginRight:"10px" }}/>
               <Typography
                 variant="h6"
                 noWrap
                 component="div" 
                 href="/"
                 sx={{
                   flexGrow: 1,
                   mr: 2,
                   display: { xs: 'none', md: 'flex' },
                   fontFamily: 'monospace',
                   fontWeight: 700,
                   letterSpacing: '.3rem',
                   color: 'inherit',
                   textDecoration: 'none',
                 }}
               >
                 BAE
               </Typography>
            </Box>

            <Box>
              
              <BaeButton1 variant="outlined" size="medium" onClick = {openRegister}>
                CREA TU CUENTA
              </BaeButton1>
               
              <BaeButton1 variant="outlined" size="medium" onClick = {openLogin}>
                INGRESA
              </BaeButton1>
               
            </Box>        

        </Toolbar>
    
    </AppBar>
    
    <Modal open={openR} onClose={closeRegister}>
       <ThemeProvider theme={darkTheme}>

          <Register />

       </ThemeProvider>
    </Modal>

    <Modal open={openL} onClose={closeLogin}>
       <ThemeProvider theme={darkTheme}>

          <Login />

       </ThemeProvider>
    </Modal>
  </>
  );
};
