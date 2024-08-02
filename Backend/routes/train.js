import express from "express";
import {
  addTrain,
  bookSeat,
  checkSeatAvailability,
  getBookingDetails,
  getTrains,
} from "../controllers/train.js";
import { checkIsAdmin } from "../middleware/check-admin.js";
import { authenticateUser } from "../middleware/auth.js";


const router = express.Router();
router.get("/", authenticateUser, getTrains);
router.post("/add-train", authenticateUser,checkIsAdmin, addTrain);
router.get("/check-seat-availability",authenticateUser,  checkSeatAvailability);
router.post("/book-seat", authenticateUser, bookSeat);
router.get("/booking-details", authenticateUser, getBookingDetails);



export default router;
