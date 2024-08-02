import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Checkbox,
  InputLabel,
} from "@material-ui/core";
import LoadingOverlayComp from "../LoadingOverlayComp";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";

import { useNavigate } from "react-router-dom";
import "./index.css";

import { Box } from "@mui/system";
import { loginUser } from "../../api/authApi";
import { setAdminKey, setAuthToken } from "../../api/trainApi";

export default function Login(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    authKey: "",
  });
  const [authErrors, setAuthErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await loginUser(formData);
      console.log(data);
      if (data.errors) {
        setAuthErrors(data.errors);
      }
      if(data.success){
        localStorage.setItem('userToken',data.token);

        if(data.isAdmin){
          localStorage.setItem('authKey',formData.authKey)
        }
        navigate('/')
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LoadingOverlayComp active={isLoading}>
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
            Sign In
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <InputLabel>Admin ?</InputLabel>
                <Checkbox
                  onChange={() => setIsAdmin(!isAdmin)}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Box>
              {isAdmin && (
                <Input
                  name="authKey"
                  label="Enter Your key"
                  handleChange={handleChange}
                  type="text"
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container justify="center">
              <Grid item>
                <Button
                  className={classes.text}
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </LoadingOverlayComp>
  );
}
