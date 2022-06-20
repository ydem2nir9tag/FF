import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, IconButton, Link } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import UploadIcon from '@mui/icons-material/Upload';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/system';
import PropContext from '../../propContext';
import SvgLogo from './SvgLogo';

const useStyles = makeStyles(theme => ({
  bar: {
    position: 'sticky',
    backgroundColor: theme.palette.background.default
  },
  logo: {
    paddingLeft: '10px',
    paddingRight:'10px',
  },
  logotype: {
    textDecoration: 'none', 
    fontFamily: theme.typography.fontFamily,
  }
}))

const AccountButton = (props) => {
  return (
    <Button color="inherit" href="/account">
      <PersonOutlineIcon /> &nbsp; {props.uid}
    </Button>
  )
}

const UploadButton = (props) => {
  if (props.admin) {
    return (
      <IconButton color="inherit" href="/upload">
        <UploadIcon/>
      </IconButton>
    )
  }
  return (<></>)
}


const Header = (props) => {
  const context = React.useContext(PropContext);
  const classes = useStyles()
  let uid = ""
  let admin = false;
  if (context.user !== null && context.user.setup) {
    uid = context.user.username
    admin = context.user.isAdmin
  }

  return (
    <Container maxWidth="lg" sx={{paddingTop: '5px'}}> 
      <AppBar className={classes.bar} elevation={0}>
        <Toolbar style={{paddingLeft:"0px", paddingRight:"0px"}}>
          <Link href="/">
            <SvgLogo color={context.theme.palette.primary.main} />
          </Link>
          
          <Typography variant="h5" className={classes.logo}>
            <Link href="/"
              className={classes.logotype}
              color="inherit"
            >
              fermifighters
            </Link>
          </Typography>
          <IconButton color="inherit" href="/about">
            <HelpCenterIcon />
          </IconButton>
          <UploadButton admin={admin}/>
          <AccountButton uid = {uid}/>
          <Box sx={{flex: 1}} />
          {props.children}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Header