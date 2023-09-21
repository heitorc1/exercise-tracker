import axios from "axios";
import { API_ENDPOINT } from "./config";

export const api = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 30000,
});

export const get = (url: string, params?: any) => {
  return api.get(url, params);
};

export const post = (url: string, body?: any) => {
  return api.post(url, body);
};
