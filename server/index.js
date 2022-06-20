/*eslint no-redeclare: "off"*/

//Importing Express Module
const express = require("express");

//Importing Database
const db = require("./db");
const FieldValue = require('firebase-admin').firestore.FieldValue;

// Cors Settings
const cors = require("cors");
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//Initialising Express
const app = express();

// Configuring Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())
app.set("view engine", "ejs");
app.use(cors(corsOptions))


//Creating APIs
app.post("/user/get", async (req, res, next) => {
  const body = req.body
  const id = body.id
  let user = db.collection('users').doc(id)
  let userInfo = await user.get()
  const response = {
    data: {
      user: userInfo.data()
    }
  }
  res.status(200).send(response)
});

app.post("/user/create", async (req, res, next) => {
  const id = req.body.id
  const email = req.body.email
  const name = req.body.name

  let user = db.collection('users').doc(id)
  let userInfo = await user.get()
  if (!userInfo.exists) {
    let newUser = {
      id: id,
      email: email,
      name: name,
      setup: false,
      answered: [],
      stats: [],
      games: [],
      gameCount: 0,
      isAdmin: false,
    }
    let response = {
      user: newUser,
      status: 200
    }
    user.set(newUser)
    res.status(200).send(response)
  }
})

app.post("/user/setup", async (req, res, next) => {
  const id = req.body.id
  const username = req.body.username
  let user = db.collection('users').doc(id)
  let setupUser = {
    username: username,
    setup: true,
  }
  user.set(setupUser, {merge: true})
  res.status(200)
})

app.post("/fqdb/tags", async (req, res, next) => {
    let meta = await db.collection('fqdb').doc('meta').get()
    const response = {
        data: {
            meta: meta.data()
        }
    }
    res.status(200).send(response)
})

app.post("/fqdb/upload", async (req, res, next) => {
    const statement = req.body.statement
    const answer = parseInt(req.body.answer)
    const tags = req.body.tags

    let fqdbSize = await db.collection('fqdb').doc('meta').get()
    fqdbSize = (parseInt(fqdbSize._fieldsProto.size.integerValue) + 1)

    let question = db.collection('fqdb').doc(fqdbSize.toString())
    let setupQuestion = await question.get()
    if (!setupQuestion.exists) { // TODO: change this to check for duplicate questions
        let newQuestion = {
        id: fqdbSize,
        statement: statement,
        answer: answer,
        tags: tags,
        }
        let response = {
        question: newQuestion,
        status: 200
        }
        question.set(newQuestion)
        let newMeta = {
            size: fqdbSize
        }
        db.collection('fqdb').doc('meta').set(newMeta, {merge: true})
        res.status(200).send(response)
    }
    })

app.post("/fqdb/getquestion", async (req, res, next) => {
    let response, exclude;
    if (req.body.user !== null) {
        exclude = req.body.user.answered;
    } else {
        exclude = [];
    }
    const questionRef = db.collection('fqdb');
    const fullSet = await questionRef.where('id', '>', 0).get();
    let fullQuestionSet = {};
    fullSet.forEach(item => {
        fullQuestionSet[item.id] = item.data();
    })
    for (var i in exclude) {
        delete fullQuestionSet[exclude[i]]
    }
    let keys = Object.keys(fullQuestionSet);
    let doc = fullQuestionSet[keys[keys.length * Math.random() << 0]];
    if (doc === undefined) {
        response = {
        doc: null,
        status: 202,
        }
        res.status(202).send(response);
    } else {
        response = {
        doc: doc,
        status: 200
        }
        res.status(200).send(response);
    } 
})


app.post("/user/log", async (req, res, next) => {
    let user = req.body.user;
    if (user === null) {
      res.status(200).send({}); // send nothing back if not logged in
      return;
    }
    let uid = user.id;
    let question = req.body.question;
    let error = req.body.error;
    let score;
    if (error === 0) score = 5;
    else if (error === 1) score = 3;
    else if (error === 2) score = 1;
    else score = 0;


    let doc = db.collection('users').doc(uid)
    let stats = {question: question, error: error, score: score}
    if (user.answered === undefined) user.answered = [question]
    else user.answered.push(question);
    if (user.stats === undefined) user.stats = [stats]
    else user.stats.push(stats);
    await doc.update({
        answered: FieldValue.arrayUnion(question),
        stats: FieldValue.arrayUnion(stats)
    }).catch((e) => console.log(e))
    res.status(200).send({response: "successfully logged user data", status: 200, user: user})
})

app.post("/user/getstats", async (req, res, next) => {
  let response, uid;
  if (req.body.user !== null) {
      uid = req.body.user.id;
  } else {
      res.status(202).send({msg: "bad data requested!"});
      return;
  }
  const userDoc = db.collection('users').doc(uid);
  const snapshot = await userDoc.get();
  const gameData = snapshot.data().games;
  // do stuff
  let gameaverages = [];
  for(var i in gameData) { //calculate average game error from users.games.gamerror
    gameaverages.push(gameData[i].gameAverageError)
  }
  let gamecounter = 0;
  let length = gameaverages.length;
  for(var i in gameaverages) {
    gamecounter += gameaverages[i];
  }
  let gameavgdiv = gamecounter / length; //calculate gameaverage by dividing total game error/ number games
  let gameavg = gameavgdiv.toFixed(2);
  if (isNaN(gameavg)) gameavg = "-"
  let maxscore = 0; 
  let maxquestion = 0;
  let scoretotal = 0;
  let worsterror = 0;
  let totalquestions = snapshot.data().answered.length;
  let stats = snapshot.data().stats;
  for (var i in stats) {
    if (worsterror < stats[i].error){
      worsterror = stats[i].error
    }
  }
  for (var i in gameData){ //calculate total score and max questions in a game from users.games.score and users.games.numQuestions
    scoretotal += gameData[i].score;
    if (maxquestion < gameData[i].numQuestions)
      maxquestion = gameData[i].numQuestions;
    if (maxscore < gameData[i].score)
        maxscore = gameData[i].score;
  }
  let averagescorediv = scoretotal/length; // calculate average score by dividing total/length of games array
  let averagescore = averagescorediv.toFixed(2);
  if (isNaN(averagescore)) averagescore = "-"; 
  response = {
      gameaverage: gameavg,
      status: 200,
      maxscore: maxscore,
      maxquestion: maxquestion,
      averagescore: averagescore,
      worsterror: worsterror,
      scoretotal: scoretotal,
      totalquestions: totalquestions
  }
  res.status(200).send(response);
})

app.post("/user/reset", async (req, res, next) => {
  let uid
  if (req.body.user !== null) {
    uid = req.body.user.id;
  } else {
      res.status(202).send({msg: "bad data requested!"});
      return;
  }
  let user = db.collection('users').doc(uid)
  let updated = {
    ...req.body.user,
    answered: [],
    gameCount: 0,
    games: [],
    stats: [],
  }
  await user.update(updated)
  res.status(200).send({response: "successfully cleared data", status: 200, user: updated})
})

app.post("/user/newUsername", async (req, res, next) => {
  let uid, username
  if (req.body.user !== null) {
    uid = req.body.user.id;
    username = req.body.username;
  } else {
    res.status(202).send({msg: "bad data requested!"});
    return;
  }
  let user = db.collection('users').doc(uid)
  let newUsername = {
    username: username
  }
  await user.update(newUsername)
  res.status(200).send({response: "successfully changed username", status: 200})
})

app.post("/user/loggame", async (req, res, next) => {
  let user = req.body.user;
  if (user === null) {
    res.status(200).send({}); // send nothing back if not logged in
    return;
  }
  let uid = user.id;
  let numQuestions = req.body.numQuestions;
  let score = req.body.score;
  let gameAverageError = req.body.averageError;

  let doc = db.collection('users').doc(uid)
  await doc.update({
    games: FieldValue.arrayUnion({numQuestions: numQuestions, score: score, gameAverageError: gameAverageError}),
    gameCount: FieldValue.increment(1)
  });
  user = await doc.get().catch((e) => console.log(e));
  res.status(200).send({response: "successfully logged game data", status: 200, user: user.data()})
})

app.post("/user/getquestions", async (req, res, next) => {
    let response, include;
    if (req.body.user !== null) {
        include = req.body.user.answered;
    } else {
        include = [];
    }
    
    const questionRef = db.collection('fqdb');
    const fullSet = await questionRef.where('id', '>', 0).get();
    let fullQuestionSet = {};
    fullSet.forEach(doc => {
        fullQuestionSet[doc.id] = doc.data();
    })
    let filteredQuestionSet = [];
    for (var i in include) {
        filteredQuestionSet.push(fullQuestionSet[include[i]])
    }
    response = {
        questions: filteredQuestionSet,
        status: 200
    }
    res.status(200).send(response);
})

// Detect port number from the Node Server or use 5000
const PORT = process.env.PORT || 5001;

// Listen for URIs on a port
app.listen(PORT, () => console.log(`Server started at ${PORT}`));