import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  themeValue;

  constructor(private afs: AngularFirestore,
              private auth: AngularFireAuth,
              private authService: AuthService) {
    authService.user$.subscribe(user => console.log(user));
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user.preferredTheme) {
        this.themeValue = user.preferredTheme;
      } else {
        this.themeValue = 'Light Theme';
      }
    });
  }

  setAppTheme() {
    if (this.themeValue === 'Light Theme') {
      const el = document.getElementById('body');
      el.className = 'light-theme';
    } else if (this.themeValue === 'Dark Theme') {
      const el = document.getElementById('body');
      el.className = 'dark-theme';
    } else if (this.themeValue === 'Hack Upstate') {
      const el = document.getElementById('body');
      el.className = 'hack-upstate-theme';
    } else if (this.themeValue === 'Definitely Not Twitch') {
      const el = document.getElementById('body');
      el.className = 'definitely-not-twitch-theme';
    } else if (this.themeValue === 'Syntax Pod') {
      const el = document.getElementById('body');
      el.className = 'syntax-pod-theme';
    } else if (this.themeValue === 'Monochrome') {
      const el = document.getElementById('body');
      el.className = 'monochrome-theme';
    } else if (this.themeValue === 'Dark Neon') {
      const el = document.getElementById('body');
      el.className = 'dark-neon-theme';
    }
    if (this.auth.auth.currentUser) {
      this.updateTheme(this.themeValue, this.auth.auth.currentUser);
    }
    console.log(this.themeValue);
  }

  private updateTheme(preferred_theme, user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return userRef.update({preferredTheme: preferred_theme});
  }
}
