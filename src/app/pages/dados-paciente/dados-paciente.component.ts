import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { PacienteService } from '../../services/paciente.service';
import { HttpResponse } from '@angular/common/http';
import { GoogleMapsService } from 'src/app/services/googlemaps.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Paciente } from 'src/app/models/Paciente';


@Component({
  selector: 'app-dados-paciente',
  templateUrl: './dados-paciente.component.html',
  styleUrls: ['./dados-paciente.component.scss']
})
export class DadosPacienteComponent implements OnInit {
  user: UserComponent = new UserComponent;
  busca: String;
  paciente: Paciente;
  pacientes: [Paciente];
  anamnese: {};
  formEndereco: FormGroup;
  formDadosPessoais: FormGroup;
  formDadosFinanceiros: FormGroup;
  zoom = 15;
  localizacao = '';
  lat = -23.5503099;
  lng = -46.6342009;


  constructor(private pacienteService: PacienteService, private _formBuilder: FormBuilder, private googleMaps: GoogleMapsService) {
  }

  ngOnInit() {
    if (this.user.isNutri()) {
      this.pacienteService.listar()
    .subscribe((resposta: any) => {
      this.pacientes = resposta.pacientes;
      this.selecionaPaciente(resposta.pacientes[0]);
    });
    } else {
      this.pacienteService.selecionar(this.user.id)
      .subscribe((resposta: Paciente) => {
        this.paciente = resposta;
      });
    }
  }


  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.pacientes.name.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )

  selecionaPaciente (paciente: any) {
    this.paciente = null;
    this.pacienteService.selecionar(paciente._id)
    .subscribe((resposta: Paciente) => {
      this.paciente = resposta;
      this.pesquisarEndereco();
    });

  }
  pesquisarEndereco() {
    this.googleMaps.pesquisar(this.paciente.dadosPaciente.endereco)
    .subscribe((resposta: HttpResponse<UserComponent>) => {
      this.atualizarEndereco(resposta);

    });
  }
  atualizarEndereco(dados) {
    if ( dados.status === 'OK' && dados.results[0]) {
      this.paciente.dadosPaciente.endereco = dados.results[0].formatted_address;
      this.localizacao = dados.results[0].formatted_address;
      this.paciente.dadosPaciente.lat = dados.results[0].geometry.location.lat;
      this.lat = dados.results[0].geometry.location.lat;
      this.paciente.dadosPaciente.lng = dados.results[0].geometry.location.lng;
      this.lng = dados.results[0].geometry.location.lng;
    }
  }
  atualizar() {
    this.pacienteService.atualizar(this.paciente)
    .subscribe((resposta: Paciente) => {
      console.log(resposta);
    });
  }
  remover(id) {
    this.pacienteService.apagar(id)
    .subscribe((resposta) => {
      console.log(resposta);
    });
  }


}
