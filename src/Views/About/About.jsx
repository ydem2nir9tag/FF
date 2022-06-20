import React from 'react'
import { Header, Footer } from '../../Components'
import { Typography, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";

const useStyles = makeStyles(theme => ({
  body: {
      paddingTop: "20px",
      flex: '1'
  },
  bodycontainer: {
      paddingLeft: "24px",
      paddingRight: "24px",
      height: "100%",
      maxWidth: "lg",
      display: 'flex',
      flexDirection: 'column',
  },
  header: {
      paddingTop: "15px",
      paddingBottom: "15px",
  }, bodyText: {
      paddingBottom: "30px",
      color: theme.palette.text.secondary
  }
}))

const Content = () => {
  const classes = useStyles()

  return (
      <Box className={classes.body}>
          <Container className={classes.bodycontainer}> 
              <Typography variant="h4" className={classes.header}>
                  About
              </Typography>
              <Typography variant="body1" className={classes.bodyText}>
                  FF or Fermi Fighters is a web game designed around the Science Olympiad's Fermi Questions. From their wiki page: 
                  A Fermi question is one where a seemingly impossible-to-calculate answer is estimated. 
                  A famous example of a Fermi question is "How many piano tuners are there in Chicago?", 
                  where there is very little data to use and assumptions must be made. Fermi questions are named after Enrico Fermi, 
                  a physicist who is known for solving these types of questions.
              </Typography>
              <Typography variant="h4" className={classes.header}>
                  How to Play
              </Typography>
              <Typography variant="body1" className={classes.bodyText}>
                  Similarly to Science Olympiad, the answers to a given question are in powers of 10. For example, if the estimated
                  answer to the above question was 400, the correct answer would be <b>2</b> (4 * 10^2). If the estimated answer was 600, the user
                  would input an answer of <b>3</b> (6*10^2, rounding up). The score gained per answer is as follows: 5 points for getting 
                  the exact answer, 3 points for being 1 place off, and 1 point for being 2 places off. Any more than that, and a heart 
                  will disappear. Players have 3 hearts to get the maximum score.
              </Typography>
          </Container>
      </Box>
  )
}

const About = (props) => {
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
      <Header/>
      <Content />
      <Footer/>
    </div>
  )
}

export default About