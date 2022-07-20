import { Box, Button, styled } from "@mui/material";

export const BaeButton1 = styled(Button) ({
    fontWeight: {xs: 500, md:700},
    color: "#FFFFFF",
    textDecoration: 'none',
    margin: 3,
    "&:hover": {
        backgroundColor: '#41A1DB',
    }
});

export const BaeButton2 = styled(Button) ({
    margin: 3,
    fontWeight: {xs: 500, md:700},
    backgroundColor: '#150040',
    color: "#FFFFFF",
    textDecoration: 'none',
    "&:hover": {
          backgroundColor: '#41A1DB',
     }
});

export const ModalRL = styled(Box) ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: '#06001A',
    borderRadius: '20px',
    boxShadow: 24,
    padding: '35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.7)'
});