import { isAxiosError } from 'axios';
import { ApiResponse } from './interfaces/api-response.interface';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const DEFAULT_MESSAGE = 'Ocurrió un error inesperado.';

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (isAxiosError<ApiResponse<null>>(error)) {
    if (!error.response) {
      return new ApiError(
        error.code === 'ECONNABORTED'
          ? 'La solicitud tardó demasiado. Intenta de nuevo.'
          : 'No se pudo conectar con el servidor.',
      );
    }

    const { status, data } = error.response;
    return new ApiError(data?.message || DEFAULT_MESSAGE, status);
  }

  return new ApiError(DEFAULT_MESSAGE);
};