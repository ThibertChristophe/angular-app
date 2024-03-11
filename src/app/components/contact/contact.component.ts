import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass',
})
export class ContactComponent {
  contactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  submitContact() {
    //this.applyForm.value.firstName;
    //this.applyForm.value.lastName;
    //this.applyForm.value.email;
  }
}
