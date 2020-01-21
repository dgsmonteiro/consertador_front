import { AbstractControl, ValidationErrors } from '@angular/forms';

export type Formatter = (val: string) => string;

const PESOS_CNPJ = Array.from({ length: 13 }, (_, i) => (i % 8) + 2);
const PESOS_CPF = Array.from({ length: 11 }, (_, i) => 11 - i);

// tslint:disable
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const TEL_REGEX = /^\(?(0?\d{2})\)? ?(9?\d{4})(( - )|[ -])?(\d{4})$/
const CEP_REGEX = /^(\d{5})-?(\d{3})$/;
const CPF_REGEX = /^(\d{3})\.?(\d{3})\.?(\d{3})-?(\d{2})$/;
const CNPJ_REGEX = /^(\d{2})\.?(\d{3})\.?(\d{3})\/?(\d{4})-?(\d{2})$/;
// tslint:enable

function somaPesoAteDigito(nums: number[], pesos: number[]): number {
  const res = nums.reduce((ttl, next, i) => ttl + (next * pesos[i]), 0) % 11;
  return res <= 1 ? 0 : 11 - res;
}

export function validarCNPJ(control: AbstractControl): ValidationErrors | null {
  const txt = control.value as string;
  if (!txt.match(CNPJ_REGEX)) {
    return {
      invalid: true,
      message: 'O CNPJ digitado não está no formato correto.'
    };
  }
  const digitos = txt.replace(/[-\/\.]/g, '').split('').reverse()
    .map(x => Number.parseInt(x));
  const v1 = somaPesoAteDigito(digitos.slice(2), PESOS_CNPJ);
  const v2 = somaPesoAteDigito(digitos.slice(1), PESOS_CNPJ);
  return v1 === digitos[1] && v2 === digitos[0] ? null : {
    invalid: true,
    message: 'O número de CNPJ digitado é inválido.'
  };
}

export function validarCPF(control: AbstractControl): ValidationErrors | null {
  const txt = control.value.toString() as string;
  if (!txt.match(CPF_REGEX)) {
    return {
      invalid: true,
      message: 'O CPF digitado está num formato inválido.'
    };
  }
  const digitos = txt.replace(/[-\/\.]/g, '').split('').map(x => Number.parseInt(x));
  const d1 = somaPesoAteDigito(digitos.slice(0, -2), PESOS_CPF.slice(1));
  const d2 = somaPesoAteDigito(digitos.slice(0, -1), PESOS_CPF);
  return d2 === digitos.pop() && d1 === digitos.pop() ? null : {
    invalid: true,
    message: 'O CPF digitado é inválido.'
  };
}

export function validarNome(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value as string).replace(/[0-9]/g, '');
  return valor.length >= 2 ? null : {
    invalid: true,
    message: 'O nome tem que ter pelo menos dois caracteres.'
  };
}

export function validarEmail(control: AbstractControl): ValidationErrors | null {
  return control.value.match(EMAIL_REGEX) ? null : {
    invalid: true,
    message: 'O email digitado é invalido. Ex.: endereco@email.com'
  };
}

export function validarTel(control: AbstractControl): ValidationErrors | null {
  return control.value.match(TEL_REGEX) ? null : {
    invalid: true,
    message: 'Telefone inválido, digite um telefone no formato (99) 91111-1111.'
  };
}

export function validarCep(control: AbstractControl): ValidationErrors | null {
  return control.value.match(CEP_REGEX) ? null : {
    invalid: true,
    message: 'CEP inválido, digite um CEP no formato 99999-999.'
  };
}

export function formatarCNPJ(txt: string): string {
  return txt.replace(CNPJ_REGEX, '$1.$2.$3/$4-$5');
}

export function formatarCPF(txt: string): string {
  return txt.replace(CPF_REGEX, '$1.$2.$3-$4');
}

export function formatarTel(txt: string): string {
  return txt.replace(TEL_REGEX, '($1) $2-$5');
}

export function formatarCep(txt: string): string {
  return txt.replace(CEP_REGEX, '$1-$2');
}
