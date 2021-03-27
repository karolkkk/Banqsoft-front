import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    paybackTime: new FormControl(10, [Validators.min(1), Validators.required]),
    amount: new FormControl(100000, [Validators.min(1), Validators.required]),
  });

  public displayedColumns = ['index', 'payment', 'principal', 'interest', 'balance'];
  public dataSource = new MatTableDataSource<PaymentModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpService) { }

  public send(): void {
    console.log(this.loanInfo.value);
    this.http.getPaymentPlan(this.loanInfo.value).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
      console.log('datasource', this.dataSource);
    }
  );
  }
}
