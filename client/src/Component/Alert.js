import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

import { limpiarAlert } from '../Redux/ActionUser.js';

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Alerta() {

    const alertMsg = useSelector((state) => state.user.alert);

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    React.useEffect(() => {
        console.log('ALERT!!');
        setMsg('')
        if(alertMsg) {
            setMsg(alertMsg.msg)
        }
    }, [alertMsg]); 

    const dispatch = useDispatch();
 
      const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        dispatch(limpiarAlert());
      };


  return (
    <div>
      <Snackbar
        open={alertMsg.msg ? true : open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionRight}
      >
        {alertMsg ? <Alert onClose={handleClose} severity={ alertMsg.type ? alertMsg.type : '' } sx={{ width: '100%' }}>
           {msg}
        </Alert> : <></>}
        
      </Snackbar>

    </div>
  );
}
