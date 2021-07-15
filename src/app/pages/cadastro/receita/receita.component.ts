import { Carteira, CarteiraService } from './../../../@core/database/carteira.service';
import { HttpClient } from '@angular/common/http';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Receita, ReceitaService } from '../../../@core/database/receita.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../@core/utils/util.service';

@Component({
  selector: 'ngx-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss'],
})
export class ReceitaComponent implements OnInit{

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
        title: 'Dia',
        type: 'string',
        filter: false,
      },
      valor: {
        title: 'Valor',
        type: 'html',
        class: 'smart-column-left',
        filter: false,
        editor: {
          type: 'custom',
          component: CustomInputEditorComponent,
        },
      },
      carteiraid: {
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
  totalReceitas = '0,00';
  mesref: string = '07';
  anoref: string = '2021';

  constructor(private service: SmartTableData, private http: HttpClient,
    private receitaService: ReceitaService, private carteiraService: CarteiraService) {
      this.onPesquisaReceitas();
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
        mySettings.columns.carteiraid.editor.config.list = listCarteiras;
        this.settings = Object.assign ({}, mySettings);
      });
  }

  ngOnInit() {
  }

  onPesquisaReceitas() {
    this.receitaService.getReceitas(this.mesref, this.anoref).subscribe((resultado: Receita[]) => {
      this.ResultGetReceitas = resultado;
      const listReceitas = [];
      let calcTotalReceitas = 0;
      Array.from(this.ResultGetReceitas).forEach(element => {
        element.carteiraid = element.carteiraid + ' - ' + element.carteiradescr;
        element.fixa = element.fixa ? 'Sim' : 'Não';
        element.datareceb = element.datareceb.substr(0, 2);
        listReceitas.push(element);
        calcTotalReceitas += UtilService.converteMoedaFloat(element.valor);
      });
      this.source.load(listReceitas);
      this.totalReceitas = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(calcTotalReceitas);
    });
  }

  onUpdateTotalReceita(itemReceita: Receita, action: String) {
    this.source.getAll().then(value => {
      let calcTotalReceitas = 0;
      value.forEach(element => {
        if (itemReceita.id === element.id) {
          if (action === 'ALTER') {
            calcTotalReceitas += UtilService.converteMoedaFloat(itemReceita.valor);
          }

          if (action === 'DELETE') {
          }

        } else {
          calcTotalReceitas += UtilService.converteMoedaFloat(element.valor);
        }
      });
      if (action === 'INSERT') {
        calcTotalReceitas += UtilService.converteMoedaFloat(itemReceita.valor);
      }
      this.totalReceitas = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(calcTotalReceitas);
  });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.ItemReceita = event.data;
      this.receitaService.delete(this.ItemReceita.id)
      .subscribe(() => {
        event.confirm.resolve();
      this.onUpdateTotalReceita(this.ItemReceita, 'DELETE');
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      this.ItemReceita = event.newData;
      const carteiradescr = this.ItemReceita.carteiradescr;

      const splitCarteiras = this.ItemReceita.carteiraid.split('-');
      this.ItemReceita.carteiraid = splitCarteiras[0].trim();

      this.ItemReceita.fixa = this.ItemReceita.fixa === 'Sim' ? 'true' : 'false';

      this.ItemReceita.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(parseFloat(this.ItemReceita.valor));

      this.ItemReceita.valor = this.ItemReceita.valor.replace(/R\$/gi, '').trim();
      this.ItemReceita.datareceb = UtilService.zeroesq(this.ItemReceita.datareceb, 2) +
          '/' + this.mesref + '/' + this.anoref;

      this.receitaService.save(this.ItemReceita).subscribe((result: Receita) => {
        this.ItemReceita.id = result.id;
        this.ItemReceita.carteiradescr = carteiradescr;
        this.ItemReceita.fixa = this.ItemReceita.fixa ? 'Sim' : 'Não';
        this.ItemReceita.datareceb = this.ItemReceita.datareceb.substr(0, 2);
        event.confirm.resolve(this.ItemReceita);
        this.onUpdateTotalReceita(this.ItemReceita, 'INSERT');
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Deseja alterar este item?')) {
      this.ItemReceita = event.newData;
      const carteiradescr = this.ItemReceita.carteiraid;

      const splitCarteiras = this.ItemReceita.carteiraid.split('-');
      this.ItemReceita.carteiraid = splitCarteiras[0].trim();

      this.ItemReceita.fixa = this.ItemReceita.fixa === 'Sim' ? 'true' : 'false';
      this.ItemReceita.descricao = this.ItemReceita.descricao.trim();

      if (this.ItemReceita.valor.toString().indexOf(',') === -1) {
        this.ItemReceita.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(parseFloat(this.ItemReceita.valor));
      }

      this.ItemReceita.datareceb = UtilService.zeroesq(this.ItemReceita.datareceb, 2) +
        '/' + this.mesref + '/' + this.anoref;

      this.ItemReceita.valor = this.ItemReceita.valor.replace(/R\$/gi, '').trim();
      this.receitaService.save(this.ItemReceita).subscribe(() => {
        this.ItemReceita.carteiradescr = carteiradescr;
        this.ItemReceita.fixa = this.ItemReceita.fixa ? 'Sim' : 'Não';
        this.ItemReceita.datareceb = this.ItemReceita.datareceb.substr(0, 2);
        event.confirm.resolve(this.ItemReceita);
        this.onUpdateTotalReceita(this.ItemReceita, 'ALTER');
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'carteiraid',
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
    ], true);
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
    [placeholder]="cell.getValue()"
    [name]="cell.getId()"
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
