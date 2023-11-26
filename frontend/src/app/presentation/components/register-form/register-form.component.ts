import { Component, EventEmitter, OnInit, Output, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { NewUserState } from 'app/data/models/userRegisterState';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {

  @Output() registerFormSubmitted: EventEmitter<NewUserState>;
  protected registerForm!: FormGroup;

  protected formBuilder: FormBuilder = inject(FormBuilder);
  protected renderer: Renderer2 = inject(Renderer2);

  constructor() { 
    this.registerFormSubmitted = new EventEmitter()
    this.registerForm = this.createRegisterForm();
  }
  ngOnInit(): void {
  }

  private createRegisterForm(): FormGroup{
    return this.formBuilder.group({
    name: [''],
    lastName: [''],
    email: ['',
    [Validators.pattern(
      /^\s*(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\s*$/,
    ), Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")]]
    });
  }

  protected onSubmit(){
    if(this.registerForm.valid)
      this.registerFormSubmitted.emit({ID: crypto.randomUUID(),name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName, email: this.registerForm.value.email, 
      password: this.registerForm.value.password} as NewUserState);
  }
}
