import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  userService: UserService = inject(UserService);
  userResult!: User;

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  // SUbmit du form a placer dans le (submit) du form
  submitLogin() {
    const log = this.loginForm.value.login ?? '';
    const password = this.loginForm.value.password ?? '';

    this.userService.getUser(log, password).then((user) => {
      console.log(user);
      this.userResult = user;
      alert(user.id);
      alert(this.userResult.login);
    });
  }
}
