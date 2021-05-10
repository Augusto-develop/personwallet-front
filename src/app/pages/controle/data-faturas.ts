import { Fatura } from './fatura';

export const FATURAS: Fatura[] = [
  {
    idcarteira: 'RCHLO', vencimento: '10/05/2021', valor: 'R$ 300,00', status: 'Pago',
    contas: [
      {
        idconta: 'VESTUÁRIO', descricao: 'Riachuelo',
        parcela: '5/5', vencimento: '10/05/2021', valor: 'R$ 40,32',
      },
    ]
  },
  { idcarteira: 'CAIXA', vencimento: '10/05/2021', valor: 'R$ 1.100,00', status: 'Aberto',
    contas: [
      {
        idconta: 'HOME', descricao: 'Macavi(Ventilador)',
        parcela: '11/12', vencimento: '15', valor: 'R$ 13,25'
      },
    ]
  },
  { idcarteira: 'DIVERSOS', vencimento: '10/05/2021', valor: 'R$ 600,00', status: 'Pago',
    contas: [
      {
        idconta: 'ENEL', descricao: 'Energia Horizonte',
        parcela: '01/21', vencimento: '10', valor: 'R$ 137,62'
      },
      {
        idconta: 'HOME', descricao: 'KimNet',
        parcela: '02/21', vencimento: '20', valor: 'R$ 75,00'
      },
    ]
  },
  { contas: [
      {descricao: 'Energia Horizonte', idconta: 'ENEL', parcela: '42/360', valor: 'R$ 551,07', vencimento: '20' },
    ],
    idcarteira: 'FINANCIAMENTO', status: 'Pago', valor: 'R$ 1.000,00', vencimento: '10/05/2021',
  },
  { contas: [{descricao: 'Imovel Caixa', idconta: 'FINAN', parcela: '42/360', valor: 'R$ 551,07', vencimento: '20' }],
    idcarteira: 'FINANCIAMENTO', status: 'Pago', valor: 'R$ 1.000,00', vencimento: '10/05/2021',
  },
  { contas: [{descricao: 'Posto Mack IV', idconta: 'COMBUSTÍVEL', parcela: '', valor: 'R$ 50,00', vencimento: '13/04/2021' }],
    idcarteira: 'DÉBITO/A VISTA', status: 'Pago', valor: 'R$ 250,00', vencimento: '10/05/2021',
  },
];
