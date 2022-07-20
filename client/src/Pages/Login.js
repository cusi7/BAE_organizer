import * as React from 'react';
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { BaeButton1, ModalRL } from '../Component/Styled.js';
import Alerta from '../Component/Alert.js';
import { Validacion } from '../helper/Validacion.js';
import { userLogin } from '../Redux/ActionUser.js';
import { limpiarAlert } from '../Redux/ActionUser.js';


export default function Login() {

  const dispatch = useDispatch();

  const dismount = () => {
    dispatch(limpiarAlert())
  }

  React.useEffect(() => {
    console.log('Login');

    setErrors('');
    
    return () => dismount()
   }, []);

    const [values, setValues] = React.useState({
      email: '',
      password: '',
      showPassword: false
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
   
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      function disabledButton() {
        if (Object.keys(errors).length > 0 || !values.email || !values.password) return true
        else return false
      };

      async function loginUsuario() {
        try {
          const usuario = {
            email: values.email,
            password: values.password
          };
          await dispatch( userLogin(usuario) )

        }catch (error) {
          console.log(error)
        }
      
      };


  return (
    <>
    <Alerta />
    <ModalRL
      component="form"
      noValidate
      autoComplete="off"
    >
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
        
        <BaeButton1
         variant="outlined" size="medium" 
        disabled= {disabledButton()}
        onClick={loginUsuario}
        onMouseDown={handleMouseDownPassword}
        >
          INGRESAR
        </BaeButton1>
      
     </ModalRL>
    </>
  );
};