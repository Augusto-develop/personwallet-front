
const host = 'http://localhost:8081';
const host2 = 'http://personwallet/api/v1';
/*const host = 'https://perssonwallet.herokuapp.com';*/

export const EndPointApi = {
   faturas: host2 + '/faturas',
   cartoes: host2 + '/faturas/cartoes',
   receitas: host2 + '/receitas',
   despesas: host2 + '/despesas',
   categorias: host2 + '/categorias',
   fornecedores: host2 + '/fornecedores',
   carteiras: host2 + '/carteiras',
   saldoslist: host + '/saldos/list',
   carteirassaldo: host2 + '/carteiras/saldo',
   receitasssaldo: host2 + '/receitas/saldo',
   categoriassaldo: host2 + '/categorias/saldo',
   pagamentos: host2 + '/pagamentos',
   movimentos: host2 + '/movimentos',
   produtos: host2 + '/produtos',
   subcategorias: host2 + '/subcategorias',
   despesaitems: host2 + '/despesaitems',
};
