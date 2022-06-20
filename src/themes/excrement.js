const excrement = {
    name: "excrement",
    typography : {
      fontFamily: [
        "Comic Sans MS",
        "Comic Sans",
        "sans-serif"
      ].join(','),
      button: {
          textTransform: 'none'
      }
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#b09a8d', //heart bar, score number, FF, submit button
      },
      background: {
        default: '#422b22', //background color
        paper: '#404239' //header and question box color
      },
      text: {
        primary: '#a69c88', //score: text color
        secondary: '#968a78' //the question text color
      },
    },
    shape: {
      borderRadius: 40
    }
  };
  
  export default excrement;