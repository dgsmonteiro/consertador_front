import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EventManager } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requisicao = req.url.split('/');
    if (requisicao[3] !== `auth` && requisicao[1] !== `auth`) {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!user) {
          this.router.navigate(['login']);
        }
        req = req.clone({
        setHeaders: {
            'Authorization': `Bearer ${user.token}`
        }
    });
    }
    return next.handle(req);
  }
  responseIntercept (res: HttpResponse<any>, next: HttpHandler) {
    const resposta = res.body;
    console.log('TESTE TESTE', resposta);

  }


}
