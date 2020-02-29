import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-multi-invoice-gen',
  templateUrl: './multi-invoice-gen.component.html',
  styleUrls: ['./multi-invoice-gen.component.css']
})
export class MultiInvoiceGenComponent implements OnInit {

  customersList = [];
  multiInvoiceForm: FormGroup;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCustomers();
    this.initMultiInvoiceForm();
  }

  getCustomers() {
    this.httpClient.get('http://localhost:6363/user/customers').subscribe((data: any) => {
      this.customersList = data.data;
      if (data.data.length) {
        this.genrateCustomersFormControl();
      }
    });
  }

  initMultiInvoiceForm() {
    this.multiInvoiceForm = new FormGroup({
      billingMonth: new FormControl('', Validators.required),
      customers: new FormArray([])
    });
  }

  genrateCustomersFormControl() {
    const customersFormArray = this.multiInvoiceForm.get('customers') as FormArray;
    this.customersList.forEach((customer) => {
      const customerControl = new FormGroup({
        customerId: new FormControl(customer._id, Validators.required),
        name: new FormControl({ value: customer.name, disabled: true }),
        address: new FormControl({ value: customer.address, disabled: true }),
        ratePerBottle: new FormControl({ value: customer.ratePerBottle, disabled: true }, Validators.required),
        rentPerDispenser: new FormControl({ value: customer.rentPerDispenser, disabled: true }, Validators.required),
        bottleConsumption: new FormControl(null, Validators.required),
        noOfDispenser: new FormControl(0)
      });
      customersFormArray.push(customerControl);
    });
    console.log(this.multiInvoiceForm)
  }
  submit() {
    this.validateForm(this.multiInvoiceForm)
    if (this.multiInvoiceForm.invalid) {
      return;
    }
    console.log(this.multiInvoiceForm);
    this.httpClient.post('http://localhost:6363/user/invoices', this.multiInvoiceForm.value).subscribe((res) => {
      console.log(res)
    });
  }
  validateForm(control: AbstractControl) {
    if (control.hasOwnProperty('controls')) {
      control.markAsTouched({ onlySelf: true });
      const ctrl = control as FormGroup;
      for (const inner in ctrl.controls) {
        if (inner) {
          this.validateForm(ctrl.controls[inner]);
          control.updateValueAndValidity();
        }
      }
    } else {
      control.updateValueAndValidity();
      control.markAsTouched();
    }
  }
}
