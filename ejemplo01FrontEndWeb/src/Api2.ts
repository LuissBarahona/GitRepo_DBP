//Api con token 

import axios, { AxiosError } from "axios";
import useToken from "../hooks/useToken";
import {
  PostLoginS,
  PostRegisterS,
  PostBodyStructure,
  PutBodyStructure,
  PatchBodyStructure,
} from "./Interfaces";

// 1 Backend base URL
const BACKEND_URL = "https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1";

// 2 Token handler
const { getToken } = useToken();

// 3 Axios instance with interceptor
const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

// Interceptor to include Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4 Generic error handler
function handleError(error: AxiosError): void {
  if (error.response) {
    console.error("Response error:", error.response.data);
  } else if (error.request) {
    console.error("Request error:", error.request);
  } else {
    console.error("Unexpected error:", error.message);
  }
}

// 5 API functions with authentication
export async function PostRegisterF(postBody: PostRegisterS): Promise<any> {
  try {
    const response = await apiClient.post("/auth/register", postBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function PostLoginF(postBody: PostLoginS): Promise<any> {
  try {
    const response = await apiClient.post("/auth/login", postBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function GetItem(id: number): Promise<any> {
  try {
    const response = await apiClient.get(`/item/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function GetItemsPaginacion(
  limit: number,
  lastKey?: string
): Promise<any> {
  try {
    const url = `/items?limit=${limit}${lastKey ? `&lastKey=${lastKey}` : ""}`;
    const response = await apiClient.get(url);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

// 6 Example functions
export async function axiosGet(): Promise<any> {
  try {
    const response = await apiClient.get("/posts");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function axiosPost(postBody: PostBodyStructure): Promise<any> {
  try {
    const response = await apiClient.post("/posts", postBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function axiosPut(
  id: number,
  putBody: PutBodyStructure
): Promise<any> {
  try {
    const response = await apiClient.put(`/posts/${id}`, putBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function axiosDelete(id: number): Promise<any> {
  try {
    const response = await apiClient.delete(`/posts/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export async function axiosPatch(
  id: number,
  patchBody: PatchBodyStructure
): Promise<any> {
  try {
    const response = await apiClient.patch(`/posts/${id}`, patchBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}
