import { Carteira, CarteiraService } from './../../../@core/database/carteira.service';
import { HttpClient } from '@angular/common/http';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Receita, ReceitaService } from '../../../@core/database/receita.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss'],
})
export class ReceitaComponent {

  ResultGetCarteiras: Carteira[];
  ResultGetReceitas: Receita[];
  ItemReceita: Receita;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public myModel: string;


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
      datareceb: {
        title: 'Data',
        type: 'string',
        filter: false,
      },
      valor: {
        title: 'Valor',
        type: 'string',
        filter: false,
        editor: {
          type: 'custom',
          component: CustomInputEditorComponent,
        },
      },
      carteira: {
        title: 'Carteira',
        type: 'html',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
      fixa: {
        title: 'Fixa',
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
    private receitaService: ReceitaService, private carteiraService: CarteiraService) {
        receitaService.getReceitas().subscribe((resultado: Receita[]) => {
        this.ResultGetReceitas = resultado;
        const listReceitas = [];
        Array.from(this.ResultGetReceitas).forEach(element => {
          element.carteira = element.carteira + ' - ' + element.innercarteira.descricao;
          element.fixa = element.fixa ? 'Sim' : 'Não';
          listReceitas.push(element);
        });
        this.source.load(listReceitas);
    });

    carteiraService.getCarteiras().subscribe((resultado: Carteira[]) => {
      this.ResultGetCarteiras = resultado;
      const listCarteiras = [];
      Array.from(this.ResultGetCarteiras).forEach(element => {
        listCarteiras.push({
          value: element.id + ' - ' + element.descricao,
          title: element.id + ' - ' + element.descricao,
        });
      });
      const mySettings = this.settings;
      mySettings.columns.carteira.editor.config.list = listCarteiras;
      this.settings = Object.assign ({}, mySettings);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.ItemReceita = event.data;
      this.receitaService.delete(this.ItemReceita.id)
      .subscribe(() => {}, err => console.error(err));
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      this.ItemReceita = event.newData;
      const carteiradescr = this.ItemReceita.carteira;
      this.ItemReceita.carteira = this.ItemReceita.carteira.substring(0, 2);
      this.ItemReceita.fixa = this.ItemReceita.fixa === 'Sim' ? 'true' : 'false';
      this.ItemReceita.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(parseFloat(this.ItemReceita.valor));
      this.ItemReceita.valor = this.ItemReceita.valor.replace(/R\$/gi, '').trim();
      /*this.ItemReceita.datareceb = formatDate(this.ItemReceita.datareceb, 'y-LL-dd', 'en-US');*/
      this.receitaService.save(this.ItemReceita).subscribe(() => {}, err => console.error(err));

      this.ItemReceita.carteira = carteiradescr;
      this.ItemReceita.fixa = this.ItemReceita.fixa ? 'Sim' : 'Não';
      event.confirm.resolve(this.ItemReceita);
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event, element): void {
    if (window.confirm('Deseja alterar este item?')) {
      this.ItemReceita = event.newData;
      const carteiradescr = this.ItemReceita.carteira;
      this.ItemReceita.carteira = this.ItemReceita.carteira.substring(0, 2);
      this.ItemReceita.fixa = this.ItemReceita.fixa === 'Sim' ? 'true' : 'false';
      this.ItemReceita.descricao = this.ItemReceita.descricao.trim();
      this.ItemReceita.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(parseFloat(this.ItemReceita.valor));
      this.ItemReceita.valor = this.ItemReceita.valor.replace(/R\$/gi, '').trim();

      this.receitaService.save(this.ItemReceita).subscribe(() => {}, err => console.error(err));

      this.ItemReceita.carteira = carteiradescr;
      this.ItemReceita.fixa = this.ItemReceita.fixa ? 'Sim' : 'Não';
      event.confirm.resolve(this.ItemReceita);
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
        field: 'descricao',
        search: query,
      },
      {
        field: 'datareceb',
        search: query,
      },
      {
        field: 'valor',
        search: query,
      },
    ], false);
  }


  /*columns: {
    column {
        title: 'CPF/CNPJ',
        filterFunction(cell?: any, search?: string) {
            const match = cell.indexOf(search) > -1;
            const matchClean = cell.replace(/[^\d]+/g, '').indexOf(search) > -1;
            return (match || search === '') ? true : (matchClean) ? true : false;
        }
    }
}*/
}

@Component({
  selector: 'ngx-input-editor',
  template: `<input
    [(ngModel)]="cell.newValue"
    [name]="cell.getId()"
    [placeholder]="cell.getTitle()"
    [disabled]="!cell.isEditable()"
    (click)="onClick.emit($event)"
    (keydown.enter)="onEdited.emit($event)"
    (keydown.esc)="onStopEditing.emit()"
    currencyMask
    class="form-control ng-pristine ng-valid ng-touched"
    type="text" maxlength="12"/>`,
})
export class CustomInputEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}

/*[(ngModel)]="cell.newValue"
  [value]="cell.newValue"
    [(ngModel)]="cell.newValue"
    currencyMask
*/
