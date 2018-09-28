import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { errorObject } from 'rxjs/internal-compatibility';


interface Roles {
  subscriber?: boolean; // read
  editor?: boolean; // read + write
  admin?: boolean; 
}

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  roles: Roles;
}


@Injectable()
export class AuthService {

  user: Observable<User>;
  isEmailVerified: boolean;
  errorLoggingIn: boolean;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    //// Get auth data, then get firestore user document || null

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signUpWithEmailAndPassword(value) {
    console.log('initiating sigup with email and pass');
    // return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.psw);
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.sendVerificationEmail();
          this.signInWithEmailAndPassword(value);
        }, err => reject(err));
    });
  }

  signInWithEmailAndPassword(value) {
    // this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).catch(function(error) {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    // });
    return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
  }
  
  sendVerificationEmail() {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      user.sendEmailVerification();
    });
  }

  checkEmailVerification() {
    if (this.afAuth.auth.currentUser != null) {
      console.log('checking verification');
      console.log(this.afAuth.auth.currentUser.emailVerified);
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

  gitHubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
    }

    // create or update the document in a non destructive way
    return userRef.set(data, { merge: true });

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }




  // abilities and roles auth

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    
    // if user is not defined
    if (!user) {
      return false;
    }

    // determine if user has the role
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }



}
