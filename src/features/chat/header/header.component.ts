import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/shared/services/AuthService/auth.service';

@UntilDestroy()
@Component({
  selector: 'chat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [],
})
export class HeaderComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  constructor() {}

  ngOnInit() {}

  signOut(): void {
    this.auth
      .signOut()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          console.log('User has logged out');
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Login error:', error);
        },
      });
  }
}
