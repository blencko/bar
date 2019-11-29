import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CessionariosComponent } from './cessionarios.component';

describe('CessionariosComponent', () => {
  let component: CessionariosComponent;
  let fixture: ComponentFixture<CessionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CessionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CessionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
