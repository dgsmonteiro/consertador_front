import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserComponent } from 'src/app/components/user/user.component';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formLogin: FormGroup;
  currentUser: UserComponent;
  user: User;
  token: string;



  constructor(private formBuilder: FormBuilder, private rota: ActivatedRoute, private router: Router, private authService: AuthService,
    private _snackBar: MatSnackBar) {

    this.currentUser = new UserComponent();

    this.formLogin = formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required],
      retryPassword : ['', Validators.required]
      });

  }

  ngOnInit() {
    this.rota.params.subscribe((token) => {
      this.token = token.token;
    });
  }

  login () {
    if (this.formLogin.valid) {
      this.authService.resetPassword(this.token, this.formLogin.controls.email.value, this.formLogin.controls.password.value)
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
