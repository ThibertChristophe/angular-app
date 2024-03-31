import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.sass',
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    email: new FormControl(''),
  });

  submitRegistration(): void {}
}
