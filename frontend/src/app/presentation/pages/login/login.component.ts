import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserLoginState } from 'app/data/models/userLoginState';
import { LoginService } from 'app/data/services/login/login.service';
import { Subject, Subscription, catchError, first, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService],
})
export class LoginComponent implements OnInit, OnDestroy  {
  private service: LoginService = this.injector.get(LoginService);
  private router: Router = inject(Router);
  
  private destroy$: Subject<void>;

  constructor(private injector: Injector) { 
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loginHandler(loginSubmitted: UserLoginState): void{
    const service = this.service;
    const router = this.router;

    const loginObserver = {
      login: loginSubmitted,
      next(loginResponse: any): void{
        console.log("Entra al next ?"); 
        this.login = loginResponse;
        service.setInStorage(this.login);
      },
      complete(): void{
        setTimeout(()=>router.navigate(["/register"]), 700);
      }
    };

    service.login(loginSubmitted)
    .pipe(takeUntil(this.destroy$))
    .pipe(first())
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error; // Reenviar el error
      })
    )
    .subscribe(loginObserver);
  }
  
}
