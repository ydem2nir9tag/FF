import React from "react"
import { Container, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";

const useStyles = makeStyles(theme => ({
    body: {
        flex: '1',
        height: '100vh'
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

const Content = (props) => {
    const classes = useStyles()

    if (props.loading) {
        return (
            <Box className={classes.body}>
                <Container className={classes.bodycontainer}> 
                    <CircularProgress />
                </Container>
            </Box>
        )
    } else {
        return (
            <>
                {props.children}
            </>
        )
    }
}

export default Content