import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ToastService } from 'app/data/services/toast/Toast.service';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {
  private readonly toast = inject(ToastService);

  public readonly toasts = this.toast.state.asReadonly();

  constructor() { }
  
  ngOnInit(): void {
  }

  protected close(ID: string): void{
    this.toast.remove(ID);
  }

}
