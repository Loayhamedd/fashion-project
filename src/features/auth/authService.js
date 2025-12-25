import API from "../../services/axios";


const login = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

const authService = {
  login,
};

export default authService;
