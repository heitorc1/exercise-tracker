import axios, { AxiosInstance } from "axios";
import { API_ENDPOINT } from "./config";
import { Response } from "./interfaces";

class Api {
  private _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = localStorage.getItem("token");
    if (token) {
      this._instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async get<T>(url: string, params?: any): Promise<Response<T>> {
    const response = await this._instance.get(url, params);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post<T>(url: string, body?: any): Promise<Response<T>> {
    const response = await this._instance.post(url, body);
    return response.data;
  }

  public get instance() {
    return this._instance;
  }
}

const api = new Api();
export default api;
