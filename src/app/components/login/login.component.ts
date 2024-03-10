import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../dto/login';

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
  toastr: ToastrService = inject(ToastrService);

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}
  // SUbmit du form a placer dans le (submit) du form
  submitLogin() {
    const log = this.loginForm.value.login ?? '';
    const password = this.loginForm.value.password ?? '';

    const credentials: Login = {
      login: log,
      password: password,
    };

    // 2 facon de faire
    // on envoi le log et mdp en POST
    // on envoi le user en GET et on recupere le tout, on verifie ensuite sur le client le mdp
    this.authService.login(credentials).then((ok) => {
      if (ok) {
        this.userService.getUser(log).then((user) => {
          if (user != null && user.password == password) {
            this.userResult = user;
            this.toastr.success('Connecté');
            this.onContinue();
          } else {
            this.toastr.error('Login / mot de passe invalides');
            this.loginForm.patchValue({
              password: '',
            });
          }
        });
      } else {
        this.toastr.error('Login / mot de passe invalides');
        this.loginForm.patchValue({
          password: '',
        });
      }
    });
  }
  onContinue() {
    this.router.navigateByUrl('');
  }
}
