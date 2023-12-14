import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-buy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-buy.component.html',
  styleUrl: './modal-buy.component.css'
})
export class ModalBuyComponent {
  mostrarInputDomicilio: boolean = false;

  cerrarModal() {
  }

  guardar() {
  }
}
