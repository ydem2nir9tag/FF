import React from 'react'
import { Typography, Container, Link } from '@mui/material';
import { Header } from '../../Components'
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";

const useStyles = makeStyles(theme => ({
    body: {
        flex: '1'
    },
    bodycontainer: {
        paddingLeft: "24px",
        height: "100%",
        maxWidth: "lg",
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        color: theme.palette.primary.main
    }, bodyText: {
        paddingBottom: "5px",
        color: theme.palette.text.secondary
    }
}))

const Content = () => {
    const classes = useStyles()

    return (
        <Box className={classes.body}>
            <Container className={classes.bodycontainer}> 
            <div className={classes.header}><h1>Contact</h1></div>
            <div className={classes.bodyText}>
                <p>Contact FF at <Link href="https://github.com/maybenikhil/FF">https://github.com/maybenikhil/FF</Link>.</p>
                <p>Or don't. </p>
                </div>
            <div style={{paddingBottom:"50px"}}/>
            </Container>
        </Box>
    )
}

const Contact = (props) => {  
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
      <Header>
          <Typography variant="h6" color="primary">
              Contact
          </Typography>
      </Header>
      <Content />
    </div>
  )
}

export default Contact