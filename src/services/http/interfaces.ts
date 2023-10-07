export interface IGetResponse {
  data: unknown;
  status: number;
}

export interface IGet {
  (url: string): Promise<IGetResponse>;
}

export interface IGetError {
  message: string;
}
