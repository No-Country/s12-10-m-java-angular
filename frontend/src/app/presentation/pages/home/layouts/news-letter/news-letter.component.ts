import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { AuthResponse } from 'app/data/models/AuthResponse';
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
  newsletterForm: FormGroup;

  constructor(private suscribeService: SuscribeService, private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  subscribe() {
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.get('email')!.value;

      this.suscribeService.suscribe(email).subscribe(
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
