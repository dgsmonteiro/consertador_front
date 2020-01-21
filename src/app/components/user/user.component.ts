import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  autenticate: boolean;
  id: number;
  name: String;
  cpf: number;
  email: String;
  accountType: number;
  createdAt: Date;
  token: String;


  constructor() {
    if (sessionStorage.getItem('currentUser')) {
      this.login(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }


  ngOnInit() {

  }

  login(data) {
    this.id = data.user._id;
    this.name = data.user.name;
    this.cpf = data.user.cpf;
    this.email = data.user.email;
    this.accountType = data.user.accountType;
    this.createdAt = data.user.createdAt;
    this.token = this.token;
    this.autenticate = true;
  }
  isAutenticate () {
    return this.autenticate;
  }
  isPaciente() {
    if (this.accountType === 1) {
      return true;
    } else {
      return false;
    }
  }
  isNutri() {
    if (this.accountType === 2) {
      return true;
    } else {
      return false;
    }
  }
  logoff() {
      sessionStorage.removeItem('currentUser');
      this.id = null;
      this.name = null;
      this.cpf = null;
      this.email = null;
      this.createdAt = null;
      this.accountType = null;
      this.token = null;
      this.autenticate = false;
      window.location.href = '/';
    }
}
