import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
let userToken = localStorage.getItem("userToken");
let authKey = localStorage.getItem("authKey");

console.log({userToken,authKey})

instance.interceptors.request.use(
  (config) => {
    // Log the config to see if headers are being set
    console.log("Request Config:", config);

    if (userToken) {
      config.headers["Authorization"] = userToken;
    }

    if (authKey) {
      config.headers["auth_key"] = authKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Log the response for debugging purposes
instance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Response Error:", error.response);
    return Promise.reject(error);
  }
);

export const getTrains = async () => {
  return await instance.get(`/train`);
};

export const getSeatAvailability = async (data) => {
  return await instance.get(
    `/train/check-seat-availability?source=${data.source}&destination=${data.destination}`
  );
};

export const bookSeat = async (data) => {
  return await instance.post(`/train/book-seat`, data);
};

export const addTrain = async (data) => {
  return await instance.post(`/train/add-train`, data);
};

export const getBookingDetails = async (id) => {
  return await instance.get(`/train/booking-details?booking_id=${id}`);
};
