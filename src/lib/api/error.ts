import { isAxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public messages: string[] = [message],
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (isAxiosError(error)) {
    if (!error.response) {
      return new ApiError(
        error.code === 'ECONNABORTED'
          ? 'La solicitud tardó demasiado. Intenta de nuevo.'
          : 'No se pudo conectar con el servidor.',
      );
    }

    const { status, data } = error.response;
    const raw = data?.message;
    const messages: string[] = Array.isArray(raw)
      ? raw
      : raw
        ? [String(raw)]
        : ['Ocurrió un error inesperado.'];

    return new ApiError(messages[0], status, messages);
  }

  return new ApiError('Ocurrió un error inesperado.');
};