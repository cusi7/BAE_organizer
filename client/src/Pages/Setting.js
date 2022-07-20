import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ModeIcon from '@mui/icons-material/Mode';
import Avatar from '@mui/material/Avatar';
import Alerta from '../Component/Alert.js';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Validacion } from '../helper/Validacion.js';
import { userRegister } from '../Redux/ActionUser.js';
import { limpiarAlert } from '../Redux/ActionUser.js';
import { Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUser } from '../Redux/ActionUser.js';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const Input = styled('input')({
    display: 'none',
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default function Setting() {

  const dispatch = useDispatch();

  const mount = async function () {
    try {
        await dispatch(getUser());
    } catch (error) {
       console.log(error)
    }
};

  const dismount = () => {
    dispatch(limpiarAlert())
  }

  React.useEffect(() => {
    console.log('Editar perfil');
    mount();

  
    
    return () => dismount()
   }, []);

   const userActual = useSelector(state => state.user.user);




    const [previewImg, setPreviewImg] = React.useState('');

    
    
  
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    

      const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        };
    };

      const handleImage = e => {
        const file = e.target.files[0];
        previewFile(file);
      }


  return (
    <>
    <Alerta />
    <Box
      component="form"
      sx={ style }
      noValidate
      autoComplete="off"
    >
        <ThemeProvider theme={darkTheme} >
        <Grid container direction="column" spacing={2} alignItems="center" justifyContent="center" >
               
                  <Grid item>
                       <Avatar alt= {userActual.name} src= {previewImg ? previewImg : userActual.avatar} sx={{ width: 100, height: 100 }}/>
                  </Grid>
                    
                  <Grid item mb={1}>
                    <label htmlFor="contained-button-file">
                       <Input accept="image/*" id="contained-button-file" name="image" multiple type="file" onChange={handleImage}/>
                       <Button component="span" size="small"
                       variant="outlined" 
                       sx={{
                         
                          fontWeight: 700,
                          color: 'inherit',
                          backgroundColor: '#41A1DB',
                          color: "#FFFFFF",
                          textDecoration: 'none',
                          ':hover': {
                                backgroundColor: '#150040',
                               }
                        }}>
                           Cambiar Imagen
                       </Button>
                    </label>
                  </Grid>                    
              
                <Divider m={2}/>
                

                      <Grid item container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item>
                        <Typography  color="text.secondary">
                          Tu nombre:
                        </Typography>
                        </Grid>
                        
                        <Grid item>
                        <TextField
                          hiddenLabel disabled
                          id="filled-hidden-label-normal"
                          defaultValue={userActual.name}
                          variant="filled"
                          size="small"
                          InputProps={{
                            endAdornment:
                                 <CheckCircleIcon color="success"/>
                          
                          }}
                        />
                        </Grid>


                        
                        </Grid>

                        <Divider />

                        <Grid item container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item>
                        <Typography  color="text.secondary">
                          Tu email:
                        </Typography>
                        </Grid>
                        
                        <Grid item>
                        <TextField
                          hiddenLabel disabled
                          id="filled-hidden-label-normal"
                          defaultValue={userActual.email}
                          variant="filled"
                          size="small"
                          InputProps={{
                            endAdornment:
                                 <CheckCircleIcon color="success"/>
                          
                          }}
                        />
                        </Grid>                   
                        </Grid>
                        
                        <Divider />
                        <Grid item container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item>
                        <Button size="small" >
                          CAMBIAR PASSWORD
                        </Button>
                        </Grid>
                        
                        <Grid item>
                        
                        </Grid>


                        
                        </Grid>

                          </Grid>
                         
      
        
                          </ThemeProvider>
      
    </Box>
    </>
  );
};