import React, { useState, useEffect } from "react"
import { Typography, Container, TextField, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";
import { GenericLoader } from "../../Components";
import MenuItem from '@mui/material/MenuItem';

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

const Content = (props) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [tagList, setTagList] = useState(['loading']);

    function handleFields(e) {
        if (e.target.id === "ans") {
            if (/[^\d-]/gi.test(e.key)) {
                e.preventDefault()
              }
        }
        if (e.target.id === "qs" && e.key === 'Enter') {
            document.getElementById("ans").focus()
        }
        if (e.key === 'Enter' || e.type === 'click') {
            let statement = document.getElementById("qs");
            let answer = document.getElementById("ans");
            if (statement.value !== "" && answer.value !== "") {
                setLoading(true);
                let body = {
                    statement: statement.value,
                    answer: answer.value,
                    tags: tagListState.tags
                }
                fetch('http://localhost:5001/fqdb/upload', {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {"Content-type": "application/json; charset=UTF-8",}
                })
                .then(response => response.json())
                .catch(err => console.log(err));
                statement.value = "";
                answer.value = "";
                setTagList(['loading']);
                setTagListState({tags:[]});
                setTimeout(() => {setLoading(false); window.location.reload(true);}, 1000);
            }
        }
    }

    const [tagListState, setTagListState] = React.useState({
        tags: []
      });

    const handleTagField = event => {
        setTagListState(tagListState => ({
            ...tagListState,
            [event.target.name]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value
        }));
    };

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5001/fqdb/tags', {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(response => response.json())
            .then(data => {
                setTagList(data.data.meta.tags)
            })
            .catch(err => console.log(err));
        }, 2000);
    },[]);

    return (
        <Box className={classes.body}>
            <Container className={classes.bodycontainer}> 
                <GenericLoader loading={loading}>
                    <Typography variant="h3" paddingBottom="15px">
                        Upload a question
                    </Typography>
                    <TextField className={classes.textBox} id ="qs" label="question statement" InputProps={{
                        inputProps: {
                            style: { textAlign: "center" },
                        }
                    }} sx={{width:"100%"}} onKeyPress={handleFields}> 
                    </TextField>
                    <TextField className={classes.textBox} id="ans" label="answer" InputProps={{
                        inputProps: {
                            style: { textAlign: "center" },
                        }
                    }} sx ={{width:"8vw"}} onKeyPress={handleFields}> 
                    </TextField>
                    <TextField
                        className={classes.textBox}
                        select
                        name="tags"
                        id="tags"
                        variant="outlined"
                        label="add tags"
                        SelectProps={{
                            multiple: true,
                            value: tagListState.tags,
                            onChange: handleTagField
                        }}
                        sx ={{width:"75%"}}
                    >
                        {tagList.map((tag) => (
                            <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                        ))}
                    </TextField>
                    <Button size="big"  align="center" color="inherit" onClick={handleFields}>Submit</Button>
                </GenericLoader>
            </Container>
        </Box>
    )
}

export default Content