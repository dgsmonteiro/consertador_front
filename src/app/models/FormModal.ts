import { Validators, ValidatorFn } from '@angular/forms';
import {
  validarCPF, validarCNPJ, validarNome, validarEmail, validarTel, validarCep,
  formatarCPF, formatarTel, formatarCNPJ, formatarCep
} from './formValidators';

export const PRESET_VALIDATORS: { [name: string]: ValidatorFn[] } = {};
PRESET_VALIDATORS['cpf'] = [Validators.required, validarCPF];
PRESET_VALIDATORS['cnpj'] = [Validators.required, validarCNPJ];
PRESET_VALIDATORS['nome'] = [Validators.required, validarNome];
PRESET_VALIDATORS['email'] = [Validators.required, validarEmail];
PRESET_VALIDATORS['telefone'] = [Validators.required, validarTel];
PRESET_VALIDATORS['cep'] = [Validators.required, validarCep];

export type Formatador = (val: string) => string;
export const PRESET_FORMATTERS: { [name: string]: Formatador } = {};
PRESET_FORMATTERS['cpf'] = formatarCPF;
PRESET_FORMATTERS['cnpj'] = formatarCNPJ;
PRESET_FORMATTERS['cep'] = formatarCep;
PRESET_FORMATTERS['telefone'] = formatarTel;

export const PRESET_FORMS: { [name: string]: IFormData } = {};

export interface IModalFormField {
  placeholder: string;
  name: string;
  value: any;
  validatorName?: string;
}

export interface IFormData {
  title: string;
  fields: IModalFormField[];
}
