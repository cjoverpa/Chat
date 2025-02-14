import { Injectable, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/shared/services/AuthService/auth.service';

export const CanActivateViaAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLogged()) {
    console.log('You are not logged in');
    router.navigate(['/']);
    return false;
  }

  return true;
};
