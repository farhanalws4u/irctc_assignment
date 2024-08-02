import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./index.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import CheckSeat from "./pages/CheckSeat";
import AddTrain from "./pages/AddTrain";
import BookingDetails from "./pages/BookingDetails";

function App() {

   let isAdmin = localStorage.getItem("authKey") ? true : false;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-seat" element={<CheckSeat />} />
          <Route path="/add-train" element={isAdmin ? <AddTrain /> : <Navigate to={'/'}/>} />
          <Route path="/check-booking-details" element={<BookingDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
