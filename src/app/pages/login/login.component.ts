import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComponent } from 'src/app/components/user/user.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { HttpResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  currentUser: UserComponent;
  user: User;


  constructor(private formBuilder: FormBuilder, private rota: ActivatedRoute, private router: Router, private authService: AuthService,
    private _snackBar: MatSnackBar) {
    this.currentUser = new UserComponent();

    this.formLogin = formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
      });

  }

  ngOnInit() {
  }

  login () {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.controls.email.value, this.formLogin.controls.password.value)
        .subscribe((resposta: HttpResponse<UserComponent>) => {
          this.currentUser.login(resposta);
          this.router.navigate(['/']);
          console.log('user:', this.user);
        }, (error) => {
          this._snackBar.open(`${error.error.error}`, 'Fechar', {
            duration: 2000
          });
        });
    }
  }

}
