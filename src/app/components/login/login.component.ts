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
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  userService: UserService = inject(UserService);
  toastr: ToastrService = inject(ToastrService);
  userResult?: String;
  error: string | null = '';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  // SUbmit du form a placer dans le (submit) du form
  submitLogin(): void {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    const credentials: Login = {
      username: username,
      password: password,
    };

    this.authService.login(credentials).subscribe({
      next: (success) => {
        if (success) {
          this.userResult = username;
          this.toastr.success('Connecté');
          this.onContinue();
        } else {
          this.toastr.error('Login / mot de passe invalides');
          this.loginForm.patchValue({
            password: '',
          });
        }
      },
      error: (error) => {
        this.toastr.error('Login / mot de passe invalides');
      },
    });
  }
  onContinue() {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
