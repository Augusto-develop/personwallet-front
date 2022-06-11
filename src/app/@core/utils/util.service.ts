import {Injectable} from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class UtilService {

   constructor() {
   }

   static converteMoedaFloat(valor: string) {
      if (valor === '') {
         valor = '0';
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

   static zerodir(valor: string, tamanho: number) {
      const qtd = valor.length;
      if (qtd < tamanho) {
         const limite = tamanho - qtd;
         for (let i = 0; i < limite; i++) {
            valor = valor + '0';
         }
      }
      return valor;
   }

   static formatmoeda(n) {
      const parts = n.toString().split('.');
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (parts[1] ?
         ',' + this.zerodir(parts[1], 2) : ',00');
   }

   static getMesesSelect() {
      return [
         {id: '01', descr: 'Janeiro'},
         {id: '02', descr: 'Fevereiro'},
         {id: '03', descr: 'Março'},
         {id: '04', descr: 'Abril'},
         {id: '05', descr: 'Maio'},
         {id: '06', descr: 'Junho'},
         {id: '07', descr: 'Julho'},
         {id: '08', descr: 'Agosto'},
         {id: '09', descr: 'Setembro'},
         {id: '10', descr: 'Outubro'},
         {id: '11', descr: 'Novembro'},
         {id: '12', descr: 'Dezembro'},
      ];
   }
}
