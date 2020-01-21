import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';
import { LogoutInterceptor } from './services/interceptors/logout.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
