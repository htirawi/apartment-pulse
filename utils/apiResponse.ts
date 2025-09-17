export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export class ApiResponseBuilder {
  static success<T>(data: T, message?: string): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static error(
    error: string,
    status: number = 500,
    data?: any
  ): Response {
    const response: ApiResponse = {
      success: false,
      error,
      data,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static badRequest(error: string, data?: any): Response {
    return this.error(error, 400, data);
  }

  static unauthorized(error: string = 'Unauthorized'): Response {
    return this.error(error, 401);
  }

  static forbidden(error: string = 'Forbidden'): Response {
    return this.error(error, 403);
  }

  static notFound(error: string = 'Resource not found'): Response {
    return this.error(error, 404);
  }

  static internalServerError(error: string = 'Internal Server Error'): Response {
    return this.error(error, 500);
  }
}

// Helper function for consistent error handling
export const handleApiError = (error: any): Response => {
  console.error('API Error:', error);
  
  if (error.name === 'ValidationError') {
    return ApiResponseBuilder.badRequest('Validation failed', error.errors);
  }
  
  if (error.name === 'CastError') {
    return ApiResponseBuilder.badRequest('Invalid ID format');
  }
  
  if (error.code === 11000) {
    return ApiResponseBuilder.badRequest('Duplicate entry');
  }
  
  return ApiResponseBuilder.internalServerError();
};
