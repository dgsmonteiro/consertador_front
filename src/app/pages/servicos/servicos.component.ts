import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/components/user/user.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GoogleMapsService } from 'src/app/services/googlemaps.service';
import { HttpResponse } from '@angular/common/http';
import { ServicoService } from 'src/app/services/servico.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {
  user: UserComponent = new UserComponent;
  busca: String;
  formEndereco: FormGroup;
  formDadosPessoais: FormGroup;
  formDadosFinanceiros: FormGroup;
  zoom = 15;
  servico: {
    endereco: String,
    lat: Number,
    lng: Number,
    name: String,
    descricao: String,
    instrucao: String,
    tempoAtendimento: Number,
    valor: Number,
    formaPagamento: {dinheiro: Boolean, pagSeguro: Boolean}
  };
  servicos: [];
  tempoAtendimento: Number;
  instrucao: String;
  descricao: String;
  name: String;
  endereco: String;
  valor: Number;
  dinheiro: Boolean;
  pagSeguro: Boolean;
  lat: Number;
  lng: Number;


  constructor(private servicoService: ServicoService, private _formBuilder: FormBuilder, private googleMaps: GoogleMapsService) {
  }

  ngOnInit() {

    this.servicoService.listar()
    .subscribe((resposta: any) => {
      this.servicos = resposta.servicos;
    });

  }


  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.servicos.name.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )

  selecionaServico (servico: any) {
    this.servico = null;
    this.servicoService.selecionar(servico._id)
    .subscribe((resposta: any) => {
      this.servico = resposta.servico;
      this.name = resposta.servico.name;
      this.descricao = resposta.servico.descricao;
      this.instrucao = resposta.servico.instrucao;
      this.tempoAtendimento = resposta.servico.tempoAtendimento;
      this.endereco = resposta.servico.endereco;
      this.lat = resposta.servico.lat;
      this.lng = resposta.servico.lng;
      this.valor = resposta.servico.valor;
      this.dinheiro = resposta.servico.dinheiro;
      this.pagSeguro = resposta.servico.pagSeguro;

    });

  }
  pesquisarEndereco() {
    this.googleMaps.pesquisar(this.endereco)
    .subscribe((resposta: HttpResponse<UserComponent>) => {
      this.atualizarEndereco(resposta);

    });
  }
  atualizarEndereco(dados) {
    if ( dados.status === 'OK' && dados.results[0]) {
      this.endereco = dados.results[0].formatted_address;
      if (this.servico) {
        this.servico.endereco = dados.results[0].formatted_address;
        this.servico.lat = dados.results[0].geometry.location.lat;
        this.lat = dados.results[0].geometry.location.lat;
        this.servico.lng = dados.results[0].geometry.location.lng;
        this.lng = dados.results[0].geometry.location.lng;
      }
    }
  }
  atualizar() {
    this.servico = {
      name: this.name,
      descricao: this.descricao,
      instrucao: this.instrucao,
      tempoAtendimento: this.tempoAtendimento,
      endereco: this.endereco,
      lat: this.lat,
      lng: this.lng,
      valor: this.valor,
      formaPagamento: {dinheiro: this.dinheiro, pagSeguro: this.pagSeguro}
    };
    this.servicoService.atualizar(this.servico)
    .subscribe((resposta: any) => {
      console.log(resposta);
    });
  }
  remover(id) {
    this.servicoService.apagar(id)
    .subscribe((resposta) => {
      console.log(resposta);
    });
  }
  adicionar() {
    if (this.name && this.descricao && this.instrucao && this.tempoAtendimento) {
      this.servicoService.adicionar({
        name: this.name,
        descricao: this.descricao,
        instrucao: this.instrucao,
        tempoAtendimento: this.tempoAtendimento,
        endereco: this.endereco,
        valor: this.valor,
        formaPagamento: {dinheiro: this.dinheiro, pagSeguro: this.pagSeguro}

      }).subscribe((resposta: HttpResponse<UserComponent>) => {
      console.log(resposta);
      });
    }
  }
}
