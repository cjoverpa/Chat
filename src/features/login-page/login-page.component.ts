import { Component, inject } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/shared/services/AuthService/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent{
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  errorMessage: string | null = null;

  loginWithGoogle(): void {
    this.authService.signInWithGoogle().pipe(untilDestroyed(this)).subscribe({
      next: (UserCredential: UserCredential) => {
        console.log('Authenticated user:', UserCredential.user);
        this.router.navigate(['chat']);
      },
      error: (error) => {
        console.error('Error login:', error);
        this.errorMessage = error.message;
      }
    })
  }
}
