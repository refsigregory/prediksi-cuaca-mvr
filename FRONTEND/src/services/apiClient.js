import axios from "axios";
import { BASE_URL } from "../constants/api";

const baseApi = BASE_URL;

const instance = axios.create({
  baseURL: baseApi,
});

export const apiClient = instance;
