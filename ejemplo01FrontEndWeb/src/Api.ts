import axios, { AxiosError } from "axios";
import { PostLoginS, PostRegisterS, PostBodyStructure, PutBodyStructure, PatchBodyStructure } from "./Interfaces";


// 1 Backend base URL
const BACKEND_URL = "https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1";

// 2 Generic error handler
function handleError(error: AxiosError): void {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Unexpected error:", error.message);
    }
}

// 3 FUNCIONES ADAPTADAS
export async function PostRegisterF(postBody: PostRegisterS): Promise<any> {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, postBody);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
}

export async function PostLoginF(postBody: PostLoginS): Promise<any> {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, postBody);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
}

export async function GetItem(id:number): Promise<any> {
    try {
      const response = await axios.get(`${BACKEND_URL}/item/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      handleError(error);
    }
}

export async function GetItemsPaginacion(limit: number, lastKey?: string): Promise<any> {
    try {
      // Construye la URL con los parámetros de consulta (query parameters)
      const url = `${BACKEND_URL}/items?limit=${limit}${lastKey ? `&lastKey=${lastKey}` : ''}`;
      
      const response = await axios.get(url);
      console.log(response.data);
      
      // Retorna los datos obtenidos
      return response.data;
    } catch (error: any) {
      // Maneja los errores llamando a tu función handleError
      handleError(error);
    }
}
  


//FUNCIONES DE EJEMPLO



// GET FOR AXIOS - EXAMPLE
export async function axiosGet(): Promise<any> {
  try {
    const response = await axios.get(`${BACKEND_URL}/posts`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

// POST FOR AXIOS - EXAMPLE

export async function axiosPost(postBody: PostBodyStructure): Promise<any> {
  try {
    const response = await axios.post(`${BACKEND_URL}/posts`, postBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

// PUT FOR AXIOS - EXAMPLE

export async function axiosPut(id: number, putBody: PutBodyStructure): Promise<any> {
  try {
    const response = await axios.put(`${BACKEND_URL}/posts/${id}`, putBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

// DELETE FOR AXIOS - EXAMPLE
export async function axiosDelete(id: number): Promise<any> {
  try {
    const response = await axios.delete(`${BACKEND_URL}/posts/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

// PATCH FOR AXIOS - EXAMPLE

export async function axiosPatch(id: number, patchBody: PatchBodyStructure): Promise<any> {
  try {
    const response = await axios.patch(`${BACKEND_URL}/posts/${id}`, patchBody);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}
