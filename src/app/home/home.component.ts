import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface PaymentModel{index:number; payment:number; principal:number;}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  loanInfo = new FormGroup({
    paybackTime: new FormControl(10, [Validators.min(1), Validators.required]),
    amount: new FormControl(100000, [Validators.min(1), Validators.required]),
  });
  payments: PaymentModel;
  displayedColumns=["index","payment","principal"];
  constructor(private _http: HttpService) { }
 

  ngOnInit(): void {
  }

  show(element){console.log("helllo",element); return element.index}


  send() {
    console.log(this.loanInfo.value);
    this._http.getPaymentPlan(this.loanInfo.value).subscribe(data => {
      this.payments = data
      console.log("payments",this.payments);
    }
  );
  }
}
