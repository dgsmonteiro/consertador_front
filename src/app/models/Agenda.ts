import { Agendamento } from './Agendamento';

export class Agenda {
      _id: string;
      userId: string;
      servicoId: string;
      inicio: Date;
      fim: Date;
      horaInicio: string;
      horaFim: string;
      endereco: string;
      tempoAtendimento: number;
      valor: string;
      formaPagamento: {
        dinheiro: Boolean;
        pagSeguro: Boolean;
      };
      agendamentos: Agendamento[];
      data: Date;
      minutos: number;
      hora: number;
  }
