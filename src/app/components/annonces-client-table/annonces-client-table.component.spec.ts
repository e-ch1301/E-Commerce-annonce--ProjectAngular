import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesClientTableComponent } from './annonces-client-table.component';

describe('AnnoncesClientTableComponent', () => {
  let component: AnnoncesClientTableComponent;
  let fixture: ComponentFixture<AnnoncesClientTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncesClientTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesClientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
