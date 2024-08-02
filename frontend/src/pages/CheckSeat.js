import { Box, Button, ButtonBase, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Header from '../components/header/Header'
import Input from "../components/auth/Input";
import { getSeatAvailability } from "../api/trainApi";
import TrainCard from "../components/TrainCard";
import TrainDetailModal from '../components/Modal/TrainDetailModal'

function CheckSeat() {
  const [formData, setFormData] = useState({
    source:"",
    destination:""
  });
  const [isTrainDetailModalOpen, setIsTrainDetailModalOpen] = useState(false);
  const [currentTrainData, setCurrentTrainData] = useState({});
  const [searchResult,setSearchResults] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setSearchResults([])
     try {
        let {data} = await getSeatAvailability(formData)
        console.log({data})
        if(data.length > 0){
            setSearchResults(data)
        }else {
            alert("No train found for this route!")
        }
     } catch (error) {
       alert(error);
     }
   };
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
    <Box sx={{ backgroundColor: "#f4eeff", minHeight: "100vh" }}>
      <Header />
      <TrainDetailModal
        data={currentTrainData}
        isOpen={isTrainDetailModalOpen}
        handleClose={handleTrainDetailModalClose}
        handleOpen={handleTrainDetailModalOpen}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          marginTop: "50px",
          alignItems: "center",
        }}
      >
        <Input
          name="source"
          label="Enter Source"
          handleChange={handleChange}
          type="text"
          variant="outlined"
        />
        <br />
        <Input
          name="destination"
          label="Enter Destination"
          handleChange={handleChange}
          type="text"
        />
        <br />
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
        >
          Check
        </Button>
      </Box>
      <Box>
        {searchResult.length > 0 && (
          <Grid
            container
            spacing={3}
            sx={{ height: "50vh", overflow: "scroll" }}
          >
            {searchResult.map((train) => (
              <Grid item xs={12} sm={6} md={4} key={train.train_id}>
                <ButtonBase onClick={() => handleOpenTrainDetailModal(train)}>
                  <TrainCard train={train} />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default CheckSeat;
