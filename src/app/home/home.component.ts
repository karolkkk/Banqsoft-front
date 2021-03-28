import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



export interface PaymentModel
{
  index: number ;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public loanInfo = new FormGroup({
    paybackTime: new FormControl(10, [Validators.min(1), Validators.max(100), Validators.required]),
    amount: new FormControl(100000, [Validators.min(1), Validators.max(100000000), Validators.required]),
  });

  public displayedColumns = ['index', 'payment', 'principal', 'interest', 'balance'];
  public dataSource = new MatTableDataSource<PaymentModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpService) { }

  public updateAmount(): void {
    this.loanInfo.controls.amount.patchValue(this.loanInfo.value.amount) ;

  }
  public updatePaybackTime(): void {
    this.loanInfo.controls.paybackTime.patchValue(this.loanInfo.value.paybackTime) ;

  }
  public send(): void {
    this.http.getPaymentPlan(this.loanInfo.value).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
    }
  );
  }
}
