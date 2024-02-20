import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
//...
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  userResult!: User;
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}
  // SUbmit du form a placer dans le (submit) du form
  submitLogin() {
    const log = this.loginForm.value.login ?? '';
    const password = this.loginForm.value.password ?? '';

    this.authService.login(log, password).then((ok) => {
      if (ok) {
        this.userService.getUser(log, password).then((users) => {
          console.log(users);
          if (users.length == 1) {
            const user = users[0];
            this.userResult = user;
            this.authService.isLoggedIn = true;
            this.onContinue();
          } else {
            this.loginForm.patchValue({
              password: '',
            });
          }
        });
      }
    });
  }
  onContinue() {
    this.router.navigateByUrl('');
  }
}
