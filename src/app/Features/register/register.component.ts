import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Core/Auth/Services/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  errMsg: string = '';
  registerForm!: FormGroup;
  registerSub$: Subscription = new Subscription();

  ngOnInit(): void {
    this.registerFormInit();
  }

  registerFormInit(): void {
    this.registerForm = this.fb.nonNullable.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        username: [''],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
        rePassword: ['', [Validators.required]],
      },
      { updateOn: 'submit', validators: this.confirmPassword },
    );
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password !== rePassword) {
      group.get('password')?.setErrors({ missMatch: true });
      return { missMatch: true };
    } else return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerSub$.unsubscribe();
      this.registerSub$ = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
