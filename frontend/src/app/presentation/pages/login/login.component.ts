import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserLoginState } from 'app/data/models/userLoginState';
import { LoginService } from 'app/data/services/login/login.service';
import { Subject, Subscription, first, takeUntil } from 'rxjs';

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
    const self = this;
    const loginObserver = {
      login: loginSubmitted,
      next(loginResponse: any): void{
        this.login = loginResponse;
        self.service.setInStorage(this.login);
      },
      error(err: any): void{
        console.log(err);
      },
      complete(): void{
        if(this.login.ID !== loginSubmitted.ID) localStorage.setItem("ID", this.login.ID);
      }
    };

    this.service.login(loginSubmitted)
    .pipe(takeUntil(this.destroy$))
    .pipe(first())
    .subscribe(loginObserver);
  }
  
}
