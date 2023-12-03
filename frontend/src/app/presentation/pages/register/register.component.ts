import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterService } from 'app/data/services/register/register.service';
import { NewUserState } from 'app/data/models/userRegisterState';
import { Subject, takeUntil, first } from 'rxjs';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { Router } from '@angular/router';
import { ToastService } from 'app/data/services/toast/Toast.service';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';
import { AuthResponse } from 'app/data/models/AuthResponse';

@Component({
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, ToastComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit, OnDestroy  {
  private readonly toast = inject(ToastService);
  private readonly service: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);
  private readonly loggedInState: LoggedInService = inject(LoggedInService);

  private destroy$: Subject<void>;

  constructor(private readonly injector: Injector) { 
    this.destroy$ = new Subject<void>();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected registerHandler(registerSubmitted: NewUserState): void{
    const service = this.service;
    const router = this.router;
    const toast = this.toast;
    const loggedInState = this.loggedInState;
    toast.info("Sending", "Waiting answer.", 5);

    const registerObserver = {
      register: {} as AuthResponse,
      next(registerResponse: AuthResponse): void{
        this.register = registerResponse;
        loggedInState.setLogin(registerResponse);
        toast.success("Success", "Register in.", 5);
      },
      error(err: any): void{
        console.log(err);
        toast.error("Error", err.error.message, 5);
      },
      complete(): void{
        if(this.register.id !== registerSubmitted.id) loggedInState.updateId(this.register.id as string);

        
        setTimeout(()=>router.navigate(["/"]), 700);
      }
    };

    this.service.register(registerSubmitted)
    .pipe(takeUntil(this.destroy$))
    .pipe(first())
    .subscribe(registerObserver);
  }
  
}
