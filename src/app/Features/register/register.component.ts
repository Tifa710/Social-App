import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private router = inject(Router);
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' },
  );

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
