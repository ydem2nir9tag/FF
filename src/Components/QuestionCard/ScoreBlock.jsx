import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  score: {
    color: theme.palette.primary.main
  },
  font: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "30px"
  }
}));

export const ScoreBlock = (props) => {
  const classes = useStyles();

  return (
    <div>
        <Typography variant={"h4"} className={classes.font}> Score: <span className={classes.score}>{props.score}</span> </Typography>
    </div>
  )
}

