import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryTestComponent } from './add-category-test.component';

describe('AddCategoryTestComponent', () => {
  let component: AddCategoryTestComponent;
  let fixture: ComponentFixture<AddCategoryTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
