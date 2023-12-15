import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'modal-buy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-buy.component.html',
  styleUrl: './modal-buy.component.css'
})
export class ModalBuyComponent {
  mostrarInputDomicilio: boolean = false;
  pago: boolean = false;
  domicilio: string = '';

  cerrarModal() {
  }

  guardar() {
  }
}
