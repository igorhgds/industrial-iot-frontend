export interface ValidationError {
   readonly field: string;
   readonly message: string;
}

export interface ApiErrorResponse {
   readonly status: number;
   readonly error: string;
   readonly message: string;
   readonly path: string;
   readonly timestamp: string;
   readonly validationErrors?: ValidationError[];
}