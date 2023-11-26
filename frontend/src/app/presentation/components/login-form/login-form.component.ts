import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Renderer2, inject } from '@angular/core';
import { LoginService } from '../../../data/services/login/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UserLoginState } from 'app/data/models/userLoginState';
import { LinkComponent } from '../link/link.component';


@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent, LinkComponent],
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  @Output() loginFormSubmitted: EventEmitter<UserLoginState>;
  protected loginForm!: FormGroup;
  protected viewPassword = false;
  
  protected formBuilder: FormBuilder = inject(FormBuilder);
  protected renderer: Renderer2 = inject(Renderer2);
  
  
  constructor() { 
    this.loginFormSubmitted = new EventEmitter()
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
  }

  private createLoginForm(): FormGroup{
    return this.formBuilder.group({
      email:    ['', [Validators.pattern(
        /^\s*(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\s*$/,
      ), Validators.required]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")]]
    });
  }

  protected onSubmit(){
    if(this.loginForm.valid)
      this.loginFormSubmitted.emit({email: this.loginForm.value.email, password: this.loginForm.value.password} as UserLoginState);
  }

  protected toogleViewPassword(event: any): void {
    this.viewPassword = !this.viewPassword;

    const target = event.currentTarget as HTMLElement;

    this.viewPassword   && this.renderer.addClass(target, 'active');
    !this.viewPassword && this.renderer.removeClass(target, 'active');
  }

}
