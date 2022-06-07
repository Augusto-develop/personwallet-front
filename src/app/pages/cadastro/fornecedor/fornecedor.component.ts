import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {Fornecedor, FornecedorService} from '../../../@core/database/fornecedor.service';

@Component({
   selector: 'ngx-fornecedor',
   templateUrl: './fornecedor.component.html',
   styleUrls: ['./fornecedor.component.scss'],
})
export class FornecedorComponent {

   DataFornecedores: any = [];
   ItemFornecedor: Fornecedor;

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
      },
      pager: {
         display: false,
      },
   };

   source: LocalDataSource = new LocalDataSource();

   constructor(private service: SmartTableData, private http: HttpClient,
               private fornecedorService: FornecedorService) {
      fornecedorService.getFornecedores().subscribe((resultado) => {
         this.DataFornecedores = resultado;
         this.source.load(this.DataFornecedores);
      });
   }

   onDeleteConfirm(event): void {
      if (window.confirm('Tem certeza de que deseja excluir?')) {
         this.ItemFornecedor = event.data;
         this.fornecedorService.delete(this.ItemFornecedor.id)
            .subscribe(() => {
               event.confirm.resolve();
            }, err => console.error(err));
      } else {
         event.confirm.reject();
      }
   }

   onCreateConfirm(event): void {
      if (window.confirm('Deseja Salvar este item?')) {
         this.ItemFornecedor = event.newData;
         this.fornecedorService.save(this.ItemFornecedor)
            .subscribe((result: Fornecedor) => {
               this.ItemFornecedor.id = result.id;
               event.confirm.resolve(this.ItemFornecedor);
            }, err => console.error(err));
      } else {
         event.confirm.reject();
      }
   }

   onEditConfirm(event): void {
      if (window.confirm('Deseja alterar este item?')) {
         this.ItemFornecedor = event.newData;
         this.fornecedorService.update(this.ItemFornecedor.id, this.ItemFornecedor)
            .subscribe(() => {
               event.confirm.resolve();
            }, err => console.error(err));
      } else {
         event.confirm.reject();
      }
   }

   onSearch(query: string = '') {
      this.source.setFilter([
         {
            field: 'descricao',
            search: query,
         },
      ], false);
   }

}
