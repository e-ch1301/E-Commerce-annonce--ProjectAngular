import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductTestComponent } from './add-product-test.component';

describe('AddProductTestComponent', () => {
  let component: AddProductTestComponent;
  let fixture: ComponentFixture<AddProductTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
