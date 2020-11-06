import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/providers/api/api.service';
import { PaymentService } from 'src/app/providers/payment/payment.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  cards: Card[]

  constructor(
    private payment: PaymentService
  ) { }

  ngOnInit() {
    this.payment.getPaymentMethods().toPromise()
      .then(data => {
        this.cards = data
      })
      .catch(err => {
        console.log(err);
      })
  }

  addPaymentMethod() {
    
  }

  selectPaymentMethod(index) {
    for (let i=0; i<this.cards.length; i++) {
      if(index == i){
        this.cards[i].selected = true
      } else {
        this.cards[i].selected = false
      }
    }
  }

}
