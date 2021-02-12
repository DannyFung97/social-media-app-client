export default {
  palette: {
    primary: {
      light: '#c6334b',
      main: '#b8001e',
      dark: '#800015',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f7af52',
      main: '#f59c27',
      dark: '#ab6d1b',
      contrastText: '#fff',
    },
  },
  common: {
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto",
    },
    pageTitle: {
      margin: "10px auto",
    },
    textField: {
      margin: "10px auto",
    },
    button: {
      marginTop: 10,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    link: {
      color: "black",
    },
    progress: {
      position: "absolute",
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#b8001e",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  }
};