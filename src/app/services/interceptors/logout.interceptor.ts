import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(res: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const resposta = res;
    console.log('RESPOSTA DO SERVIÇO: ', resposta);
    return next.handle(res);
  }
}
