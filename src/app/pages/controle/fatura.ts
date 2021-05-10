import { Conta } from './conta';
export interface Fatura {
  idcarteira: string;
  vencimento: string;
  valor: string;
  status: string;
  contas: Conta[];
}
