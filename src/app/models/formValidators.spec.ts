import { validarCNPJ, validarCPF } from './formValidators';
import { FormControl } from '@angular/forms';

it('should validate CNPJ', () => {
  expect(validarCNPJ(new FormControl('14572457000185'))).toBeNull();
  expect(validarCNPJ(new FormControl('91215903000145'))).toBeNull();
  expect(validarCNPJ(new FormControl('76646328000141'))).toBeNull();
  expect(validarCNPJ(new FormControl('14574457100135'))).toBeTruthy();
});

it('deve validar CPF', () => {
  expect(validarCPF(new FormControl('722.935.345-96'))).toBeNull();
  expect(validarCPF(new FormControl('722.935.345-16'))).toBeTruthy();
});
