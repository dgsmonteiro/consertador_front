import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPacienteComponent } from './dados-paciente.component';

describe('DadosPacienteComponent', () => {
  let component: DadosPacienteComponent;
  let fixture: ComponentFixture<DadosPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
