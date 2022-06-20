import React, { useState } from 'react'
import { Header, Footer, GenericLoader } from '../../Components'
import { Container, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle } from "../../service/firebase"


const useStyles = makeStyles(theme => ({
  body: {
      paddingTop: "20px",
      flex: '1'
  },
  bodycontainer: {
      padding: "0px",
      height: "100%",
      maxWidth: "lg",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  }
}))

const Login = () => {
  const [loading, setLoading] = useState(false)

  const Content = () => {
    const classes = useStyles()

    return (
        <Box className={classes.body}>
            <Container className={classes.bodycontainer}> 
                <Button variant="contained" color="inherit" sx={{color:"background.default"}} size="large" onClick={() => {
                    signInWithGoogle();
                    setLoading(true)
                    }}>
                    <GoogleIcon /> &nbsp; Sign In With Google 
                </Button>
            </Container>
        </Box>
    )
  }

  return (
    <GenericLoader loading={loading}>
      <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    </GenericLoader>
  )
}

export default Login