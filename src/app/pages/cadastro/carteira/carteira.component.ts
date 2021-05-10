import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent {

  settings = {
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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      /*id: {
        title: 'ID',
        type: 'number',
      },*/
      firstName: {
        title: 'Descrição',
        type: 'string',
      },
      /*lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },*/
    },
    pager: {
      display: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private http: HttpClient) {
    const data = this.service.getData();
    /*this.source.load(data);*/
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      /*this.http.post(`http://localhost:8081/carteiras/add`, { descricao: 'ITAU TESTE' });*/


      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'cc824028-1778-49c0-b28d-2f603793ef64',
        }),
      };

      const values = { 'descricao': 'ITAU TESTE'};
      this.http.post('http://localhost:8081/carteiras/add', values, httpOptions);

      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
