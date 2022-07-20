import React, { useEffect }from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { getUser, outUser } from '../Redux/ActionUser.js';
import { Modal, Stack } from "@mui/material";

import Setting from "../Pages/Setting.js";


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default function TheAppBar() {

    const dispatch = useDispatch();

    const mount = async function () {
        try {
            await dispatch(getUser());
        } catch (error) {
           console.log(error)
        }
    };

    useEffect(() => {
        console.log('Bienvenido');
        mount();
    }, []);

    const userActual = useSelector(state => state.user.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [setting, setSetting] = React.useState(false);
    const openSetting = () => setSetting(true);
    const closeSetting = () => setSetting(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="stick" style={{ background: '#150040' }}>
     
        <Toolbar disableGutters>    

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

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    
              <Button
                key= 'postulaciones'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Postulaciones
              </Button>
              <Button
                key= 'estadisticas'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Estadisticas
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={userActual ? userActual.avatar : "/static/images/avatar/2.jpg"} />
              </IconButton>
            </Tooltip>
            <ThemeProvider theme={darkTheme}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
                <MenuItem key='perfil' onClick={openSetting}>
                  <Typography textAlign="center">Editar perfil</Typography>
                </MenuItem>
                
                <MenuItem key='cerrar' onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Cerrar sesion</Typography>
                </MenuItem>
              
            </Menu>
            </ThemeProvider>
          </Box>
        </Toolbar>
     
    </AppBar>
    
       <Modal open={setting} onClose={closeSetting}>
       <ThemeProvider theme={darkTheme} >
           <Setting />
           </ThemeProvider>
       </Modal>
 
    
    <Outlet />
    </>
  );
};

