import axios, { AxiosError, Method } from "axios";
import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  take,
  throwError,
} from "rxjs";
import { API_ENDPOINT } from "./config";
import tokenHelper from "./helper/token";

class Api {
  public get<T>(url: string, params?: unknown): Observable<T> {
    return this.request<T>("GET", url, params).pipe(
      map(({ response }) => response)
    );
  }

  public post<T>(url: string, body?: unknown): Observable<T> {
    return this.request<T>("POST", url, body).pipe(
      map(({ response }) => response)
    );
  }

  private getToken() {
    return tokenHelper.getToken();
  }

  private request<T>(
    method: Method,
    url: string,
    data: unknown
  ): Observable<{ response: T }> {
    return of(true).pipe(
      switchMap(this.getToken),
      take(1),
      map((token) => ({
        Authorization: `Bearer ${token}`,
      })),
      switchMap((headers) => {
        return axios.request({
          baseURL: API_ENDPOINT,
          url,
          method,
          timeout: 30000,
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          params: method === "GET" ? data : null,
          data: method !== "GET" ? data : null,
        });
      }),
      map((res) => ({ response: res.data })),
      catchError((err) =>
        throwError(() => {
          if (!err.response) {
            return "Error connecting to server";
          }

          if (err instanceof AxiosError) {
            return err.response.data.message;
          }

          return "Unknown error";
        })
      )
    );
  }
}

const api = new Api();
export default api;
