import { Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from '../core/guards/can-activate-via-auth-guard.guard';

export const routes: Routes = [
  {
    path: 'login',

    loadComponent: () =>
      import('../features/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: 'chat',
    canActivate: [CanActivateViaAuthGuard],
    loadComponent: () =>
      import('../features/chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
