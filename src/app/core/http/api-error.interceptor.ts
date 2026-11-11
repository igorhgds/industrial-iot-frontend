import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiErrorResponse } from '../models/api-error.model';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  // 'next(req)' repassa a requisição para a frente (como filterChain.doFilter no Spring)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let userFriendlyMessage = 'Ocorreu um erro inesperado na comunicação com o servidor.';

      if (error.status === 0) {
        // Status 0 significa que o backend está fora do ar ou houve bloqueio de CORS / rede
        userFriendlyMessage = 'Servidor inacessível. Verifique se o backend Spring Boot está ativo.';
        console.error('🚨 [HTTP 0] Falha de conexão de rede ou servidor offline.');
      } else {
        // Erro retornado pelo Spring Boot (400, 404, 422, 500...)
        const apiError = error.error as ApiErrorResponse | null;
        if (apiError?.message) {
          userFriendlyMessage = apiError.message;
        }
        console.error(`🚨 [HTTP ${error.status}] ${error.url}:`, apiError ?? error.message);
      }

      // Relança o erro com a mensagem amigável para que o componente/serviço que chamou possa tratar se quiser
      return throwError(() => ({
        originalError: error,
        message: userFriendlyMessage,
        apiError: error.error as ApiErrorResponse | null
      }));
    })
  );
};