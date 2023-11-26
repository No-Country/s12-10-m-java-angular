import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserLoginState } from 'app/data/models/userLoginState';
import { LoginService } from 'app/data/services/login/login.service';
import { Observable, Subject, Subscription, catchError, first, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from 'app/data/services/toast/Toast.service';
import { ToastModel, ToastPosition, ToastType } from 'app/data/models/toast.model';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent, ToastComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy  {
  private readonly toast = inject(ToastService);
  private readonly service: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

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
    toast.info("Sending", "Waiting answer", 100000);

    const loginObserver = {
      login: loginSubmitted,
      next(loginResponse: any): void{
        console.log("Entra al next ?"); 
        this.login = loginResponse;
        service.setInStorage(this.login);
      },
      error(err: any): void{
        toast.error("Error", err.message, 100000);
      },
      complete(): void{
        setTimeout(()=>router.navigate(["/register"]), 700);
      }
    };

    service.login(loginSubmitted)
    .pipe(takeUntil(this.destroy$))
    .pipe(first())
    .subscribe(loginObserver);
  }
  
}
