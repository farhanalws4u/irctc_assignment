import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import RoomIcon from "@material-ui/icons/Room";
import { MarginTwoTone } from "@mui/icons-material";

const TrainCard = ({ train }) => {
  return (
    <Card style={{ margin: "16px", padding: "16px",textAlign:"left" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {train.train_name}
        </Typography>
        <Typography color="textSecondary">
          Train ID: {train.train_id}
        </Typography>
        <Box sx={{display:"flex",flexDirection:"row", justifyContent:"center",alignContent:"center"}}>
          <CallMadeIcon/>
          <Typography variant="body1" component="p" style={{ margin: "8px 0" }}>
            Source: {train.source}
          </Typography>
          <RoomIcon/>
          <Typography variant="body1" component="p" style={{ margin: "8px 0" }}>
            Destination: {train.destination}
          </Typography>
        </Box>
       
      </CardContent>
    </Card>
  );
};

export default TrainCard;
