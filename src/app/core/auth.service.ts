import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';


@Injectable()
export class AuthService {

  isEmailVerified: boolean;
  errorLoggingIn: boolean;

  user$: Observable<User>

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = afAuth.authState;
  }

  getUser(): Observable<User> {
    return this.user$;
  }

  signUpWithEmailAndPassword(value) {
    console.log('initiating sigup with email and pass');

    this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.sendVerificationEmail();
        this.signInWithEmailAndPassword(value);
      }, errRes => {
        var errorCode = errRes.code;
        var errorMessage = errRes.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(errRes);
      });
  }

  signInWithEmailAndPassword(value) {
    console.log('here');
    return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  sendVerificationEmail() {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      user.sendEmailVerification();
    });
  }

  checkEmailVerification() {
    if (this.afAuth.auth.currentUser != null) {
      // console.log('checking verification');
      // console.log(this.afAuth.auth.currentUser.emailVerified);
      this.isEmailVerified = this.afAuth.auth.currentUser.emailVerified;
      return this.isEmailVerified;
    }
  }

  updateEmail(value) {
    this.afAuth.auth.currentUser.updateEmail(value.newEmail).then(function () {
      // Update successful.
      console.log('email updated');
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
    this.sendVerificationEmail();
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  gitHubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // determines if user has matching role
  public checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      // if (user. roles[role]) {
      return true;
      // }
    }
    return false;
  }
}
