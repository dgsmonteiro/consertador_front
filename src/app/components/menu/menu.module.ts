import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule,
  MatTabsModule, MatListModule, MatCardModule, MatDividerModule, MatInputModule} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
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
    RouterModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
