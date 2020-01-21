import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  nova(agenda) {
    return this.http.post<any>(`${environment.apiUrl}/agenda/nova`, agenda)
        .pipe(map(pacientes => {
            // login successful if there's a jwt token in the response
            if (pacientes) {
                console.log(JSON.stringify(pacientes));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }

            return pacientes;
        }));
  }
  agendar(parametros) {
    return this.http.post<any>(`${environment.apiUrl}/agendamento/agendar`, parametros)
        .pipe(map(pacientes => {
            // login successful if there's a jwt token in the response
            if (pacientes) {
                console.log(JSON.stringify(pacientes));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }

            return pacientes;
        }));
  }
  listar() {
    return this.http.get<any>(`${environment.apiUrl}/agenda`)
        .pipe(map(agendas => {
            // login successful if there's a jwt token in the response
            if (agendas) {
                console.log(JSON.stringify(agendas));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
            return agendas;
        }));
  }
  meusAgendamentos() {
    return this.http.get<any>(`${environment.apiUrl}/agendamento/meus-agendamentos`)
        .pipe(map(agendamentos => {
            // login successful if there's a jwt token in the response
            if (agendamentos) {
                console.log(JSON.stringify(agendamentos));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
            return agendamentos;
        }));
  }
  atualizar(paciente) {
  return this.http.put<any>(`${environment.apiUrl}/pacientes/atualizar?userId=${paciente.dadosPaciente.userId}`, paciente)
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
  return this.http.delete<any>(`${environment.apiUrl}/agenda/apagar?agendaId=${id}`)
        .pipe(map(pacienteParam => {
            // login successful if there's a jwt token in the response
            if (pacienteParam) {
                console.log(JSON.stringify(pacienteParam));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
            return pacienteParam;
        }));
  }
  apagarAgendamento(id) {
  return this.http.delete<any>(`${environment.apiUrl}/agendamento/apagar?agendamentoId=${id}`)
        .pipe(map(pacienteParam => {
            // login successful if there's a jwt token in the response
            if (pacienteParam) {
                console.log(JSON.stringify(pacienteParam));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
            return pacienteParam;
        }));
  }
  diasDisponiveis(inicio, fim) {
    return this.http.get<any>(`${environment.apiUrl}/agendamento/dias-disponiveis?inicio=${inicio}&fim=${fim}`)
    .pipe(map(agendas => {
        // login successful if there's a jwt token in the response
        if (agendas) {
            console.log(JSON.stringify(agendas));
            // store user details and jwt token in local storage to keep user logged in between page refreshes
        }
        return agendas;
    }));
  }
  agendasDisponiveis(dia) {
    return this.http.get<any>(`${environment.apiUrl}/agendamento/agendas-disponiveis?dia=${dia}`)
    .pipe(map(agendas => {
        // login successful if there's a jwt token in the response
        if (agendas) {
            console.log(JSON.stringify(agendas));
            // store user details and jwt token in local storage to keep user logged in between page refreshes
        }
        return agendas;
    }));
  }
}
