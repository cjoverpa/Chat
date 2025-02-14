import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private isSignedIn: boolean = false;
  public userData$: Observable<User | null> = authState(this.auth);

  constructor() {
    this.userData$.subscribe((user) => {
      console.log('Auth state:', user);
    });
  }

  public signInWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    this.isSignedIn = true;
    return from(signInWithPopup(this.auth, provider));
  }

  public signOut(): Observable<void> {
    this.isSignedIn = false;
    return from(signOut(this.auth));

  }

  isLogged(): boolean {
    return this.isSignedIn;
  }
}
