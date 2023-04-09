import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAnnonceComponent } from './last-annonce.component';

describe('LastAnnonceComponent', () => {
  let component: LastAnnonceComponent;
  let fixture: ComponentFixture<LastAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
