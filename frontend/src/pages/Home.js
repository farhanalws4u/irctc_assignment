import { Box, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { getTrains } from "../api/trainApi";
import TrainCard from "../components/TrainCard";
import TrainDetailModal from "../components/Modal/TrainDetailModal";
import { ButtonBase } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
  const [trains, setTrains] = useState([]);
  const [isTrainDetailModalOpen, setIsTrainDetailModalOpen] = useState(false);
  const [currentTrainData, setCurrentTrainData] = useState({});

  const getInitialData = async () => {
    let { data } = await getTrains();
    console.log("all trains===", data);
    setTrains(data);
  };

  useEffect(() => {
    getInitialData();
  }, [isTrainDetailModalOpen]);

  useEffect(() => {
    getInitialData();
  }, []);

  const handleTrainDetailModalOpen = () => {
    setIsTrainDetailModalOpen(true);
  };
  const handleTrainDetailModalClose = () => {
    setIsTrainDetailModalOpen(false);
  };

  const handleOpenTrainDetailModal = (data) => {
    setIsTrainDetailModalOpen(true);
    setCurrentTrainData(data);
  };

  return (
    <Box sx={{ backgroundColor: "#f4eeff" }}>
      <Header />
      <TrainDetailModal
        data={currentTrainData}
        isOpen={isTrainDetailModalOpen}
        handleClose={handleTrainDetailModalClose}
        handleOpen={handleTrainDetailModalOpen}
      />
      <Box sx={{ marginTop: "50px", marginLeft: "120px",display:"flex", flexDirection:"row",justifyContent:"space-evenly" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/check-seat")}
        >
          Check Seat Availability
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-train")}
        >
          Add Train
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/check-booking-details")}
        >
          Check booking Details
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          paddingBottom: "100px",
          backgroundColor: "#f4eeff",
          height: "fit-content",
          minHeight: "100vh",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <Grid container spacing={3} sx={{ height: "50vh", overflow: "scroll" }}>
          {trains
            .sort((a, b) => a.id - b.id)
            .map((train) => (
              <Grid key={train.id} item xs={12} sm={6} md={4}>
                <ButtonBase onClick={() => handleOpenTrainDetailModal(train)}>
                  <TrainCard train={train} />
                </ButtonBase>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
