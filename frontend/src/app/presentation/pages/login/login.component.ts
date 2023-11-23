import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserLoginState } from 'app/data/models/userLoginState';
import { LoginService } from 'app/data/services/login/login.service';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  private service: LoginService = inject(LoginService);
  constructor() { }

  ngOnInit(): void {
  }

  protected loginHandler(loginSubmitted: UserLoginState): void{
    this.service.login(loginSubmitted);
  }
  
}
