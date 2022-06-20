import React, { useContext } from "react"
import { Typography, Container, Grid, Chip, Stack, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from "@mui/system";
import { GenericLoader, ResetUser, ChangeUsername } from "../../Components";
import Paper from '@mui/material/Paper';
import PropContext from "../../propContext";

const useStyles = makeStyles(theme => ({
    body: {
        paddingTop: "20px",
        flex: '1'
    },
    bodycontainer: {
        paddingX: "24px",
        maxWidth: "lg"
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%",
        alignItems:"center", 
        display:"flex",
        justifyContent:"center"
    },
    paperhead: {
        backgroundColor: theme.palette.background.paper,
        ...theme.typography.body1,
        padding: theme.spacing(1.4),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: "100%",
        fontSize: "15px"
    },
    stat: {
        color: theme.palette.text.secondary,
    }
}))

const Content = () => {
    const classes = useStyles()
    const [stats, setStats] = React.useState({
        gameaverage: 0, 
        maxscore: 0, 
        maxquestion: 0, 
        averagescore: 0, 
        worsterror: 0, 
        scoretotal: 0
    });

    const [loading, setLoading] = React.useState(true);
    const [questions, setQuestions] = React.useState([]);
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);
    const [shownQuestions, setShownQuestions] = React.useState([]);
    const [numShownQuestions, setNumShownQuestions] = React.useState(0);
    const [tagList, setTagList] = React.useState(['loading..']);
    const [tagSelected, setTagSelected] = React.useState([]);
    const [isReady, setIsReady] = React.useState(0);
    const context = useContext(PropContext);
    let user = context.user;


    React.useEffect(() => {
        updateShownQuestions();
    }, [numShownQuestions]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        updateShownQuestions();
    }, [filteredQuestions]); // eslint-disable-line react-hooks/exhaustive-deps

    function updateShownQuestions() {
        let newQuestions = [];
        for (let i = 0; i < Math.min(numShownQuestions, filteredQuestions.length); i++) {
            newQuestions.push(filteredQuestions[i]);
        }
        setShownQuestions(newQuestions)
    }

    function handleTagChipClick(e) {
        let clickedTag = e.target.textContent
        let newTagSeleted = []
        let includeTags = []
        for (var i in tagList) {
            if(tagList[i] === clickedTag){
                if (tagSelected[i] === 'outlined') {
                    newTagSeleted.push('filled')
                } else {
                    newTagSeleted.push('outlined')
                }
            } else {
                newTagSeleted.push(tagSelected[i])
            }
            if (newTagSeleted[i] === 'filled')
                includeTags.push(tagList[i])
        }
        setTagSelected(newTagSeleted)

        let newQuestions = []
        if (includeTags.length === 0) {
            newQuestions = questions
        } else {
            for (i in questions) {
                for (var j in questions[i].tags) {
                    if (includeTags.includes(questions[i].tags[j])){
                        newQuestions.push(questions[i]);
                        break;
                    }
                }
            }
        }
        setNumShownQuestions(Math.min(newQuestions.length, numShownQuestions));
        setFilteredQuestions(newQuestions)
    }

    function handleAddQuestions(e) {
        let newNumQuestions = Math.min(filteredQuestions.length, numShownQuestions + 10);
        setNumShownQuestions(newNumQuestions);
    }

    const fetchQuestions = () => {
        let body = {
          user: user
        }
        setTimeout(() => {
            fetch('http://localhost:5001/user/getquestions', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setQuestions(data.questions)
                    setFilteredQuestions(data.questions)
                } else {
                    setQuestions([])
                    setFilteredQuestions([])
                }
            })
        .catch(err => console.log(err));} , 1000);
        setTimeout(() => {
            fetch('http://localhost:5001/fqdb/tags', {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(response => response.json())
            .then(data => {
                setTagList(data.data.meta.tags)
                setIsReady(1)
            })
            .catch(err => console.log(err));
        }, 2000);
    }

    const getUserStats = () => {
        setTimeout(() => {
            let body = {
                user: user
            }
            fetch('http://localhost:5001/user/getstats', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8",}
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) setStats(data);
            })
            .catch(err => console.log(err));}, 100);
        setTimeout(() => (setLoading(false)), 1000);
    }
    
    React.useEffect(()=> {
        getUserStats();
        fetchQuestions();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        var tagSelected2 = []
        for (var i in tagList) { // eslint-disable-line no-unused-vars
            tagSelected2.push("outlined")
        }
        setTagSelected(tagSelected2)
        handleAddQuestions()
    }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <GenericLoader loading={loading}>
        <Box className={classes.body}>
            <Container className={classes.bodycontainer}> 
                <Typography variant="h3" component="h2" style={{paddingBottom:"30px"}}>
                    Welcome {user.username}
                </Typography>
                <Divider sx={{borderBottomWidth: 5,}} className={classes.divider}></Divider>
                <Box sx={{paddingBottom:"30px", paddingTop:"30px", paddingLeft:"0px"}}> 
                <Grid container spacing={10} justifyContent="center">
                    <Grid item xs={6}  md={3}> 
                        <Typography variant="h5"> Total Games Played: </Typography> <Typography variant = "h2" className={classes.stat}>  {user.gameCount} </Typography>
                    </Grid>
                    <Grid item xs={6}  md={3}> 
                        <Typography variant="h5"> Total Questions: </Typography> <Typography variant = "h2" className={classes.stat}>  {stats.totalquestions} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}> 
                        <Typography variant="h5"> Average Answer Difference: </Typography> <Typography variant = "h2" className={classes.stat}>{stats.gameaverage} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}> 
                        <Typography variant="h5"> Best Game Score: </Typography> <Typography variant = "h2" className={classes.stat}>{stats.maxscore} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}> 
                        <Typography variant="h5"> Longest Game: </Typography> <Typography variant = "h2" className={classes.stat}>{stats.maxquestion}</Typography><Typography variant = "h5">questions</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}> 
                        <Typography variant="h5" > Average Game Score: </Typography> <Typography variant = "h2" className={classes.stat}>{stats.averagescore}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}> 
                        <Typography variant="h5"> Worst Error: </Typography> <Typography variant = "h2" className={classes.stat}>{stats.worsterror}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}> 
                        <Typography variant="h5"> Score (lifetime): </Typography> <Typography variant = "h2" className={classes.stat}>{stats.scoretotal}</Typography>
                    </Grid>
                </Grid>
                </Box>
                <Divider sx={{borderBottomWidth: 5}} className={classes.divider}></Divider>
                <Box style={{paddingTop: "30px", paddingBottom: "30px"}} textAlign='center'>
                    <Stack direction="row" spacing={1} justifyContent="center" flexWrap='wrap'>
                        {tagList.map((tag, i) => {
                            return (
                            <Chip key={tag} id={tag} label={tag} variant={tagSelected[i]} 
                                onClick={handleTagChipClick} sx={{marginBottom: "12px"}}/>
                            );
                        })}
                    </Stack>
                    <Grid container style={{paddingTop: "12px"}}>
                        <Grid container layout={'row'} spacing={1.5}>
                        <Grid key="statement"  style={{paddingBottom: "12px"}} item  xs={6} lg={9}>
                            <Paper className={classes.paperhead}> Question: </Paper>
                        </Grid>
                        <Grid key="answer" style={{paddingBottom: "12px"}} item xs={3} lg={1}>
                            <Paper className={classes.paperhead} style={{textAlign: 'center'}}> Answer: </Paper>
                        </Grid>
                        <Grid key="tags" style={{paddingBottom: "12px"}} item xs={3} lg={2}>
                            <Paper className={classes.paperhead} style={{textAlign: 'center'}}> Tags: </Paper>
                        </Grid>
                        </Grid>
                        {shownQuestions.map((question) => {
                            return (
                                <Grid key={question.id} container layout={'row'} spacing={1.5}>
                                <Grid key="statement"  style={{paddingBottom: "12px"}} item  xs={6} lg={9}>
                                    <Paper className={classes.paper} style={{justifyContent: 'flex-start'}}>{question.statement}</Paper>
                                </Grid>
                                <Grid key="answer" style={{paddingBottom: "12px"}} item  xs={3} lg={1}>
                                    <Paper className={classes.paper} style={{textAlign: 'center'}}>{question.answer}</Paper>
                                </Grid>
                                <Grid key="tags" style={{paddingBottom: "12px"}} item xs={3} lg={2}>
                                    <Paper className={classes.paper} style={{textAlign: 'center'}}>{question.tags.join(', ')}</Paper>
                                </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Chip
                        label={
                            filteredQuestions.length === numShownQuestions
                                ? "No more questions"
                                : "Show " + Math.min(filteredQuestions.length - numShownQuestions, 10) + " more questions"
                        }
                        variant="outlined"
                        onClick={handleAddQuestions}
                    />
                </Box>
                <Divider sx={{borderBottomWidth: 5,}} className={classes.divider}></Divider>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <ChangeUsername />
                    <ResetUser />
                </Box>  
            </Container>
        </Box>
        </GenericLoader>
    )
}

export default Content;