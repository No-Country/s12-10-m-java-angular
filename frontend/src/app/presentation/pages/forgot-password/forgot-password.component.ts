import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { ErrorMessageComponent } from '@presentation/components/error-message/error-message.component';
import { LinkComponent } from '@presentation/components/link/link.component';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { LoginService } from 'app/data/services/login/login.service';
import { ToastService } from 'app/data/services/toast/Toast.service';
import { Subject, first, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent, ErrorMessageComponent, LinkComponent, DefaultButtonComponent],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  protected forgotForm: FormGroup;
  protected readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly toast: ToastService = inject(ToastService);
  private readonly service: LoginService = inject(LoginService);
  private destroy$: Subject<void>;
  
  constructor() {
    this.forgotForm = this.createLoginForm();
    this.destroy$ = new Subject<void>();
   }
   ngOnDestroy(): void {
    this.forgotForm.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

   private createLoginForm(): FormGroup{
    return this.formBuilder.group({
      email:    ['', [Validators.pattern(
        /^\s*(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\s*$/,
      ), Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const toast = this.toast;
    const service = this.service;
    toast.info("Sending", "Waiting answer.", 5);

    const forgotObserver = {
      next(val: any): void{
        toast.success("Success", "A verification message has been sent to your email.", 5);
      },
      error(error: any): void{
        toast.error("Error", "An unexpected error has occurred with the server", 5);
      },
      complete(): void {

      }
    };

    service.forgotPassword(this.forgotForm.controls['email'].value)
    .pipe(first())
    .pipe(takeUntil(this.destroy$))
    .subscribe(forgotObserver);

    this.forgotForm.reset();
  }
}
