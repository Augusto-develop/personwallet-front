import { Carteira } from './../../../@core/database/carteira.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { CarteiraService } from '../../../@core/database/carteira.service';

@Component({
  selector: 'ngx-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss'],
})
export class CarteiraComponent {

  DataCarteiras: any = [];
  ItemCarteira: Carteira;

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

  constructor(private service: SmartTableData, private http: HttpClient, private carteiraService: CarteiraService) {
    carteiraService.getCarteiras().subscribe((resultado) => {
      this.DataCarteiras = resultado;
      this.source.load(this.DataCarteiras);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.ItemCarteira = event.data;
      this.carteiraService.delete(this.ItemCarteira.id)
      .subscribe(() => {
        event.confirm.resolve();
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      this.ItemCarteira = event.newData;
      this.ItemCarteira.ativo = true;
      this.carteiraService.save(this.ItemCarteira)
      .subscribe((result: Carteira) => {
        this.ItemCarteira.id = result.id;
        event.confirm.resolve(this.ItemCarteira);
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Deseja alterar este item?')) {
      this.ItemCarteira = event.newData;
      this.ItemCarteira.ativo = true;
      this.carteiraService.update(this.ItemCarteira.id, this.ItemCarteira)
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
