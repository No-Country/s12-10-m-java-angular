import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Renderer2, inject } from '@angular/core';
import { LoginService } from '../../../data/services/login/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UserLoginState } from 'app/data/models/userLoginState';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService],
})
export class LoginFormComponent implements OnInit {
  @Output() loginFormSubmitted: EventEmitter<UserLoginState>;
  protected loginForm!: FormGroup;

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

}
