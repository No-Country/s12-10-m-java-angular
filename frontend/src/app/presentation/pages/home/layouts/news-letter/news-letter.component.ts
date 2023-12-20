import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { AuthResponse } from 'app/data/models/AuthResponse';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';
import { SuscribeService } from 'app/data/services/register/suscribe.service';

@Component({
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent],
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsLetterComponent implements OnInit {
  protected readonly loggedInState: LoggedInService = inject(LoggedInService);
  protected id: string = '';
  protected name: string = '';
  protected lastName: string = '';
  protected role: string = '';
  protected jwt: string = '';
  newsletterForm: FormGroup;

  constructor(private suscribeService: SuscribeService, private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem("id");
    this.id = id !== null ? id : '';
    const name = sessionStorage.getItem("name");
    this.name = name !== null ? name : '';
    const lastName = sessionStorage.getItem("lastName");
    this.lastName = lastName !== null ? lastName : '';
    const role = sessionStorage.getItem("role");
    this.role = role !== null ? role : '';
    const jwt = sessionStorage.getItem("jwt");
    this.jwt = jwt !== null ? jwt : '';
  }

  subscribe() {
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.get('email')!.value;
      const auth: AuthResponse = { 
        id : this.id,
        name: this.name,
        lastName: this.lastName,
        email: email,
        role: this.role,
        jwt: this.jwt,
       };
      this.suscribeService.suscribe( email, auth).subscribe(
        response => {
          console.log('Subscription successful', response);
        },
        error => {
          console.error('Subscription failed', error);
        }
      );
    }
  }

}
