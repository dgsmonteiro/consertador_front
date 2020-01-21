import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirAgendaComponent } from './abrir-agenda.component';

describe('AbrirAgendaComponent', () => {
  let component: AbrirAgendaComponent;
  let fixture: ComponentFixture<AbrirAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
