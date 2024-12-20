import axios from 'axios'
import { ref } from 'vue'

export async function apiToServer(api: string, method: string, data: any = null) {
  const result = ref<any>(null);

  try {
    const config = {
      method: method.toUpperCase(),
      url: api,
      data: data || {},
    };

    const response = await axios(config);
    result.value = response;

  } catch (error: any) {
    alert('Error');
    result.value = [];
  }

  return result.value;
}


export const api = "http://localhost:8080"
export const apiEmployee = "/premises"
