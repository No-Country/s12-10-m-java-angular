import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillRequestDto } from 'app/data/models/Bills';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';
import { CartService } from 'app/data/services/cart/cart.service';
import { BillsService } from 'app/data/services/bills/bills.service';
import { Router } from '@angular/router';

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
  successMessage: string ="Compra realizada con éxito";
  seeSuccessMessage: boolean = false;
  errorOnConfirm: boolean = false;
  pago: boolean = false;
  domicilio: string = '';
  isButtonDisabled: boolean = true;
  billRequest: BillRequestDto = {
    userId: '',
    delivery: false,
    paymentMethods: 'CASH',
    address: '',
    bookQuantities: {},
  };

  constructor(
    private router: Router,
    private cartService: CartService,
    private billsService: BillsService,
    private cdr: ChangeDetectorRef
  ) {
    this.populateBookQuantities();
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem("id");
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
    this.updateButtonState();
  }

  setEnvioDomicilio() {
    this.mostrarInputDomicilio = true;
    this.billRequest.delivery = true;
    this.updateButtonState();
  }

  setEfectivo() {
    this.pago = true;
    this.billRequest.paymentMethods = 'CASH';
    this.updateButtonState();
  }

  setCredito() {
    this.pago = true;
    this.billRequest.paymentMethods = 'CREDIT';
    this.updateButtonState();
  }

  setDebito() {
    this.pago = true;
    this.billRequest.paymentMethods = 'DEBIT';
    this.updateButtonState();
  }
  confirmar() {
    this.billsService.saveBill(this.billRequest).subscribe(
      (response: any) => {
        console.log('Compra realizada con éxito', response);
        this.cartService.clearCart();
        this.seeSuccessMessage = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['']); 
        }, 1800);
      },
      (error) => {
        console.error('Error al realizar la compra', error);
        this.errorOnConfirm = true;
        this.cdr.detectChanges();
      }
    );
  }

  private updateButtonState() {
    this.isButtonDisabled = !this.isFormValid();
  }

  isFormValid(): boolean {
    return (
      (this.mostrarInputDomicilio && this.billRequest.address && this.isPagoSelected()) ||
      (!this.mostrarInputDomicilio && this.isEnvioSelected() && this.isPagoSelected()) ||
      (!this.mostrarInputDomicilio && !this.isEnvioSelected() && this.isPagoSelected())
    );
  }


  isEnvioSelected(): boolean {
    return this.mostrarInputDomicilio;
  }

  isPagoSelected(): boolean {
    return this.pago || this.billRequest.paymentMethods !== 'CASH';
  }
}
