import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsaldogeralComponent } from './cardsaldogeral.component';

describe('CardsaldogeralComponent', () => {
  let component: CardsaldogeralComponent;
  let fixture: ComponentFixture<CardsaldogeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsaldogeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsaldogeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
