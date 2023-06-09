import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnnoncesComponent } from './all-annonces.component';

describe('AllAnnoncesComponent', () => {
  let component: AllAnnoncesComponent;
  let fixture: ComponentFixture<AllAnnoncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAnnoncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
