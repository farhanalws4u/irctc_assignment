import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Header from "../components/header/Header";
import Input from "../components/auth/Input";
import useStyles from "./styles";
import { getBookingDetails } from "../api/trainApi";

function BookingDetails() {
  const classes = useStyles();
  const [bookingId, setBookingId] = useState(0);
  const [bookingData, setBookingData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({bookingId})
    setBookingData(null)
    try {
      let { data } = await getBookingDetails(bookingId);
      console.log({ data });
      if(data){
        setBookingData(data)
      }
      if(data.errors){
        alert(data.errors.noDataFound);
        setBookingData(null)
      }
      setBookingId(0);
    } catch (error) {
      alert(error);
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
          Enter Booking Details
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="booking_id"
              label="Enter Booking ID"
              handleChange={(e) => setBookingId(e.target.value)}
              type="text"
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Get Booking Details
          </Button>
        </form>
        {bookingData && (
          <Box>
            {[bookingData].map((data) => {
              return (
                <>
                  <Typography className={classes.text} variant="h6">
                    {"Train Id: " + data.train_id}
                  </Typography>
                  <Typography className={classes.text} variant="h6">
                    {"Train Name: " + data.train_name}
                  </Typography>
                  <Typography className={classes.text} variant="h6">
                    {"User Id: " + data.user_id}
                  </Typography>
                  <Typography className={classes.text} variant="h6">
                    {"No Of Seats: " + data.no_of_seats}
                  </Typography>
                  <Typography className={classes.text} variant="h6">
                    {"Booked Seat Numbers: " + data.seat_numbers}
                  </Typography>
                </>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BookingDetails;
