import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/Auth/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  errMsg: string = '';
  loading: boolean = false;
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
      this.loading = true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errMsg = err.error.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
