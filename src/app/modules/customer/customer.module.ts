import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        component: CustomerListComponent,
        pathMatch: 'full'
      },
      {
        path: 'add-update',
        component: CustomerFormComponent
      },
      {
        path: 'add-update/:id',
        component: CustomerFormComponent
      }
    ]
  }
];

@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
