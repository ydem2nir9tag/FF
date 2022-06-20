import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { QuestionCard } from "../../Components";
import { Header, Footer } from '../../Components'

const useStyles = makeStyles(theme => ({
  body: {
      flex: '1'
  },
  bodycontainer: {
      padding: "24px",
      height: "100%",
      maxWidth: "lg",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  }
}))

const Home = (props) => {  
  const classes = useStyles()

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
      <Header/>
      <Box className={classes.body}>
          <Container className={classes.bodycontainer}> 
              <QuestionCard/>
          </Container>
      </Box>
      <Footer/>
    </div>
  )
}

export default Home