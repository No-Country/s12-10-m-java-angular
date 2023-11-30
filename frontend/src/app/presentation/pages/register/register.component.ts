import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, inject } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterService } from 'app/data/services/register/register.service';
import { NewUserState } from 'app/data/models/userRegisterState';
import { Subject, takeUntil, first } from 'rxjs';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { Router } from '@angular/router';
import { ToastService } from 'app/data/services/toast/Toast.service';

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
    toast.info("Sending", "Waiting answer.", 5);

    const registerObserver = {
      register: registerSubmitted,
      next(registerResponse: any): void{
        this.register = registerResponse;
        service.setInStorage(this.register);
        toast.success("Success", "Register in.", 5);
      },
      error(err: any): void{
        console.log(err);
        toast.error("Error", err.error.message, 5);
      },
      complete(): void{
        if(this.register.id !== registerSubmitted.id) localStorage.setItem("id", this.register.id);

        setTimeout(()=>router.navigate(["/"]), 700);
      }
    };

    this.service.register(registerSubmitted)
    .pipe(takeUntil(this.destroy$))
    .pipe(first())
    .subscribe(registerObserver);
  }
  
}
