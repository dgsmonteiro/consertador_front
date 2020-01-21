import { Component, OnInit, Renderer2 } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Agenda } from '../../models/Agenda';
import { addHours, addMinutes } from 'date-fns';
import { ServicoService } from 'src/app/services/servico.service';
import { Agendamento } from 'src/app/models/Agendamento';
import { NumberValueAccessor } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserComponent } from 'src/app/components/user/user.component';
import { MatSnackBar } from '@angular/material';

export interface ServicosDisponiveis {
  name: string;
  _id: string;
  agendamentos: Agendamento[];
}
export interface Servico {
  name: string;
  _id: string;
  valor: number;
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  user: UserComponent = new UserComponent();
  minDate = new Date();
  maxDate = new Date(2020, 1, 1);
  valorConsulta: number;
  servico: string;
  dataSelecionada: Date;
  servicos: [{_id: string, name: string, tempoAtendimento: string}];
  horarios = [];
  agendasDoMes: {
    mes: Date;
    agendas: Agenda[];
  };
  agendamentos: Agendamento[];
  agendamento: Agendamento;
  agenda: Agenda;
  agendas: Agenda[];
  horarioSelecionado: {hora: Date, agenda: string};
  servicosDisponiveis: ServicosDisponiveis[];
  localizacao = '';
  lat = -23.5503099;
  lng = -46.6342009;
  zoom = 15;


  constructor(private agendaService: AgendaService, private authService: AuthService,
    private renderer: Renderer2, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.agendasDoMes = {mes: new Date(), agendas: new Array()};
    // this.agendaService.listar()
    //   .subscribe((dados: any) => {
    //     if (dados.agendas.length > 0) {
    //       const agendas: Agenda[] = dados.agendas;
    //       for (const agenda of agendas) {
    //           this.agendasDoMes.agendas.push(agenda);
    //       }
    //     }
    // });
    this.authService.listarServicos()
    .subscribe(resposta => {
      this.servicos = resposta.servicos;
    });
    this.agenda = new Agenda();
    this.agendamento = new Agendamento();
  }



  diasDisponiveis = (d: Date): boolean => {
    let retorno = false;
    if (!this.agendasDoMes) {
        this.agendasDoMes = {mes: new Date(), agendas: new Array()};
    } else if (this.agendasDoMes.mes.getMonth() !== d.getMonth()) {
          this.agendasDoMes.mes = d;
          this.agendaService.listar()
            .subscribe((dados: any) => {
              if (dados.agendas.length > 0) {
                const agendas: Agenda[] = dados.agendas;
                for (const agenda of agendas) {
                  console.log(this.agendasDoMes.agendas.indexOf(agenda));
                  if (this.agendasDoMes.agendas.indexOf(agenda) > 0 ) {
                    this.agendasDoMes.agendas.push(agenda);
                  }
                }
              }
          });
       } else if (this.agendasDoMes.agendas.length > 0) {
          for (const agenda of this.agendasDoMes.agendas) {
            this.agenda = agenda;
            if (new Date(this.agenda.inicio) < d && new Date(this.agenda.fim) > d) {
              retorno = true;
            }
          }
        }
        return retorno;
      }
  consultaAgendaDoMes (inicio: Date): any {
    this.agendasDoMes = {mes: null, agendas: new Array()};
    this.agendasDoMes.mes = inicio;
    const fim = new Date(inicio.getFullYear(), inicio.getMonth() + 1, 0);
    this.agendaService.listar()
    .subscribe((dados: any) => {
      if (dados.agendas.length > 0) {
        const agendas: Agenda[] = dados.agendas;
        for (const agenda of agendas) {
            this.agendasDoMes.agendas.push(agenda);
        }
      }
    });
  }

  selecionarDia($event: MatDatepickerInputEvent<Date>) {
    this.dataSelecionada = new Date($event.value);
    for (const agenda of this.agendas) {
      this.agenda = agenda;
      if (this.agenda.servicoId) {
        if (this.agenda.agendamentos.length > 0) {
          let horario: Date = new Date(this.dataSelecionada);
          const fimDoDia: Date = new Date(this.dataSelecionada);
          // tslint:disable-next-line:radix
          horario.setHours(parseInt(this.agenda.horaInicio.split(':')[0]), parseInt(this.agenda.horaInicio.split(':')[1]));
          // tslint:disable-next-line:radix
          fimDoDia.setHours(parseInt(this.agenda.horaFim.split(':')[0]), parseInt(this.agenda.horaFim.split(':')[1]));
          while (horario < fimDoDia ) {
            let livre = true;
              for (const agendamento of this.agenda.agendamentos) {
              this.agendamento = agendamento;
              const horarioFim = addMinutes(horario, this.agenda.tempoAtendimento);
              const agendamentoInicio = new Date(this.agendamento.data);
              agendamentoInicio.setHours(this.agendamento.hora);
              agendamentoInicio.setMinutes(this.agendamento.minutos);
              const agendamentoFim = addMinutes(agendamentoInicio, this.agenda.tempoAtendimento);

              if ((horario < agendamentoFim ||
                  horarioFim < agendamentoInicio) &&
                  (agendamentoFim < horario ||
                  agendamentoInicio < horarioFim)) {
                    livre = false;
              }
            }
            if (livre) {
            this.horarios.push({hora: horario, agenda: this.agenda._id, valor: this.agenda.valor, userId: this.agenda.userId});
            }
            horario = addMinutes(horario, this.agenda.tempoAtendimento + 10);
          }
        } else {
          let horario: Date = new Date(this.dataSelecionada);
          const fimDoDia: Date = new Date(this.dataSelecionada);
          // tslint:disable-next-line:radix
          horario.setHours(parseInt(this.agenda.horaInicio.split(':')[0]), parseInt(this.agenda.horaInicio.split(':')[1]));
          // tslint:disable-next-line:radix
          fimDoDia.setHours(parseInt(this.agenda.horaFim.split(':')[0]), parseInt(this.agenda.horaInicio.split(':')[1]));
          while (horario < fimDoDia ) {
            this.horarios.push({hora: horario, agenda: this.agenda._id});
            horario = addMinutes(horario, this.agenda.tempoAtendimento + 10);
          }
        }
      }
    }
  }

  agendar() {
    const servicoSelecionado = this.servicos.filter((item) => {
      if (item._id === this.servico) {
        return item;
      }
    });
    const parametros = {
      data: this.horarioSelecionado.hora,
      hora: this.horarioSelecionado.hora.getHours() ,
      minutos: this.horarioSelecionado.hora.getMinutes(),
      agendaId: this.horarioSelecionado.agenda,
      servicoId: this.servico,
      servico: servicoSelecionado[0].name,
      // tslint:disable-next-line
      tempoAtendimento: parseInt(servicoSelecionado[0].tempoAtendimento)
    };
    if (this.user.isAutenticate()) {
      this.agendaService.agendar(parametros)
    .subscribe(retorno => {
      this._snackBar.open(`Consulta agendada para ${retorno.data}`, 'Fechar', {
        duration: 5000
      });
      location.assign('/');
    });
    } else {
      location.assign('/login');
    }
  }
  selecionaServico(idServico) {
    this.authService.listarAgendas(idServico)
    .subscribe((dados) => {
      this.agendas = dados.agendas;
      this.agendasDoMes.agendas = dados.agendas;
      this.agendasDoMes.mes = new Date();
    });
    this.dataSelecionada = null;
    this.horarioSelecionado = null;
    this.horarios = [];
    this.valorConsulta = null;
  }

}
