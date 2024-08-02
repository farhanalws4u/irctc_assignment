import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./styles.css";
import { useNavigate } from "react-router-dom";


const ResponsiveAppBar = () => {
  const navigate = useNavigate();


  const handleLogOut = () => {
    localStorage.removeItem("userToken")
    if(localStorage.getItem('authKey')){
      localStorage.removeItem('authKey')
    }
    navigate("/login");
  };

  return (
    <AppBar sx={{ backgroundColor: "#fff" }} position="static">
      <Container sx={{ display: "flex", paddingTop: 1,paddingBottom:"30px" }} maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            flexDirection:"row",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/en/archive/d/d6/20210618072351%21Victoria_train_logo.svg"
            }
            alt="logo"
            className="logo"
          />
          <p className="logoText">IRCTC</p>
        </Box>

          <button className="logoutButton" onClick={handleLogOut}>
            Log Out
          </button>
      
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
