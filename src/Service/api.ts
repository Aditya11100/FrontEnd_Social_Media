import axios from "axios";
import { baseUrl } from "./url";

const instance = axios.create({ timeout: 30000 });

export class ApiConfig {
  /**
   * Function will return post result
   * @param data
   * @param URL
   * @returns promise
   */
  postJSON(data: object, URL: string, isFormData: boolean = false) {
    return new Promise((resolve, reject) => {
      instance({
        method: "POST",
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
        url: URL,
        data: data,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((ERROR) => {
          reject(ERROR);
        });
    });
  }

  /**
   * Function will return put result
   * @param URL
   * @returns promise
   */
  putJSON(params = {}, URL: string) {
    return new Promise((resolve, reject) => {
      instance({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        url: URL,
        data: params,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((ERROR) => {
          reject(ERROR);
        });
    });
  }

  /**
   * Function will return get result
   * @param URL
   * @returns promise
   */
  getJSON(URL: string) {
    return new Promise((resolve, reject) => {
      instance({
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        url: URL,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((ERROR) => {
          reject(ERROR);
        });
    });
  }

  /**
   * Function will return PATCH result
   * @param URL
   * @returns promise
   */
  patchJSON(params = {}, URL: string, formType = true) {
    return new Promise((resolve, reject) => {
      instance({
        method: "PATCH",
        headers: {
          "Content-Type": formType ? "multipart/form-data" : "application/json",
        },
        url: URL,
        data: params,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((ERROR) => {
          reject(ERROR);
        });
    });
  }

  /**
   * Function will return Delete result
   * @param URL
   * @returns promise
   */
  deleteJSON(params = {}, URL: string) {
    return new Promise((resolve, reject) => {
      instance({
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        url: URL,
        data: params,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((ERROR) => {
          reject(ERROR);
        });
    });
  }
}

export const setTokenHeader = (token: string) => {
  instance.defaults.headers.common["auth-token"] = token;
};
