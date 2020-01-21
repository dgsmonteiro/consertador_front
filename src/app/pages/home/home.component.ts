import {
  Component, OnInit, ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import {
  PRESET_FORMS, PRESET_VALIDATORS, PRESET_FORMATTERS
} from '../../models/FormModal';
import { SelectionModel } from '@angular/cdk/collections';
import { AgendaService } from 'src/app/services/agenda.service';
import { isError } from 'util';

export interface DadosAgenda {
  fim: Date;
  inicio: Date;
  servico: string;
  valor: Number;
  _id: String;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserComponent = new UserComponent();
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);


  constructor(private agendaService: AgendaService) {

  }


  ngOnInit() {
    if (this.user.isNutri()) {
      this.agendaService.listar()
      .subscribe((resposta: any) => {
      this.dataSource = new MatTableDataSource<any>(resposta.agendas);
      this.displayedColumns = ['select', 'inicio', 'fim'];
    });
   }
    if (this.user.isPaciente()) {
      this.agendaService.meusAgendamentos()
      .subscribe((resposta: any) => {
      this.dataSource = new MatTableDataSource<any>(resposta.agendamentos);
      this.displayedColumns = ['select', 'data', 'hora'];

    });
   }
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DadosAgenda): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.inicio}`;
  }

  cancelarAgendas() {
    if (this.user.isNutri()) {
      for (const agenda of this.selection.selected) {
        this.agendaService.apagar(agenda._id)
        .subscribe((resposta) => {
          console.log(resposta);
        });
        this.dataSource.data = this.arrayRemove(this.dataSource.data, agenda);
      }
    } else {
      for (const agendamento of this.selection.selected) {
        this.agendaService.apagarAgendamento(agendamento._id)
        .subscribe((resposta) => {
          console.log(resposta);
        });
        this.dataSource.data = this.arrayRemove(this.dataSource.data, agendamento);
      }
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele !== value;
    });

 }
}

