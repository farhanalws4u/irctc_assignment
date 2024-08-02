import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { registerUser } from "../../api/authApi";

function Auth(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [authErrors, setAuthErrors] = useState({});

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      let { data } = await registerUser(formData);
      console.log("response===", data);
      if (data.status_code === 200) {
        alert("Account successfully created...");
        navigate("/login");
      }
      if (data.errors) {
        setAuthErrors(data.errors);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container id="mainComp" component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: "50px",
          justifyContent: "center",
        }}
      >
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/en/archive/d/d6/20210618072351%21Victoria_train_logo.svg"
          }
          alt="logo"
          className="logo"
        />
      </Box>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.text} variant="h5">
          Sign Up
        </Typography>
        {Object.keys(authErrors).length > 0 && (
          <Alert severity="error">
            {Object.values(authErrors).map((obj) => {
              return (
                <li>
                  {obj}
                  <br />
                </li>
              );
            })}
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="username"
              label="Username"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            <Input
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Button
                className={classes.text}
                onClick={() => navigate("/login")}
              >
                Alreday have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
