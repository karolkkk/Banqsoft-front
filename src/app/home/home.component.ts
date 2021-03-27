import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';


export interface PaymentModel
{
  index:number; 
  payment:number; 
  principal:number; 
  interest:number;
   balance:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  loanInfo = new FormGroup({
    paybackTime: new FormControl(10, [Validators.min(1), Validators.required]),
    amount: new FormControl(100000, [Validators.min(1), Validators.required]),
  });
  payments: PaymentModel[] = [];
  displayedColumns=["index","payment","principal","interest","balance"];
  dataSource = new MatTableDataSource<PaymentModel>(this.payments);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //console.log(this.dataSource);
  }
  
  constructor(private _http: HttpService) { }
 

  ngOnInit(): void {
  }

  show(element){console.log("helllo",element); return element.index}


  send() {
    console.log(this.loanInfo.value);
    this._http.getPaymentPlan(this.loanInfo.value).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.payments = data
      this.dataSource.data = this.payments;

      console.log("datasource",this.dataSource);
    }
  );
  }
}
