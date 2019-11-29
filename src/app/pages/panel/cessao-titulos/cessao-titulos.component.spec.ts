import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CessaoTitulosComponent } from './cessao-titulos.component';

describe('CessaoTitulosComponent', () => {
  let component: CessaoTitulosComponent;
  let fixture: ComponentFixture<CessaoTitulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CessaoTitulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CessaoTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
