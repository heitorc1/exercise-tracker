import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from "./config";

export const api = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 30000,
});

export const get = (url: string, config: AxiosRequestConfig = {}) => {
  return api.get(url, config);
};
