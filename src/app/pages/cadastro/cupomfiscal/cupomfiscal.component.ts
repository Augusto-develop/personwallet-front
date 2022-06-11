import {Component, OnInit} from '@angular/core';
import {Fatura, FaturaService} from '../../../@core/database/fatura.service';
import {UtilService} from '../../../@core/utils/util.service';
import {Produto, ProdutoService} from '../../../@core/database/produto.service';
import {Categoria, CategoriaService} from '../../../@core/database/categoria.service';
import {FormBuilder} from '@angular/forms';
import {CupomFiscal, CupomfiscalService, ItemsCupomFiscal} from '../../../@core/database/cupomfiscal.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NbThemeService} from '@nebular/theme';

@Component({
   selector: 'ngx-cupomfiscal',
   templateUrl: './cupomfiscal.component.html',
   styleUrls: ['./cupomfiscal.component.scss'],
})
export class CupomfiscalComponent implements OnInit {

   chaveacesso = '';

   faturasSelect: Fatura[];
   mesesSelect: {}[];

   categoriasSelect: Categoria[];

   produtosSelect: Produto[];

   onSearch: boolean;

   controlsConfig: {
      fatura: '',
      mesfat: '',
      anofat: '',
      datacompra: '',
      fornecedor: '',
      valortotal: '',
      numparc: '',
      qtdeparc: '',
      categoria: '',
   };

   checkoutForm = this.formBuilder.group({
      fatura: '',
      mesfat: '',
      anofat: '',
      datacompra: '',
      fornecedor: '',
      valortotal: '',
      numparc: '',
      qtdeparc: '',
      categoria: '',
   });

   cumpofiscal: CupomFiscal;
   itemsCupom: ItemsCupomFiscal[];

   constructor(private faturaService: FaturaService, private produtoService: ProdutoService,
               private categoriaService: CategoriaService, private formBuilder: FormBuilder,
               private cupomfiscalService: CupomfiscalService,
               private readonly themeService: NbThemeService) {
      this.onSearch = false;

      this.faturaService.getFaturas().subscribe((resultado: Fatura[]) => {
         this.faturasSelect = resultado;
      });

      this.mesesSelect = UtilService.getMesesSelect();

      this.produtoService.getProdutos().subscribe((resultado: Produto[]) => {
         this.produtosSelect = resultado;
      });

      this.categoriaService.getCategorias().subscribe((resultado: Categoria[]) => {
         this.categoriasSelect = resultado;
      });

      this.chaveacesso = '23220647508411039958592300769030934750710517';
   }

   public materialTheme$: Observable<boolean>;
   public showMaterialInputs = false;

   ngOnInit(): void {
      this.materialTheme$ = this.themeService.onThemeChange()
         .pipe(tap(theme => {
            const themeName: string = theme?.name || '';
            this.showMaterialInputs = themeName.startsWith('material');
         }));
   }

   onPesquisaCupom() {
      this.onSearch = false;

      this.cupomfiscalService.getCupomFiscal(this.chaveacesso).subscribe((resultado: CupomFiscal) => {
         this.cumpofiscal = resultado;

         const controls = {
            datacompra: this.cumpofiscal.emissao,
            fornecedor: this.cumpofiscal.fornecedor.nome,
            valortotal: UtilService.formatmoeda(this.cumpofiscal.pago),
         };

         this.controlsConfig = Object.assign({}, this.controlsConfig, controls);

         const listitems = [];
         const itemControlName = {};
         let index = 0;
         Array.from(this.cumpofiscal.itens).forEach(element => {
            element.total = UtilService.formatmoeda(element.total);

            itemControlName['itemproduto-' + index] = 'element.total';
            itemControlName['itemdescricao-' + index] = element.descricao;
            itemControlName['itemqtde-' + index] = element.qtde;
            itemControlName['itemvalor-' + index] = element.total;
            this.controlsConfig = Object.assign({}, this.controlsConfig, itemControlName);
            index++;

            listitems.push(element);
         });
         this.checkoutForm = this.formBuilder.group(this.controlsConfig);
         this.itemsCupom = listitems;
         this.onSearch = true;
      });
   }

   onSubmit(): void {

      const formdata = this.checkoutForm.value;
      let teste = '';
      Object.keys(formdata).forEach(function (item) {
         teste = formdata[item];
      });

      /*this.movimentoService.save(this.checkoutForm.value).subscribe((result: Movimento) => {
         window.alert('Transferencia Efetuada');
      }, err => console.error(err));*/
   }
}
