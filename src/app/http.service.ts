import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentModel } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPaymentPlan({paybackTime, amount}): Observable<PaymentModel[]>{
    const params = new HttpParams()
      .set('paybackTime', paybackTime.toString())
      .set('amount', amount.toString());

    return this.http.get<PaymentModel[]>('https://localhost:44336/home/Amortized', {params});
  }



}
