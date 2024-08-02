import pool from "../db.js";

export const addTrain = async (req, res) => {
  console.log("body--", { ...req.body, ...req.body.isAdmin });

  // check for admin
  if (!req.body.isAdmin) {
    return res.status(401).json({ error: "Unauthorized Access!" });
  }

  const search = "SELECT * FROM train WHERE train_name = $1";
  const add = `
    INSERT INTO train (train_name, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    req.body.train_name,
    req.body.source,
    req.body.destination,
    req.body.seat_capacity,
    req.body.arrival_time_at_source,
    req.body.arrival_time_at_destination,
  ];

  try {
    const result = await pool.query(search, [req.body.train_name]);
    if (result.rows.length > 0) {
      return res.status(400).json({ error: "Train already exists" });
    }

    const insertResult = await pool.query(add, values);
    if (insertResult.rows.length > 0) {
      return res.status(201).json({
        status:"success",
        message: "Train added successfully",
        train_id: insertResult.rows[0].train_id,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkSeatAvailability = async (req,res)=>{
  console.log('---body',req.query);


  const query = "SELECT * FROM train where source = $1 AND destination = $2"
  const values = [req.query.source,req.query.destination];
  console.log(values)

  try {
    const result = await pool.query(query, values);
    console.log("query result",result)
    if (result.rows.length > 0) { 
         return res.status(201).json(result.rows);
    }else {
      return res.json({errors:{noTrain:"No train found for this route!"}})
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }

}

export const bookSeat = async (req, res) => {
  console.log("---body", req.body);
    const {
      train_id,
      user_id,
      no_of_seats,
      arrival_time_at_source,
      arrival_time_at_destination,
    } = req.body;

    try {

      await pool.query("BEGIN");
      
      const trainQuery = "SELECT * FROM train WHERE train_id = $1 FOR UPDATE";
      const trainResult = await pool.query(trainQuery, [train_id]);
      
      if (trainResult.rows.length === 0) {
        return res.status(404).json({ error: "Train not found" });
      }
      
      const train = trainResult.rows[0];
      if (train.seat_capacity < no_of_seats) {
        return res.status(400).json({ error: "Not enough seats available" });
      }
      
      if(train.booked_seats === null ) train.booked_seats = []
      const bookedSeatsSet = new Set(train.booked_seats);
      const newSeats = [];
      for (
        let i = 1;
        i <= train.seat_capacity && newSeats.length < no_of_seats;
        i++
      ) {
        if (!bookedSeatsSet.has(i)) {
          newSeats.push(i);
        }
      }

      if (newSeats.length != no_of_seats) { 
        return res
          .json({ errors: {NoSeats:"Unable to find the requested number of free seats" }});
      }

      const newSeatsAvailable = train.seat_capacity - no_of_seats;
      const updatedBookedSeats = train.booked_seats.concat(newSeats);

      const updateSeatsQuery = `
      UPDATE train
      SET seat_capacity = $1, booked_seats = $2
      WHERE train_id = $3
    `;
      await pool.query(updateSeatsQuery, [
        newSeatsAvailable,
        updatedBookedSeats,
        train_id,
      ]);

      const insertBookingQuery = `
      INSERT INTO bookings (train_id, train_name, user_id, no_of_seats, seat_numbers, arrival_time_at_source, arrival_time_at_destination)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
      const bookingResult = await pool.query(insertBookingQuery, [
        train_id,
        train.train_name,
        user_id,
        no_of_seats,
        newSeats,
        arrival_time_at_source,
        arrival_time_at_destination,
      ]);
      await pool.query("COMMIT");
      console.log("booked seats====",bookingResult.rows[0].booked_seats, bookingResult.rows[0])
      return res.status(201).json({
        status:"success",
        message: "Seat booked successfully",
        booking_id: bookingResult.rows[0].booking_id,
        seat_numbers: bookingResult.rows[0].seat_numbers,
      });
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error processing booking:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
}

export const getBookingDetails = async (req, res) => {
  console.log("---body", req.query);

  const query = "SELECT * FROM bookings where booking_id = $1";
  const values = [req.query.booking_id];
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("query result", result);
    if (result.rows.length > 0) {
      return res.status(201).json({
       ...result.rows[0]
      });
    }else {
      return res.json({errors:{noDataFound:"No data found with this booking id!"}})
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTrains = async (req, res) => {
  const query = "SELECT * FROM train ORDER BY train_id ASC";

  try {
    const result = await pool.query(query);
    console.log("query result", result);
    if (result.rows.length > 0) {
      return res.status(201).json([
        ...result.rows,
      ]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};