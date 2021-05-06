import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardfaturasComponent } from './cardfaturas.component';

describe('CardfaturasComponent', () => {
  let component: CardfaturasComponent;
  let fixture: ComponentFixture<CardfaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardfaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardfaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
