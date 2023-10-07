// get method with interfaces and types using fetch

import { IGet, IGetResponse } from "./interfaces";

export const get: IGet = async (url: string): Promise<IGetResponse> => {
  try {
    const response = await fetch(url as string);
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw new Error(error as string);
  }
};
