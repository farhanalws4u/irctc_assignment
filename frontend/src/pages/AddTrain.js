import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Header from '../components/header/Header'
import useStyles from "./styles";
import Input from '../components/auth/Input'
import { addTrain } from '../api/trainApi';

function AddTrain() {
    const classes = useStyles();
      const [formData, setFormData] = useState({
        train_name:'',
        source:"",
        destination:"",
        seat_capacity:0,
        arrival_time_at_source:"",
        arrival_time_at_destination:""
      });

      
  const handleChange = async(e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
     console.log({formData})

     try {
        let { data } = await addTrain(formData)
        console.log({data})
        if(data.status=== 'success'){
            alert("Train Added Successfully!")
            setFormData({
              train_name: "",
              source: "",
              destination: "",
              seat_capacity: "",
              arrival_time_at_source: "",
              arrival_time_at_destination: "",
            });
        }
     } catch (error) {
        alert(error)
     }
    };
  return (
    <Box sx={{ backgroundColor: "#f4eeff" }}>
      <Header />
      <Box
        sx={{
          marginTop: 5,
          paddingBottom: "100px",
          backgroundColor: "#f4eeff",
          height: "fit-content",
          minHeight: "100vh",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <Typography className={classes.text} variant="h4">
          Enter Train Details
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="train_name"
              label="Enter Train Name"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="source"
              label="Enter Source"
              handleChange={handleChange}
              type={"text"}
            />
            <Input
              name="destination"
              label="Enter destination"
              handleChange={handleChange}
              type={"text"}
            />
            <Input
              name="seat_capacity"
              label="Enter Seat Capacity"
              handleChange={handleChange}
              type={"number"}
            />
            <Input
              name="arrival_time_at_source"
              label="Enter arrival time at source"
              handleChange={handleChange}
              type={"text"}
            />
            <Input
              name="arrival_time_at_destination"
              label="Enter arrival time at destination"
              handleChange={handleChange}
              type={"text"}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Train
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddTrain