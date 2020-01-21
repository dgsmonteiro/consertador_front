import { Component, OnInit, Inject } from '@angular/core';
import { UserComponent } from 'src/app/components/user/user.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GoogleMapsService } from 'src/app/services/googlemaps.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgendaService } from 'src/app/services/agenda.service';
import { ThrowStmt } from '@angular/compiler';
import { ServicoService } from 'src/app/services/servico.service';
import { MatSnackBar } from '@angular/material';

export interface DadosServico {
  name: string;
  descricao: string;
  valor: Number;
}

@Component({
  selector: 'app-abrir-agenda',
  templateUrl: './abrir-agenda.component.html',
  styleUrls: ['./abrir-agenda.component.scss']
})
export class AbrirAgendaComponent implements OnInit {

  passo1: FormGroup;
  passo2: FormGroup;
  passo3: FormGroup;
  passo4: FormGroup;

  user: UserComponent = new UserComponent;

  minDate = new Date();
  maxDate = new Date(2020, 0, 1);
  valorConsulta = 150;
  pagseguro = false;
  dinheiro = true;
  horarios = {
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: false,
    domingo: false
  };


  localizacao = '';
  lat = -23.5503099;
  lng = -46.6342009;
  zoom = 15;
  servicos: { name: string; descricao: string; valor: number; }[];
  novoServico: DadosServico;

  constructor(private _formBuilder: FormBuilder, private googleMaps: GoogleMapsService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private agendaService: AgendaService, private servicoService: ServicoService) { }

  ngOnInit() {
    this.passo1 = this._formBuilder.group({
      servico: ['', Validators.required],
      tempoServico: ['']
    });
    this.passo2 = this._formBuilder.group({
      minDate: [''],
      maxDate: [''],
      horarioSelecionado: [''],
      horaInicio: [''],
      horaFim: [''],
      segunda: [true],
      terca: [true],
      quarta: [true],
      quinta: [true],
      sexta: [true],
      sabado: [false],
      domingo: [false]
    });
    this.passo3 = this._formBuilder.group({
      localizacao: ['', Validators.required]
    });
    this.passo4 = this._formBuilder.group({
      valorConsulta: ['', Validators.required],
      dinheiro: [true],
      pagseguro: [true]
    });

    this.servicoService.listar()
    .subscribe(resposta => {
      this.servicos = resposta.servicos;
    }, (error) => {
      this._snackBar.open(`${error.error.error}`, 'Fechar', {
        duration: 2000
      });
    });
  }

  diasDisponiveis = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;
  }

  pesquisarEndereco () {
    this.googleMaps.pesquisar(this.passo3.value.localizacao)
    .subscribe((resposta: HttpResponse<UserComponent>) => {
      this.atualizarEndereco(resposta);

    }, (error) => {
      this._snackBar.open(`${error.error.error}`, 'Fechar', {
        duration: 2000
      });
    });
  }
  atualizarEndereco(dados) {
    if ( dados.status === 'OK' && dados.results[0]) {
      this.localizacao = dados.results[0].formatted_address;
      this.lat = dados.results[0].geometry.location.lat;
      this.lng = dados.results[0].geometry.location.lng;
    }
  }
  selecionaServico() {
    this.servicoService.selecionar(this.passo1.value.servico)
    .subscribe(resposta => {
      this.novoServico = {
        valor: resposta.servico.valor,
        name: resposta.servico.name,
        descricao: ''
      };
      this.passo1.value.tempoServico = resposta.servico.tempoAtendimento;
      this.passo1.value.valorConsulta = resposta.servico.valor;
    }, (error) => {
      this._snackBar.open(`${error.error.error}`, 'Fechar', {
        duration: 2000
      });
    });
  }
  abrirAgenda() {
    if (this.passo1.valid && this.passo2.valid && this.passo3.valid && this.passo4.valid) {
      this.agendaService.nova({
        user: this.user,
        userId: this.user.id,
        inicio: this.passo2.value.horarioSelecionado.from,
        fim: this.passo2.value.horarioSelecionado.to,
        horaInicio: this.passo2.value.horaInicio,
        horaFim: this.passo2.value.horaFim,
        servico: this.novoServico.name,
        servicoId: this.passo1.value.servico,
        tempoAtendimento: this.passo1.value.tempoServico,
        endereco: this.passo3.value.localizacao,
        valor: this.passo4.value.valorConsulta,
        formaPagamento: {dinheiro: this.passo4.value.dinheiro, pagseguro: this.passo4.value.pagseguro},

      }).subscribe((resposta: HttpResponse<UserComponent>) => {
      console.log(resposta);
      }, (error) => {
        this._snackBar.open(`${error.error.error}`, 'Fechar', {
          duration: 2000
        });
      });
    }
  }
}
