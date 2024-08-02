import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      fontFamily: "merriweather",
    },
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#EC6F66",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6e48aa",
    "&:hover": { backgroundColor: "#EC6F66" },
    fontFamily: "merriweather",
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#6e48aa",
    "&:hover": { backgroundColor: "#EC6F66" },
    fontFamily: "merriweather",
  },
  text: {
    fontFamily: "merriweather",
  },
}));
