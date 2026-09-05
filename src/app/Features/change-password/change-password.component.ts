import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangePasswordService } from '../../Core/Services/change-password.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  private readonly changePasswordService = inject(ChangePasswordService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  formSubscription!: Subscription;
  changePasswordFormGroup!: FormGroup;
  ngOnInit(): void {
    this.changePasswordFormInit();
  }
  changePasswordFormInit(): void {
    this.changePasswordFormGroup = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
        newPassword: [
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
    this.formSubscription = this.changePasswordService
      .changePassword(this.changePasswordFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['/login']);
            localStorage.clear();
          }, 1000);
        },
      });
  }
}
