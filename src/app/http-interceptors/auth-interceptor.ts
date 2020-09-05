import { Injectable } from '@angular/core';
import { AccountService } from './../shared/account.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private accountService: AccountService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.accountService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if(token && !this.accountService.isTokenExpired(token)) {
            // O request é imutavel, ou seja, não é possível mudar nada
            // Faço o clone para conseguir mudar as propriedades
            // Passo o token de autenticação do header
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        // retorno o request com o erro tratado
        return next.handle(request).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if(error.error instanceof ErrorEvent) {
            // Erro de Client-side ou de rede
            console.error('Ocorreu um erro:', error.error.message);
        } else {
            // Erro retornando pelo backend
            console.error(
                `Código de erro ${error.status}, ` +
                `Erro: ${JSON.stringify(error.error)}`);
        }

        return throwError('Ocorreu um erro, tente novamente');
    }
}
