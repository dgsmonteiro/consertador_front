import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  user: UserComponent;
  userMenu: string[] = ['Login', 'Ajuda'];
  userLinks: string[] = ['Conta', 'Projetos', 'Recursos', 'Metas', 'Desafios', 'Resultados'];

  constructor() {

  }

  ngOnInit() {
  }

}
