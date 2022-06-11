import {Component, OnInit} from '@angular/core';
import {Produto, ProdutoService} from '../../../@core/database/produto.service';
import {Subcategoria, SubcategoriaService} from '../../../@core/database/subcategoria.service';
import {DefaultEditor, LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';

@Component({
   selector: 'ngx-produto',
   templateUrl: './produto.component.html',
   styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {

   ResultGetSubcategorias: Subcategoria[];
   ResultGetProdutos: Produto[];
   ItemProduto: Produto;

   settings = {
      actions: {
         columnTitle: 'Ações',
         position: 'right',
      },
      add: {
         addButtonContent: '<i class="nb-plus"></i>',
         createButtonContent: '<i class="nb-checkmark"></i>',
         cancelButtonContent: '<i class="nb-close"></i>',
         confirmCreate: true,
      },
      edit: {
         editButtonContent: '<i class="nb-edit"></i>',
         saveButtonContent: '<i class="nb-checkmark"></i>',
         cancelButtonContent: '<i class="nb-close"></i>',
         confirmSave: true,
      },
      delete: {
         deleteButtonContent: '<i class="nb-trash"></i>',
         confirmDelete: true,
      },
      columns: {
         descricao: {
            title: 'Descrição',
            type: 'string',
            filter: false,
         },
         subcategoria: {
            title: 'Seção',
            type: 'html',
            filter: false,
            editor: {
               type: 'list',
               config: {
                  list: [],
               },
            },
         },
      },
      pager: {
         display: false,
      },
   };

   source: LocalDataSource = new LocalDataSource();

   constructor(private service: SmartTableData, private http: HttpClient,
               private produtoService: ProdutoService, private subcategoriaService: SubcategoriaService) {
      this.onPesquisaProdutos();
      subcategoriaService.getSubcategorias().subscribe((resultado: Subcategoria[]) => {
         this.ResultGetSubcategorias = resultado;
         const listSubcategorias = [];
         Array.from(this.ResultGetSubcategorias).forEach(element => {
            listSubcategorias.push({
               value: element.id + ' - ' + element.descricao,
               title: element.id + ' - ' + element.descricao,
            });
         });
         const mySettings = this.settings;
         mySettings.columns.subcategoria.editor.config.list = listSubcategorias;
         this.settings = Object.assign({}, mySettings);
      });
   }

   ngOnInit() {
   }

   onPesquisaProdutos() {
      this.produtoService.getProdutos().subscribe((resultado: Produto[]) => {
         this.ResultGetProdutos = resultado;
         const listProdutos = [];
         Array.from(this.ResultGetProdutos).forEach(element => {
            element.subcategoria = element.subcategoria + ' - ' + element.subcategoriadescr;
            listProdutos.push(element);
         });
         this.source.load(listProdutos);
      });
   }

   onCreateConfirm(event): void {
      if (window.confirm('Deseja Salvar este item?')) {
         this.ItemProduto = event.newData;
         const subcategoriadescr = this.ItemProduto.subcategoriadescr;
         const splitSubcategorias = this.ItemProduto.subcategoria.split('-');
         this.ItemProduto.subcategoria = splitSubcategorias[0].trim();
         this.produtoService.save(this.ItemProduto).subscribe((result: Produto) => {
            this.ItemProduto.id = result.id;
            this.ItemProduto.subcategoriadescr = subcategoriadescr;
            event.confirm.resolve(this.ItemProduto);
         }, err => console.error(err));
      } else {
         event.confirm.reject();
      }
   }

   onEditConfirm(event): void {
      if (window.confirm('Deseja alterar este item?')) {
         this.ItemProduto = event.newData;

         const subcategoriadescr = this.ItemProduto.subcategoria;
         const splitSubcategorias = this.ItemProduto.subcategoria.split('-');
         this.ItemProduto.subcategoria = splitSubcategorias[0].trim();
         this.produtoService.update(this.ItemProduto.id, this.ItemProduto).subscribe(() => {
            this.ItemProduto.subcategoriadescr = subcategoriadescr;
            event.confirm.resolve(this.ItemProduto);
         }, err => console.error(err));
      } else {
         event.confirm.reject();
      }
   }

   onDeleteConfirm(event): void {
      if (window.confirm('Tem certeza de que deseja excluir?')) {
         this.ItemProduto = event.data;
         this.produtoService.delete(this.ItemProduto.id)
            .subscribe(() => {
               event.confirm.resolve();
            }, err => console.error(err));
      } else {
         event.confirm.reject();
      }
   }

   onSearch(query: string = '') {
      this.source.setFilter([
         // fields we want to include in the search
         {
            field: 'descricao',
            search: query,
         },
         {
            field: 'subcategoria',
            search: query,
         },
      ], true);
   }
}
