import axios from 'axios';

export const ALERT = 'ALERT';
export const LIMPIAR_ALERT = 'LIMPIAR_ALERT';


const userRoute = 'http://localhost:3001/usuario';

export function userRegister(user) {
    return async function(dispatch) {
        
        try {
            const back = await axios.post(`${userRoute}/registro`, user);

            return dispatch({
                type: ALERT,
                payload: back.data
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