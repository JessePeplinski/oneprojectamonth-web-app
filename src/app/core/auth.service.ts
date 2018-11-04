import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable()
export class AuthService {

  isEmailVerified: boolean;
  errorLoggingIn: boolean;

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }


  signUpWithEmailAndPassword(value) {
    console.log('initiating sigup with email and pass');

    this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.sendVerificationEmail();
        this.signInWithEmailAndPassword(value);
      }, errRes => {
        const errorCode = errRes.code;
        const errorMessage = errRes.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(errRes);
      });
  }

  signInWithEmailAndPassword(value) {
    console.log('here');
    return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(credential => {
      if (this.checkEmailVerification()) {
        this.router.navigate(['/profile']);
      }
    })
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
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        if (this.checkEmailVerification()) {
          this.router.navigate(['/profile']);
        }
      });
  }

  gitHubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const username = user.displayName.split(' ');
    const firstname = username[0];
    const lastname = username[1];
    console.log(username);
    console.log(firstname);
    console.log(lastname);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      firstName: firstname,
      lastName: lastname,
      roles: { participant: true },
      preferredTheme: 'Light Theme'
    };
    return userRef.set(data, { merge: true });
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
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
