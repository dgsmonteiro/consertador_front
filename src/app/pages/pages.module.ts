import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { HeaderModule } from '../components/header/header.module';
import { FooterModule } from '../components/footer/footer.module';
import { AppRoutingModule } from '../app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AboutComponent } from './about/about.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { DadosPacienteComponent } from './dados-paciente/dados-paciente.component';
import { MenuModule } from '../components/menu/menu.module';
import { CalendarModule, CalendarCommonModule, DateAdapter} from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import { NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';


import ptBr from '@angular/common/locales/pt';
import { MatNativeDateModule, MatStepperModule, MatCheckboxModule, MatAutocompleteModule, MatDialogModule,
  MatSnackBarModule,
  MatButtonToggleModule} from '@angular/material';
import { AbrirAgendaComponent } from './abrir-agenda/abrir-agenda.component';
import { ServicosComponent } from './servicos/servicos.component';

registerLocaleData(ptBr);



@NgModule({
  imports: [
    NgbModalModule,
    NgbTypeaheadModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarCommonModule,
    CalendarModule,
    NgxMaterialTimepickerModule,
    FlatpickrModule.forRoot({locale: ptBr}),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CommonModule,
    FooterModule,
    HeaderModule,
    MenuModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDfPbNnfE5ktwmYBMuI_S7jH04khiAQomM'})
  ],
  declarations: [
    HomeComponent,
    Page404Component,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    AboutComponent,
    AgendaComponent,
    DadosPacienteComponent,
    AgendamentoComponent,
    AbrirAgendaComponent,
    ServicosComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }, MatDatepickerModule],
  entryComponents: []
})
export class PagesModule { }
