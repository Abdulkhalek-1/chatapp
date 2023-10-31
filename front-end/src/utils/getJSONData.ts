import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

export async function getJSONData<T>(
  url: string,
  options: AxiosRequestConfig = {},
): Promise<T> {
  try {
    const response: AxiosResponse = await axios.get(url, options);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      `Error while fetching data: ${(error as AxiosError).message}`,
    );
  }
}
