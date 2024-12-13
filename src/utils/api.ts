import axios from 'axios'
import { inject, ref } from 'vue'

export async function apiToServer(api: string, method: string, data: any = null) {
  const result = ref<any>(null);

  try {
    const config = {
      method: method.toUpperCase(),
      url: api,
      data: data || {},
    };

    const response = await axios(config);
    result.value = response.data;
  } catch (error: any) {
    console.error('Error during API call:', error.message || error);
    result.value = error.response?.data || { message: 'Unknown error occurred' };
  }

  return result.value;
}


export const api = "http://localhost:8080"
export const apiEmployee = "/employee"
