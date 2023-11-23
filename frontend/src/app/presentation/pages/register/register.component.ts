import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
