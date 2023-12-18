import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillRequestDto } from 'app/data/models/Bills';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';
import { CartService } from 'app/data/services/cart/cart.service';
import { BillsService } from 'app/data/services/bills/bills.service';

@Component({
  selector: 'modal-buy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-buy.component.html',
  styleUrl: './modal-buy.component.css'
})
export class ModalBuyComponent implements OnInit{
  protected readonly loggedInState: LoggedInService = inject(LoggedInService);
  protected id: string = '';
  mostrarInputDomicilio: boolean = false;
  pago: boolean = false;
  domicilio: string = '';
  billRequest: BillRequestDto = {
    userId: '',
    delivery: false,
    paymentMethods: 'CASH',
    address: '',
    bookQuantities: {},
  };

  constructor(
    private cartService: CartService,
    private billsService: BillsService) {
    this.populateBookQuantities();
  }

  ngOnInit(): void {
    const id = localStorage.getItem("id");
    this.id = id !== null ? id : '';
    this.billRequest.userId = this.id;
}

  private populateBookQuantities() {
    const booksOnCart = this.cartService.booksOnCart;
    for (const item of booksOnCart) {
      this.billRequest.bookQuantities[item.book.id] = item.quantity;
    }
  }



  setRetiroLocal() {
    this.mostrarInputDomicilio = false;
    this.billRequest.delivery = false;
  }

  setEnvioDomicilio() {
    this.mostrarInputDomicilio = true;
    this.billRequest.delivery = true;
  }

  setEfectivo() {
    this.pago = true;
    this.billRequest.paymentMethods = 'CASH';
  }

  setCredito() {
    this.pago = true;
    this.billRequest.paymentMethods = 'CREDIT';
  }

  setDebito() {
    this.pago = true;
    this.billRequest.paymentMethods = 'DEBIT';
  }

  confirmar() {
    this.billsService.saveBill(this.billRequest).subscribe(
      (response) => {
        console.log('Compra realizada con éxito', response);
        this.cartService.clearCart();
      },
      (error) => {
        console.error('Error al realizar la compra', error);
      }
    );
  }
}
