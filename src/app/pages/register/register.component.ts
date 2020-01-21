import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserComponent } from 'src/app/components/user/user.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  user: UserComponent;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.user = new UserComponent();

    this.formRegister = formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required],
      passwordRewrite : ['', Validators.required]
      });

   }

  ngOnInit() {
  }
  register() {
    if (this.formRegister.valid) {
      // tslint:disable-next-line:max-line-length
      this.authService.register(this.formRegister.controls.name.value, this.formRegister.controls.cpf.value, this.formRegister.controls.email.value, this.formRegister.controls.password.value)
      .subscribe((resposta: HttpResponse<UserComponent>) => {
        this.user.login(resposta);
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
