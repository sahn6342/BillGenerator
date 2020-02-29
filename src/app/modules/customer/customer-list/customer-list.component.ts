import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customersList = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.httpClient.get('http://localhost:6363/user/customers').subscribe((data: any) => {
      this.customersList = data.data;
      console.log(this.customersList);
    });
  }

  delete(id) {
    this.httpClient.post('http://localhost:6363/user/deleteCustomer', { id }).subscribe((data) => {
      this.getCustomers();
    }, (err) => {
      console.log(err);
    });
  }
}
