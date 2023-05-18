import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

//const baseURL = "http://localhost:3000";
export default axios.create({
    baseURL: process.env.API_URL,
});