import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) {
  }

 listar() {
   return this.http.get<any>(`${environment.apiUrl}/servico`)
       .pipe(map(servicos => {
           // login successful if there's a jwt token in the response
           if (servicos) {
               console.log(JSON.stringify(servicos));
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }

           return servicos;
       }));
}
 selecionar(id) {
   return this.http.get<any>(`${environment.apiUrl}/servico/selecionar?userId=${id}`)
       .pipe(map(paciente => {
           // login successful if there's a jwt token in the response
           if (paciente) {
               console.log(JSON.stringify(paciente));
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
           return paciente;
       }));
}
atualizar(paciente) {
 return this.http.put<any>(`${environment.apiUrl}/servicos/atualizar?userId=${paciente.dadosPaciente.userId}`, paciente)
       .pipe(map(pacienteParam => {
           // login successful if there's a jwt token in the response
           if (pacienteParam) {
               console.log(JSON.stringify(pacienteParam));
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
           return pacienteParam;
       }));
}
apagar(id) {
 return this.http.delete<any>(`${environment.apiUrl}/servico/apagar?userId=${id}`)
       .pipe(map(pacienteParam => {
           // login successful if there's a jwt token in the response
           if (pacienteParam) {
               console.log(JSON.stringify(pacienteParam));
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
           return pacienteParam;
       }));
}
adicionar(servico) {
  return this.http.post<any>(`${environment.apiUrl}/servico/novo`, servico)
      // tslint:disable-next-line:no-shadowed-variable
      .pipe(map(servico => {
          // login successful if there's a jwt token in the response
          if (servico) {
              console.log(JSON.stringify(servico));
              // store user details and jwt token in local storage to keep user logged in between page refreshes
          }

          return servico;
      }));
}
}
