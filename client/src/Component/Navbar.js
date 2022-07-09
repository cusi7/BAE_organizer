import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Register from "../Pages/Register.js";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function ResponsiveAppBar() {

  const [openR, setOpenR] = React.useState(false);
  const openRegister = () => setOpenR(true);
  const closeRegister = () => setOpenR(false);

  const [openL, setOpenL] = React.useState(false);
  const openLogin = () => setOpenL(true);
  const closeLogin = () => setOpenL(false);


  return (
    <>
    <AppBar position="static" style={{ background: '#150040' }}>
      <Container maxWidth="xl">
        <Toolbar >
          
          <img src="https://res.cloudinary.com/cusi/image/upload/v1657242934/BAE_app/logo_lineal_BAE_bqwov8.png" style={{ width:"35px", height:"35px", marginRight:"10px" }}/>
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
          
            <Button variant="outlined" size="medium"
            sx={{
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }} onClick = {openRegister}>
              CREA TU CUENTA
            </Button>
            <Button variant="outlined" size="medium"
            sx={{
              ml:2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}>
              INGRESA
            </Button>

        </Toolbar>
      </Container>
    </AppBar>
    <Modal
    open={openR}
    onClose={closeRegister}>
       <ThemeProvider theme={darkTheme}>

          <Register />

       </ThemeProvider>
     </Modal>
  </>
  );
};
