import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: UserComponent;
  userMenu: string[] = ['Login', 'Ajuda'];

  constructor() {
    this.user = new UserComponent;
  }

  ngOnInit() {
    console.log('user', this.user);
    console.log('user', JSON.stringify(this.user));
  }

}
