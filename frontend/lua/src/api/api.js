import axios from "axios";

const BASE_URL =  /* process.env.REACT_APP_API_BASE_URL  ||  */"http://localhost:3000"

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

axios.default.withCredentials = true;

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('API Error:', error.message);
      return Promise.reject(error);
    }
  );
  
  export {api}
  export const signUp = async (username, email, password, favoritePlanet, favoriteColor, birthdate) => {
    try {
      const response = await api.post('/user/reg', {
        username,
        email,
        password,
        favoritePlanet,
        favoriteColor,
        birthdate,
      });
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const signIn = async (email, password) => {
    try {
      const response = await api.post('/user/log', { email, password });
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const signOut = async () => {
    try {
      await api.post('/sign-out');
      localStorage.removeItem('authToken');
    } catch (error) {
      throw error;
    }
  };