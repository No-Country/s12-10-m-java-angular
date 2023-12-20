import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterService } from 'app/data/services/register/register.service';
import { NewUserState } from 'app/data/models/userRegisterState';
import { Subject, takeUntil, first } from 'rxjs';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { Router } from '@angular/router';
import { ToastService } from 'app/data/services/toast/Toast.service';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';
import { AuthResponse } from 'app/data/models/AuthResponse';
import { NavBarFormsComponent } from '@presentation/components/nav-bar-forms/nav-bar-forms.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RegisterFormComponent,
    ToastComponent,
    NavBarFormsComponent,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly toast = inject(ToastService);
  private readonly service: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);
  private readonly loggedInState: LoggedInService = inject(LoggedInService);

  private destroy$: Subject<void>;

  constructor(private readonly injector: Injector) {
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected registerHandler(registerSubmitted: NewUserState): void {
    const service = this.service;
    const router = this.router;
    const toast = this.toast;
    const loggedInState = this.loggedInState;
    toast.info('Sending', 'Waiting answer.', 5);

    const registerObserver = {
      register: {} as AuthResponse,
      next(registerResponse: AuthResponse): void {
        this.register = registerResponse;
        loggedInState.setLogin(registerResponse);
        toast.success('Success', 'Register in.', 5);
      },
      error(response: any): void {
        let message = 'An unexpected error has occurred with the server';

        if (response.error.backendMessage.includes('Duplicate')) message = 'Sorry, this email is already registered';

        toast.error('Oops...', message, 5);
      },
      complete(): void {
        if (this.register.id !== registerSubmitted.id)
          loggedInState.updateId(this.register.id as string);

        if (this.register.role === 'USER') setTimeout(() => router.navigate(['/']), 500);

        if (this.register.role === 'ADMIN') setTimeout(() => router.navigate(['/admin']), 500);
      },
    };

    this.service
      .register(registerSubmitted)
      .pipe(takeUntil(this.destroy$))
      .pipe(first())
      .subscribe(registerObserver);
  }
}
