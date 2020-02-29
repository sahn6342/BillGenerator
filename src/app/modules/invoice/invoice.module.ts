import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceGenComponent } from './invoice-gen/invoice-gen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiInvoiceGenComponent } from './multi-invoice-gen/multi-invoice-gen.component';

const route: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    children: [
      {
        path: 'genrate',
        component: InvoiceGenComponent
      },
      {
        path: 'genrate-multi',
        component: MultiInvoiceGenComponent
      }
    ]
  }
];


@NgModule({
  declarations: [InvoiceComponent, InvoiceGenComponent, MultiInvoiceGenComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ]
})
export class InvoiceModule { }
