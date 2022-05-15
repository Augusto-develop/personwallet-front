
const host = 'http://localhost:8081';
const host2 = 'http://personwallet/api/v1';
/*const host = 'https://perssonwallet.herokuapp.com';*/

export const EndPointApi = {
   faturas: host2 + '/faturas',
   receitas: host2 + '/receitas',
   despesas: host2 + '/despesas',
   categorias: host2 + '/categorias',
   carteiras: host2 + '/carteiras',
   saldoslist: host + '/saldos/list',
   carteirassaldo: host2 + '/carteiras/saldo',
};
