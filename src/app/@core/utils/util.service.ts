import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor() { }
  static converteMoedaFloat(valor: string) {
    if (valor === '') {
      valor =  '0';
    } else {
      valor = valor.replace('.', '');
      valor = valor.replace(',', '.');
      valor = valor.replace(' ', '');
    }
    return parseFloat(valor);
  }

  static zeroesq(valor: string, tamanho: number) {
    const qtd = valor.length;
    if (qtd < tamanho) {
      const limite = tamanho - qtd;
      for (let i = 0; i < limite; i++) {
        valor = '0' + valor;
      }
    }
    return valor;
  }
}
