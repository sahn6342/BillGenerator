import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenricComponent } from './genric.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {
    path: '',
    component: GenricComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [GenricComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class GenricModule { }
