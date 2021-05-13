import { Saldo } from './saldo';

export interface SaldoGeral {
    totalCarteiras: string;
    totalReceitas: string;
    totalDespesas: string;
    carteiras: Saldo[];
    receitas: Saldo[];
    despesas: Saldo[];
}
