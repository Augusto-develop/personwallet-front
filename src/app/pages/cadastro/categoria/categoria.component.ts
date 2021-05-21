
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Categoria, CategoriaService } from '../../../@core/database/categoria.service';


@Component({
  selector: 'ngx-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent {

  DataCategorias: any = [];
  ItemCategoria: Categoria;

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

  constructor(private service: SmartTableData, private http: HttpClient, private categoriaService: CategoriaService) {
    categoriaService.getCategorias().subscribe((resultado) => {
      this.DataCategorias = resultado;
      this.source.load(this.DataCategorias);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.ItemCategoria = event.data;
      this.categoriaService.delete(this.ItemCategoria.id)
      .subscribe(() => {
        event.confirm.resolve();
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      this.ItemCategoria = event.newData;
      this.categoriaService.save(this.ItemCategoria)
      .subscribe((result: Categoria) => {
        this.ItemCategoria.id = result.id;
        event.confirm.resolve(this.ItemCategoria);
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Deseja alterar este item?')) {
      this.ItemCategoria = event.newData;
      this.categoriaService.save(this.ItemCategoria)
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
