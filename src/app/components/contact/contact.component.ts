import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass',
})
export class ContactComponent {
  toastr: ToastrService = inject(ToastrService);

  contactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  submitContact() {
    const firstName: string = this.contactForm.value.firstName ?? '';
    const lastName: string = this.contactForm.value.lastName ?? '';
    const email: string = this.contactForm.value.email ?? '';

    console.log(firstName + ' ' + lastName + ' ' + email);
    this.toastr.success('Envoyé !');
  }
}
