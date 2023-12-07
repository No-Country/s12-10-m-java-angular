import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserLoginState } from 'app/data/models/userLoginState';
import { LoginService } from 'app/data/services/login/login.service';
import { Subject, first, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from 'app/data/services/toast/Toast.service';
import { AuthResponse } from 'app/data/models/AuthResponse';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';
import { NavBarFormsComponent } from '@presentation/components/nav-bar-forms/nav-bar-forms.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent, ToastComponent, NavBarFormsComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy  {
  private readonly toast = inject(ToastService);
  private readonly service: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);
  private readonly loggedInState: LoggedInService = inject(LoggedInService);

  private destroy$: Subject<void>;

  constructor(private readonly injector: Injector) {
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loginHandler(loginSubmitted: UserLoginState): void{
    const service = this.service;
    const router = this.router;
    const toast = this.toast;
    const loggedInState = this.loggedInState;
    toast.info("Sending", "Waiting answer.", 5);

    const loginObserver = {
      response: {} as AuthResponse,
      next(loginResponse: AuthResponse): void {
        loginResponse.isActive = true;
        loggedInState.setLogin(loginResponse);
        this.response = loginResponse;
        toast.success("Success", "Logging in.", 5);
      },
      error(err: any): void{
        toast.error("Error", "An unexpected error has occurred with the server", 5);
      },
      complete(): void {
        if(this.response.role === "USER")
          setTimeout(()=>router.navigate(["/"]), 700);
      }
    };

    service.login(loginSubmitted)
    .pipe(first())
    .pipe(takeUntil(this.destroy$))
    .subscribe(loginObserver);
  }

}
