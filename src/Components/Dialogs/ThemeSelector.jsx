import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import themes from '../../themes/themes';
import PropContext from '../../propContext';

const useStyles = makeStyles(theme => ({
    header: {
        flex: 1,
        justifyContent: "center",
        paddingTop: "5px",
        paddingLeft: "10px",
        color: theme.palette.text.secondary
    },
    closeOut: {
        paddingRight:"5px", 
        paddingTop:"5px",
        justifyContent: "center",
        color: theme.palette.primary.main
    }, button: {
        color: theme.palette.text.primary,
    }
  }));

const SimpleDialog = (props) => {
    const classes = useStyles();

    const { close, onHover, onCloseYes, open } = props;

    return (
        <Dialog onClose={close} open={open} fullWidth={true}>
            <div style={{display:"flex"}}>
                <Typography variant="h6" className={classes.header}>Select a Theme &nbsp; &nbsp;</Typography>
                <IconButton onClick={close} className={classes.closeOut}><CloseIcon/></IconButton>
            </div>
        <List sx={{ pt: 0 }}>
            {themes.map((i) => (
            <ListItem button onClick={() => onCloseYes(i)} onMouseEnter={() => onHover(i)} key={i.name}>
                <ListItemText primary={i.name} className={classes.themeName} sx={{color: `${i.palette.primary.main}`}}/>
            </ListItem>
            ))}
        </List>
        </Dialog>
    );
    }

    SimpleDialog.propTypes = {
    onHover: PropTypes.func.isRequired,
    onCloseYes: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    };

const ThemeSelector = () => {
    const [open, setOpen] = React.useState(false);
    const [theme, setTheme ] = React.useState(themes[0])
    const props = React.useContext(PropContext)
    const classes = useStyles();

    React.useEffect(() => {
        console.log("hi!")
        setTheme(props.theme);
    }, [setOpen]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleClickOpen = () => {
        setOpen(true);
    };

    const close = () => {
        props.setTheme(theme);
        setOpen(false);
    };

    const handleHover = (e) => {
        props.setTheme(e);
    }

    const handleCloseYes = (e) => {
        props.setTheme(e)
        setOpen(false);
    }

    return (
        <div>
        <Button className={classes.button} onClick={handleClickOpen} startIcon={<AutoAwesomeIcon/>}>
            {props.theme.name}
        </Button>
        <SimpleDialog
            open={open}
            onHover={handleHover}
            onCloseYes={handleCloseYes}
            close={close}
        />
        </div>
    );
}

export default ThemeSelector;