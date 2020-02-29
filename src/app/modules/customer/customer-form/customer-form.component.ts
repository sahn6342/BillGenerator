import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customerId;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      if (res && res.id) {
        this.httpClient.get('http://localhost:6363/api/customer/' + res.id).subscribe((resData: any) => {
          console.log(resData);
          const customerFormGroup = this.customerForm.get('customerFormGroup') as FormGroup;
          customerFormGroup.addControl('_id', new FormControl(resData._id));
          this.customerId = resData._id;
          this.patchFormValues(resData);
        });
      }
    });

    this.customerForm = new FormGroup({
      customerFormGroup: new FormGroup({
        name: new FormControl(''),
        address: new FormControl(''),
        ratePerBottle: new FormControl(0),
        rentPerDispenser: new FormControl(0)
      })
    });
  }

  save() {
    if (!this.customerId) {
      this.httpClient.post('http://localhost:6363/api/customer', this.customerForm.value.customerFormGroup)
        .subscribe((res: any) => {
          console.log(res);
          if (res.success) {
            this.customerForm.reset();
            alert(res.message);
            this.router.navigate(['/modules/customers/']);
          }
        });
    } else {
      this.httpClient.put('http://localhost:6363/api/customer', this.customerForm.value.customerFormGroup)
        .subscribe((res: any) => {
          console.log(res);
          if (res.success) {
            this.customerForm.reset();
            alert(res.message);
            this.router.navigate(['/modules/customers/']);
          }
        });
    }
  }

  patchFormValues(customerObjectToPatch) {
    const customerFormGroup = this.customerForm.get('customerFormGroup') as FormGroup;
    customerFormGroup.patchValue({
      name: customerObjectToPatch.name,
      address: customerObjectToPatch.address,
      ratePerBottle: customerObjectToPatch.ratePerBottle,
      rentPerDispenser: customerObjectToPatch.rentPerDispenser
    });
  }
}
