import axios from "axios";
import { loadUser } from "./user.js";

// Register user
export const register = async ({ email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/signup", body, config);

    if (res) localStorage.setItem("crypto_token", res.data.token);

    return res;
  } catch (err) {
    return err;
  }
};

// Login user
export const login = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/login", body, config);

    if (res) localStorage.setItem("crypto_token", res.data.token);

    return res;
  } catch (err) {
    return err;

    // if (errors) {
    //   return errors.forEach((error) => error);
    // }
  }
};

// Logout / Clear Profile
export const logout = () => {
  localStorage.removeItem("crypto_token");
};
