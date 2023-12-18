import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { NewUserState } from 'app/data/models/userRegisterState';
import { LinkComponent } from '../link/link.component';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    LinkComponent,
    DefaultButtonComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  @Output() registerFormSubmitted: EventEmitter<NewUserState>;
  protected registerForm!: FormGroup;
  protected viewPassword = false;

  protected formBuilder: FormBuilder = inject(FormBuilder);
  protected renderer: Renderer2 = inject(Renderer2);

  constructor() {
    this.registerFormSubmitted = new EventEmitter();
    this.registerForm = this.createRegisterForm();
  }
  ngOnInit(): void {}

  private createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: [
        '',
        [
          Validators.pattern(
            /^\s*(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\s*$/
          ),
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$'),
        ],
      ],
      passwordRepeat: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
    });
  }

  public passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = this.registerForm?.get('password')?.value as string;
    return password === control.value ? null : { passwordMismatch: true };
  }

  protected onSubmit() {
    if (this.registerForm.valid) {
      this.registerFormSubmitted.emit({
        id: crypto.randomUUID(),
        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        passwordRepeat: this.registerForm.value.passwordRepeat,
      } as NewUserState);
    }
  }

  protected toogleViewPassword(event: any): void {
    this.viewPassword = !this.viewPassword;

    const target = event.currentTarget as HTMLElement;

    this.viewPassword && this.renderer.addClass(target, 'active');
    !this.viewPassword && this.renderer.removeClass(target, 'active');
  }
}
