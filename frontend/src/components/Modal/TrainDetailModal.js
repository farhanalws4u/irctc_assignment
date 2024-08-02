import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Input from "../auth/Input";
import { Box } from "@material-ui/core";
import { getUserDataFromToken } from "../../utils/getUserData";
import { bookSeat } from "../../api/trainApi";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ isOpen, handleClose, data }) {
  const [noOfSeats, setNoOfSeats] = React.useState(0);

  const handleBookSeat = async () => {
    console.log("booking data", noOfSeats);

    if(noOfSeats === 0){
      alert("Please enter seats to book!")
      return;
    }

    let { id } = getUserDataFromToken();

    let formData = {
      user_id: id,
      train_id: data.train_id,
      no_of_seats: noOfSeats,
      arrival_time_at_source: data.arrival_time_at_source,
      arrival_time_at_destination: data.arrival_time_at_destination,
    };

    try {
      let { data } = await bookSeat(formData);
      console.log({data})
      if(data.status=== 'success'){
        alert(`Seats booked Successfully! Your seat numbers are ${data.seat_numbers}`)
      }
      if(data.errors){
        alert(data.errors.NoSeats);
      }
    } catch (error) {
      alert(error)
    }
  };

  let availableSeats = data.seat_capacity - data.booked_seats?.length;
  console.log(data.booked_seats?.length, data.seat_capacity);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {data.train_name}
        </DialogTitle>

        <DialogContent sx={{ minWidth: "400px", height: "310px" }} dividers>
          <Typography variant="body1" component="p" style={{ margin: "8px 0" }}>
            Arrival Time at Source: {data.arrival_time_at_source}
          </Typography>
          <Typography variant="body1" component="p" style={{ margin: "8px 0" }}>
            Arrival Time at Destination: {data.arrival_time_at_destination}
          </Typography>
          <Typography variant="body1" component="p" style={{ margin: "8px 0" }}>
            Seat Capacity: {data.seat_capacity}
          </Typography>
          <Typography variant="body1" component="p" style={{ margin: "8px 0" }}>
            Available Seats: {availableSeats === 0 ? "No seats Available!": availableSeats}
          </Typography>
          <Input
            name="no_of_seats"
            label="How many Seats You want to book ?"
            handleChange={(e) => setNoOfSeats(e.target.value)}
            type="text"
            variant="outlined"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookSeat}
            >
              Book Seat
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
