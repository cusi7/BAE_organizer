import axios from 'axios';

export const ALERT = 'ALERT';
export const LIMPIAR_ALERT = 'LIMPIAR_ALERT';
export const GET_USER = 'GET_USER';
export const LOG_OUT_USUARIO = 'LOG_OUT_USUARIO';


const userRoute = 'http://localhost:3001/usuario';

export function userRegister(user) {
    return async function(dispatch) {
        
        try {
            const back = await axios.post(`${userRoute}/registro`, user);

            localStorage.setItem("token", back.data.token);

            return dispatch({
                type: ALERT,
                payload: back.data.mensaje? back.data.mensaje : null
            })
        } catch (error) {
            return dispatch({
                type: ALERT,
                payload: error.response.data
            })
        }

    }
};

export function limpiarAlert() {
    return function(dispatch) {
        return dispatch({
            type: LIMPIAR_ALERT
        })
    }
};

export function userLogin(user) {
    return async function(dispatch) {
        try {
            const back = await axios.post(`${userRoute}/login`, user);

            localStorage.setItem("token", back.data.token);

            return dispatch({
                type: ALERT,
                payload: back.data.mensaje? back.data.mensaje : null
            })
        } catch (error) {
            return dispatch({
                type: ALERT,
                payload: error.response.data
            })
        }
    }
};

export function getUser() {
    return async function(dispatch) {
        try {
            const token = localStorage.getItem("token");
          
            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
              },
            };
      
            const back = await axios.get(`${userRoute}/perfil`, config);
      
            return dispatch({
              type: GET_USER,
              payload: back.data,
            });
          } catch (error) {
            localStorage.clear();
            return dispatch({
                type: ALERT,
                payload: error.response.data
            })
          }
        };
};

export function outUser() {
    return function(dispatch) {
        localStorage.clear();
        return dispatch ({
            type: LOG_OUT_USUARIO
        })
    }
  };
    