import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterService } from 'app/data/services/register/register.service';
import { NewUserState } from 'app/data/models/userRegisterState';
import { Subject, takeUntil, first } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit, OnDestroy  {
  private service: RegisterService = this.injector.get(RegisterService);

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

  protected registerHandler(registerSubmitted: NewUserState): void{
    const self = this;
    const registerObserver = {
      register: registerSubmitted,
      next(registerResponse: any): void{
        this.register = registerResponse;
        self.service.setInStorage(this.register);
      },
      error(err: any): void{
        console.log(err);
      },
      complete(): void{
        if(this.register.ID !== registerSubmitted.ID) localStorage.setItem("ID", this.register.ID);
      }
    };

    this.service.register(registerSubmitted)
    .pipe(takeUntil(this.destroy$))
    .pipe(first())
    .subscribe(registerObserver);
  }
  
}
