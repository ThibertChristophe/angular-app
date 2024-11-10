import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  toastr: ToastrService = inject(ToastrService);

  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  getFormValidationErrors() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const controlErrors = this.contactForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log('Key control: ' + key + ', keyError: ' + keyError);
        });
      }
    });
  }

  submitContact() {
    if (this.contactForm.valid) {
      const firstName: string = this.contactForm.value.firstName ?? '';
      const lastName: string = this.contactForm.value.lastName ?? '';
      const email: string = this.contactForm.value.email ?? '';

      console.log(firstName + ' ' + lastName + ' ' + email);
      this.toastr.success('Envoyé !');
    } else {
      this.getFormValidationErrors();
    }
  }
}
