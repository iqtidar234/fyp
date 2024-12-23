export interface ErrorType {
  error: {
    statusCode: number;
    status: string;
    isOperational: boolean;
  };
  message: string;
  stack: string;
  status: string;
}
