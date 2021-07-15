/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DespesaService } from './despesa.service';

describe('Service: Despesa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DespesaService],
    });
  });

  it('should ...', inject([DespesaService], (service: DespesaService) => {
    expect(service).toBeTruthy();
  }));
});
