import React, { useEffect }from "react";
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

import './Home.css';
import { getUser, outUser } from '../Redux/ActionUser.js';
import { Typography } from "@mui/material";


export default function Home () {

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

    const logOut = async () => {
        await dispatch(outUser())
      }


    return (
      <div className="home">
        
           <Typography>{userActual.name}</Typography>   
    
     </div>
    )


}