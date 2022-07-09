
import * as React from 'react';
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Alerta from '../Component/Alert.js';
import { Validacion } from '../helper/Validacion.js';
import { userRegister } from '../Redux/ActionUser.js';
import { limpiarAlert } from '../Redux/ActionUser.js';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Register() {

  const dispatch = useDispatch();

  const dismount = () => {
    dispatch(limpiarAlert())
  }

  React.useEffect(() => {
    console.log('Crea tu cuenta');

    setErrors('');
    
    return () => dismount()
   }, []);

    const [values, setValues] = React.useState({
      nombre: '',
      email: '',
      password: '',
      passwordRepeat: '',
      showPassword: false,
      showPasswordR: false,
    });

    const [errors, setErrors] = React.useState({});
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors(Validacion({
          ...values,
          [event.target.id]: event.target.value
          }) 
          )
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

      const handleClickShowPasswordR = () => {
        setValues({
          ...values,
          showPasswordR: !values.showPasswordR,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      function disabledButton() {
        if (Object.keys(errors).length > 0 || !values.nombre || !values.email || !values.password) return true
        else return false
      };

      async function registrarUsuario() {
        try {
          const usuarioCrear = {
            nombre: values.nombre,
            email: values.email,
            password: values.password
          };
          await dispatch( userRegister(usuarioCrear) )

        }catch (error) {
          console.log(error)
        }
      
      };


  return (
    <>
    <Alerta />
    <Box
      component="form"
      sx={ style }
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          error= {errors.nombre ? true : false}
          id="nombre"
          label="Nombre"
          variant="filled"
          value={values.nombre}
          onChange={handleChange('nombre')}
          helperText= {errors.nombre ? errors.nombre : ''}
          sx={{ m: 1, width: '25ch' }}
        />
        <TextField
          required
          error= {errors.email ? true : false}
          id="email"
          label="Email"
          variant="filled"
          value={values.email}
          onChange={handleChange('email')}
          helperText= {errors.email ? errors.email : ''}
          sx={{ m: 1, width: '25ch' }}
        />
        
        <TextField
          error= {errors.password ? true : false}
          id="password"
          label="password"
          variant="filled"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          helperText= {errors.password ? errors.password : ''}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment:
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
          }}
        />
        
        <TextField
          error= {errors.passwordRepeat ? true : false}
          id="passwordRepeat"
          label="password"
          variant="filled"
          type={values.showPasswordR ? 'text' : 'password'}
          value={values.passwordRepeat}
          onChange={handleChange('passwordRepeat')}
          helperText= {errors.passwordRepeat ? errors.passwordRepeat : ''}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment:
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPasswordR}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPasswordR ? <VisibilityOff /> : <Visibility />}
              </IconButton>
          }}
        />
        <Button variant="contained" size="medium" 
        sx={{
            m: 1,
            backgroundColor: '#9530ED',
            color: "#FFFFFF",
            textDecoration: 'none',
            ':hover': {
              bgcolor: '#C200AC', 
              color: 'white',
            }
        }}
        disabled= {disabledButton()}
        onClick={registrarUsuario}
        onMouseDown={handleMouseDownPassword}
        >CREAR CUENTA</Button>
      
    </Box>
    </>
  );
};