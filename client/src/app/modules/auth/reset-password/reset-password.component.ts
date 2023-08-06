import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  isLoading!: boolean;
  errorMessage!: string
  successMessage!: string
  token!: string

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params['token']
    })
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return
    }

    this.isLoading = true
    this.authService.resetPassword(this.resetPasswordForm.value.password, this.token).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Your password has been changed, please login.'
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    }
    )
  }

}
