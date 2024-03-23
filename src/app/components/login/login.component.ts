import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  userResult?: String;
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  toastr: ToastrService = inject(ToastrService);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}
  // SUbmit du form a placer dans le (submit) du form
  submitLogin(): void {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    const credentials: Login = {
      username: username,
      password: password,
    };

    // 2 facon de faire
    // on envoi le log et mdp en POST
    // on envoi le user en GET et on recupere le tout, on verifie ensuite sur le client le mdp
    this.authService.login(credentials).then((ok) => {
      if (ok) {
        this.userResult = username;
        this.toastr.success('Connecté');
        this.onContinue();
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
    window.location.reload();
  }
}
