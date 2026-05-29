import axios from 'axios';

// Physical device (Expo Go): use your machine's LAN IP
// Run `ipconfig` on Windows → IPv4 Address under your WiFi adapter
const BASE_URL = 'http://192.168.1.65:8000/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default axiosInstance;
