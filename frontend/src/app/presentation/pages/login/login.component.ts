import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  protected handlerLogin(): void{

  }
  
}
