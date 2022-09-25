interface IApiResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
