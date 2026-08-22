import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Core/Auth/Services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  errMsg: string = '';
  loading: boolean = false;
  loginForm!: FormGroup;
  loginSub$: Subscription = new Subscription();

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit(): void {
    this.loginForm = this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
      },
      { updateOn: 'submit' },
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginSub$.unsubscribe();
      this.loginSub$ = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            setTimeout(() => {
              this.router.navigate(['/feed']);
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
      this.loginForm.markAllAsTouched();
    }
  }
}
