import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  isloggedIn = false;
  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');
    return this.isloggedIn;
  }
  constructor(private afAuth: AngularFireAuth, public router: Router) {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   console.log('1');
    //   console.log(user);
    // });
    // this.afAuth.auth.currentUser.getIdToken(true).then(x => {
    //   console.log('token refreshed');
    //   console.log(x);
    // });
    // this.afAuth.idTokenResult.subscribe(x => {
    //   console.log(x);
    //   console.log('x.claims');
    //   console.log(x.claims);
    //   // console.log(sizeof(x.claims))
    // });
    // this.afAuth.user.subscribe(user => {
    //   console.log('user');
    //   console.log(user);
    //   if (user) {
    //     this.isloggedIn = true;
    //   } else {
    //     this.isloggedIn = false;
    //   }
    // });

  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(x => {
      console.log(x);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  isLoggenIn() {
    this.afAuth.idTokenResult.subscribe(x => {
      console.log(x);
    });
  }

}
