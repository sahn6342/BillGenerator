import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInvoiceGenComponent } from './multi-invoice-gen.component';

describe('MultiInvoiceGenComponent', () => {
  let component: MultiInvoiceGenComponent;
  let fixture: ComponentFixture<MultiInvoiceGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiInvoiceGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiInvoiceGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
