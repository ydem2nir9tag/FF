import React, { useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import PropContext from "../../propContext";


const ResetUser = () => {
    const context = useContext(PropContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseNo = () => {
        setOpen(false);
    };

    
    const handleCloseYes = () => {
        setOpen(false);
        let body = {
            user: context.user
          }
        fetch('http://localhost:5001/user/reset', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(response => response.json())
            .then(data => {
                if (data.user !== undefined) {
                    context.setUser(data.user);
                }
            })
            .catch(err => console.log(err))
        setTimeout(() => {window.location.reload(true)}, 250)
    };

    return (
        <div>
            <Button sx={{my: "30px"}} onClick={handleClickOpen}> Reset User Data </Button>
            <Dialog
                fullScreen={false}
                open={open}
                onClose={handleCloseNo}
                aria-labelledby="Reset User Data?"
            >
                <DialogTitle id="Reset User Data?">
                {"Are you sure you want to reset your user data?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Resetting your user data is an irreversible process.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCloseNo}>
                    No
                </Button>
                <Button onClick={handleCloseYes} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ResetUser;