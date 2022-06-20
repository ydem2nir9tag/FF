import React from "react";
import { Container, Grid, Box, Link } from "@mui/material";
import ThemeSelector from "../Dialogs/ThemeSelector";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  footer: {
      width:"100%",
      paddingBottom: "0px",
  },
  links: {
    fontSize: '0.84rem',
    textDecoration: "none",
    color: "inherit",
    alignSelf: "flex-start"
  }
}));


const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Box
        px={{ xs: 3, sm: 3 }}
        py={{ xs: 5, sm: 2 }}
        display="flex"
      >
        <Container maxWidth="lg" style={{padding: "0px", paddingLeft:"24px", paddingRight: "24px", display:"flex"}}>
            <Grid container spacing={0} justifyContent="flex-start">
              <Grid item xs={12} sm={2} display="flex">
                <Box marginY="auto">
                  <Link href="/about" className={classes.links}>
                    About
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} display="flex">
                <Box marginY="auto">
                  <Link href="/privacy" className={classes.links}>
                    Privacy
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} display="flex">
                <Box marginY="auto">
                  <Link href="/contact" className={classes.links}>
                    Contact
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} display="flex">
                <Box marginY="auto">
                  <Link href="/terms" className={classes.links}>
                    Terms
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Box alignSelf="flex-end">
              <ThemeSelector/>
            </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;