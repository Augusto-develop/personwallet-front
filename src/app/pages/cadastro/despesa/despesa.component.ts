import { Categoria, CategoriaService } from './../../../@core/database/categoria.service';
import { Fatura, FaturaService } from './../../../@core/database/fatura.service';
import { HttpClient } from '@angular/common/http';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Despesa, DespesaService } from '../../../@core/database/despesa.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../@core/utils/util.service';
import { CustomInputEditorComponent } from '../receita/receita.component';

@Component({
  selector: 'ngx-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss'],
})
export class DespesaComponent implements OnInit {

  ResultGetCategorias: Categoria[];
  ResultGetDespesas: Despesa[];
  ItemDespesa: Despesa;


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
      vencimento: {
        title: 'Compra/Venc',
        type: 'string',
        filter: false,
      },
      descricao: {
        title: 'Descrição',
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
      numparc: {
        title: 'Nº Parc',
        type: 'string',
        filter: false,
      },
      qtdeparc: {
        title: 'Qtde Parc',
        type: 'string',
        filter: false,
      },
      categoriaid: {
        title: 'Categoria',
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
  totalDespesas = '0,00';
  faturaoption = '';
  mesref: string = '08';
  anoref: string = '2021';
  faturasSelect: Fatura[];

  constructor(private service: SmartTableData, private http: HttpClient,
    private despesaService: DespesaService, private faturaService: FaturaService,
    private categoriaService: CategoriaService) {
      this.onPesquisaDespesas();

      faturaService.getFaturas().subscribe((resultado: Fatura[]) => {
        this.faturasSelect = resultado;
      });

      categoriaService.getCategorias().subscribe((resultado: Fatura[]) => {
        this.ResultGetCategorias = resultado;
        const listCategorias = [];
        Array.from(this.ResultGetCategorias).forEach(element => {
          listCategorias.push({
            value: element.id + ' - ' + element.descricao.trim(),
            title: element.id + ' - ' + element.descricao.trim(),
          });
        });
        const mySettings = this.settings;
        mySettings.columns.categoriaid.editor.config.list = listCategorias;
        this.settings = Object.assign ({}, mySettings);
      });
  }

  ngOnInit() {
  }

  onPesquisaDespesas() {
    this.despesaService.getDespesas(this.faturaoption, this.mesref, this.anoref).subscribe((resultado: Despesa[]) => {
      this.ResultGetDespesas = resultado;
      const listDespesas = [];
      let calcTotalDespesas = 0;
      Array.from(this.ResultGetDespesas).forEach(element => {
        /*element.faturaid = element.faturaid + ' - ' + element.faturadescr;*/
        element.categoriaid = element.categoriaid + ' - ' + element.categoriadescr.trim();
        element.fixa = element.fixa === 'T' ? 'Sim' : 'Não';
        /*element.vencimento = element.vencimento.substr(0, 2);*/
        listDespesas.push(element);
        calcTotalDespesas += UtilService.converteMoedaFloat(element.valor);
      });
      this.source.load(listDespesas);
      this.totalDespesas = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(calcTotalDespesas);
    });
  }

  onUpdateTotalDespesa(itemDespesa: Despesa, action: String) {
    this.source.getAll().then(value => {
      let calcTotalDespesas = 0;
      value.forEach(element => {
        if (itemDespesa.id === element.id) {
          if (action === 'ALTER') {
            calcTotalDespesas += UtilService.converteMoedaFloat(itemDespesa.valor);
          }

          if (action === 'DELETE') {
          }

        } else {
          calcTotalDespesas += UtilService.converteMoedaFloat(element.valor);
        }
      });
      if (action === 'INSERT') {
        calcTotalDespesas += UtilService.converteMoedaFloat(itemDespesa.valor);
      }
      this.totalDespesas = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(calcTotalDespesas);
  });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.ItemDespesa = event.data;
      this.despesaService.delete(this.ItemDespesa.id)
      .subscribe(() => {
        event.confirm.resolve();
      this.onUpdateTotalDespesa(this.ItemDespesa, 'DELETE');
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Deseja Salvar este item?')) {
      this.ItemDespesa = event.newData;

      this.ItemDespesa.faturaid = this.faturaoption;
      this.ItemDespesa.anofat = this.anoref;
      this.ItemDespesa.mesfat = this.mesref;

      const categoriaOptionValue = this.ItemDespesa.categoriaid;

      const splitCategoria = this.ItemDespesa.categoriaid.split('-');
      this.ItemDespesa.categoriaid = splitCategoria[0].trim();

      this.ItemDespesa.fixa = this.ItemDespesa.fixa === 'Sim' ? 'T' : 'F';

      this.ItemDespesa.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(parseFloat(this.ItemDespesa.valor));

      this.ItemDespesa.valor = this.ItemDespesa.valor.replace(/R\$/gi, '').trim();

      this.despesaService.save(this.ItemDespesa).subscribe((result: Despesa) => {
        this.ItemDespesa.id = result.id;
        this.ItemDespesa.categoriaid = categoriaOptionValue;
        this.ItemDespesa.fixa = this.ItemDespesa.fixa === 'T' ? 'Sim' : 'Não';
        event.confirm.resolve(this.ItemDespesa);
        this.onUpdateTotalDespesa(this.ItemDespesa, 'INSERT');
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Deseja alterar este item?')) {
      this.ItemDespesa = event.newData;

      this.ItemDespesa.faturaid = this.faturaoption;
      this.ItemDespesa.anofat = this.anoref;
      this.ItemDespesa.mesfat = this.mesref;

      const categoriaOptionValue = this.ItemDespesa.categoriaid;

      const splitCategoria = this.ItemDespesa.categoriaid.split('-');
      this.ItemDespesa.categoriaid = splitCategoria[0].trim();

      this.ItemDespesa.fixa = this.ItemDespesa.fixa === 'Sim' ? 'T' : 'F';
      this.ItemDespesa.descricao = this.ItemDespesa.descricao.trim();

      if (this.ItemDespesa.valor.toString().indexOf(',') === -1) {
        this.ItemDespesa.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(parseFloat(this.ItemDespesa.valor));
      }

      this.ItemDespesa.valor = this.ItemDespesa.valor.replace(/R\$/gi, '').trim();
      /*if (this.ItemDespesa.innerfatura !== null) {
        if (this.ItemDespesa.innerfatura.limite !== undefined) {
          this.ItemDespesa.innerfatura.limite = this.ItemDespesa.innerfatura.limite.replace(/R\$/gi, '').trim();
        }
        if (this.ItemDespesa.innerfatura.valor !== undefined) {
          this.ItemDespesa.innerfatura.valor = this.ItemDespesa.innerfatura.valor.replace(/R\$/gi, '').trim();
        }
      }*/
      this.despesaService.save(this.ItemDespesa).subscribe(() => {
        this.ItemDespesa.categoriaid = categoriaOptionValue;
        this.ItemDespesa.fixa = this.ItemDespesa.fixa === 'T' ? 'Sim' : 'Não';
        event.confirm.resolve(this.ItemDespesa);
        this.onUpdateTotalDespesa(this.ItemDespesa, 'ALTER');
      }, err => console.error(err));
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'vencimento',
        search: query,
      },
      {
        field: 'descricao',
        search: query,
      },
      {
        field: 'valor',
        search: query,
      },
      {
        field: 'numparc',
        search: query,
      },
      {
        field: 'qtdeparc',
        search: query,
      },
      {
        field: 'categoriaid',
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
