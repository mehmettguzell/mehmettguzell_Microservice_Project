export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  data: ApiErrorData;
}

export interface ApiErrorData {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
}
