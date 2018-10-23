import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {User} from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  themeValue = 'Light Theme';

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.setAppTheme();
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
