import React, { useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material"
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
        let username = document.getElementById("name").value
        if (username !== "") {
            let body = {
                user: context.user,
                username: username
            }
            fetch('http://localhost:5001/user/newUsername', {
                method: "POST",
                body: JSON.stringify(body),
                headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(response => response.json())
            .catch(err => console.log(err))
            window.location.reload(true);
        }
        setOpen(false);
    }

    return (
        <div>
            <Button sx={{my: "30px", mx: "15px"}} onClick={handleClickOpen}> Change Username </Button>
            <Dialog
                fullScreen={false}
                open={open}
                onClose={handleCloseNo}
                aria-labelledby="Change Username"
            >
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Username"
                    type="username"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        inputProps: {
                            maxLength: 30
                    }}}
                />
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCloseNo}>
                    Cancel
                </Button>
                <Button onClick={handleCloseYes} autoFocus>
                    Apply
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ResetUser;