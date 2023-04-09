import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersClientTableComponent } from './orders-client-table.component';

describe('OrdersClientTableComponent', () => {
  let component: OrdersClientTableComponent;
  let fixture: ComponentFixture<OrdersClientTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersClientTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersClientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
