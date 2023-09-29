import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
export const API_BASE_URL = "https://api.coinranking.com/v2";

type Instance = {
  baseApiInstance: AxiosInstance;
};

const requestHandler = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  config.headers["x-access-token"] = "coinrankingbe4ebc3c48e03966ff74d7a83a461d7c5b774f780a3dca97"
  return config;
};

const responseHandler = (data: any) => {
  return data;
};

const errorHandler = (error: any) => {
  console.log(error)
  return Promise.reject(error);
};

const instances: Instance = {
  baseApiInstance: axios.create({
      baseURL: API_BASE_URL,
  }),
};

Object.keys(instances).forEach(i => {
  instances[i as keyof Instance].interceptors.request.use(
    requestHandler,
    errorHandler
  );
  instances[i as keyof Instance].interceptors.response.use(
    responseHandler,
    errorHandler
  );
});

export { instances };
