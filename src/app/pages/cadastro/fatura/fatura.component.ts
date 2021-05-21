
import { HttpClient } from '@angular/common/http';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Fatura, FaturaService } from '../../../@core/database/fatura.service';
import { Component, OnInit } from '@angular/core';
import { CustomInputEditorComponent } from '../receita/receita.component';

@Component({
  selector: 'ngx-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss'],
})
export class FaturaComponent implements OnInit{

  ResultGetFaturas: Fatura[];
  ItemFatura: Fatura;

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
      diavenc: {
        title: 'Dia de Vencimento',
        type: 'string',
        filter: false,
      },
      limite: {
        title: 'Limite',
        type: 'html',
        class: 'smart-column-left',
        filter: false,
        editor: {
          type: 'custom',
          component: CustomInputEditorComponent,
        },
      },
      cartao: {
        title: 'Cartão de Crédito',
        type: 'html',
        filter: false,
        editor: {
          type: 'checkbox',
          config: {
            true: 'Sim',
            false: 'Não',
            resetText: 'clear',
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
    private faturaService: FaturaService) {
      this.onPesquisaFaturas();
  }

  ngOnInit() {
  }

  onPesquisaFaturas() {
    this.faturaService.getFaturas().subscribe((resultado: Fatura[]) => {
      this.ResultGetFaturas = resultado;
      const listFaturas = [];
      Array.from(this.ResultGetFaturas).forEach(element => {
        element.cartao = element.cartao ? 'Sim' : 'Não';
        listFaturas.push(element);
      });
      this.source.load(listFaturas);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.ItemFatura = event.data;
      this.faturaService.delete(this.ItemFatura.id)
      .subscribe(() => {
        event.confirm.resolve();
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      this.ItemFatura = event.newData;
      this.ItemFatura.cartao = this.ItemFatura.cartao === 'Sim' ? 'true' : 'false';

      this.ItemFatura.limite = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(parseFloat(this.ItemFatura.limite));

      this.ItemFatura.limite = this.ItemFatura.limite.replace(/R\$/gi, '').trim();

      this.faturaService.save(this.ItemFatura).subscribe((result: Fatura) => {
        this.ItemFatura.id = result.id;
        this.ItemFatura.cartao = this.ItemFatura.cartao === 'true' ? 'Sim' : 'Não';
        event.confirm.resolve(this.ItemFatura);
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Deseja alterar este item?')) {
      this.ItemFatura = event.newData;
      this.ItemFatura.cartao = this.ItemFatura.cartao === 'Sim' ? 'true' : 'false';

      if (this.ItemFatura.limite.toString().indexOf(',') === -1) {
        this.ItemFatura.limite = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(parseFloat(this.ItemFatura.limite));
      }

      this.ItemFatura.limite = this.ItemFatura.limite.replace(/R\$/gi, '').trim();
      this.faturaService.update(this.ItemFatura.id, this.ItemFatura).subscribe(() => {
        this.ItemFatura.cartao = this.ItemFatura.cartao === 'true' ? 'Sim' : 'Não';
      event.confirm.resolve(this.ItemFatura);
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'carteira',
        search: query,
      },
      {
        field: 'diavenc',
        search: query,
      },
      {
        field: 'limite',
        search: query,
      }
    ], true);
  }
}
