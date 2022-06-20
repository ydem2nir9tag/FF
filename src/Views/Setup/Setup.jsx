import React, { useContext, useState } from 'react'
import { Header, Footer, GenericLoader } from '../../Components'
import { Typography, Container, TextField, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";
import PropContext from '../../propContext'


const useStyles = makeStyles(theme => ({
  body: {
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
  },
  textBox: {
      paddingBottom:"10px",
      textAlign:"center",
      borderRadius: '1px',
    },
}))


const Setup = (props) => {
  const [loading, setLoading] = useState(false)
  const context = useContext(PropContext);
  const classes = useStyles()

  const Content = () => {
    function handleSetup(e) {
        if (e.key === 'Enter' || e.type === 'click') {
            let username = document.getElementById("username").value;
            if (username !== undefined) {
                setLoading(true);
                let body = {
                    id: context.user.id,
                    username: username
                }
                fetch('http://localhost:5001/user/setup', {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {"Content-type": "application/json; charset=UTF-8",}
                })
                .then(response => response.json())
                .catch(err => console.log(err));
                props.setUsername()
            }
        }
    }

    return (
        <Box className={classes.body}>
            <Container className={classes.bodycontainer}> 
                <Typography variant="h3" paddingBottom="10px">
                    Hello, {context.user.name}
                </Typography>
                <Typography variant="h5" paddingBottom="15px">
                    please enter a username
                </Typography>
                <TextField className={classes.textBox} id="username" InputProps={{
                    inputProps: {
                        style: { textAlign: "center", },
                        maxLength: 30
                    }
                }} onKeyPress={handleSetup}> 
                </TextField>
                <Button size="big"  align="center" color="inherit" onClick={handleSetup}>Submit</Button>
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

export default Setup



