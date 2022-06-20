import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GenericLoader } from '..';
import { ScoreBlock } from './ScoreBlock';
import { Hearts } from './Hearts';
import PropContext from '../../propContext';

const useStyles = makeStyles(theme => ({
  qCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: "1152px",
    width: "90vw",
    padding:"15px",
    minHeight:"35vh",
  },
  textBox: {
    paddingBottom:"10px",
    textAlign:"center",
    borderRadius: '1px',
    width: '10vw'
  },
  question: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary
  },
  input: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  }
}));

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};


const BasicCard = (props) => {
  const classes = useStyles();
  const context = React.useContext(PropContext);
  let user = context.user;

  const [answerState, setAnswerState] = React.useState("notAnswered");
  const [error, setError] = React.useState(0);
  const [cardInfo, setCardInfo] = React.useState({statement: "ERROR: NO SERVER CONNECTION"});
  const [score, setScore] = React.useState(0);
  const [hearts, setHearts] = React.useState(3);
  const [numQuestions, setnumQuestions] = React.useState(0); // @TODO MAKE NOT STATE FUNCTION
  const [loading, setLoading] = React.useState(true);
  const [totalError, settotalError] = React.useState(0);

  const handler = ({ key }) => {
    if (key === 'Enter') {
      if (answerState !== "notAnswered")
        nextQuestion();
    }
  };

  const fetchCardInfo = (props) => {
    let body = {
      user: user
    }
    setTimeout(() => {
      fetch('http://localhost:5001/fqdb/getquestion', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {"Content-type": "application/json; charset=UTF-8",}
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setCardInfo(data.doc);
        } else {
          setCardInfo(1)
        }
      })
      .catch(err => console.log(err));}, 500);
      setTimeout(() => {
        setLoading(false); 
        if(document.getElementById("ans") !== null){
          document.getElementById("ans").focus()
        }
      }, 750);
  }

  React.useEffect(()=> {
    fetchCardInfo()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEventListener("keydown", handler);

  const handleAnswer = (e) => {
    if (/[^\d-]/gi.test(e.key)) {
      e.preventDefault()
    }
    if (e.key === 'Enter' || e.type === 'click') {
      var Ans = cardInfo.answer
      let answer = document.getElementById("ans").value;
      if (answer.length === 0) return;
      if (Ans === Number(answer)) {
        setAnswerState("correct");
        setScore(score + 5);
        setnumQuestions(numQuestions + 1);
        sendAnswerStats({error: 0});
      } else {
        let localHearts = hearts;
        var ansError = Math.abs(Ans - answer);
        settotalError(totalError + ansError)
        setError(ansError);
        if(ansError===1) { 
          setAnswerState("wrongby1");
          setScore(score + 3);
          setnumQuestions(numQuestions + 1);
        }
        else if(ansError===2) {
          setAnswerState("wrongby2")
          setScore(score + 1);
          setnumQuestions(numQuestions + 1);
        }
        else {
          setAnswerState("wrong")
          localHearts -= 1;
          setHearts(hearts - 1);
          setnumQuestions(numQuestions + 1);
        }
        sendAnswerStats({error: ansError});
        if (localHearts === 0) {
          sendGameData();
        }
      }
    }
  }

  const sendAnswerStats = (stats) => {
    let error = stats.error;
    let questionID = cardInfo.id;
    let body = {
      user: user,
      question: questionID,
      error: error,
    }
    fetch('http://localhost:5001/user/log', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {"Content-type": "application/json; charset=UTF-8",}
    })
    .then(response => response.json())
    .then(data => { 
      if (data.user !== undefined) context.setUser(data.user);
    })
    .catch(err => console.log(err));
  }

  const sendGameData = (stats) => {
    let body = {
      user: user,
      numQuestions: numQuestions + 1,
      score: score,
      averageError: totalError / (numQuestions)
    }
    fetch('http://localhost:5001/user/loggame', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {"Content-type": "application/json; charset=UTF-8",}
      })
      .then(response => response.json())
      .then(data => { 
        if (data.user !== undefined) context.setUser(data.user); // update user after data is sent (prevents user going stale)
      })
      .catch(err => console.log(err));
  }

  const nextQuestion = () => {
    setLoading(true);
    fetchCardInfo();
    setAnswerState("notAnswered");
    if(hearts === 0) {
      resetGame();
    }
  }

  const resetGame = () => {
    setnumQuestions(0);
    setHearts(3);
    setScore(0);
    settotalError(0);
  }

  function normalrender() {
    let Question;
    if(cardInfo === 1) {
      return (
        <Card className={classes.qCard} sx={{ border: "15px solid", borderColor:"#009E60"}}>
            <CardContent>   
              <Typography variant="h4" className={classes.question} component="div" align="center">
                Congratulations, you have completed all the available questions! Check out your stats in your account page
              </Typography>
            </CardContent>
        </Card>
      )
    } else {
      Question = cardInfo.statement;
      return ( 
        <Card className={classes.qCard} elevation={2}>
          <GenericLoader loading={loading}>
            <Container style={{marginBottom:"15px", marginTop:"5px", justifySelf:'start'}}>
              <Grid container>
                <Grid item xs={6}>
                  <ScoreBlock score={score}></ScoreBlock>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end" alignItems="center"> 
                  <Hearts hearts={hearts}></Hearts>
                </Grid>
              </Grid>
            </Container>
            <div>
            <CardContent>   
                <Typography variant="h4" className={classes.question} component="div" align="center">
                  {Question}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex",flexDirection:"column"}}>
                <TextField className={classes.textBox} id="ans" InputProps={{
                  inputProps: {
                      className: classes.input,
                      maxLength: 8
                  }
                }} onKeyPress={(key) => handleAnswer(key)}> 
                </TextField>
                <Button size="big"  align="center" onClick={(key) => handleAnswer(key)}>Submit</Button>
              </CardActions>
            </div>
          </GenericLoader>
        </Card>
      )
    }

    
  }

  function correctrender() {
    return (
      <Card className={classes.qCard} variant="outlined" sx={{border: "15px solid", borderColor:"#009E60"}}>
        <CardContent>
          <Typography variant="h4" component="div" align="center" color="text.secondary">
            Correct!
          </Typography>
        </CardContent>
        <CardActions style={{display:"flex",flexDirection:"column"}}>
          <Button size="big"  align="center" sx={{color:"text.secondary"}} onClick={() => nextQuestion()}> Next Question </Button>
        </CardActions>
      </Card>
    )
  }


  function wrongrender() {
    if(answerState === "wrongby1") {
    return (
      <Card className={classes.qCard} variant="outlined" sx={{border: "15px solid", borderColor:"#ffbb00"}}>
        <CardContent>
          <Typography variant="h4" component="div" align="center" color="text.secondary">
            Very close, off by {error} <br/>
            {cardInfo.answer} was the correct answer
          </Typography>
        </CardContent>
        <CardActions style={{display:"flex",flexDirection:"column"}}>
          <Button size="big"  align="center" sx={{color:"text.secondary"}} onClick={() => nextQuestion()}> Next Question </Button>
        </CardActions>
      </Card>
    )}
    else if (answerState === "wrongby2") {
    return (
      <Card className={classes.qCard} sx={{border: "15px solid", borderColor:"#ff7700"}}>
        <CardContent>
          <Typography variant="h4" component="div" align="center" color="text.secondary">
            Close, off by {error} <br/>
            {cardInfo.answer} was the correct answer
          </Typography>
        </CardContent>
        <CardActions style={{display:"flex",flexDirection:"column"}}>
          <Button size="big"  align="center" sx={{color:"text.secondary"}} onClick={() => nextQuestion()}> Next Question </Button>
        </CardActions>
      </Card>
    )}
    else {
    return (
      <Card className={classes.qCard} sx={{border: "15px solid", borderColor:"#FF0A00"}}>
        <CardContent>
          <Typography variant="h4" component="div" align="center" color="text.secondary">
            Try harder. Off by {error} <br/>
            {cardInfo.answer} was the correct answer
          </Typography>
        </CardContent>
        <CardActions style={{display:"flex",flexDirection:"column"}}>
          <Button size="big"  align="center" sx={{color:"text.secondary"}} onClick={() => nextQuestion()}> Next Question </Button>
        </CardActions>
      </Card>
    )}
  }

  function gameover() {
    return (
    <Card className={classes.qCard} variant="outlined" sx={{border: "15px solid", borderColor:"#FF0A00"}}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" align="center" color="text.secondary">
              Game Over. 
            </Typography>
            </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" align="center" color="text.secondary">
            Score: {score}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" align="center" color="text.secondary">
            Questions Conquered: {numQuestions}
          </Typography>
        </Grid>
       </Grid>
      </CardContent>
        <CardActions style={{display:"flex",flexDirection:"column"}}>
          <Button size="big"  align="center" sx={{color:"text.secondary"}} onClick={() => nextQuestion()}> Play Again </Button>
      </CardActions>
    </Card>
    )
  }

  if (hearts === 0) {
    return gameover()
  }
  if (answerState === "notAnswered") {
    return normalrender()
  } else if (answerState === "correct") {
    return correctrender()
  } else if (answerState === "wrong" || answerState === "wrongby1" || answerState ==="wrongby2") {
    return wrongrender()
  }
}

export default BasicCard;

