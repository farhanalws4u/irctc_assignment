import jwtDecode from "jwt-decode"; 

export const getUserDataFromToken = () => {
  const token = localStorage.getItem("userToken"); 

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
